document.getElementById('share-button').onclick = function() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('URL copiada: ' + url);
        }).catch(err => {
            alert('Error al copiar la URL: ', err);
        });
    };
