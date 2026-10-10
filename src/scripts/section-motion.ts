import { gsap } from 'gsap';

// These scenes stay tied to scroll position and reverse when scrolling back.
export function initSectionScroll() {
  document.querySelectorAll<HTMLElement>('[data-scroll-heading]').forEach((heading) => {
    gsap.fromTo(heading.querySelectorAll('.scroll-heading-inner'),
      { yPercent: 115, skewY: 5 },
      { yPercent: 0, skewY: 0, stagger: 0.12, ease: 'power2.out', scrollTrigger: { trigger: heading, start: 'top 92%', end: 'top 56%', scrub: 0.65 } },
    );
  });

  document.querySelectorAll<HTMLElement>('.section-note').forEach((note) => {
    gsap.fromTo(note, { '--note-rule': 0, x: 18 }, {
      '--note-rule': 1, x: 0, ease: 'none',
      scrollTrigger: { trigger: note, start: 'top 94%', end: 'top 60%', scrub: 0.6 },
    });
  });

  gsap.fromTo('.about-lead .reading-word', { color: '#858580' }, {
    color: '#eaeae5', stagger: 0.08, ease: 'none',
    scrollTrigger: { trigger: '.about-lead', start: 'top 80%', end: 'top 28%', scrub: 0.6 },
  });
  gsap.fromTo('.portrait-image', { clipPath: 'inset(18% 12% 18% 12% round 3px)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 3px)', ease: 'none',
    scrollTrigger: { trigger: '.portrait-image', start: 'top 88%', end: 'top 45%', scrub: 0.8 },
  });

  document.querySelectorAll<HTMLElement>('.journey-rail').forEach((rail) => {
    gsap.fromTo(rail, { '--journey-progress': 0 }, {
      '--journey-progress': 1, ease: 'none',
      scrollTrigger: { trigger: rail, start: 'top 75%', end: 'bottom 65%', scrub: 0.6 },
    });
  });
  document.querySelectorAll<HTMLElement>('.experience-entry').forEach((entry) => {
    const timeline = gsap.timeline({ scrollTrigger: { trigger: entry, start: 'top 90%', end: 'top 58%', scrub: 0.7 } });
    timeline.fromTo(entry, { '--entry-rule': 0 }, { '--entry-rule': 1, ease: 'none', duration: 1 }, 0)
      .fromTo(entry.querySelector('.experience-content'), { y: 18 }, { y: 0, duration: 0.8, ease: 'power2.out' }, 0.1);
  });

  document.querySelectorAll<HTMLElement>('.toolkit-browser').forEach((browser) => {
    gsap.fromTo(browser, { clipPath: 'inset(0% 0% 14% 0%)' }, {
      clipPath: 'inset(0% 0% 0% 0%)', ease: 'none',
      scrollTrigger: { trigger: browser, start: 'top 92%', end: 'top 45%', scrub: 0.65 },
    });
  });
}
