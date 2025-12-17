'use strict';

class partitaImpara {
    numRisposte;
    intervalID;
    timerID;
    elementoCorretto;

    constructor() {
        this.numRisposte = 0;
        this.intervalID = null;
        this.timerID = null;
        this.elementoCorretto = null;
    }

    risposta(tastoPremuto) {
        let risposta = tastoPremuto.textContent;
        tastoPremuto.disabled = true;
        if (risposta === rispostaCorretta) {
            tastoPremuto.classList.add('corretta');
            this.elementoCorretto = tastoPremuto;
            this.timerID = setTimeout(this.fineLampeggia.bind(this), 2000);
            this.intervalID = setInterval(this.lampeggia.bind(this), 100);
            const prosegui = document.createElement('button');
            prosegui.id = 'prosegui';
            prosegui.classList.add('navigazione');
            prosegui.textContent = 'PROSEGUI';
            prosegui.addEventListener('click', this.prosegui.bind(this));
            document.getElementById('quiz').appendChild(prosegui);
            this.numRisposte++;
            for(let i = 1; i <= 4; i++){
                document.getElementById('risposta' + i).disabled = true;
            }
        } else {
            tastoPremuto.classList.add("errata");
        }
    }

    lampeggia() {
        if(this.elementoCorretto.classList.contains('corretta')){
            this.elementoCorretto.classList.remove('corretta');
        }
        else{
            this.elementoCorretto.classList.add('corretta');
        }
    }

    fineLampeggia() {
        clearInterval(this.intervalID);
        clearTimeout(this.timerID);
        if(!this.elementoCorretto.classList.contains('corretta')){
            this.elementoCorretto.classList.add('corretta');
        }
    }

    prosegui() {
        clearInterval(this.intervalID);
        clearTimeout(this.timerID);
        document.getElementById('quiz').removeChild(document.getElementById('prosegui'));
        for(let i = 1; i <= 4; i++){
            document.getElementById('risposta' + i).classList.remove('corretta', 'errata');
            document.getElementById('risposta' + i).disabled = false;
        }
        nuovaDomanda();
    }

    finePartita(){
        clearInterval(this.intervalID);
        clearTimeout(this.timerID);

        if(document.getElementById('prosegui')){
            document.getElementById('quiz').removeChild(document.getElementById('prosegui'));
        }
        for(let i = 1; i <= 4; i++){
            document.getElementById('risposta' + i).classList.remove('corretta', 'errata');
            document.getElementById('risposta' + i).disabled = false;
        }

        ripristinaQuiz();

        document.getElementById('risultatoTesto').textContent = "Hai imparato " + this.numRisposte + " nuove capitali!";

        bottoneNuova();
    }
}