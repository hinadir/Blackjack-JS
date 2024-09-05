
# Blackjack Game

This is a simple Blackjack game implemented in JavaScript. The game simulates a traditional Blackjack table where you can play against the dealer, with the primary objective being to get as close to 21 as possible without going over.

## Features

- **Timed Dealing**: Cards are dealt on a timer using `setInterval`, creating a smooth gameplay experience with a 1-second delay between each card.
- **Score Keeping**: The game keeps track of the score and dynamically updates the DOM to display the player's and dealer's scores.
- **Blackjack Detection**: Automatically detects a Blackjack (21) for the player, the dealer, or both, and displays the appropriate message.
- **Player Options**: The player is prompted to either 'Hit' or 'Stand' based on their hand.

## Gameplay Mechanics

### Deal

Once the game starts, a new hand of Blackjack is dealt:

- The game uses a "shoe" of cards, simulating a real-life Blackjack setup.
- **Smooth Card Dealing**: To mimic the experience of a live dealer, cards are dealt with a delay. This is managed using JavaScript's `setInterval` function, ensuring a 1-second delay between cards.
- **Two Hands**: The game deals two hands - one for the player and one for the dealer. Each hand starts with two cards.
- **Dealer's Hole Card**: The dealer's first card is dealt face down, known as the "hole card".

## How to Play

1. **Start the Game**: Upon starting, the game deals two cards each to the player and the dealer.
2. **Decide Your Move**: Based on the cards dealt, you can choose to:
   - **Hit**: Draw another card.
   - **Stand**: Keep your current hand and end your turn.
3. **Winning the Game**: The goal is to have a hand value closer to 21 than the dealer's without going over 21 (busting).

## Installation

To play the game locally:

1. Clone this repository:
   \`\`\`bash
   git clone https://github.com/your-username/blackjack-game.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd blackjack-game
   \`\`\`
3. Open the `index.html` file in your web browser to start the game.

## Contributing

Feel free to fork this repository, submit issues, or make pull requests. Contributions are always welcome!

## License

This project is licensed under the MIT License. See the LICENSE file for details.
