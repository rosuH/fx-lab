// CLOSED vocabularies — the single validated source for tags & vibe.
// build/validate.mjs fails the build if any effect uses a tag/vibe outside these sets,
// so typos can't fragment search. Add a term here (deliberately) to use it.

// Visual tags: what the effect LOOKS like.
export const TAGS_VISUAL = [
  'aurora', 'plasma', 'fractal', 'fluid', 'fire', 'lightning', 'rain', 'stars', 'nebula',
  'waves', 'ripple', 'noise', 'particles', 'confetti', 'smoke', 'ink', 'neon', 'glow',
  'glitch', 'scanlines', 'halftone', 'ascii', 'pixel', 'grid', 'hexgrid', 'dots', 'lines',
  'stripes', 'chevron', 'spiral', 'rings', 'knot', 'weave', 'tiling', 'mosaic', 'kaleidoscope',
  'mandala', 'optical', 'moire', 'geometry', 'curves', 'attractor', 'cellular', 'flocking',
  'orbit', 'pendulum', 'terrain', 'radar', 'oscilloscope', 'clock', 'loader', 'trail',
  'typography', 'metaballs', 'voronoi', 'starfield', 'tunnel', 'flow',
];
// Tech tags: how it's rendered.
export const TAGS_TECH = ['webgl2', 'canvas2d', 'dom', 'css'];
// Placement tags: where you'd drop it.
export const TAGS_PLACEMENT = ['background', 'overlay', 'inline', 'cursor'];

export const TAGS_ALL = [...TAGS_VISUAL, ...TAGS_TECH, ...TAGS_PLACEMENT];

// Mood / intent — orthogonal to visual tags. Lets "calm and organic" match on feel.
// This exact list is printed once in the llms.txt body so an LLM maps intent before reading links.
export const VIBES = [
  'calm', 'ambient', 'meditative', 'minimal', 'elegant', 'cozy',
  'energetic', 'playful', 'hypnotic', 'psychedelic', 'dramatic', 'aggressive',
  'organic', 'geometric', 'technical', 'cultural', 'retro', 'futuristic',
];

// Non-enforced hints for the metadata pass: messy inventory `cultureOrDomain` -> a clean culture value.
// culture is a FREE string in the schema (origin OR technical domain); null for generic effects.
export const CULTURE_HINTS = {
  Japan: 'Japan', China: 'China', Islamic: 'Islamic', Celtic: 'Celtic',
  'Aboriginal Australian': 'Aboriginal Australian', India: 'India', Greece: 'Greece',
  Mesoamerica: 'Mesoamerica', 'West Africa': 'West Africa', Mexico: 'Mexico',
  Maori: 'Maori', Persia: 'Persia', Bauhaus: 'Bauhaus', Memphis: 'Memphis',
  fractal: 'fractal', demoscene: 'demoscene', physics: 'physics',
  'cellular-automata': 'cellular-automata',
};

export function validateTaxonomy(meta) {
  const errs = [];
  for (const t of meta.tags || []) if (!TAGS_ALL.includes(t)) errs.push(`unknown tag: ${t}`);
  for (const v of meta.vibe || []) if (!VIBES.includes(v)) errs.push(`unknown vibe: ${v}`);
  return errs;
}
