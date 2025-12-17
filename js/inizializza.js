'use strict';

document.addEventListener('DOMContentLoaded', inizializzaGioco);

var filePath = '../json/capitali.json';
var parsedData = [];
var recordCountdown = 0;
var recordSopravvivenza = 0;

function parseJSONcapitali() {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            parsedData = Object.keys(data).map(stato => ({
                stato: stato,
                capitale: data[stato]
            }));
        })
        .catch(error => {
            console.error('Errore nel parsing del file JSON:', error);
        });
}

function setStatoIniziale(){
    document.getElementById('inizio').classList.remove('hidden');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('risultato').classList.add('hidden');

    if(sessionStorage.getItem('username'))
        caricaRecord(); // carica i record di punteggio per l'utente loggato per segnalare quando si batte il record

    document.getElementById('countdown').addEventListener('click', startQuiz);
    document.getElementById('sopravvivenza').addEventListener('click', startQuiz);
    document.getElementById('impara').addEventListener('click', startQuiz);
    
    document.getElementById('risposta1').addEventListener('click', risposta);
    document.getElementById('risposta2').addEventListener('click', risposta);
    document.getElementById('risposta3').addEventListener('click', risposta);
    document.getElementById('risposta4').addEventListener('click', risposta);

    document.getElementById('stop').addEventListener('click', finePartita);
}

function inizializzaGioco(){
    parseJSONcapitali();
    setStatoIniziale();
    setPopup();
}

