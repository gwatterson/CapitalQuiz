'use strict';

class partitaSopravvivenza {
    esatte;
    consecutive;
    vite;
    punteggio;
    timerID; // interval per aggiornare il tempo rimanente
    timeoutRispostaID; // timeout per la risposta
    timeoutID; // timeout di attesa dopo ogni riposta prima della successiva domanda
    intervalID; // interval per il lampeggio della risposta corretta
    tempoRimanente;
    elementoCorretto;
    numRisposte;

    constructor() {
        this.esatte = 0;
        this.consecutive = 0;
        this.vite = 3;
        this.punteggio = 0;
        this.numRisposte = 0;
        this.tempoRimanente = 10;
        this.timerID = setInterval(this.aggiornaTimer.bind(this), 1000);
        this.timeoutID = null;
        this.timeoutRispostaID = setTimeout(this.tempoRispostaScaduto.bind(this), 10000);
        this.intervalID = null;
        this.elementoCorretto = null;
    }

    risposta(tastoPremuto) {
        clearInterval(this.timerID);
        clearTimeout(this.timeoutRispostaID);

        let risposta = tastoPremuto.textContent;

        for(let i = 1; i <= 4; i++){
            document.getElementById('risposta' + i).disabled = true;
        }

        if (risposta === rispostaCorretta) {
            tastoPremuto.classList.add('corretta');
            this.elementoCorretto = tastoPremuto;
            this.intervalID = setInterval(this.lampeggia.bind(this), 100);
            this.esatte++;
            this.consecutive++;
            if(this.consecutive == 10 && this.vite < 3){
                this.aggiungiVita();
                this.consecutive = 0;
                document.getElementById('bonus').textContent = "10 risposte consecutive corrette! Bonus vita +1!";
            }
        } else {
            tastoPremuto.classList.add('errata');
            this.consecutive = 0;
            this.togliVita();
        }

        this.timeoutID = setTimeout(this.prosegui.bind(this), 2000);
    }

    aggiornaTimer() {
        document.getElementById('timer').textContent = --(this.tempoRimanente);
    }

    tempoRispostaScaduto() {
        clearTimeout(this.timeoutRispostaID);
        clearInterval(this.timerID);
        this.consecutive = 0;
        this.togliVita();
        this.prosegui();
    }

    togliVita() {
        this.vite--;
        const divVita = document.getElementsByClassName('vita')[this.vite];
        divVita.classList.add('persa');
    }

    aggiungiVita() {
        this.vite++;
        const divVita = document.getElementsByClassName('vita')[this.vite - 1];
        divVita.classList.remove('persa');
    }

    lampeggia() {
        if(this.elementoCorretto.classList.contains('corretta')){
            this.elementoCorretto.classList.remove('corretta');
        }
        else{
            this.elementoCorretto.classList.add('corretta');
        }
    }

    prosegui() {
        clearInterval(this.intervalID);
        clearTimeout(this.timeoutID);

        document.getElementById('bonus').textContent = '';

        this.tempoRimanente = 10;

        for(let i = 1; i <= 4; i++){
            document.getElementById('risposta' + i).classList.remove('corretta', 'errata');
            document.getElementById('risposta' + i).disabled = false;
        }
        
        if(this.vite === 0){
            this.finePartita();
            return;
        }

        this.timeoutRispostaID = setTimeout(this.tempoRispostaScaduto.bind(this), 10000);
        this.timerID = setInterval(this.aggiornaTimer.bind(this), 1000);

        nuovaDomanda();
    }

    calcolaPunteggio() {
        this.punteggio = this.esatte * 100;
    }

    salvaPunteggio() {
        fetch('../php/salva-punteggio.php', {
            method: 'POST',
            body: JSON.stringify({
                punteggio: this.punteggio,
                modalita: 'sopravvivenza'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Richiesta di salvataggio della partita terminata inoltrata correttamente al server');
                    return response.json();
                } else {
                    console.log('Errore nella richiesta di salvataggio della partita terminata al server');
                    throw new Error('Errore nella richiesta di salvataggio della partita terminata al server');
                }
            })
        .then(data => {
            if(data.stato) {
                alert('Punteggio salvato correttamente!');
                document.getElementById('salva').remove();
                if(data.nuovoRecord){
                    recordSopravvivenza = this.punteggio;
                }
            } else {
                alert(data.messaggio);
            }
        })
        .catch((error) => {
            console.log('Errore durante la richiesta: ' + error);
        });
    }

    finePartita(){
        clearInterval(this.intervalID);
        clearTimeout(this.timeoutID);
        clearInterval(this.timerID);
        clearTimeout(this.timeoutRispostaID);

        this.calcolaPunteggio();

        document.getElementById('timer').remove();
        document.getElementById('vite').remove();

        for(let i = 1; i <= 4; i++){
            document.getElementById('risposta' + i).classList.remove('corretta', 'errata');
            document.getElementById('risposta' + i).disabled = false;
        }

        ripristinaQuiz();

        document.getElementById('risultatoTesto').textContent = "";

        if(this.vite === 0){
            document.getElementById('risultatoTesto').textContent = "Vite esaurite! ";
        }

        document.getElementById('risultatoTesto').textContent += "Hai totalizzato " + this.punteggio + " punti con " + this.esatte + " risposte giuste!";

        bottoneNuova();

        if(sessionStorage.getItem('username')){
            bottoneSalva();
            if(this.punteggio > recordSopravvivenza){
                recordSopravvivenza = this.punteggio;
                document.getElementById('risultatoTesto').innerHTML += "<br>Questo è il tuo nuovo record in questa modalità! Salva il punteggio per non perderlo!";
            }
        }
        else {
            document.getElementById('risultatoTesto').innerHTML += "<br>Accedi o registrati per salvare i punteggi e partecipare alla classifica!";
        }
    }
}