const newGame = document.querySelector('.ng');
const btnRollDice = document.querySelector('.rd');
const holdDice = document.querySelector('.hd');
const dice = document.querySelector('.dice');

let currPlayer = 0;
let currScore = 0;
let scores = [0,0];
let gameOn = true;
const rollDice = function(){
    return Math.floor(Math.random()*6) +1;
} 

const updateCurrScore = function(cplayer,cscore){
    document.getElementById('cs'+cplayer).textContent = cscore;
}

const updateTotalScore = function(cplayer,score){
    document.getElementById('s'+cplayer).textContent = score;
}

const switchPlayer = function(){
    currScore = 0;
    updateCurrScore(currPlayer,currScore);
    document.getElementById('card'+currPlayer).classList.remove('playercard-active');
    currPlayer = (currPlayer+1)%2;
    document.getElementById('card'+currPlayer).classList.add('playercard-active');
}

btnRollDice.addEventListener('click', function(){
    if(gameOn){
        const dicenum = rollDice();

        dice.classList.remove('hidden');
        dice.src = `images/dice-${dicenum}.png`;
        if(dicenum != 1){
            currScore += dicenum;
            updateCurrScore(currPlayer,currScore);
        }
        else{
            switchPlayer();
        }
    }
})

holdDice.addEventListener('click',function(){
    if(gameOn){
        scores[currPlayer] += currScore;
        updateTotalScore(currPlayer,scores[currPlayer]);
        if(scores[currPlayer]>=100){
            gameOn = false;
            document.getElementById('card'+currPlayer).classList.add('winner');
            dice.classList.add('hidden');
        }
        else
            switchPlayer();
    }
})

newGame.addEventListener('click', function(){
    document.getElementById('card'+currPlayer).classList.remove('winner');
    currPlayer = 0;
    currScore = 0;
    document.getElementById('card1').classList.remove('playercard-active');
    document.getElementById('card0').classList.add('playercard-active');
    scores[0] = 0;
    scores[1] = 0;
    gameOn = true;
    updateCurrScore(0,0);
    updateCurrScore(1,0);
    updateTotalScore(0,0);
    updateTotalScore(1,0);
});
