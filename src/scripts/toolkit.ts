import { gsap } from 'gsap';
// Called within the shared reduced-motion context in motion.ts.
export function initToolkitScroll() {
  const section = document.querySelector<HTMLElement>('#toolkit');
  if (!section) return;
  gsap.fromTo(section.querySelector('.toolkit-map'), { '--toolkit-progress': 0 }, {
    '--toolkit-progress': 1, ease: 'none',
    scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
  });
  section.querySelectorAll<HTMLElement>('.toolkit-group').forEach((group) => {
    gsap.fromTo(group, { '--toolkit-rule': 0 }, {
      '--toolkit-rule': 1, ease: 'none',
      scrollTrigger: { trigger: group, start: 'top 95%', end: 'top 60%', scrub: 0.6 },
    });
    gsap.fromTo(group.querySelectorAll('.toolkit-terms li'), { y: 16 }, {
      y: 0, duration: 1, stagger: 0.05, ease: 'power2.out',
      scrollTrigger: { trigger: group, start: 'top 94%', end: 'top 60%', scrub: 0.65 },
    });
  });
}
