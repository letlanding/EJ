import './styles/index.css';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll } from './scroll.js';
import { initLoader } from './animations/loader.js';
import { initHero } from './animations/hero.js';
import { initMarquee } from './animations/marquee.js';
import { initReveal } from './animations/reveal.js';
import { initParallax } from './animations/parallax.js';

initScroll();

// Arranca ya: si esperara a las fuentes, la pantalla de carga duraría de más.
const carga = initLoader();

// Las medidas de línea y las posiciones de scroll dependen de la tipografía ya cargada.
document.fonts.ready.then(() => {
  initMarquee();
  initReveal();
  initParallax();
  ScrollTrigger.refresh();
});

Promise.all([carga, document.fonts.ready]).then(initHero);
