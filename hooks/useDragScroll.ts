import { useEffect, type RefObject } from "react";

/** Lets a mouse user drag a horizontally scrollable element (touch / trackpad already scroll natively). */
export function useDragScroll(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.style.scrollSnapType = "none"; // snap would fight scrollLeft writes while dragging
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (dragging) el.style.scrollSnapType = "";
      dragging = false;
    };
    // A drag must not count as a click on a "+" button underneath the pointer.
    const onClickCapture = (e: MouseEvent) => {
      if (!moved) return;
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("click", onClickCapture, true);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("click", onClickCapture, true);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [ref]);
}
