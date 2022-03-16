import Deck from "./deck.js"

const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14
}
let count = 0;
let chances = 5;
let turn =0;
const computerCardSlot = document.querySelector(".computer-card-slot")
const playerCardSlot = document.querySelector(".player-card-slot")
const computerDeckElement = document.querySelector(".computer-deck")
const playerDeckElement = document.querySelector(".player-deck")
const profit = document.querySelector(".profit")
const text = document.getElementById("text")
const points = document.getElementById("points")
const name = document.getElementById("names")
const customers = document.getElementById("customers")
var amt =parseInt(prompt("Enter Your Bet Amount"))
const bet = document.getElementById("bet")
bet.value = amt; 

let playerDeck, computerDeck, inRound, stop

  document.addEventListener("click", () => {
    if (stop) {
      startGame()
      return
    }
  
    if(count<10){
      count++;
      if (inRound) {
        cleanBeforeRound()
      } else {
        flipCards()
      }
    }
    else{
      text.innerHTML = "Game Over!";

    }
  })
  points.innerHTML = "$" + amt ;


startGame()

function startGame() {
  const deck = new Deck()
  deck.shuffle()

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))
  inRound = false
  stop = false

  cleanBeforeRound()
}

function cleanBeforeRound() {
  inRound = false
  computerCardSlot.innerHTML = ""
  playerCardSlot.innerHTML = ""
  text.innerText = ""
  chance.innerHTML ="Remaining Chances : " + chances--;
  turn++;

  updateDeckCount()
}
var point = amt;
function flipCards() {
  inRound = true

  const playerCard = playerDeck.pop()
  const computerCard = computerDeck.pop()

  playerCardSlot.appendChild(playerCard.getHTML())
  computerCardSlot.appendChild(computerCard.getHTML())

  updateDeckCount()
  if (isRoundWinner(playerCard, computerCard)) {
    text.innerHTML = "Hooray! Y😀u Won!";
    point += amt/4;
    points.innerHTML = "$" + point;
    bet.value = "$ "+ amt + " --> " + "$ "+ point;
    customers.innerHTML += ` <tr>
      <td>${turn}</td>
      <td>${amt/4}</td>
      <td>0</td>
    </tr>`
    total.innerHTML = "Total Dollors : $ "+point;


    var currentuser = localStorage.getItem("carduser")
    let from = ""
    let to = ""
    let arr = JSON.parse(localStorage.getItem(currentuser))
    if(arr == null){
        let data =
            [{
               Date: new Date().toLocaleString('en-US'),
               bet: amt,
               amt: point
            }]
        ;
        localStorage.setItem(currentuser,JSON.stringify(data));
    }else{
        let data = 
            {
              Date: new Date().toLocaleString('en-US'),
              bet: amt,
              amt: point
            }
        ;
        arr.push(data);
        localStorage.setItem(currentuser,JSON.stringify(arr))
        arr.map(getFullName)
        function getFullName(item) {
            from = item.from
            to = item.to
          }   
      }

    if((point - amt)<0){
      var loss = (amt - point) 
      profit.innerHTML = "Your Loss => $ "+loss
      
    }
    else{
      profit.innerHTML = "Your Profit => $ "+(point - amt) 
    }
    playerDeck.push(playerCard)
    playerDeck.push(computerCard)
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Sorry Y😞u Lose!"
    point -= amt/5;
    points.innerHTML = "$" + point;
    bet.value = "$ "+ amt + " --> " + "$ "+ point;
    customers.innerHTML += ` <tr>
    <td>${turn}</td>
    <td>0</td>
    <td>${amt/5}</td>
  </tr>`
  total.innerHTML = "Total Dollors : $ "+point;
    computerDeck.push(playerCard)
    computerDeck.push(computerCard)
    if((point - amt)<0){
      var loss = (amt - point) 
      profit.innerHTML = "Your Loss => $ "+loss
    }
    else{
      profit.innerHTML = "Your Profit => $ "+(point - amt) 
    }
    
  } else {
    text.innerText = "Draw"
    customers.innerHTML += ` <tr>
    <td>${turn}</td>
    <td>Draw</td>
    <td>Draw</td>
    </tr>`

    playerDeck.push(playerCard)
    computerDeck.push(computerCard)
    
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!"
    stop = true
  } else if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!"
    stop = true
  }
}
function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards
  playerDeckElement.innerText = playerDeck.numberOfCards
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function isGameOver(deck) {
  return deck.numberOfCards === 0
}

function playSound() {
  var sound = document.getElementById("audio");
  sound.play();
}
function playSound_dig() {
  var sound_dig = document.getElementById("audio_dig");
  sound_dig.play();
}


var res = localStorage.getItem("carduser") 
var result = localStorage.getItem(res).split(',').toString().split('"')  // geting item from local dtorage// geting item from local dtorage
var profile = result[15]
var profileimg = document.querySelector(".user");
var image = new Image()
image.src = profile;
profileimg.appendChild(image)

name.innerHTML = "Welcome Back "+ res +" 🪙";


