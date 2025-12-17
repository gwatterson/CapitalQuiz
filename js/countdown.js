'use strict';

class partitaCountdown{
    esatte;
    consecutive;
    errate;
    punteggio;
    tempoRimanente;
    timeoutID; // timeout per la fine della partita
    timerID; // interval per aggiornare il tempo rimanente
    bonusTimeoutID;

    constructor(){
        this.tempoRimanente = 30;
        this.timeoutID = setTimeout(this.finePartita.bind(this), 1000*(this.tempoRimanente + 1));
        this.timerID = setInterval(this.aggiornaTimer.bind(this), 1000);
        this.bonusTimeoutID = 0;
        this.esatte = 0;
        this.errate = 0;
        this.punteggio = 0;
        this.consecutive = 0;
    }

    aggiornaTimer() {
        document.getElementById('timer').textContent = --(this.tempoRimanente);
    }

    risposta(tastoPremuto){
        let rispostaUtente = tastoPremuto.textContent;
        if(rispostaUtente === rispostaCorretta){
            this.esatte++;
            this.consecutive++;
            this.gestisciBonus();
        }
        else{
            this.errate++;
            this.consecutive = 0;
        }
        numRisposte++;

        nuovaDomanda();
    }

    gestisciBonus() {
        if(this.consecutive == 10){
            this.tempoRimanente += 5;
            this.consecutive = 0;
            document.getElementById('bonus').innerHTML += "10 risposte consecutive corrette! Bonus tempo +5 secondi!<br>";
            clearTimeout(this.bonusTimerID);
            this.bonusTimeoutID = setTimeout(this.rimuoviBonus.bind(this), 5000);
            clearTimeout(this.timeoutID);
            this.timeoutID = setTimeout(this.finePartita.bind(this), 1000*(this.tempoRimanente));
            console.log('Bonus 10 consecutive');
        }

        if(this.esatte == 10){
            let bonusElement = document.getElementById('bonus');
            bonusElement.innerHTML += "10 risposte corrette! Bonus punteggio 10%!<br>";
            clearTimeout(this.bonusTimeoutID);
            this.bonusTimeoutID = setTimeout(this.rimuoviBonus.bind(this), 5000);
            console.log('Bonus 10 esatte');
        } else if(this.esatte == 20){
            let bonusElement = document.getElementById('bonus');
            bonusElement.innerHTML += "20 risposte corrette! Bonus punteggio 25%!<br>";
            clearTimeout(this.bonusTimeoutID);
            this.bonusTimeoutID = setTimeout(this.rimuoviBonus.bind(this), 5000);
            console.log('Bonus 20 esatte');
        } else if(this.esatte == 30){
            let bonusElement = document.getElementById('bonus');
            bonusElement.innerHTML += "30 risposte corrette! Bonus punteggio 50%!<br>";
            clearTimeout(this.bonusTimeoutID);
            this.bonusTimeoutID = setTimeout(this.rimuoviBonus.bind(this), 5000);
            console.log('Bonus 30 esatte');
        }
    }

    rimuoviBonus(){
        if(document.getElementById('bonus')){
            document.getElementById('bonus').innerHTML = "";
        }
    }

    calcolaPunteggio(){
        this.punteggio = this.esatte * 100;
        if(this.esatte >= 30){
            this.punteggio *= 1.50; // 50% bonus per aver risposto con una media > 1 risposta al secondo
        }
        else if(this.esatte >= 20){
            this.punteggio *= 1.25; // 25% bonus per aver risposto con una media > 1 risposta ogni 2 secondi
        }
        else if(this.esatte >= 10){
            this.punteggio *= 1.10; // 10% bonus per aver risposto con una media > 1 risposta ogni 3 secondi
        }
        
        this.punteggio -= this.errate * 50; // 50 punti di penalità per ogni risposta sbagliata
        if(this.punteggio < 0){
            this.punteggio = 0;
        }
        this.punteggio = Math.floor(this.punteggio);
    }

    salvaPunteggio() {
        fetch('../php/salva-punteggio.php', {
            method: 'POST',
            body: JSON.stringify({
                punteggio: this.punteggio,
                modalita: 'countdown'
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
                    recordCountdown = this.punteggio;
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
        clearInterval(this.timerID);
        clearTimeout(this.timeoutID);
        this.calcolaPunteggio();

        ripristinaQuiz();
        
        document.getElementById('timer').remove();
        document.getElementById('bonus').remove();

        document.getElementById('risultatoTesto').textContent = "Hai totalizzato " + this.punteggio + " punti con " + this.esatte + " risposte giuste e " + this.errate + " risposte sbagliate.";

        bottoneNuova();
        
        if(sessionStorage.getItem('username')){
            bottoneSalva();
            if(this.punteggio > recordCountdown){
                document.getElementById('risultatoTesto').innerHTML += "<br>Questo è il tuo nuovo record in questa modalità! Salva il punteggio per non perderlo!";
            }
        }
        else {
            document.getElementById('risultatoTesto').innerHTML += "<br>Accedi o registrati per salvare i punteggi e partecipare alla classifica!";
        }
    }
}