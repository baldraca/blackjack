//
// My BlackJack game
// by Jonas Wennberg
//

// Declaring needed variables
// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two' ];

// DOM Variables
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');
let textArea = document.getElementById('text-area');

// Game variables
let gameStarted = false;
let gameOver = false;
let playerWon = false;
let gameDraw = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let cardDeck = [];

// Hiding game buttons before game starts
hitButton.style.display = 'none';
stayButton.style.display = 'none';

showStatus();

//Adding functionality to the New Game button
newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  gameDraw = false;
  
  cardDeck = createDeck();
  shuffleDeck(cardDeck);
  dealerCards = [ getNextCard(), getNextCard() ];
  playerCards = [ getNextCard(), getNextCard() ];
  
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display= 'inline';
  
  checkForEndOfGame();
  showStatus();
});

//Adding functionality for the Hit button
hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

//Adding functionality for the stay button
stayButton.addEventListener('click', function() {
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});


function createDeck() {
  let cardDeck = [];
  for (let suitIndex=0; suitIndex < suits.length; suitIndex++) {
    for (let valueIndex=0; valueIndex < values.length; valueIndex++) {
      let card = { suit: suits[suitIndex], value: values[valueIndex] };
      cardDeck.push(card);
    }
  }
  return cardDeck;
}

function shuffleDeck(cardDeck) {
 for (let i=0; i < cardDeck.length; i++) {
   let swapIndex = Math.trunc(Math.random() * cardDeck.length);
   let tmp = cardDeck[swapIndex];
   cardDeck[swapIndex] = cardDeck[i];
   cardDeck[i] = tmp;
 } 
}

function getNextCard(){
  return cardDeck.shift();
}

function getCardString(card) {
  return card.value + ' of ' + card.suit;
}

function checkForEndOfGame() {
  updateScores();
  
  if (gameOver) {
    while (dealerScore < playerScore && playerScore < 21 && dealerScore < 21 ) {
      dealerCards.push(getNextCard());
      updateScores();
    }
  }

  if (playerScore === 21 || dealerScore === 21) {
    playerWon = false;
    gameOver = true;
    gameDraw = false;
  }

  if (playerScore === dealerScore && gameOver) {
    gameDraw = true;
    playerWon = false;
  }
  
  if (playerScore > 21) {
    playerWon = false;
    gameDraw = false;
    gameOver = true;
  }
  
  if (dealerScore > 21) {
    playerWon = true;
    gameDraw = false;
    gameOver = true;
  }
  if (gameOver) {
    if (playerScore > dealerScore && playerScore <= 21) {
      playerWon = true;
      gameDraw = false;
    }
    else if (dealerScore > playerScore && dealerScore <= 21) {
      playerWon = false;
      gameDraw = false;
    }
    /*else {
      playerWon = false; 
      gameDraw = false;
    }*/
    
  }
  
}

function getCardNumericValue(card) {
  switch(card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value == 'Ace') {
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack';
    return;
  }
  
  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
  }
  
  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
  }
  
  updateScores();
  
  textArea.innerText =
    'Dealer has:\n' +
    dealerCardString +
    '(score: '+ dealerScore + ')\n\n' + 
    
    'Player has:\n' +
    playerCardString +
    '(score: '+ playerScore + ')\n\n';
  
 if (gameOver) {
   if (playerWon) {
     textArea.innerText += "YOU WIN";
   }
   else if (gameDraw) {
     textArea.innerText += "IT'S A DRAW!";
   }
   else{
     textArea.innerText += "DEALER WINS";
   }
   newGameButton.style.display = 'inline';
   hitButton.style.display = 'none';
   stayButton.style.display = 'none';
 }
}




