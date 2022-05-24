# LeQuestCodeChallengeAdv
Code Challenge for FE Dev applicants at LeQuest

Build a simple React-based version of the game Battleship. 

In Battleship we have a board which is a 10x10 grid, where the rows are labeled with a letter (A-J), and the columns with a number (1-10). There are different types of ships which each take up a different number of spaces on this grid, and the number of spaces a ship takes up is equivalent to how many hits the ship can take before sinking. So for a battleship, it takes up 4 spaces on the board, and can be hit 4 times before sinking. The players place their ships on the board in a random configuration, and then in turns, announce a square (for instance C3) where they will attack. If any of the opponent's ships are on that square, that ship will take one hit. Once a ship has a hit on each space it takes up, it will sink. Once a player's ships are all sunk, they lose. 

We give you a basic board setup and an 'inventory' of 4 ships as follows for yourself and for the 'computer' player: 

* 1 carrier: size 5 spaces for hits 

* 1 battleship: size 4 spaces for hits 

* 1 cruiser: size 3 spaces for hits 

* 1 destroyer: size 2 spaces for hits 

 
What you should do: 

* Implement a means to display your inventory (visuals for ships can be very simple, just solid rectangles with the appropriate size based on how many spaces they take up). 

* Implement a means for the player to take the ships from the inventory and place them on the board, either horizontally or vertically. 

* Implement a means to configure where the 'computer' ships are placed on their board (these are not visualized). 

* Implement a system of turns in which a player makes a move, and then a move is made automatically by the 'computer' player. 

* Implement a means for the player to indicate which square they will attack. 

* Implement a means for the computer to randomly choose a valid square to attack. 

* Implement a means to evaluate if an attack was a hit, and to visualize the hit. 

* Implement a means to evaluate if a ship has been sunk. 

* Implement a means to determine game over when all ships of one player have been sunk. 


Optional Extras: 

* Implement multiple difficulty levels for the 'computer' player 

* Implement multiplayer functionality between two clients 


How to get started:

* Fork this repository to your own GitHub account
* Implement as many of the things listed above as you can
* Keep in mind why you decided to implement things a certain way, or to prioritize one feature over another
* Push your changes to the forked repository
* After 2 days, we will schedule a short review session to discuss your solution
