import gsap from 'gsap';

/** Rellena la fila con copias hasta cubrir dos veces el ancho visible. */
function rellenar(fila) {
  const original = fila.querySelector('.marquee__group');
  fila.replaceChildren(original);

  const anchoGrupo = original.getBoundingClientRect().width;
  if (!anchoGrupo) return 0;

  const copias = Math.max(1, Math.ceil(window.innerWidth / anchoGrupo));
  for (let i = 1; i < copias; i++) fila.appendChild(original.cloneNode(true));

  // Un segundo juego idéntico permite animar de 0 a -50% en bucle continuo.
  const juego = [...fila.children].map((n) => n.cloneNode(true));
  juego.forEach((n) => fila.appendChild(n));

  return copias * anchoGrupo;
}

export function initMarquee() {
  const filas = gsap.utils.toArray('[data-marquee]');
  if (filas.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add('(prefers-reduced-motion: no-preference)', () => {
    let animaciones = [];

    const construir = () => {
      animaciones.forEach((a) => a.kill());
      animaciones = filas.map((fila) => {
        const ancho = rellenar(fila);
        const velocidad = Number(fila.dataset.speed) || 30;
        const invertida = 'reverse' in fila.dataset;

        return gsap.fromTo(
          fila,
          { xPercent: invertida ? -50 : 0 },
          {
            xPercent: invertida ? 0 : -50,
            duration: ancho / velocidad,
            ease: 'none',
            repeat: -1,
          }
        );
      });
    };

    construir();

    // El número de copias depende del ancho de ventana: hay que rehacerlo.
    let pendiente;
    const alRedimensionar = () => {
      clearTimeout(pendiente);
      pendiente = setTimeout(construir, 200);
    };
    window.addEventListener('resize', alRedimensionar);

    return () => {
      clearTimeout(pendiente);
      window.removeEventListener('resize', alRedimensionar);
      animaciones.forEach((a) => a.kill());
    };
  });
}
