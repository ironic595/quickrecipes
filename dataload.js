fetch('https://script.google.com/macros/s/AKfycby6cjKcusU4cWQCxpf3-IBVSDSRb9qwostLxtXzlUHyMdAElt0-Acha28JJjQNbLQ5V/exec')
            .then(response => response.json())
            .then(data => {
                const tituloPagina = document.title; // Título de la página
                const carousel = document.getElementById('carousel');

                // Filtrar las filas que coinciden con el título
                const filasCoincidentes = data.filter(fila => fila.titulo === tituloPagina);

                // Crear los divs para el carousel
                filasCoincidentes.forEach(fila => {
                    const card = document.createElement('div');
                    card.classList.add('card');

                    const imagen = document.createElement('img');
                    imagen.src = fila.imagenlink;
                    imagen.alt = fila.titulo;

                    const titulo = document.createElement('h3');
                    titulo.textContent = fila.titulo;

                    const categoria = document.createElement('p');
                    categoria.classList.add('categoria');
                    categoria.textContent = `Categoría: ${fila.categoria}`;

                    const link = document.createElement('a');
                    link.href = fila.link;
                    link.textContent = 'Ver receta';
                    link.target = '_blank'; // Abrir en nueva pestaña

                    // Añadir elementos al card
                    card.appendChild(imagen);
                    card.appendChild(titulo);
                    card.appendChild(categoria);
                    card.appendChild(link);

                    // Añadir card al carousel
                    carousel.appendChild(card);
                });
            })
            .catch(error => console.error('Error:', error));
