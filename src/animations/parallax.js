import gsap from 'gsap';

/** Desplazamiento suave de las formas decorativas según el scroll. */
export function initParallax() {
  const formas = gsap.utils.toArray('[data-parallax]');
  if (formas.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const animaciones = formas.map((forma, i) => {
      // Amplitud distinta por forma para que no se muevan en bloque.
      const amplitud = 10 + (i % 3) * 5;

      return gsap.fromTo(
        forma,
        { yPercent: -amplitud },
        {
          yPercent: amplitud,
          ease: 'none',
          scrollTrigger: {
            trigger: forma.closest('.proyecto') ?? forma,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
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
