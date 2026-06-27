// Dispatches an adapted dom effect's init(root) -> { step?(t), stop() }.
// Normalizes the result so mount.js always gets a step (or null) and a stop().

export function makeDom(root, module) {
  const handle = module.init(root) || {};
  return {
    step: typeof handle.step === 'function' ? handle.step : null,
    stop: typeof handle.stop === 'function' ? handle.stop : () => {},
  };
}
