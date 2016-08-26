export function createAnimationTicker() {
  let func, context, time = 0;

  function go() {
    const now = Date.now();

    const delta = time === 0 ? 0 : now - time;

    time = now;
    func.call(context, delta);
  }

  return function nextTick(f, c) {
    func = f;
    context = c;

    requestAnimationFrame(go);
  }
}
