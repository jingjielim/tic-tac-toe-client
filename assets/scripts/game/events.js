'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')
const gamelogic = require('./gamelogic')

const onSignUp = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  console.log(userData)
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

const onUpdateGame = (event) => {
  event.preventDefault()
  const squareId = event.target.id
  const currentPlayer = store.currentPlayer
  let winner = null
  // Check if game is over
  if (!store.game.over) {
    // If square is marked
    if (store.game.cells[squareId]) {
      ui.onInvalidSquare()
    } else {
      // if square is unmarked
      // Mark the square
      ui.onUpdateSquare(currentPlayer, squareId)
      // Check if there is a winner or a draw
      if (gamelogic.checkWin(currentPlayer)) {
        store.game.over = true
        winner = currentPlayer
      } else if (gamelogic.isDraw()) {
        store.game.over = true
        winner = 'draw'
      }
      // Update API on game
      api.updateGame(squareId)
        .then(ui.onUpdateGameSuccess)
        .catch(ui.onUpdateGameFailure)
      // If game is over...
      if (store.game.over) {
        ui.onGameOver(winner)
      }
    }
  }
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onChangePassword,
  onCreateGame,
  onGetGames,
  onUpdateGame
}
