function logout() {
    sessionStorage.clear();
    window.location.href = '../php/logout.php';
    console.log('Logout effettuato');
}

function caricaRecord() {
    fetch('../php/record.php')
    .then(response => {
        if (response.ok) {
            console.log('Richiesta di caricamento dei record al server effettuata con successo');
            return response.json();
        }
        else {
            console.log('Errore nella richiesta di caricamento dei record al server');
        }
    })
    .then(data => {
        recordCountdown = data.recordCountdown;
        recordSopravvivenza = data.recordSopravvivenza;
        document.getElementById('p-record-cd').textContent = 'Record countdown: ' + data.recordCountdown;
        document.getElementById('p-record-sop').textContent = 'Record sopravvivenza: ' + data.recordSopravvivenza;
    });
}

function setPopup(){
    const imgUtente = document.getElementById('img-utente');

    if (sessionStorage.getItem('username')) {
        imgUtente.classList.remove('hidden');
        document.getElementById('p-username').textContent = sessionStorage.getItem('username');
    }

    const popup = document.getElementById('popup');

    // tasto X per chiudere il popup
    const esci = document.createElement('p');
    esci.textContent = 'X';
    esci.id = 'p-esci';
    esci.addEventListener('click', () => {
        popup.classList.add('hidden');
    });
    popup.appendChild(esci);

    // event sull'img per aprire/chiudere il popup
    imgUtente.addEventListener('click', () => {
        if(popup.classList.contains('hidden')) {
            popup.classList.remove('hidden');
            caricaRecord();
        } else {
            popup.classList.add('hidden');
        }
    });

    document.getElementById('p-logout').addEventListener('click', logout);
}