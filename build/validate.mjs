// build/validate.mjs — validates every effect meta against schema/effect.schema.json AND
// build/taxonomy.js, plus the three build GATES (CONTRACT 5). No deps: a tiny hand-rolled
// JSON-Schema subset (type/enum/required/properties/items/pattern/additionalProperties/lengths).
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { REGISTRY, IDS } from '../src/registry.js';
import { validateTaxonomy } from './taxonomy.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

// --- minimal JSON-Schema validator (draft-07 subset we actually use) -------------------------
function typeOf(v) {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  if (Number.isInteger(v)) return 'integer';
  return typeof v; // 'object' | 'string' | 'number' | 'boolean'
}
function typeMatches(v, t) {
  const got = typeOf(v);
  if (t === 'number') return got === 'number' || got === 'integer';
  if (t === 'integer') return got === 'integer';
  return got === t;
}
export function validate(value, schema, path = '$') {
  const errs = [];
  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    if (!types.some((t) => typeMatches(value, t))) {
      errs.push(`${path}: expected ${types.join('|')}, got ${typeOf(value)}`);
      return errs; // type mismatch — deeper checks would be noise
    }
  }
  if (value === null) return errs; // null satisfied a nullable type
  if (schema.enum && !schema.enum.includes(value)) {
    errs.push(`${path}: ${JSON.stringify(value)} not in enum [${schema.enum.join(', ')}]`);
  }
  if (typeof value === 'string') {
    if (schema.minLength != null && value.length < schema.minLength)
      errs.push(`${path}: shorter than minLength ${schema.minLength}`);
    if (schema.maxLength != null && value.length > schema.maxLength)
      errs.push(`${path}: longer than maxLength ${schema.maxLength}`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value))
      errs.push(`${path}: does not match /${schema.pattern}/`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems != null && value.length < schema.minItems)
      errs.push(`${path}: fewer than minItems ${schema.minItems}`);
    if (schema.maxItems != null && value.length > schema.maxItems)
      errs.push(`${path}: more than maxItems ${schema.maxItems}`);
    if (schema.items) value.forEach((it, i) => errs.push(...validate(it, schema.items, `${path}[${i}]`)));
  }
  if (typeOf(value) === 'object') {
    for (const key of schema.required || []) {
      if (!(key in value)) errs.push(`${path}.${key}: required but missing`);
    }
    const props = schema.properties || {};
    for (const [key, sub] of Object.entries(props)) {
      if (key in value) errs.push(...validate(value[key], sub, `${path}.${key}`));
    }
    if (schema.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!(key in props)) errs.push(`${path}.${key}: additional property not allowed`);
      }
    }
  }
  return errs;
}

export function loadEffectSchema() {
  return JSON.parse(readFileSync(join(ROOT, 'schema/effect.schema.json'), 'utf8'));
}

// --- run schema + taxonomy + GATES over the whole registry ------------------------------------
export function validateAll() {
  const schema = loadEffectSchema();
  const errors = [];
  const seenIds = new Set();
  let clean = 0;

  for (const id of IDS) {
    const meta = REGISTRY[id].meta;
    const local = [];
    local.push(...validate(meta, schema, id));
    local.push(...validateTaxonomy(meta).map((e) => `taxonomy: ${e}`)); // GATE: unknown tag/vibe

    // GATE: duplicate id
    if (seenIds.has(meta.id)) local.push(`duplicate id: ${meta.id}`);
    else seenIds.add(meta.id);

    // GATE: custom license requires attribution
    if (meta.license === 'custom' && meta.attribution == null)
      local.push(`license 'custom' requires non-null attribution`);

    if (local.length) errors.push(...local.map((e) => `[${id}] ${e}`));
    else clean++;
  }
  return { total: IDS.length, clean, errors };
}

function main() {
  const r = validateAll();
  if (r.errors.length) {
    console.error(`validate: FAIL — ${r.errors.length} error(s) across ${r.total} effects (${r.clean} clean).`);
    for (const e of r.errors) console.error('  - ' + e);
    process.exit(1);
  }
  console.log(`validate: PASS — ${r.total} effects (schema + taxonomy + gates), ${r.clean} clean.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
