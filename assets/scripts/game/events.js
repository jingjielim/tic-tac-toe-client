'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const gamelogic = require('./gamelogic')

const showSignIn = (event) => {
  event.preventDefault()
  $('#sign-up').slideUp(400, 'linear', () => { $('#sign-in').slideDown(400) })
}

const showSignUp = (event) => {
  event.preventDefault()
  $('#sign-in').slideUp(400, 'linear', () => { $('#sign-up').slideDown(400) })
}

const onStartGame = (event) => {
  console.log(event.target.id)
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
  event.preventDefault()
  api.createGame()
    .then(ui.onCreateGameSuccess)
    .catch(ui.onCreateGameFailure)
}

const onGetGames = (event) => {
  event.preventDefault()
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
  event.preventDefault()
  const squareId = event.target.id
  const cells = store.game.cells.slice()
  let over = false
  // Check if game is over
  if (store.game.over) {
    ui.onGameOverMsg()
  } else if (store.game.cells[squareId]) {
    // Check if square already marked
    ui.onInvalidSquare()
  } else {
    // if square is unmarked, mark square
    cells[squareId] = store.currentP.index
    // Check if there is a winner or a draw
    if (gamelogic.checkWin(cells) || gamelogic.isDraw(cells)) {
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
  // Use traditional 'for loops' for IE 11
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes[0].data === "Computer's turn" && !store.game.over) {
        setTimeout(() => {
          const bestMove = gamelogic.bestMove()
          $(`#${bestMove}`).trigger('click')
        }, 1000)
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
