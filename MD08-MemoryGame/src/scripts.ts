import {cardColors,gameClicks,cardSymbols,gameTime,startingScore} from "./constants";

let cardContent = [];
let numOfMoves = 0;
let activeCard = NaN;
let cardsChosen: number[] = [];
let cardsIDChosen: number[] = [];
let cardsWon: number[] = [];
let clicks: number;
let timeLeft: number;
let scoreByTime: number;
let scoreByClicks: number;
let realScore = 0;
let cardObjs: Card[] = []
let isWin = false;
let lossReason: string;
let resultText: string;

const winText = `<b>Congratulations!<br>You activated extinguisher</b><br>and saved ${realScore} cash<br>in ${timeLeft} seconds<br>and ${clicks} clicks.`;
const lossText = `You've lost all of ${startingScore}!<br><b>Try again!</b>`;
const startText = `When you start the game, the self-destruction of the treasure safe will go off - the cash (a ${startingScore} in the paper) starts to burn. It is impossible for you to save all the money, but you can try to save some part.<br>In front of you will be the code panel of the fire extinguisher, in which 8 pairs of symbols are hidden. You must open all 16 symbols to activate the fire extinguishing system. The problem is that you only have ${gameTime} seconds or ${gameClicks} clicks at your disposal.<br>If one of these amounts expires, the money will be lost.<br><b>Good luck!</b>`;

// *** Data for card content

// List of card HTML elements to cycle through
let cards = document.querySelectorAll<HTMLDivElement>(".card");

// selector objects for Game start, Result, Game display, Game score
const startBtn = document.getElementById("start-button");
const resultDisplay = document.getElementById("result-display");
const gameGrid = document.getElementById("game-grid");
const scoreDisplay = document.getElementById("score-display");
const startTextBox = document.getElementById("start-text");
startTextBox.innerHTML = startText;

// Before the game element that hidden;
gameGrid.style.display = "none";
resultDisplay.style.display = "none";
scoreDisplay.style.display = "none";

// Game ---START--- button listener, action
startBtn.addEventListener("click", () => {
    //
    cards.forEach((div, i) => {
        div.removeAttribute("style");
        div.classList.add("card--back");
        div.classList.remove("card--front");
    });
    //
    document.querySelector("#clickDisplay").innerHTML = "Click cards!";
    //
    timeLeft = gameTime;
    cardObjs = [];
    clicks = 0;
    cardsWon = [];
    // Hiding results, start btn, instruction, 
    resultDisplay.style.display = "none";
    startBtn.style.display = "none";
    startTextBox.style.display = "none";
    // Showing game grid and score table
    gameGrid.style.display = "grid";
    scoreDisplay.style.display = "flex";
    scoreByTime = startingScore;
    scoreByClicks = startingScore;
    realScore = 0;
    clearChosen(); //Clears temp card values from prev session
    initiateCards(); //Calls card initiation
    startTimer(); //Starts timer
});

// Game OVER action

let resultStyleClass: string;
let resultStyleRemove: string;
function gameOver() {
    gameGrid.style.display = "none";
    if (isWin) {
        resultText = `<b>Congratulations!<br>You activated extinguisher</b><br>and saved ${realScore}<br>with ${timeLeft} seconds left<br>and ${clicks} clicks.`;
        resultStyleClass = "result-display--win";
        resultStyleRemove = "result-display--loss";
    } else {
        resultText = `You've lost all of ${startingScore}!<br>Because ${lossReason}<br><b>Try again!</b>`;
        resultStyleClass = "result-display--loss";
        resultStyleRemove = "result-display--win";
    }
    resultDisplay.classList.add(resultStyleClass);
    resultDisplay.classList.remove(resultStyleRemove);
    resultDisplay.innerHTML = resultText;
    resultDisplay.style.display = "flex";
    scoreDisplay.style.display = "none";
    startBtn.style.display = "inline-flex";
}

// - small function for clearing temp card selection
function clearChosen() {
    cardsChosen = [];
    cardsIDChosen = [];
}

// - extracted function for clearing changing attributes for card that turn back
function removeCardAttributes(i: number) {
    cardObjs[cardsIDChosen[i]].side = false;
    cards[cardsIDChosen[i]].removeAttribute("style");
    cards[cardsIDChosen[i]].classList.add("card--back");
    cards[cardsIDChosen[i]].classList.remove("card--front");
}

// - Checking match of chosen cards, acting.
function checkMatch() {
    console.log("Check for match");
    console.log(cardsIDChosen);
    if (cardsChosen[0] === cardsChosen[1]) { //Match
        cardsWon.push(cardsIDChosen[0], cardsIDChosen[1]);
        for (let i = 2; i < cardsChosen.length; i++) {
            removeCardAttributes(i)
        }
        clearChosen();
    } else { // dont't match
        for (let i = 0; i < cardsChosen.length; i++) {
            removeCardAttributes(i)
        }
        clearChosen();
    }
    if (cardsWon.length === cards.length) {
        isWin = true;
        stopTimer();
        gameOver();
    }
}

// -- Independent Card class for card objects;
class Card {
    private cardDiv: HTMLDivElement;
    public side: boolean;
    private symbol: number;

    constructor(cardDiv: HTMLDivElement, symbol: number) {
        this.side = false;
        this.symbol = symbol;
        this.cardDiv = cardDiv;
        this.cardDiv.innerHTML = "_"
        this.cardDiv.classList.remove("card--front");
        this.cardDiv.classList.add("card--back");
        this.cardDiv.addEventListener("click", this.reveal.bind(this));
    }

    reveal() {
        if (this.side != true) {
            clicks++;
            scoreByClicks -= Math.floor(startingScore / gameClicks);
            if (clicks === gameClicks) {
                isWin = false;
                lossReason = "All clicks used."
                stopTimer()
                gameOver();
            }
            document.querySelector("#clickDisplay").innerHTML = clicks + " clicks";
            this.side = true;
            this.cardDiv.classList.add("card--front");
            this.cardDiv.classList.remove("card--back");
            this.cardDiv.innerHTML = cardSymbols[this.symbol];
            this.cardDiv.style.backgroundColor = cardColors[this.symbol]
            // this.cardDiv.style.animationIterationCount = "1"
            cardsChosen.push(this.symbol);
            cardsIDChosen.push(+this.cardDiv.id.split("-")[1]);
            //
            if (cardsIDChosen[0] === cardsIDChosen[1]) {
                // cardsChosen = [];
                // cardsIDChosen = [];
                // this.side = false;
            } else if (cardsChosen.length === 2) {
                setTimeout(checkMatch, 500);
            }
        }
    }
}

// -- making shuffled array of symbol ID's - creating card class objects
const initiateCards = function () {
    let initArr: number[] = [];
    for (let i = 0; i < cards.length; i++) {
        initArr[i] = Math.floor(i / 2);
    }
    initArr.sort(() => 0.5 - Math.random())
    //
    cards.forEach((el, i) => {
        cardObjs.push(new Card(el, initArr[i]))
    })
}

let timer: NodeJS.Timeout;
let tenthsLeft = 0;
let isRunning = false;

const seconds = document.querySelector<HTMLSpanElement>('#seconds');
const tenths = document.querySelector<HTMLSpanElement>('#tenths');

function startTimer() {
    timer = setInterval(countdown, 100);
    isRunning = true;
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

function countdown() {
    if (timeLeft === 0 && tenthsLeft === 0) {
        lossReason = "Time's up!"
        isWin = false;
        gameOver();
        clearInterval(timer);
        isRunning = false;
        return;
    }

    if (tenthsLeft === 0) {
        timeLeft--;
        tenthsLeft = 9;
    } else {
        tenthsLeft--;
    }

    seconds.textContent = timeLeft.toString();
    tenths.textContent = tenthsLeft.toString() + " seconds";
    scoreByTime = Math.floor(scoreByTime - startingScore / (gameTime * 10));

    realScore = (scoreByClicks < scoreByTime) ? scoreByClicks : scoreByTime;

    document.querySelector("#pointsDisplay").innerHTML = "Cash " + realScore.toString();
}