'use strict';

// funzione per la validazione del form di login
function testaPassword() {
    const pwInput = document.getElementById('pwd');
    const pw = pwInput.value;
    
    if(document.getElementById('errore')){
        let checkErrore = document.getElementById('errore');
        checkErrore.remove();
    }
    
    const genitore = document.getElementsByClassName('password')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1rem';
    nuovoP.style.textAlign = 'center';

    if (pw.length < 8) {
        nuovoP.textContent = 'La password deve contenere almeno 8 caratteri';
    }
    else if (pw.length > 20) {
        nuovoP.textContent = 'La password deve contenere al massimo 20 caratteri';
    }
    else if (!/[a-z]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno una lettera minuscola';
    }
    else if (!/[A-Z]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno una lettera maiuscola';
    }
    else if (!/[0-9]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno un numero';
    }
    else if (!/[^a-zA-Z0-9]/.test(pw)) {
        nuovoP.textContent = 'La password deve contenere almeno un carattere speciale';
    }
    if (/[ ]/.test(pw)) {
        nuovoP.textContent = 'La password non deve contenere spazi';
    }

    if (nuovoP.textContent == '') {
        nuovoP.remove();
        pwInput.classList.remove('invalid');
    }
    else {
        nuovoP.id = 'errore';
        pwInput.classList.add('invalid');
        genitore.appendChild(nuovoP);
    }
}

function testaUsername() {
    const usernameInput = document.getElementById('username');
    const username = usernameInput.value;
    
    if(document.getElementById('errore')){
        let checkErrore = document.getElementById('errore');
        checkErrore.remove();
    }

    const genitore = document.getElementsByClassName('username')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1rem';
    nuovoP.style.textAlign = 'center';

    if (username.length < 3) {
        nuovoP.textContent = 'Lo username deve contenere almeno 3 caratteri';
    }
    else if (username.length > 20) {
        nuovoP.textContent = 'Lo username deve contenere al massimo 20 caratteri';
    }
    else if (/[ ]/.test(username)) {
        nuovoP.textContent = 'Lo username non deve contenere spazi';
    }
    else if(!/^[a-zA-Z0-9_]+$/.test(username)) {
        nuovoP.textContent = 'Lo username deve contenere solo lettere, numeri e underscore';
    }

    if (nuovoP.textContent == '') {
        nuovoP.remove();
        usernameInput.classList.remove('invalid');
    }
    else {
        nuovoP.id = 'errore';
        usernameInput.classList.add('invalid');
        genitore.appendChild(nuovoP);
    }
}

function testaRisposta() {
    const rispostaInput = document.getElementById('risposta');
    const risposta = rispostaInput.value;

    if(document.getElementById('errore')){
        let checkErrore = document.getElementById('errore');
        checkErrore.remove();
    }

    const genitore = document.getElementsByClassName('risposta')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1rem';
    nuovoP.style.textAlign = 'center';

    if (risposta.length < 3) {
        nuovoP.textContent = 'La risposta deve contenere almeno 3 caratteri';
    }
    else if (risposta.length > 30) {
        nuovoP.textContent = 'La risposta deve contenere al massimo 20 caratteri';
    }

    if (nuovoP.textContent == '') {
        nuovoP.remove();
        rispostaInput.classList.remove('invalid');
    }
    else {
        nuovoP.id = 'errore';
        rispostaInput.classList.add('invalid');
        genitore.appendChild(nuovoP);
    }
}

function testaMail() {
    const mailInput = document.getElementById('mail');
    const mail = mailInput.value;
    
    if(document.getElementById('errore')){
        let checkErrore = document.getElementById('errore');
        checkErrore.remove();
    }

    const genitore = document.getElementsByClassName('mail')[0];
    const nuovoP = document.createElement('p');
    nuovoP.style.fontSize = '1rem';
    nuovoP.style.textAlign = 'center';

    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(mail)) {
        nuovoP.textContent = 'Inserire una mail valida';
    }
    else if (mail.length < 6) {
        nuovoP.textContent = 'La mail deve contenere almeno 6 caratteri';
    }
    else if (mail.length > 30) {
        nuovoP.textContent = 'La mail deve contenere al massimo 30 caratteri';
    }
    
    if (nuovoP.textContent == '') {
        nuovoP.remove();
        mailInput.classList.remove('invalid');
    }
    else {
        nuovoP.id = 'errore';
        mailInput.classList.add('invalid');
        genitore.appendChild(nuovoP);
    }
}

const testPW = document.getElementById('pwd');
if (testPW != null)
    testPW.addEventListener('change', testaPassword);

const testUsername = document.getElementById('username');
if (testUsername != null)
    testUsername.addEventListener('change', testaUsername);

const testDomanda = document.getElementById('risposta');
if (testDomanda != null)
    testDomanda.addEventListener('change', testaRisposta);

const testMail = document.getElementById('mail');
if (testMail != null)
    testMail.addEventListener('change', testaMail);

document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('username') !== null) {
        alert('Sei già loggato');
        window.location.href = '../html/index.html';
    }
})