import { useEffect, useRef, type RefObject } from 'react';

/**
 * Tracks whether an element is worth rendering right now: on screen, and in a
 * foreground tab.
 *
 * Returns a ref rather than state on purpose. These canvases build a WebGL
 * context inside a useEffect keyed on their props; if visibility were state, a
 * scroll past the element would change the dep and tear down/rebuild the whole
 * context. A ref lets the animation loop read the current value each frame
 * while the context is set up exactly once.
 */
export function useRenderGate(
  ref: RefObject<HTMLElement | null>,
  rootMargin = '200px'
) {
  const active = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let onScreen = true;
    const sync = () => {
      active.current = onScreen && !document.hidden;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin }
    );
    io.observe(el);
    document.addEventListener('visibilitychange', sync);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [ref, rootMargin]);

  return active;
}

/**
 * Frame limiter for background effects. Full 60fps buys nothing on a slow
 * drifting gradient, and halving the shader work leaves more headroom for
 * scroll and layout. Returns true when enough time has passed to draw.
 */
export function makeFrameLimiter(fps: number) {
  const interval = 1000 / fps;
  let last = 0;
  return (now: number) => {
    if (now - last < interval) return false;
    last = now;
    return true;
  };
}
