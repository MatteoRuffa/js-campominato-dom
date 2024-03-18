/*
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio 
in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi 
livelli di difficoltà:
con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/


// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
{/* <div class="big-box"></div> */}

const elButton = document.querySelector('.btn');

// creo un (o una) flag per 'resettare' il layout di gioco
let newGame = false;

elButton.addEventListener('click', function(){

    // aggiungo un comando che se il bigbox esiste lo toglie e ricrea
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
    
        // genero 100 quadrati piu piccoli dentro il bigsquare
            // genro una funzione per creare i quadrati
        function generateSquare(content) {
            const newSquare = document.createElement('div');
            newSquare.classList.add('box');
            newSquare.innerHTML = '<span>' + content + '</span>';
            return newSquare;
        }
            // uso la funzione dentro un ciclo per definire il numero di quadrati che voglio
            let difficulty = document.getElementById('diff').value;
            console.log(difficulty);

        // creo la casistica delle tre difficolta con tre layout differenti e
        // provo a provare setPropriety() per vedere se in css cambio la taglia ei quadrati
        let n;
        if (difficulty == 1) {
            n = 100;
            document.documentElement.style.setProperty('--square-size', 'calc(100% / 10)');
            /*document= foglio html, .documentElement= proprietà oggetti document, .style= propietà 
            per cambiare stile di un el, .setProperty()= metodo per impostare prop css per un el*/
        } else if (difficulty == 2) {
            n = 81;
            document.documentElement.style.setProperty('--square-size', 'calc(100% / 9)');
        } else if (difficulty == 3) {
            n = 49;
            document.documentElement.style.setProperty('--square-size', 'calc(100% / 7)');
        }

        for ( let i = 0; i < n; i++) {
            const square = generateSquare(i + 1)
            elBigSquare.appendChild(square);

            // Quando l'utente clicca su ogni cella....
            square.addEventListener('click', function(){
                // la cella cliccata si colora di azzurro
                square.classList.toggle('bg-success');
                // ed emetto un messaggio in console con il numero della cella cliccata.
                console.log(`Hai cliccato la cella numero: ${i + 1}`);
            });
        }
        newGame = true;
    }
});