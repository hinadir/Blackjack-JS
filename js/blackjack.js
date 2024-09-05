// Lesson 08.03 - START
console.log("Hi from the blackjack js project file");
// Blackjack - Pt. 1: DEAL..!
// Review of Lesson 05.04: Making a deck of cards with a nested loop
// New for Lesson 08.03: Deal Blackjack on a timer with setInterval
// Keep score and display the score to the DOM
// Detect Blackjack (21) for the Player, the Dealer -- or both
// Prompt Player to Hit or Stand

// Review the code for making a deck of cards as array of objects

// 1. Given: Arrays for making and storing the cards:
const kinds = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace'];
const suits = ['Diamonds', 'Hearts', 'Spades', 'Clubs'];
const deck = [];

let holeCard = ""; // global variable for hole card file name
// hole card needs to be in global scope, since it is used by
// two diffent functions, namely deal() and stand()

// 2. Review: Set up a nested for loop that iterates over 
// the kinds and suits arrays:
kinds.forEach(k => {
    suits.forEach(s => {
        // make a card in all 4 suits for this kind: 2 of Diamonds, 2 of Hearts etc.
        // 4. Concatenate the card name and image file names:
        // - name "Queen of Diamonds" corresponds to file "Queen-of-Diamonds.png"
        // let name = `${k} of ${s}`;
        // let file = `${k}-of-${s}.png`;

        // 5. Declare a variable, valu, with an inital value of 0;
        // - valu is for storing the numeric value of the card
        // let valu = 0;

        // 6. Set the valu property based on the kind of card
        // - the length of the kind string reveals if it is a face card
        // as only "Jack", "Queen", "King" have more than 3 characters
        
        if(k == "Ace") {
            valu = 11;
        } else if(k.length >= 4) {
            valu = 10;
        } else {
            valu = k;
        }
        

        // ternary version of the above: an if-else if-else ternary
        // to not get confused, remember: just alternate ? : ? :
        // let valu = k == "Ace" ? 11 : k.length >= 4 ? 10 : k;

        // Review: Each card is an object with 5 properties:
        /* 
            - name: the name of the card: "Jack of Hearts"
            - file: the card file name: "Jack-of-Hearts.png"
            - kind: 2-10, 'Jack', 'Queen', 'King', 'Ace'
            - suit: 'Diamonds', 'Hearts', 'Spades', 'Clubs'
            - valu: numeric value; face card = 10, Ace = 11
        */

        // 7. Declare a card object with the 5properties, the values of which are
        // the 5 corresponding variables 
        const card = {
            name: `${k} of ${s}`,
            file: `${k}-of-${s}.png`,
            valu: valu,
            // valu: k == "Ace" ? 11 : k.length >= 4 ? 10 : k,
            kind: k,
            suit: s,
        };

        // 8. Push the card object into the deck array:
        deck.push(card);

    });
});

// just to go bonkers, can we do this ALL in ONE line of code:
kinds.forEach(k=>suits.forEach(s=>deck.push({name:`${k} of ${s}`,file:`${k}-of-${s}.png`,valu:k=="Ace"?11:k.length>=4?10:k,kind:k,suit:s})));

// console.log(deck);

// 9. Review: Shuffle (randomize) the deck:

// 10. Review: Make a shoe consisting of 6 decks of cards, using the spread ... operator
const shoe = [...deck, ...deck, ...deck];
console.log(shoe);

// review of array.sort()
// sort strings
const fruits = ['pear', 'grape', 'apple', 'peach', 'kiwi', 'banana'];
fruits.sort();
console.log(fruits);
// sort numbers -- doesn't work w/o callback
const nums = [44,1001,10,3,111,5,101,23,2223,400];
nums.sort((a,b) => a - b);
console.log(nums);
// sort array of objects by property key name
const ppl = [
    {name: "Amy", age: 25},
    {name: "Bob", age: 45},
    {name: "Eva", age: 27},
    {name: "Cal", age: 35},
    {name: "Ali", age: 38},
    {name: "Deb", age: 15},
];

// sort ppl A-Z by name -- use sort by str key callback algo:
ppl.sort((a,b) => a.name > b.name ? 1 : -1);
console.log(ppl);

// sort ppl by age, asc --  use sort by num key callback algo:
ppl.sort((a,b) => a.age - b.age);
console.log(ppl);

// sort ppl by age, desc
ppl.sort((a,b) => b.age - a.age);
console.log(ppl);

// 11. Review: Shuffle (randomize) the shoe:
shoe.sort(() => Math.random()-0.5);

// One more way to sort: Fisher-Yates Shuffle
for(let i = 0; i < shoe.length; i++) {
    let temp = shoe[i]; // store current item in temp var
    let r = Math.floor(Math.random()*shoe.length);
    // replace current item w rand item:
    shoe[i] = shoe[r];
    // replace rand item w temp (the backup of curr item)
    shoe[r] = temp;
}

console.log(shoe); // to prove Fisher-Yates worked, 
// turn off the Math.random()-0.5 sort; then turn on both for double shuffle

// 12. Get the DOM elements:
// - Get the DEAL button and assign a listener for calling the deal function when clicked
const dealBtn = document.getElementById('deal-btn');
dealBtn.addEventListener('click', deal);
// - Get the HIT and STAND buttons
const hitBtn = document.getElementById('hit-btn');
hitBtn.addEventListener('click', hit);

const standBtn = document.getElementById('stand-btn');
standBtn.addEventListener('click', stand);

// - Get the h2, which will be used for outputting prompts ("HIT or STAND?", etc.)
const feedbackH2 = document.querySelector('h2');

// 13. Get the divs that hold the player and dealer hands and 
// that display the player and dealer scores
const playerCardsDiv = document.getElementById('player-cards-div');
const dealerCardsDiv = document.getElementById('dealer-cards-div');
const playerScoreSpan = document.getElementById('player-score-span');
const dealerScoreSpan = document.getElementById('dealer-score-span');

// 14. Declare global vars need for keeping track of the deal
// - arrays for holding player and dealer cards 
let playerHand = [];
let dealerHand = [];
// - variables for keeping score:
let playerScore = 0;
let dealerScore = 0;
// - dealCounter keeps track of total cards dealt
let dealCounter = 0;

// DEAL
// Now, that we have the shoe, let's deal a hand of Blackjack. We dealt a hand of
// poker in the earlier lesson where we made the deck of cards, BUT this will be
// different: to better emulate game play, we will use setInterval to deal on a 
// 1-second delay between cards
// the deal consists of 2 hands -- player and dealer -- each of whom get 2 cards
// the dealer's first card is dealt face down -- the "hole card"

// CHALLENGE: 
// Deal ONE card to the player ONLY:
// By "Deal" we mean make the card image appear on the Table in DOM:
// No timer , no setTimeout or setInterval -- just output a card
// just pop the first card off the shuffled shoe 
// const cardImg = new Image();
// let cardObj = shoe.pop();
// cardImg.src = `images/cards350px/${cardObj.file}`;
// playerCardsDiv.appendChild(cardImg);

// 15. Define the deal function:
function deal() {

    // deactivate deal btn so that it cannot be clicked again mid-game
    dealBtn.disabled = true; // turn off btn
    dealBtn.classList.toggle('disabled-btn'); // fade btn

    // 16. Since this is a new hand, reset the scores and "clear the table"
    // - empty the divs that display the cards
    playerCardsDiv.innerHTML = "";
    dealerCardsDiv.innerHTML = "";
    // - reset the player and dealer scores and reset score boxes
    playerScore = dealerScore = dealCounter = 0; // shorthand: set multiple vars to same value
    playerScoreSpan.innerHTML = "Player Score: 0";
    dealerScoreSpan.innerHTML = "Dealer Shows: 0";
    feedbackH2.innerHTML = ""; // - clear the text from the output h2
    // - empty the arrays that store the player and dealer 
    playerHand = [];
    dealerHand = [];
    // 17. Call the setInterval method with its callback function, set equal to a variable,
    // dea;Interval, which will be used to clear the interval (stop deal)
    let dealInterval = setInterval(() => {
        
        dealCounter++; // 18. Increment the counter that keeps track of how many card have been dealt
        
        if(dealCounter <= 4) {

            const cardImg = new Image(); // 20. Instantiate a new image object to hold the card image
            
            const cardObj = shoe.pop(); // 21. Pop a card object off shoe array and save it as cardObj
            // 2 Aces testing: hard-code an Ace, so that's all that is deal, all 4 cards are Aces:

            /*
            const cardObj = {
                name: "Ace of Diamonds",
                file: "Ace-of-Diamonds.png",
                valu: 11,
                kind: "Ace",
                suit: "Diamonds",
            }
            */

            cardImg.src = `images/cards350px/${cardObj.file}`;
            // deal odd counter cards to player; even go to dealer

            if(dealCounter % 2 == 1) {

                playerScore += cardObj.valu; // 27. Increment the player's score
                playerCardsDiv.appendChild(cardImg); // 22. If this is an odd card, give it to the player
                playerHand.push(cardObj); // 26. Push the card into the player's hand

                // check if player score == 22 before displaying score, cuz player may have 2 Aces,
                // in which case their score is actually 12:
                if(playerScore == 22) { // only true if player has 2 Aces
                    playerScore = 12; // subtract 10 from score, since 2nd Ace counts 1
                    // go into the hand, and set the 2nd card valu prop to 1 (instead of 11)
                    playerHand[1].valu = 1;
                }

                // output the player's score
                playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
                console.log("Player Hand:", playerHand);

            } else { // even cards go to dealer

                // 23. dealer's 2nd card (4th card overall) is dealt face-down
                dealerScore += cardObj.valu; // increment the dealer's score
                dealerHand.push(cardObj); // 26. Push the card into the dealer's hand

                if(dealerScore == 22) { // only true if dealer has 2 Aces
                    dealerScore = 12; // subtract 10 from score, since 2nd Ace counts 1
                    // go into the hand, and set the 2nd card valu prop to 1 (instead of 11)
                    dealerHand[1].valu = 1;
                }

                console.log("Dealer Hand:", dealerHand);


                if(dealCounter == 4) { // counter equals 4 only when deal is done

                    cardImg.src = 'images/cards350px/0-Back-of-Card-Red.png';
                    // now that deal is done, check if either -- or both -- got Blackjack
                    // hardwire the scores to be blackjack (21) for testing purposes:
                    // playerScore = 21;
                    // dealerScore = 21;
                    // get the file name of the hole card so that we can reveal it:
                    holeCard = dealerHand[1].file;
                    console.log('holeCard:', holeCard);

                    // detect Blackjack, but on a 1 second delay to emulate real gameplay
                    setTimeout(() => {

                        if(dealerScore == 21 && playerScore == 21) { // if BOTH have Blackjack
                            feedbackH2.innerHTML = "BOTH have Blackjack! It's a PUSH..!";
                            cardImg.src = `images/cards350px/${holeCard}`; // reveal hole card
                            enableDealBtn();
                        } else if(playerScore == 21) { // check if player only has Blackjack
                            feedbackH2.innerHTML = "You have Blackjack! You WIN..!";
                            enableDealBtn();
                        } else if(dealerScore == 21) { // check if dealer only has Blackjack
                            feedbackH2.innerHTML = "Dealer has Blackjack! You LOSE..!";
                            cardImg.src = `images/cards350px/${holeCard}`; // reveal hole card
                            enableDealBtn();
                        } else { // nobody has Blackjack
                            feedbackH2.innerHTML = "Hit or Stand..?";
                            // console.log('Hola from else of the setTimeout which only ever runs in nobody has Blackjack!');
                            hitBtn.disabled = false; // turn on btn
                            hitBtn.classList.toggle('disabled-btn'); // un-fade btn
                            standBtn.disabled = false; // turn on btn
                            standBtn.classList.toggle('disabled-btn'); // un-fade btn
                        }

                    }, 1000);

                } else { // this is the dealer's FIRST card, so output "Dealer Shows" score
                    dealerScoreSpan.innerHTML = `Dealer Shows: ${dealerScore}`;
                }

                dealerCardsDiv.appendChild(cardImg); // give even card to the dealer
                cardImg.style.width = "95px"; // 29. shrink dealer cards to make them appear farther away in 3D space
                
            }
        } else {
            clearInterval(dealInterval); // 19. If this is 4th card being dealt, clear interval (stop deal)
            // feedbackH2.innerHTML = "Dealin's Done..!";
        }

        // console.log(`Hola from last line of setInterval function. This is card number ${dealCounter}`);

    }, 1000);
    

        // 33. Update "Dealer Show"s" once the deal ends--this is not
        // the dealer's score, just the value of the ONE card that IS showing
        // this value equals the dealer's score minus the value of the the hole card

            // 34. Log the dealer's hidden hand and secret score to the console

            // 35. If no one has blackjack, deactivate the DEAL button so that it cannot be clicked again

                // 36. Mute the color of the DEAL button so that it looks unclickable

                // 37. Un-mute the HIT and STAND buttons and set their disabled to false
                // the buttons appearance is handled by removing and adding classes
    
            // 38. Prompt the player to "HIT or STAND?"..for better game play pacing, 
            // do the prompt on a 15-second delay with setTimeout

            // 39. Check to see if either the player or dealer have Blackjack
            // Announce Blackjack on 1 second delay; if no one has Blackjack,
            // prompt player to HIT or STAND:
    
            //40. Set the setInterval timer for the card dealing to repeat every 1 second:

            // 41. Run the file in the browser and click DEAL, being sure to check the 
            // console for the shuffled deck, shuffled shoe and dealer hand / score
            
} // end deal() function

function hit() {

    // give the player a card:
    const cardImg = new Image(); // make a new img
    const cardObj = shoe.pop(); // pop another card off the shoe
    cardImg.src = `images/cards350px/${cardObj.file}`; // set card img src
    playerCardsDiv.appendChild(cardImg); // output card to player card div
    playerHand.push(cardObj); // save cardObj to playerHand array
    playerScore += cardObj.valu; // update player score
    playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;

    // playerScore = 21; // testing
    // check if player Busted (in which case it's game over)
    if(playerScore > 21) {
        // before declaring player busted, check if they have an Ace to "un-bust" them
        // use array.findIndex() method to check if there is an Ace 11 in the hand, if there is not, findIndex() will return -1
        let indexOfAce11 = playerHand.findIndex(item => item.valu == 11);
        console.log('indexOfAce11:', indexOfAce11);

        if(indexOfAce11 != -1) { // if an Ace 11 was found in playerHand
            playerHand[indexOfAce11].valu = 1; // set its valu to 1
            playerScore -= 10; // subtract 10 from playerScore
            playerScoreSpan.innerHTML = `Player Score: ${playerScore}`;
        } else { // playerScore is over 21 AND there is no Ace 11 to bail them out
            feedbackH2.innerHTML = "You're Busted..!";
            enableDealBtn();
            disbleHitStandBtns();
        }
        // check if score is 21 after "unbusting"
        if(playerScore == 21) { // player is done;
            disbleHitStandBtns();
            feedbackH2.innerHTML = "Dealer's turn..";
            stand(); // player is done, so call stand function to play out dealer's hand
        }
    // check if playerScore is 21 exactly without having been unbusted
    } else if(playerScore == 21) { // if player hit results in exactly 21, player is done
        // turn off hit and stand btns -- but do NOT turn on deal btn, cuz game isn't over
        // yet; it is now the dealer's turn
        feedbackH2.innerHTML = "Dealer's turn..";
        disbleHitStandBtns();
        stand(); // player is done, so call stand function to play out dealer's hand
    } else { // player score is less than 21
        feedbackH2.innerHTML = "Hit again or Stand..?";
    }

} // end hit() function

function stand() {

    setTimeout(() => {
        // runs when player clicks STAND Button OR when playerScore is exactly 21
        console.log('hello from stand function');
        // reveal hole card by setting src of children[1] (2nd card) in dealer cards div:
        if(dealerHand.length == 2) {
            dealerCardsDiv.children[1].src = `images/cards350px/${holeCard}`;
        }
        // show the dealer's actual score, as opposed to what they were showing
        dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;

        if(dealerScore <= 16) { // give the dealer a new card
            const cardImg = new Image();
            const cardObj = shoe.pop();
            cardImg.src = `images/cards350px/${cardObj.file}`;
            cardImg.style.width = "95px";
            dealerCardsDiv.appendChild(cardImg);
            dealerHand.push(cardObj);
            dealerScore += cardObj.valu;
            dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
            stand(); // after giving dealer a new card, call function again
        } else if(dealerScore <= 21) { // dealer does NOT get card AND did not bust
            evalWinner(); // dealer has not busted but they are done, so see who won
        } else { // dealer score is greater than 21, so check for Ace to unbust with
            let indexOfAce11 = dealerHand.findIndex(item => item.valu == 11);
            console.log('indexOfAce11:', indexOfAce11);
            if(indexOfAce11 != -1) { // if an Ace 11 was found in playerHand
                dealerHand[indexOfAce11].valu = 1; // set its valu to 1
                dealerScore -= 10; // subtract 10 from playerScore
                dealerScoreSpan.innerHTML = `Dealer Score: ${dealerScore}`;
                stand(); // reducing dealer score by 10 may mean dealer gets yet another card, so recursively call stand function again toi check if dealer gets another card, is done or is busted
            } else { // dealer score is more than 21 and could not "unbust"
                feedbackH2.innerHTML = "Dealer Busted! You Win!";
                enableDealBtn();
                disbleHitStandBtns();
            }
        }
    },2000);
}

function evalWinner() {
    if(playerScore == dealerScore) {
        feedbackH2.innerHTML = "It's a Push..!";
    } else if(playerScore > dealerScore) {
        feedbackH2.innerHTML = "You Win..!";
    } else {
        feedbackH2.innerHTML = "You Lose..!";
    }
    // game over so reset buttons
    enableDealBtn();
    disbleHitStandBtns();
}

// there are several scenarios where we need to disable Hit / Stand, namely:
// someone gets blackjack or player busts
function disbleHitStandBtns() {
    hitBtn.disabled = true;
    hitBtn.classList.toggle('disabled-btn');
    standBtn.disabled = true;
    standBtn.classList.toggle('disabled-btn');
}

// we need to enable deal button whenever game ends, 
function enableDealBtn() {
    dealBtn.disabled = false; // reactivate deal btn
    dealBtn.classList.toggle('disabled-btn');
}

// END: Lesson 08.03
// NEXT: Lesson 08.04