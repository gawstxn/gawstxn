import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import Lenis from 'lenis';
import { siteConfig } from '../data/site';
import { initSectionScroll } from './section-motion';

gsap.registerPlugin(ScrollTrigger, Flip);

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
let lenis: Lenis | undefined;
let media: gsap.MatchMedia | undefined;
let layoutAnimation: gsap.core.Timeline | undefined;
let hasPlayedIntro = false;
let isEntering = false;
const dialogAnimations = new Map<HTMLDialogElement, gsap.core.Timeline>();
let menuAnimation: gsap.core.Timeline | undefined;
let menuNavigation: HTMLElement | undefined;
let menuIsOpen = false;

function settleMenuMotion() {
  menuAnimation?.kill();
  menuAnimation = undefined;
  if (!menuNavigation) return;
  gsap.set([menuNavigation, ...menuNavigation.querySelectorAll('.nav-link-label, .nav-footer')], { clearProps: 'opacity,visibility,transform,clipPath' });
  menuNavigation.classList.toggle('is-open', menuIsOpen);
  if (menuIsOpen) lenis?.stop();
  else if (!document.querySelector('dialog[open]')) lenis?.start();
}

export function animateMobileMenu(navigation: HTMLElement, open: boolean, immediate = false) {
  menuNavigation = navigation;
  menuIsOpen = open;
  if (open) lenis?.stop();
  else if (!document.querySelector('dialog[open]')) lenis?.start();
  if (immediate || !siteConfig.motion || motionPreference.matches) {
    settleMenuMotion();
    return;
  }
  if (!menuAnimation && !open) return;
  navigation.classList.add('is-open');
  if (!menuAnimation) {
    menuAnimation = gsap.timeline({ paused: true, onReverseComplete: () => { navigation.classList.remove('is-open'); if (!document.querySelector('dialog[open]')) lenis?.start(); } });
    menuAnimation.fromTo(navigation,
      { clipPath: 'inset(0% 0% 100% 0%)', autoAlpha: 1 },
      { clipPath: 'inset(0% 0% 0% 0%)', autoAlpha: 1, duration: 0.7, ease: 'expo.inOut' }, 0)
      .fromTo(navigation.querySelectorAll('.nav-link-label'), { yPercent: 115, rotation: 4 },
        { yPercent: 0, rotation: 0, duration: 0.65, stagger: 0.075, ease: 'power4.out' }, 0.18)
      .fromTo(navigation.querySelector('.nav-footer'), { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.45);
  }
  // Reversing the same timeline preserves continuity during rapid toggles.
  menuAnimation.timeScale(open ? 1 : 1.35);
  if (open) menuAnimation.play();
  else menuAnimation.reverse();
}

function playEntrance() {
  const overlay = document.querySelector<HTMLElement>('.intro-overlay');
  const shell = document.querySelector<HTMLElement>('.site-shell');
  const mark = document.querySelector<HTMLElement>('.intro-mark');
  const brandMark = document.querySelector<SVGElement>('.site-header .brand svg');
  const showCurtain = document.documentElement.classList.contains('intro-pending') && overlay && shell;
  isEntering = true;
  const finishIntro = () => {
    const introHadFocus = overlay?.contains(document.activeElement);
    document.documentElement.classList.remove('intro-pending');
    const restoration = document.documentElement.dataset.introScrollRestoration;
    if (restoration === 'auto' || restoration === 'manual') history.scrollRestoration = restoration;
    delete document.documentElement.dataset.introScrollRestoration;
    shell?.removeAttribute('inert');
    shell?.removeAttribute('data-intro-inert');
    if (introHadFocus) shell?.querySelector<HTMLAnchorElement>('.brand')?.focus({ preventScroll: true });
    if (!document.querySelector('dialog[open]')) lenis?.start();
  };
  const entrance = gsap.timeline({
    defaults: { ease: 'power4.out' },
    onComplete: () => { isEntering = false; finishIntro(); },
  });
  const skip = () => entrance.progress(1);
  const escape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && document.documentElement.classList.contains('intro-pending')) skip();
  };

  if (showCurtain) {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else {
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = previousBehavior;
    }
    shell.inert = true;
    shell.dataset.introInert = '';
    lenis?.stop();
    const markBounds = mark?.getBoundingClientRect();
    const path = mark?.querySelector<SVGPathElement>('path');
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      entrance.to(path, { strokeDashoffset: 0, duration: 0.85, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0);
    }
    entrance
      .from('.intro-mark', { rotation: -90, scale: 0.6, duration: 1.15 }, 0)
      .from('.intro-rule', { scaleX: 0, duration: 0.85, ease: 'expo.inOut' }, 0.1)
      .from('.intro-word i', { yPercent: 120, rotationX: -75, duration: 1, stagger: 0.045, ease: 'expo.out' }, 0.25)
      .from('.intro-caption, .intro-skip', { autoAlpha: 0, y: 10, duration: 0.55, stagger: 0.08 }, 0.4)
      .to('.intro-word i', { yPercent: -125, duration: 0.65, stagger: { each: 0.035, from: 'center' }, ease: 'power3.in' }, 1.35)
      .to('.intro-rule', { scaleX: 0, duration: 0.5, ease: 'power3.inOut' }, 1.55)
      .to('.intro-caption, .intro-skip', { autoAlpha: 0, y: -8, duration: 0.3 }, 1.7)
      .to('.intro-panel', { yPercent: -101, duration: 1.05, stagger: { each: 0.07, from: 'center' }, ease: 'expo.inOut' }, 1.75);
    if (mark && markBounds && brandMark) {
      entrance.to(mark, {
        x: () => { const target = brandMark.getBoundingClientRect(); return target.left + target.width / 2 - markBounds.left - markBounds.width / 2; },
        y: () => { const target = brandMark.getBoundingClientRect(); return target.top + target.height / 2 - markBounds.top - markBounds.height / 2; },
        scale: () => brandMark.getBoundingClientRect().width / markBounds.width,
        rotation: 180, duration: 1.15, ease: 'expo.inOut',
      }, 1.55).to(mark, { autoAlpha: 0, duration: 0.15 }, 2.7);
    }
    entrance.call(finishIntro, [], 3.02);
    document.querySelector('.intro-skip')?.addEventListener('click', skip);
    document.addEventListener('keydown', escape);
    window.addEventListener('resize', skip, { once: true });
  } else finishIntro();

  const start = showCurtain ? 2 : 0;
  document.querySelectorAll('.hero-line').forEach((line, index) => {
    entrance.from(line.querySelectorAll('.hero-character'), {
      yPercent: 115, rotationX: -65, duration: 1.15, stagger: 0.027, ease: 'expo.out', clearProps: 'transform',
    }, start + index * 0.13);
  });
  entrance
    .from('.site-header', { autoAlpha: 0, y: showCurtain ? 0 : -8, duration: 0.55, clearProps: 'opacity,visibility,transform' }, showCurtain ? 2.5 : 0.1)
    .from('.hero-intro', { autoAlpha: 0, y: 12, duration: 0.7, clearProps: 'opacity,visibility,transform' }, start + 0.15)
    .from('.hero-sign', { autoAlpha: 0, scale: 0.35, rotation: -90, duration: 1.1, ease: 'expo.out', clearProps: 'opacity,visibility,transform' }, start + 0.3)
    .from('.hero-bottom, .hero-rule', { autoAlpha: 0, y: 20, duration: 0.85, stagger: 0.1, clearProps: 'opacity,visibility,transform' }, start + 0.45);

  return () => {
    entrance.progress(1);
    finishIntro();
    isEntering = false;
    document.querySelector('.intro-skip')?.removeEventListener('click', skip);
    document.removeEventListener('keydown', escape);
    window.removeEventListener('resize', skip);
  };
}
function refreshLayout() {
  lenis?.resize();
  ScrollTrigger.refresh();
}

export function initMotion() {
  if (!siteConfig.motion) return;
  media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: no-preference)', () => {
    lenis = siteConfig.smoothScroll ? new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      syncTouch: false,
      autoRaf: false,
      anchors: false,
      prevent: (node) => node instanceof HTMLDialogElement,
    }) : undefined;
    if (document.querySelector('dialog[open]')) lenis?.stop();
    const scroll = lenis;
    const tick = (time: number) => scroll?.raf(time * 1000);
    scroll?.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const handleAnchor = (event: MouseEvent) => {
      if (!scroll) return;
      if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
      const target = document.getElementById(decodeURIComponent(anchor.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
      scroll.scrollTo(target.id === 'home' ? 0 : target, {
        duration: 1.15,
        immediate: anchor.classList.contains('skip-link'),
        onComplete: () => {
          const hadTabIndex = target.hasAttribute('tabindex');
          if (!hadTabIndex) target.tabIndex = -1;
          target.focus({ preventScroll: true });
          if (!hadTabIndex) target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        },
      });
    };
    document.addEventListener('click', handleAnchor);

    const cleanupEntrance = !hasPlayedIntro && (!location.hash || location.hash === '#home') ? playEntrance() : undefined;
    hasPlayedIntro = true;
    if (siteConfig.scrollSections) initSectionScroll();

    gsap.to('.scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: true },
    });

    document.querySelectorAll<HTMLElement>('.project-open').forEach((project) => {
      const shutters = project.querySelector<HTMLElement>('.project-shutters');
      if (!shutters) return;
      gsap.set(shutters, { display: 'grid' });
      gsap.to(shutters.children, {
        yPercent: -101, duration: 0.95, stagger: 0.055, ease: 'power4.inOut',
        scrollTrigger: { trigger: project, start: 'top 88%', once: true },
        onComplete: () => gsap.set(shutters, { clearProps: 'display' }),
      });
    });

    if (siteConfig.scrollRibbon) gsap.fromTo('.ribbon-track', { xPercent: -4 }, {
      xPercent: -19, ease: 'none', scrollTrigger: { trigger: '.motion-ribbon', start: 'top bottom', end: 'bottom top', scrub: 0.8 },
    });

    const contact = document.querySelector('.contact-title');
    if (contact) {
      const contactScene = gsap.timeline({
        scrollTrigger: { trigger: contact, start: 'top 92%', end: 'top 45%', scrub: 0.8 },
      });
      contactScene.fromTo(contact.querySelector('h2'),
        { clipPath: 'inset(0% 100% 0% 0%)', y: 28 },
        { clipPath: 'inset(0% 0% 0% 0%)', y: 0, ease: 'power2.out', duration: 1 }, 0)
        .fromTo(contact.querySelector('svg'), { rotation: -45, scale: 0.65 },
          { rotation: 0, scale: 1, ease: 'power2.out', duration: 1 }, 0.1);
    }

    return () => {
      cleanupEntrance?.();
      document.removeEventListener('click', handleAnchor);
      gsap.ticker.remove(tick);
      scroll?.destroy();
      lenis = undefined;
      layoutAnimation?.progress(1);
      dialogAnimations.forEach((animation) => animation.progress(1));
      dialogAnimations.clear();
      settleMenuMotion();
      document.querySelectorAll('.project-dialog, .dialog-inner, .project-dialog .project-visual').forEach((dialog) => {
        gsap.killTweensOf(dialog);
        gsap.set(dialog, { clearProps: 'opacity,transform' });
      });
      document.querySelectorAll<HTMLDialogElement>('dialog[data-closing]').forEach((dialog) => {
        delete dialog.dataset.closing;
        dialog.close();
      });
    };
  });

  media.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.to('.hero-line:first-child', { x: -32, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } });
    gsap.to('.hero-line-secondary', { x: 32, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } });
    gsap.fromTo('.hero-sign > svg', { rotation: 15 }, {
      rotation: 150, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 },
    });
  });

  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    if (!siteConfig.interactiveType) return;
    const title = document.querySelector<HTMLElement>('.hero-title');
    const sign = title?.querySelector<HTMLElement>('.hero-sign');
    if (!title || !sign) return;
    const letters = Array.from(title.querySelectorAll<HTMLElement>('.hero-character'));
    const waves = letters.map((letter) => gsap.quickTo(letter, 'y', { duration: 0.45, ease: 'power3.out' }));
    const signX = gsap.quickTo(sign, 'x', { duration: 0.8, ease: 'power3.out' });
    const signY = gsap.quickTo(sign, 'y', { duration: 0.8, ease: 'power3.out' });
    const move = (event: PointerEvent) => {
      if (isEntering) return;
      const bounds = title.getBoundingClientRect();
      signX((event.clientX - bounds.left - bounds.width / 2) / bounds.width * 32);
      signY((event.clientY - bounds.top - bounds.height / 2) / bounds.height * 24);
      letters.forEach((letter, index) => {
        const box = letter.getBoundingClientRect();
        const dx = (event.clientX - box.left - box.width / 2) / 95;
        const dy = (event.clientY - box.top - box.height / 2) / 110;
        waves[index](-16 * Math.exp(-dx * dx - dy * dy));
      });
    };
    const leave = () => { waves.forEach((wave) => wave(0)); signX(0); signY(0); };
    title.addEventListener('pointermove', move);
    title.addEventListener('pointerleave', leave);
    return () => {
      title.removeEventListener('pointermove', move);
      title.removeEventListener('pointerleave', leave);
      [...waves, signX, signY].forEach((setter) => setter.tween.kill());
      gsap.set([...letters, sign], { clearProps: 'transform' });
    };
  });

  media.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    if (!siteConfig.projectCursor) return;
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('.project-open').forEach((card) => {
      const cursor = card.querySelector<HTMLElement>('.project-cursor');
      if (!cursor) return;
      card.classList.add('has-project-cursor');
      const xTo = gsap.quickTo(cursor, 'x', { duration: 0.32, ease: 'power3.out' });
      const yTo = gsap.quickTo(cursor, 'y', { duration: 0.32, ease: 'power3.out' });
      const position = (event: PointerEvent, immediate = false) => {
        const bounds = card.getBoundingClientRect();
        const x = Math.max(42, Math.min(bounds.width - 42, event.clientX - bounds.left)) - 42;
        const y = Math.max(42, Math.min(bounds.height - 42, event.clientY - bounds.top)) - 42;
        if (immediate) gsap.set(cursor, { x, y });
        else { xTo(x); yTo(y); }
      };
      const enter = (event: PointerEvent) => {
        if (card.closest('.is-list')) return;
        position(event, true);
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.25, overwrite: 'auto' });
      };
      const move = (event: PointerEvent) => position(event);
      const leave = () => {
        gsap.to(cursor, { opacity: 0, scale: 0.65, duration: 0.2, overwrite: 'auto' });
      };
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      cleanups.push(() => {
        xTo.tween.kill();
        yTo.tween.kill();
        gsap.killTweensOf(cursor);
        gsap.set(cursor, { clearProps: 'opacity,transform' });
        card.classList.remove('has-project-cursor');
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
      });
    });
    return () => cleanups.forEach((cleanup) => cleanup());
  });

  document.fonts.ready.then(refreshLayout);
  document.querySelector<HTMLImageElement>('.portrait-image img')?.addEventListener('load', refreshLayout, { once: true });
}

export function animateProjectLayout(grid: HTMLElement | null, update: () => void) {
  if (!grid || !siteConfig.motion || motionPreference.matches) {
    update();
    refreshLayout();
    return;
  }
  layoutAnimation?.progress(1);
  const cards = Array.from(grid.querySelectorAll<HTMLElement>('.project-card'));
  const state = Flip.getState([grid, ...cards]);
  update();
  layoutAnimation = Flip.from(state, {
    duration: 0.7, ease: 'power3.inOut', absolute: cards, nested: true,
    onComplete: refreshLayout,
  });
}

function clearDialogMotion(dialog: HTMLDialogElement) {
  dialog.classList.remove('is-opening');
  gsap.set([dialog, ...dialog.querySelectorAll('.dialog-inner, .dialog-inner > *, .dialog-top, .dialog-category, .dialog-description, .dialog-title-word, .dialog-close')], { clearProps: 'opacity,visibility,transform,transformOrigin,clipPath' });
}

export function stopProjectMotion(dialog: HTMLDialogElement) {
  dialogAnimations.get(dialog)?.kill();
  dialogAnimations.delete(dialog);
  delete dialog.dataset.closing;
  clearDialogMotion(dialog);
}

export function openProjectMotion(dialog: HTMLDialogElement, direction?: number) {
  lenis?.stop();
  stopProjectMotion(dialog);
  if (!siteConfig.motion || motionPreference.matches) return;
  dialog.classList.add('is-opening');
  const opening = gsap.timeline({
    onComplete: () => { clearDialogMotion(dialog); dialogAnimations.delete(dialog); },
  });
  // Reveal the final layout from the top edge; a card-sized mask crops unrelated content.
  if (direction) {
    opening.fromTo(dialog.querySelector('.dialog-inner'), { x: direction * 48, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.65, ease: 'power4.out' }, 0);
  } else if (siteConfig.spatialProjects) {
    opening.fromTo(dialog, { clipPath: `inset(0px 0px ${dialog.clientHeight}px 0px round 0px)` },
      { clipPath: 'inset(0px 0px 0px 0px round 0px)', duration: 0.75, ease: 'power3.inOut' }, 0);
  } else opening.fromTo(dialog, { opacity: 0 }, { opacity: 1, duration: 0.45 }, 0);
  opening.fromTo(dialog.querySelectorAll('.dialog-title-word'), { yPercent: 115, rotation: 4 },
    { yPercent: 0, rotation: 0, duration: 0.6, stagger: 0.055, ease: 'power4.out' }, direction ? 0.06 : 0.12)
    .fromTo(dialog.querySelector('.dialog-top'), { opacity: 0 }, { opacity: 1, duration: 0.28 }, 0.05)
    .fromTo(dialog.querySelectorAll('.dialog-category, .dialog-description'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, stagger: 0.04 }, 0.12);
  dialogAnimations.set(dialog, opening);
}

export function resumePageScroll() {
  lenis?.start();
}

export function closeProjectMotion(dialog: HTMLDialogElement) {
  if (!dialog.open || dialog.dataset.closing === 'true') return;
  dialogAnimations.get(dialog)?.kill();
  if (!siteConfig.motion || motionPreference.matches) {
    stopProjectMotion(dialog);
    dialog.close();
    return;
  }
  dialog.dataset.closing = 'true';
  if (siteConfig.spatialProjects && getComputedStyle(dialog).clipPath === 'none') {
    gsap.set(dialog, { clipPath: 'inset(0px 0px 0px 0px round 0px)' });
  }
  const closing = gsap.timeline({
    onComplete: () => {
      dialog.close();
      delete dialog.dataset.closing;
      clearDialogMotion(dialog);
      dialogAnimations.delete(dialog);
    },
  });
  closing.to(dialog, siteConfig.spatialProjects
    ? { clipPath: `inset(0px 0px ${dialog.clientHeight}px 0px round 0px)`, duration: 0.6, ease: 'power3.inOut' }
    : { autoAlpha: 0, duration: 0.35 }, 0);
  dialogAnimations.set(dialog, closing);
}
function disposeMotion() {
  layoutAnimation?.progress(1);
  settleMenuMotion();
  media?.revert();
}

window.addEventListener('pagehide', (event) => {
  if (!event.persisted) disposeMotion();
});
if (import.meta.hot) import.meta.hot.dispose(disposeMotion);
