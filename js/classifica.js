document.addEventListener('DOMContentLoaded', function () {
    caricaClassifica('countdown');
    caricaClassifica('sopravvivenza');
    setPopup();
});

function caricaClassifica(modalita){
    fetch('../php/classifiche.php', {
        method: 'POST',
        body: JSON.stringify({
            modalita: modalita
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            console.log('Richiesta di caricamento delle classifiche al server effettuata con successo');
            return response.json();
        }
        else {
            console.log('Errore nella richiesta di caricamento delle classifiche al server');
        }
    })
    .then(data => {
        const salvate = document.getElementById('classifica-' + modalita);
        const table = document.createElement('table');
        table.id = 'tabella-' + modalita;
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        th1.textContent = 'Posizione';
        const th2 = document.createElement('th');
        th2.textContent = 'Username';
        const th3 = document.createElement('th');
        th3.textContent = 'Data Partita';
        const th4 = document.createElement('th');
        th4.textContent = 'Punteggio';
        tr.appendChild(th1);
        tr.appendChild(th2);
        tr.appendChild(th3);
        tr.appendChild(th4);
        thead.appendChild(tr);
        table.appendChild(thead);
        const tbody = document.createElement('tbody');
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement('tr');

            if(data.classifica[i].Username === sessionStorage.getItem('username')){
                tr.classList.add('loggato');
            }

            const td1 = document.createElement('td');
            gestisciPosizione(td1, data.classifica[i].Posizione);
            const td2 = document.createElement('td');
            td2.textContent = data.classifica[i].Username;
            const td3 = document.createElement('td');
            td3.textContent = data.classifica[i].Data;
            const td4 = document.createElement('td');
            td4.textContent = data.classifica[i].Punteggio;
            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        salvate.parentNode.replaceChild(table, salvate);
    })
    .catch(error => console.log(error));
}

function gestisciPosizione(cella, posizione) {
    const medaglia = document.createElement('span');
    cella.appendChild(medaglia);
    switch (posizione) {
        case '1':
            medaglia.classList.add('primo');
            medaglia.textContent = posizione;
            break;
        case '2':
            medaglia.classList.add('secondo');
            medaglia.textContent = posizione;
            break;
        case '3':
            medaglia.classList.add('terzo');
            medaglia.textContent = posizione;
            break;
        default:
            medaglia.textContent = posizione;
            break;
    }
}