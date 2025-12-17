'use strict';

const utenteDomanda = document.getElementById('username');
utenteDomanda.addEventListener('change', caricaDomandaRecupero);

function caricaDomandaRecupero() {
    const username = utenteDomanda.value;
    const domanda = document.getElementById('domanda-recupero');
    fetch('../php/domanda.php', {
        method: 'POST',
        body: JSON.stringify({ username: username }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Richiesta di caricamento della domanda personale al server effettuata con successo');
                return response.json();
            } 
            else {
                console.log('Errore nella richiesta di caricamento della domanda personale al server');
            }
        })
        .then(data => {
            if (data.stato) {
                switch (data.messaggio) {
                    case 'film':
                        domanda.textContent = 'Qual è il tuo film preferito?';
                        break;
                    case 'auto':
                        domanda.textContent = 'Qual è stata la tua prima auto?';
                        break;
                    case 'data':
                        domanda.textContent = 'Qual è una data importante per te?';
                        break;
                    default:
                        domanda.textContent = 'Errore nel caricamento della domanda personale';
                        break;
                }
            }
            else {
                console.log('Errore nel caricamento della domanda personale');
                domanda.textContent = data.messaggio;
            }
        })
        .catch(error => {
            console.error('Errore durante la richiesta: ' + error);
        });
}