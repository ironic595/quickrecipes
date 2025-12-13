// Función para leer el archivo CSV
function leerCSV(nombreArchivo) {
  return new Promise((resolve, reject) => {
    fetch(nombreArchivo)
      .then(response => response.text())
      .then(data => {
        const filas = data.split('\n');
        const columnas = filas[0].split(',');
        const datos = [];

        for (let i = 1; i < filas.length; i++) {
          if (filas[i]) {
            const fila = filas[i].split(',');
            const objeto = {};

            for (let j = 0; j < columnas.length; j++) {
              objeto[columnas[j]] = fila[j];
            }

            datos.push(objeto);
          }
        }

        resolve(datos);
      })
      .catch(error => reject(error));
  });
}

// Función para crear el CSS y HTML
function crearElementos(datos, categoria) {
  let css = '';
  let html = '';

  datos.forEach(dato => {
    if (dato.categoria === categoria) {
    css += `.card-img[data-category="${dato['titulo']}"] { background-image: url('images/${dato['fotolink']}'); }\n`;
html += `<A href='${dato['link']}'><div class='card'><div class='card-img' data-category="${dato['titulo']}"></div><div class='card-content'><div class='card-title'>${dato['titulo']}</div></div></div></A>\n`;
    }
  });

  const estilo = document.createElement('style');
  estilo.innerHTML = css;
  document.head.appendChild(estilo);

  const contenedor = document.getElementById('recetas-carousel');
  contenedor.innerHTML = html;
}

// Función principal
async function main() {
  const titulo = document.title.replace(/<title>|<\/title>/g, '');
  const datos = await leerCSV('FILE_NAME.csv');
  crearElementos(datos, titulo);
}

document.addEventListener('DOMContentLoaded', main);
