import { siteConfig } from '../data/site';
import { gsap } from 'gsap';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const resets = new WeakMap<HTMLElement, () => void>();

export function resetProjectGallery(dialog: HTMLDialogElement) {
  const gallery = dialog.querySelector<HTMLElement>('[data-gallery]');
  if (gallery) resets.get(gallery)?.();
}

export function initProjectGalleries() {
  const events = new AbortController();
  const cleanups: (() => void)[] = [];
  document.querySelectorAll<HTMLElement>('[data-gallery]').forEach((gallery) => {
    const track = gallery.querySelector<HTMLElement>('.gallery-track');
    const slides = Array.from(gallery.querySelectorAll<HTMLElement>('.gallery-slide'));
    if (!track || !slides.length) return;
    const pickers = Array.from(gallery.querySelectorAll<HTMLButtonElement>('[data-gallery-index]'));
    const previous = gallery.querySelector<HTMLButtonElement>('[data-gallery-step="-1"]');
    const next = gallery.querySelector<HTMLButtonElement>('[data-gallery-step="1"]');
    const count = gallery.querySelector<HTMLElement>('.gallery-count');
    const caption = gallery.querySelector<HTMLElement>('[data-gallery-caption]');
    const note = gallery.querySelector<HTMLElement>('[data-gallery-note]');
    const dialog = gallery.closest('dialog');
    let selected = 0;
    let requested = 0;
    let scrollEnd = 0;
    let drag: { pointer: number; x: number; scroll: number } | undefined;
    let nativePointer: number | undefined;
    let animation: gsap.core.Tween | undefined;
    let width = track.clientWidth;

    const offset = (index: number) => slides[index].offsetLeft;
    const nearest = () => slides.reduce((best, _slide, index) =>
      Math.abs(offset(index) - track.scrollLeft) < Math.abs(offset(best) - track.scrollLeft) ? index : best, 0);
    const update = (index: number) => {
      selected = index;
      if (count) count.textContent = `${index + 1} / ${slides.length}`;
      const labels = slides[index].querySelectorAll('figcaption > span');
      if (caption) caption.textContent = labels[0]?.textContent ?? '';
      if (note) note.textContent = labels[1]?.textContent ?? '';
      previous?.setAttribute('aria-disabled', String(index === 0));
      next?.setAttribute('aria-disabled', String(index === slides.length - 1));
      pickers.forEach((picker, pickerIndex) => picker.setAttribute('aria-current', String(pickerIndex === index)));
    };
    const stopAnimation = () => {
      animation?.kill();
      animation = undefined;
      window.clearTimeout(scrollEnd);
    };
    const goTo = (index: number, immediate = false) => {
      stopAnimation();
      requested = Math.max(0, Math.min(slides.length - 1, index));
      const target = Math.min(offset(requested), track.scrollWidth - track.clientWidth);
      const distance = Math.abs(target - track.scrollLeft);
      if (distance < 1) { update(requested); return; }
      if (immediate || !siteConfig.motion || reducedMotion.matches) {
        track.scrollLeft = target;
        update(requested);
        return;
      }
      // One animation owns the scroll position. Interruptions start where it is now.
      const position = { left: track.scrollLeft };
      animation = gsap.to(position, {
        left: target, duration: Math.min(0.85, Math.max(0.35, distance / Math.max(1, track.clientWidth) * 0.65)), ease: 'power3.out',
        onUpdate: () => { track.scrollLeft = position.left; },
        onComplete: () => { animation = undefined; update(requested); },
      });
    };
    const settle = () => {
      window.clearTimeout(scrollEnd);
      scrollEnd = window.setTimeout(() => {
        if (!drag && nativePointer === undefined && !animation && dialog?.open) goTo(nearest());
      }, 160);
    };
    const reset = () => {
      stopAnimation();
      if (drag && track.hasPointerCapture(drag.pointer)) track.releasePointerCapture(drag.pointer);
      drag = undefined;
      nativePointer = undefined;
      track.classList.remove('is-dragging');
      goTo(0, true);
    };
    resets.set(gallery, reset);
    dialog?.addEventListener('close', reset, { signal: events.signal });

    gallery.addEventListener('click', (event) => {
      if (!(event.target instanceof Element)) return;
      const picker = event.target.closest<HTMLButtonElement>('[data-gallery-index]');
      const step = event.target.closest<HTMLButtonElement>('[data-gallery-step]');
      if (picker) goTo(Number(picker.dataset.galleryIndex));
      else if (step) goTo(requested + Number(step.dataset.galleryStep));
    }, { signal: events.signal });
    gallery.addEventListener('keydown', (event) => {
      const offsets: Record<string, number> = { ArrowLeft: requested - 1, ArrowRight: requested + 1, Home: 0, End: slides.length - 1 };
      if (!(event.key in offsets) || event.altKey || event.ctrlKey || event.metaKey) return;
      event.preventDefault();
      goTo(offsets[event.key]);
    }, { signal: events.signal });
    track.addEventListener('scroll', () => {
      const index = nearest();
      if (index !== selected) update(index);
      if (!animation && !drag && nativePointer === undefined) settle();
    }, { passive: true, signal: events.signal });
    track.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return;
      stopAnimation();
      requested = nearest();
      // Touch keeps native scrolling and inertia; settle only after it stops.
      if (event.pointerType !== 'mouse') { nativePointer = event.pointerId; return; }
      event.preventDefault();
      drag = { pointer: event.pointerId, x: event.clientX, scroll: track.scrollLeft };
      track.classList.add('is-dragging');
      track.setPointerCapture(event.pointerId);
    }, { signal: events.signal });
    track.addEventListener('pointermove', (event) => {
      if (drag?.pointer !== event.pointerId) return;
      track.scrollLeft = drag.scroll + drag.x - event.clientX;
    }, { signal: events.signal });
    const endDrag = (event: PointerEvent) => {
      if (nativePointer === event.pointerId) { nativePointer = undefined; settle(); return; }
      if (drag?.pointer !== event.pointerId) return;
      drag = undefined;
      if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
      track.classList.remove('is-dragging');
      goTo(nearest());
    };
    track.addEventListener('pointerup', endDrag, { signal: events.signal });
    track.addEventListener('pointercancel', endDrag, { signal: events.signal });
    track.addEventListener('lostpointercapture', endDrag, { signal: events.signal });
    track.addEventListener('wheel', () => {
      stopAnimation();
      requested = nearest();
      settle();
    }, { passive: true, signal: events.signal });
    const observer = new ResizeObserver(() => {
      const nextWidth = track.clientWidth;
      if (nextWidth === width) return;
      width = nextWidth;
      if (width > 0 && dialog?.open && !drag && nativePointer === undefined) goTo(animation ? requested : selected, true);
    });
    observer.observe(track);
    const preferenceChanged = () => { if (reducedMotion.matches && animation) goTo(requested, true); };
    reducedMotion.addEventListener('change', preferenceChanged, { signal: events.signal });
    cleanups.push(() => { stopAnimation(); observer.disconnect(); resets.delete(gallery); });
  });
  return () => { events.abort(); cleanups.forEach((cleanup) => cleanup()); };
}
