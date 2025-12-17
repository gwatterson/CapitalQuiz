'use strict';

document.addEventListener('DOMContentLoaded', inizializzaCuriosita);

var filePath = '../json/curiosita.json';
var parsedCuriosita = [];
var datiSessioneCorrente = [];
var curiositaCorrente = {
    citta: '',
    curiosita: ''
}

function parseJSONcuriosita() {
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            parsedCuriosita = Object.keys(data).map(citta => ({ // crea un vettore di oggetti contenente le coppie citta-curiosita
                citta: citta,
                curiosita: data[citta]
            }));
        })
        .catch(error => {
            console.error('Errore nel parsing del file JSON:', error);
        });
}

function setBottoniCuriosita(){
    const prossima = document.createElement('button');
    prossima.textContent = 'PROSSIMA';
    prossima.addEventListener('click', nuovaCuriosita);
    prossima.classList.add('b-curiosita');
    document.getElementsByClassName('corpo')[0].appendChild(prossima);
}

function nuovaCuriosita(){
    if(datiSessioneCorrente.length === 0){
        datiSessioneCorrente = parsedCuriosita; // copia in datiSessioneCorrente il vettore di oggetti contenente le coppie stato-capitale
    }
    const numeroCasuale = () => Math.floor(Math.random() * datiSessioneCorrente.length);
    const curiositaCasuale = datiSessioneCorrente[numeroCasuale()];

    console.log(curiositaCasuale);

    document.getElementById('capitale').textContent = curiositaCasuale.citta;
    document.getElementById('curiosita').textContent = curiositaCasuale.curiosita;

    curiositaCorrente.citta = curiositaCasuale.citta;
    curiositaCorrente.curiosita = curiositaCasuale.curiosita;

    // rimuove la curiosità corrente dal vettore della sessione corrente per non ripeterla
    datiSessioneCorrente.splice(datiSessioneCorrente.indexOf(curiositaCasuale), 1);
}

function inizializzaCuriosita(){
    parseJSONcuriosita();
    setBottoniCuriosita();
    setPopup();
    setTimeout(nuovaCuriosita, 250); // ritardo minimo per permettere il corretto caricamento del file JSON
}
