// Obtener el título de la página
const title = document.title;

// Función para obtener el contenido del archivo count.csv
async function getCountCSV() {
  try {
    const response = await fetch('/count.csv');
    const csv = await response.text();
    const rows = csv.split('\n').map(row => row.split(','));
    return rows;
  } catch (error) {
    console.error('Error al obtener el archivo count.csv:', error);
    return [];
  }
}

// Función para actualizar la vista
async function updateView() {
  const rows = await getCountCSV();
  const titleRow = rows.find(row => row[0] === title);

  if (titleRow) {
    let visitas = parseInt(titleRow[1]);
    visitas++;
    titleRow[1] = visitas.toString();

    // Actualizar el archivo count.csv
    const csv = rows.map(row => row.join(',')).join('\n');
    try {
      await fetch('/count.csv', {
        method: 'PUT',
        headers: {
          'Content-Type': 'text/csv',
        },
        body: csv,
      });
    } catch (error) {
      console.error('Error al actualizar el archivo count.csv:', error);
    }

    // Actualizar el elemento "i" con clase "numviews"
    const numViewsElement = document.querySelector('i.numviews');
    if (numViewsElement) {
      numViewsElement.textContent = visitas.toString();
    }
  }
}

// Lllamar a la función updateView al cargar la página
document.addEventListener('DOMContentLoaded', updateView);