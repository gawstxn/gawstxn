import { initMotion, animateProjectLayout, animateMobileMenu, openProjectMotion, closeProjectMotion, stopProjectMotion, resumePageScroll } from './motion';
import { initProjectGalleries, resetProjectGallery } from './project-gallery';

const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const navigation = document.querySelector<HTMLElement>('#navigation');
const mobileMenuQuery = window.matchMedia('(max-width: 767px)');

function setMenuLock(open: boolean) {
  document.body.classList.toggle('menu-open', open);
  document.querySelectorAll<HTMLElement>('main, .site-footer').forEach((element) => { element.inert = open; });
}

function closeMenu(immediate = false) {
  setMenuLock(false);
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  if (navigation) {
    navigation.inert = mobileMenuQuery.matches;
    animateMobileMenu(navigation, false, immediate);
  }
}

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  setMenuLock(isOpen);
  if (navigation) {
    navigation.inert = !isOpen;
    animateMobileMenu(navigation, isOpen);
  }
});
navigation?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));
document.querySelector('.site-header .brand')?.addEventListener('click', () => closeMenu());
document.addEventListener('keydown', (event) => {
  if (event.key === 'Tab' && menuToggle?.getAttribute('aria-expanded') === 'true' && navigation) {
    const links = Array.from(navigation.querySelectorAll<HTMLAnchorElement>('a'));
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === menuToggle) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); menuToggle.focus(); }
  }
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuToggle.focus();
  }
});
mobileMenuQuery.addEventListener('change', () => closeMenu(true));
closeMenu(true);

const contactControl = document.querySelector<HTMLAnchorElement>('.nav-contact');
const contactController = new AbortController();
const contactPointerQuery = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)');
function positionContactFill(event: PointerEvent) {
  if (!contactControl || !contactPointerQuery.matches || event.pointerType === 'touch') return;
  const bounds = contactControl.getBoundingClientRect();
  const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
  const y = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));
  const radius = Math.hypot(Math.max(x, bounds.width - x), Math.max(y, bounds.height - y));
  contactControl.style.setProperty('--fill-x', `${x}px`);
  contactControl.style.setProperty('--fill-y', `${y}px`);
  contactControl.style.setProperty('--fill-size', `${radius * 2 + 2}px`);
}
contactControl?.addEventListener('pointerenter', positionContactFill, { signal: contactController.signal });
contactControl?.addEventListener('pointerleave', positionContactFill, { signal: contactController.signal });
contactControl?.addEventListener('focus', () => {
  if (!contactControl.matches(':focus-visible')) return;
  ['--fill-x', '--fill-y', '--fill-size'].forEach((property) => contactControl.style.removeProperty(property));
}, { signal: contactController.signal });
if (import.meta.hot) import.meta.hot.dispose(() => contactController.abort());

const grid = document.querySelector<HTMLElement>('#project-grid');
const viewButtons = document.querySelectorAll<HTMLButtonElement>('[data-view]');
viewButtons.forEach((button) => button.addEventListener('click', () => {
  if (button.getAttribute('aria-pressed') === 'true') return;
  animateProjectLayout(grid, () => grid?.classList.toggle('is-list', button.dataset.view === 'list'));
  viewButtons.forEach((viewButton) => viewButton.setAttribute('aria-pressed', String(viewButton === button)));
}));

const disposeGalleries = initProjectGalleries();
let activeDialog: HTMLDialogElement | undefined;
let projectFocus: HTMLButtonElement | null = null;

function showProject(dialog: HTMLDialogElement, direction?: number) {
  const previous = activeDialog;
  activeDialog = dialog;
  // Keep the page locked and the original focus target throughout project browsing.
  if (previous?.open) { stopProjectMotion(previous); previous.close(); }
  dialog.showModal();
  dialog.scrollTop = 0;
  resetProjectGallery(dialog);
  document.body.classList.add('dialog-open');
  openProjectMotion(dialog, direction);
}

// Delegate once so both card surfaces and their buttons open one dialog.
function handleProjectClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const target = event.target.closest<HTMLElement>('[data-project]');
  if (!target) return;
  const dialog = document.getElementById(`dialog-${target.dataset.project}`);
  if (!(dialog instanceof HTMLDialogElement) || dialog.open) return;
  projectFocus = target instanceof HTMLButtonElement ? target : target.querySelector<HTMLButtonElement>('.project-open');
  showProject(dialog);
}
document.addEventListener('click', handleProjectClick);
if (import.meta.hot) import.meta.hot.dispose(() => { document.removeEventListener('click', handleProjectClick); disposeGalleries(); });

document.querySelectorAll<HTMLDialogElement>('.project-dialog').forEach((dialog) => {
  dialog.addEventListener('close', () => {
    if (activeDialog !== dialog || dialog.open) return;
    stopProjectMotion(dialog);
    activeDialog = undefined;
    document.body.classList.remove('dialog-open');
    resumePageScroll();
    projectFocus?.focus({ preventScroll: true });
  });
  dialog.querySelectorAll<HTMLButtonElement>('[data-project-switch]').forEach((button) => button.addEventListener('click', () => {
    if (dialog.dataset.closing === 'true') return;
    const next = document.getElementById(`dialog-${button.dataset.projectSwitch}`);
    if (next instanceof HTMLDialogElement) showProject(next, Number(button.dataset.direction));
  }));
  dialog.querySelectorAll('.dialog-close').forEach((button) => button.addEventListener('click', () => closeProjectMotion(dialog)));
  dialog.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeProjectMotion(dialog);
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProjectMotion(dialog);
  });
});

function updateTime() {
  const time = document.querySelector<HTMLTimeElement>('#local-time');
  if (!time) return;
  const now = new Date();
  time.dateTime = now.toISOString();
  time.textContent = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
}
updateTime();
window.setInterval(updateTime, 60_000);
initMotion();
