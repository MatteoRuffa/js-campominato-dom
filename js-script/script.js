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
        const bombs = [];   //contiene numeri da 1 a 100 (max 16), non puo avere numeri uguali, deve sostituire i numeri i bg rosso ai numeri degli square
        
        // genwro una funzione per creare numeri casuali che successivamente mettero con un cilco dentro bombs 
        function generateUniqueRandomNumber(min, max, bombs) {
            let isFound = false;
            let randomNumber;
                            
            while( !isFound) {
            randomNumber =  getRndInteger(min, max)
                            
                if (bombs.includes(randomNumber) === false) {
                    isFound = true;
                }
            }
            return randomNumber;
        }

        //faccio un ciclo per generae 16 bombe
        for (let i = 0; i < 16; i++) {
            let bomb = generateUniqueRandomNumber (1, n, bombs);
            bombs.push(bomb);
        }
        console.log(bombs);

        //prova
        let isClicked = false;

        //ok abbiamo generato le 16 bombe, adeso dobbiamo metterle "dentro gli square e far si che si colorino di rosso"
        for ( let i = 0; i < n; i++) {
            const square = generateSquare(i + 1);
            elBigSquare.appendChild(square);

            square.addEventListener('click', function(){
                //prova
                if (isClicked) {
                    return;
                }
                //provo ad aggiungere un riconoscitore di classi per far si che se uno square e gia stato cliccato 
                //(e quindi ha .clicked non si possa piu ricliccare)
                if (square.classList.contains('clicked')) {
                     return;
                }

                //trovare un modo per far si che se clicco su una bomba mi visualizzi tutte le altre e fermi il gioco!
                if (bombs.includes(i + 1)) {
                    square.classList.add('bg-danger');
                    console.log(`Hai cliccato la cella numero: ${i + 1}, che sfiga c'è una bomba!`);
                    isClicked = true;
            
                    //visualizzo tutte le altre bombe
                    const allSquares = document.querySelectorAll('.box');
                    for (let x = 0; x < bombs.length; x++) {
                        let bomb = bombs[x];
                        if (allSquares[bomb - 1]) {
                            allSquares[bomb - 1].classList.add('bg-danger');
                        }
                    }


                } else {
                //far si che scriva in basso il punteggio(vedi commento sotto)
                    square.classList.add('bg-success', 'clicked');
                    console.log(`Hai cliccato la cella numero: ${i + 1}`);
                }

                //provo a 'definire' numericmente tutti gli square con classe .clicked
                let selectSquare = document.querySelectorAll('.clicked');
                let score = selectSquare.length + 1;
                console.log(selectSquare);
                console.log(score);

                //a questo punto provo a creare un contenitore che mi stampi il risultato ogni volta
                document.getElementById('show-score').innerHTML = `Il tuo punteggio è: ${score} caselle`;

            }); 
        }
        

        //okei, ora dobbiamo far si che se user schiaccia casella con bomba --- game over(con punteggio precedente scritto), se no 
        // aggiunge in basso il punteggio in base alle caselle giuste gia cliccate!
        //inciso[cercare un modo per far si che user possa schiacciare una casella solo una volta!]
            //---!!!DONE!!!---
        //ok adesso devo aggiungere il punteggio scritto in basso! (che si sommi ad ogni click e in caso di bomba scriva una cosa 
        //differente con il punteggio fatto fino ad ora)
        newGame = true;
    }
});