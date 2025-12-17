'use strict';

var datiPartitaCorrente = [];
var rispostaCorretta = '';
var modalita = '';
var numRisposte = 0;
var partita;

function startQuiz(e) {
    modalita = e.target.value;
    numRisposte = 0;
    datiPartitaCorrente = parsedData;
    document.getElementById('quiz').classList.remove('hidden');
    document.getElementById('risultato').classList.add('hidden');
    document.getElementById('inizio').classList.add('hidden');

    // nasconde header e footer durante il quiz lasciando il loro spazio
    document.getElementById('header').classList.add('invisible');
    document.getElementById('footer').classList.add('invisible');

    if(document.getElementById('nuova')) { // rimuove il bottone di nuova partita se presente
        document.getElementById('nuova').remove();
    }
    if(document.getElementById('salva')) { // rimuove il bottone di salvataggio se presente
        document.getElementById('salva').remove();
    }

    switch(modalita){
        case 'countdown':
            setAvvioCountdown();
            partita = new partitaCountdown();
            break;
        case 'sopravvivenza':
            setAvvioSopravvivenza();
            partita = new partitaSopravvivenza();
            break;
        case 'impara':
            partita = new partitaImpara();
            break;
        default:
            alert('Modalità non riconosciuta');
            ripristinaQuiz();
            return;
    }
    nuovaDomanda();
}

function setAvvioCountdown() {
    const timerC = document.createElement('p');
    timerC.id = 'timer';
    timerC.textContent = '30';

    const bonusC = document.createElement('p');
    bonusC.id = 'bonus';

    document.getElementById('quiz').appendChild(bonusC);
    document.getElementById('quiz').appendChild(timerC);
}

function setAvvioSopravvivenza() {
    const timerS = document.createElement('p');
    timerS.id = 'timer';
    timerS.textContent = '10';

    const bonusS = document.createElement('p');
    bonusS.id = 'bonus';
    
    const vite = document.createElement('div');
    vite.id = 'vite';

    const vita1 = document.createElement('div');
    vita1.classList.add('vita');
    const vita2 = document.createElement('div');
    vita2.classList.add('vita');
    const vita3 = document.createElement('div');
    vita3.classList.add('vita');

    vite.appendChild(vita1);
    vite.appendChild(vita2);
    vite.appendChild(vita3);

    document.getElementById('quiz').appendChild(vite);
    document.getElementById('quiz').appendChild(bonusS);
    document.getElementById('quiz').appendChild(timerS);
}

function risposta(e){
    partita.risposta(e.target);
}

function nuovaDomanda() {
    if(datiPartitaCorrente.length === 0){
        datiPartitaCorrente = parsedData; // copia in datiPartitaCorrente il vettore di oggetti contenente le coppie stato-capitale
    }
    const numeroCasuale = () => Math.floor(Math.random() * datiPartitaCorrente.length);
    const domandaCasuale = datiPartitaCorrente[numeroCasuale()];
    rispostaCorretta = domandaCasuale.capitale;

    let risposte = [rispostaCorretta];
    while (risposte.length < 4) {
        let nuovaCapitale = datiPartitaCorrente[numeroCasuale()].capitale;
        if (!risposte.includes(nuovaCapitale)) {
            risposte.push(nuovaCapitale);
        }
    }

    // scambia la risposta corretta con una delle risposte sbagliate
    const indiceCorretta = Math.floor(Math.random() * 4);
    const temp = risposte[indiceCorretta];
    risposte[indiceCorretta] = risposte[0];
    risposte[0] = temp;

    document.getElementById('stato').textContent = 'Qual è la capitale di ' + domandaCasuale.stato + '?';

    document.getElementById('risposta1').textContent = risposte[0];
    document.getElementById('risposta2').textContent = risposte[1];
    document.getElementById('risposta3').textContent = risposte[2];
    document.getElementById('risposta4').textContent = risposte[3];

    // rimuove la domanda corrente dal vettore di oggetti contenente le coppie stato-capitale senza sostituirlo
    datiPartitaCorrente.splice(datiPartitaCorrente.indexOf(domandaCasuale), 1);
}

function bottoneNuova() {
    setTimeout(() => {
        const bottoneNuova = document.createElement('button');
        bottoneNuova.textContent = 'NUOVA PARTITA';
        bottoneNuova.addEventListener('click', setStatoIniziale);
        bottoneNuova.classList.add('navigazione');
        bottoneNuova.id = 'nuova';
        document.getElementById('risultato').appendChild(bottoneNuova);
    }, 500); // ritardo di 500ms per evitare click accidentali allo scadere del timer partita
}

function bottoneSalva() {
    setTimeout(() => {
        const bottoneSalva = document.createElement('button');
        bottoneSalva.textContent = 'SALVA PUNTEGGIO';
        bottoneSalva.addEventListener('click', partita.salvaPunteggio.bind(partita));
        bottoneSalva.classList.add('navigazione');
        bottoneSalva.id = 'salva';
        document.getElementById('risultato').appendChild(bottoneSalva);
    }, 500); // ritardo di 500ms per evitare click accidentali allo scadere del timer partita
}

function ripristinaQuiz() {
    document.getElementById('header').classList.remove('invisible');
    document.getElementById('footer').classList.remove('invisible');
    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('risultato').classList.remove('hidden');
}

function finePartita() {
    
    partita.finePartita();
    
}