'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const gamelogic = require('./gamelogic')

const showSignIn = (event) => {
  $('#sign-up').slideUp(400, 'linear', () => { $('#sign-in').slideDown(400) })
}

const showSignUp = (event) => {
  $('#sign-in').slideUp(400, 'linear', () => { $('#sign-up').slideDown(400) })
}

const onStartGame = (event) => {
  $('.gameboard').slideDown()
  $('#start-game').hide()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onSignUp = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  const userPass = {
    credentials: {
      email: userData.credentials.email,
      password: userData.credentials.password
    }
  }
  api.signUp(userData)
    .then((response) => {
      ui.onSignUpSuccess(response)
      api.signIn(userPass)
        .then(ui.onSignInSuccess)
        .catch(ui.onSignInFailure)
    })
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  api.signIn(userData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = (event) => {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePassword = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)

  api.changePassword(userData)
    .then(ui.onChangePasswordSuccess)
    .catch(ui.onChangePasswordFailure)
}

const onCreateGame = (event) => {
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onGetGames = (event) => {
  api.getGames()
    .then(ui.onGetGamesSuccess)
    .catch(ui.onGetGamesFailure)
}

const onGetUnfinishedGames = (event) => {
  api.getUnfinishedGames()
    .then(ui.onGetUnfinishedGamesSuccess)
    .catch(ui.onGetUnfinishedGamesFailure)
}

const onGetGame = (event) => {
  event.preventDefault()

  const form = event.target
  const id = getFormFields(form)

  api.getGame(Object.values(id)[0])
    .then(ui.onGetGameSuccess)
    .catch(ui.onGetGameFailure)
}

const onSquareClick = (event) => {
  const squareId = event.target.id
  const cells = store.game.cells.slice()
  let over = false
  // Check if game is over
  if (store.game.over) {
    $('.game-message').html('Game Over. Please start a new game')
    // const winStat = gamelogic.checkWin(cells)
    // ui.onGameOverMsg(winStat[1])
  } else if (store.game.cells[squareId]) {
    // Check if square already marked
    ui.onInvalidSquare()
  } else {
    // if square is unmarked, mark square
    cells[squareId] = store.currentP.index
    // Check if there is a winner or a draw
    if (gamelogic.checkWin(cells)[0] || gamelogic.isDraw(cells)) {
      over = true
    }
    // Update API about game
    api.updateGame(squareId, over)
      .then(ui.onUpdateGameSuccess)
      .catch(ui.onUpdateGameFailure)
  }
}

const onSelfGame = (event) => {
  store.AI = false
  $('#self-game').hide()
  $('#computer-game').show()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}
const onComputerGame = (event) => {
  store.AI = true
  $('#self-game').show()
  $('#computer-game').hide()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onGameMessageChange = (mutationsList) => {
  // Check through the Mutation List
  for (const mutation of mutationsList) {
    // If the change is due to the childList...
    if (mutation.type === 'childList') {
      // If it's Computer's turn and the game is not over...
      if (mutation.addedNodes[0].data === "Computer's turn" && !store.game.over) {
        // Set a timeout to make it seem like the computer is thinking
        // Otherwise response is almost instant
        setTimeout(() => {
          const bestMove = gamelogic.findBestMove()
          $(`#${bestMove}`).trigger('click')
        }, 500)
      }
    }
  }
}

// const onJoinGame = (event) => {
//   event.preventDefault()
//   const form = event.target
//   const game = getFormFields(form)
//   const id = Object.values(game)[0]
//   api.joinGame(id)
//     .then(ui.onJoinGameSuccess)
//     .catch(ui.onJoinGameFailure)
// }

module.exports = {
  onStartGame,
  showSignIn,
  showSignUp,
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onCreateGame,
  onGetGames,
  onGetGame,
  onGetUnfinishedGames,
  onSquareClick,
  onSelfGame,
  onComputerGame,
  onGameMessageChange
  // onJoinGame
}
