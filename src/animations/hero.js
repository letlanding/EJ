import gsap from 'gsap';
import { splitLines } from './split-lines.js';

export function initHero() {
  const titulo = document.querySelector('.hero__title');
  if (!titulo) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const lineas = splitLines(titulo);
    const resto = document.querySelectorAll('.hero__eyebrow, .hero__sub, .hero .btn--lg, .hero__sticker');

    const tl = gsap.timeline();

    tl.from(lineas, {
      yPercent: 110,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
    }).from(
      resto,
      { y: 24, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1 },
      '-=0.5'
    );

    return () => tl.kill();
  });
}
