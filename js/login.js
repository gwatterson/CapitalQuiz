'use strict';
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;
    const myJSON = { username: username, password: password };
    
    fetch('../php/login.php', {
        method: 'POST',
        body: JSON.stringify(myJSON),
        headers: {
            'Content-Type': 'application/json'
        }
    })

        .then(response => {
            if (response.ok) {
                console.log('Richiesta di login al server effettuata con successo');
                return response.json();
            }
            else {
                console.log('Errore nella richiesta di login al server');
            }
        })
    .then(data => {
        if (data.stato) {
            // Login riuscito, reindirizza alla pagina di successo
            sessionStorage.setItem('username', username);
            window.location.href = '../html/index.html';
        } else {
            // Login fallito, mostra un messaggio di errore sulla pagina di login
            const errore = document.getElementById('errore-login');
            errore.textContent = data.messaggio;
            const recupera = document.getElementById('recupera');
            recupera.textContent = 'Recupera password';
            recupera.href = '../html/recupero.html';
            recupera.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Errore durante la richiesta: ' + error);
    });
});