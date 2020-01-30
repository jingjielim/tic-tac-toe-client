'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const store = require('../store')
const api = require('./api')
const ui = require('./ui')

function checkWin (token) {
  let win = false
  const cells = store.game.cells
  const winTypes = [[cells[0], cells[1], cells[2]], [cells[3], cells[4], cells[5]], [cells[6], cells[7], cells[8]], [cells[0], cells[3], cells[6]], [cells[1], cells[4], cells[7]], [cells[2], cells[5], cells[8]], [cells[0], cells[4], cells[8]], [cells[2], cells[4], cells[6]]]
  winTypes.forEach(winType => {
    if (winType.every(cell => {
      return cell === token
    })) {
      win = true
    }
  })
  return win
}

const onSignUp = (event) => {
  event.preventDefault()

  const form = event.target
  const userData = getFormFields(form)
  api.signUp(userData)
    .then(ui.onSignUpSuccess)
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
  console.log(event.target)
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
  let over = false
  // Mark the square
  ui.onUpdateSquare(currentPlayer, squareId)
  // Check if there is a winner
  over = checkWin(currentPlayer)
  // Update API on game
  api.updateGame(squareId, over)
    .then(ui.onUpdateGameSuccess)
    .catch(ui.onUpdateGameFailure)
  // If game is over...
  if (over) {
    ui.onGameOver(currentPlayer)
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
