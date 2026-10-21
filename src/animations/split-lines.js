const MARCA = 'splitOriginal';

const escapar = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * Envuelve cada línea visual de un elemento en una máscara con overflow oculto.
 * Se recalcula al redimensionar porque las líneas dependen del ancho.
 */
export function splitLines(el) {
  if (!el.dataset[MARCA]) el.dataset[MARCA] = el.textContent.trim().replace(/\s+/g, ' ');

  const texto = el.dataset[MARCA];
  el.innerHTML = texto
    .split(' ')
    .map((palabra) => `<span class="word">${escapar(palabra)}</span>`)
    .join(' ');

  const palabras = [...el.querySelectorAll('.word')];
  const lineas = [];
  let actual = null;
  let topPrevio = null;

  for (const palabra of palabras) {
    const top = Math.round(palabra.offsetTop);
    if (top !== topPrevio) {
      actual = [];
      lineas.push(actual);
      topPrevio = top;
    }
    actual.push(palabra.textContent);
  }

  el.innerHTML = lineas
    .map(
      (linea) =>
        `<span class="line"><span class="line__inner">${escapar(linea.join(' '))}</span></span>`
    )
    // El salto separa las líneas al leer el texto ("tu negocio", no "tunegocio");
    // entre bloques no se renderiza.
    .join('\n');

  return [...el.querySelectorAll('.line__inner')];
}
