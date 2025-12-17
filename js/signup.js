const registrazioneForm = document.getElementById('signup-form');
registrazioneForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('pwd').value;
    const password2 = document.getElementById('pwd2').value;
    const mail = document.getElementById('mail').value;
    const domanda = document.getElementById('domanda').value;
    const risposta = document.getElementById('risposta').value;
    const myJSON = JSON.stringify({
        username: username,
        password: password,
        password2: password2,
        mail: mail,
        domanda: domanda,
        risposta: risposta
    });

    if (password !== password2) {
        const errore = document.getElementById('errore-signup');
        errore.textContent = 'Le password non coincidono';
        return;
    }

    fetch('../php/signup.php', {
        method: 'POST',
        body: myJSON,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                console.log('Errore nella richiesta di registrazione');
            }
        })
        .then(data => {
            console.log(data.stato); 
            if (data.stato) {
                // Registrazione riuscita, reindirizza alla pagina di successo
                alert(data.messaggio);
                console.log('Ok signup');
                window.location.href = '../html/login.html';
            } else {
                // Registrazione fallita, mostra un messaggio di errore sulla pagina di registrazione
                const errore = document.getElementById('errore-signup');
                console.log('Errore signup');
                errore.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta: ' + error);
        });
});
