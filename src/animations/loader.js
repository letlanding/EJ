import gsap from 'gsap';

const DURACION_MAX = 1.2;

/** Oculta la pantalla de carga y resuelve cuando el hero puede entrar. */
export function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return Promise.resolve();

  const cerrar = () => loader.classList.add('loader--oculto');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cerrar();
    return Promise.resolve();
  }

  const logo = loader.querySelector('.loader__logo');

  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          cerrar();
          resolve();
        },
      })
      .fromTo(logo, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.5 })
      .to(logo, { opacity: 0, scale: 1.04, duration: 0.4 }, `+=${DURACION_MAX - 0.9}`)
      .to(loader, { opacity: 0, duration: 0.3 }, '<');
  });
}
