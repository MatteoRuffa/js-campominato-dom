/*
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna 
copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi 
script e fogli di stile, per evitare problemi con l'inizializzazione di git).

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. 
Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle 
bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - 
abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. Altrimenti la cella 
cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo 
possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che 
l’utente ha cliccato su una cella che non era una bomba.
*/

const elButton = document.querySelector('.btn');

let newGame = false;

elButton.addEventListener('click', function(){

    if (newGame) {
        const elBigSquare = document.querySelector('.big-box');
        if (elBigSquare) {
            elBigSquare.remove();
        }
        newGame = false;
    } else {
        const elBigSquare = document.createElement("div");
        elBigSquare.classList.add('big-box');
        document.querySelector('.container').appendChild(elBigSquare);
    
        function generateSquare(content) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('box');
            newSquare.innerHTML = '<span>' + content + '</span>'; //rimuovere in seguito(che non compaia di default il numero nella casella)
            return newSquare;
        }
        let difficulty = document.getElementById('diff').value;
        console.log(difficulty);

        let n;
        if (difficulty == 1) {
            n = 100;
            document.documentElement.style.setProperty('--square-size', 'calc(100% / 10)');
        } else if (difficulty == 2) {
            n = 81;
            document.documentElement.style.setProperty('--square-size', 'calc(100% / 9)');
        } else if (difficulty == 3) {
            n = 49;
            document.documentElement.style.setProperty('--square-size', 'calc(100% / 7)');
        }

        // voglio generare 16 square casuali che gia esistono che colorero di rosso!
        const bombs = [];   //contiene numeri da 1 a 100 (max 16), non puo avere numeri uguali, 
                            //deve sostituire i numeri i bg rosso ai numeri degli square

        for ( let i = 0; i < n; i++) {
            const square = generateSquare(i + 1)
            elBigSquare.appendChild(square);

            square.addEventListener('click', function(){
                square.classList.add('bg-success');
                console.log(`Hai cliccato la cella numero: ${i + 1}`);


            }); 
        }
        newGame = true;
    }
});