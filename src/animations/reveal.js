import gsap from 'gsap';
import { splitLines } from './split-lines.js';

/** Revelados al entrar en pantalla: títulos por líneas, tarjetas en bloque. */
export function initReveal() {
  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const animaciones = [];

    gsap.utils.toArray('[data-reveal][data-split]').forEach((titulo) => {
      const lineas = splitLines(titulo);
      animaciones.push(
        gsap.from(lineas, {
          yPercent: 110,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.07,
          scrollTrigger: { trigger: titulo, start: 'top 85%' },
        })
      );
    });

    gsap.utils.toArray('[data-reveal]:not([data-split])').forEach((el) => {
      animaciones.push(
        gsap.from(el, {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%' },
        })
      );
    });

    return () => {
      animaciones.forEach((a) => {
        a.scrollTrigger?.kill();
        a.kill();
      });
    };
  });
}
