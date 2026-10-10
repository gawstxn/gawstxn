import { gsap } from 'gsap';
import { siteConfig } from '../data/site';

export function initToolkit() {
  const browser = document.querySelector<HTMLElement>('.toolkit-browser');
  if (!browser) return () => {};
  const selector = browser.querySelector<HTMLElement>('.toolkit-selector')!;
  const tabs = Array.from(browser.querySelectorAll<HTMLButtonElement>('[data-tool-tab]'));
  const panels = Array.from(browser.querySelectorAll<HTMLElement>('[data-tool-panel]'));
  const marker = browser.querySelector<HTMLElement>('.toolkit-marker')!;
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const controller = new AbortController();
  const { signal } = controller;
  let active = Math.max(0, tabs.findIndex((tab) => tab.textContent?.includes('Mobile')));
  let entrance: gsap.core.Tween | undefined;
  let markerMotion: gsap.core.Tween | undefined;
  const canAnimate = () => siteConfig.motion && !preference.matches;
  const tools = () => panels[active].querySelectorAll('.toolkit-panel-heading, .toolkit-tools li');

  function positionMarker(animate = false) {
    markerMotion?.kill();
    const position = { y: tabs[active].offsetTop, height: tabs[active].offsetHeight };
    if (animate && canAnimate()) markerMotion = gsap.to(marker, { ...position, duration: 0.5, ease: 'power3.out' });
    else gsap.set(marker, position);
  }

  function select(index: number, animate = true) {
    entrance?.kill();
    gsap.set(tools(), { clearProps: 'transform,opacity' });
    active = index;
    tabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === active)); tab.tabIndex = i === active ? 0 : -1; });
    panels.forEach((panel, i) => { panel.hidden = i !== active; });
    positionMarker(animate);
    if (animate && canAnimate()) entrance = gsap.fromTo(tools(), { y: 18, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.48, stagger: 0.055, ease: 'power3.out', clearProps: 'transform,opacity',
    });
  }

  browser.classList.add('is-enhanced');
  selector.setAttribute('role', 'tablist');
  selector.setAttribute('aria-orientation', 'vertical');
  tabs.forEach((tab, index) => {
    tab.setAttribute('role', 'tab');
    panels[index].setAttribute('role', 'tabpanel');
    panels[index].tabIndex = 0;
    tab.addEventListener('click', () => { if (active !== index) select(index); }, { signal });
    tab.addEventListener('keydown', (event) => {
      let next = index;
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = tabs.length - 1;
      else return;
      event.preventDefault();
      tabs[next].focus({ preventScroll: true });
      select(next);
    }, { signal });
  });
  select(active, false);
  const observer = new ResizeObserver(() => positionMarker());
  observer.observe(selector);
  preference.addEventListener('change', () => {
    if (!preference.matches) return;
    entrance?.kill();
    gsap.set(tools(), { clearProps: 'transform,opacity' });
    positionMarker();
  }, { signal });
  return () => {
    controller.abort();
    observer.disconnect();
    entrance?.kill();
    markerMotion?.kill();
  };
}
