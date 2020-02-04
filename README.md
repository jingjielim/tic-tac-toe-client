# Tic Tac Toe

An implementation of the age old game of Tic Tac Toe.


### Technologies
- DOM
- jQuery
- AJAX
- cURL
- BootStrap

## Development Process

### WireFrame
The wireframe consists of two different pages to be displayed to the user depending on their signed in status.

The page below is displayed when the user first loads the website. A sign in and sign up form is displayed. In the final implmentation, only a sign in form is displayed with an option to sign up to reduce clutter on the page.

![Sign In/ Sign Up](https://imgur.com/jrmNeKl.png)

The second page consists of the options to 'Change Password', 'Sign Out', 'Start New game', and 'Get number of games played'. 

In the center is the gameboard with the 9 squares for the game play. Each square shall interact with user clicks, either placing a mark on the square, informing the user the square has been marked or indicating that the game is over.

At the top of the gameboard is where all the game play messaging happens. The messages indicate the current player or that the game is over and whether there is a winner or a draw.

![Game Play](https://imgur.com/fUAXjMC.png)


### User Stories
- As a user, I want to sign in when I visit the home page.
- As a user, I want to have feedback every time I click on something.
- As a user, I want to change my password only after I sign in.
- As a user, I want to hide the sign in and sign up page after I sign in.
- As a user, I want to know what is the next symbol (x or o) that will be displayed.
- As a user, I want to know if a game has been won and by who.
- As a user, I want to start a new game after one ends.

### Planning

The app is split into various files for ease of maintenance. The events.js file contains event handlers placed on the components in the html file. The api.js file contains all AJAX calls to the API. The ui.js file contains all functions related to visual changes as a result of user interaction or a result of API calls. Finally, the gamelogic.js file contains the logic to check the game for the end game state (win or draw).

As the game depends heavily on interaction with an API. I decided to start on the setting up connection with the API first.

#### Authentication API

Authentication consists of Sign Up, Sign In, Change Password, and Sign Out. cURL scripts were set up to test the API with dummy data. 

Subsequently, the sign out button and forms for sign up, sign in, change password were made on the index.html page and tested with the API. Before any messaging was added, console logging was used to ensure that the paths were set up correctly.

#### Game API

The basic game API consist of Create Game, Update Game, Get Game/Games. The set up process follows that of the Authentication API. Before a game board was made, dummy data was hardcoded and sent to the API to test updating of the game. 

#### Game logic

A visual represenatation of the game logic is shown below. 

![Game Logic](https://imgur.com/mUBa7WC.png)

Event listeners are placed on each of the nine squares representing possible positions on the tic tac toe board. When any square is clicked, the events follow the flowchart above.

#### Styling

The Sign Up and Sign In pages were created using BootStrap card components and animated with jQuery.

The game board was created using BootStrap container component allowing the board to shrink and grow proportionally. Hover and focus effects were created with CSS.

## Problem Solving

When an error occurs or unexpected event happens, the console log is the first thing I check. 

Errors are normally easily traced back to the code snippet causing it. 

For unexpected events, console logs were added to the code in the suspected areas causing the bug to display the state of the page before the unexpected event.


### Lessons Learnt

#### Circular dependency

>Two or more modules directly or indrectly depending on each causing unwanted effects. 

I encountered this issue when trying to get the ui to trigger events through the events.js page. Because both files were depending on each other the event did not trigger.
