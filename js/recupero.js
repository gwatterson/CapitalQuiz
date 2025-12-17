const recuperaForm = document.getElementById('richiedi-recupero');
recuperaForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;
    const password2 = document.getElementById('pwd2').value;
    const risposta = document.getElementById('risposta-account').value;
    const myJSON = { username: username, password: password, password2: password2, risposta: risposta };

    if (password !== password2) {
        const errore = document.getElementById('errore-recupero');
        errore.textContent = 'Le password non coincidono';
        return;
    }

    fetch('../php/recupero.php', {
        method: 'POST',
        body: JSON.stringify(myJSON),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                console.log('Richiesta di recupero password al server effettuata con successo');
                return response.json();
            } else {
                console.log('Errore nella richiesta di recupero password al server');
            }
        })
        .then(data => {
            if (data.stato) {
                // Recupero riuscito, reindirizza alla pagina di successo
                alert(data.messaggio);
                window.location.href = '../html/login.html';
            }
            else {
                // Recupero fallito, mostra un messaggio di errore sulla pagina di login
                const errore = document.getElementById('errore-recupero');
                errore.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta: ' + error);
        });
});