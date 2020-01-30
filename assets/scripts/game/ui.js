'use strict'
const store = require('../store')
const api = require('./api')
const events = require('./events')
function changePlayer () {
  if (store.currentPlayer === 'o') {
    store.currentPlayer = 'x'
  } else if (store.currentPlayer === 'x') {
    store.currentPlayer = 'o'
  }
}

const onSignUpSuccess = (response) => {
  $('.auth-message').text('Sign up successful')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Sign up failed')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  $('.gameboard').show()
  $('#change-password').show()
  $('#sign-out').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  api.createGame()
    .then(onCreateGameSuccess)
    .catch(onCreateGameFailure)

  $('.auth-message').text('Sign in successful')
  $('#sign-in').trigger('reset')
}

const onSignInFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Sign in failed')
  $('#sign-in').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('.gameboard').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-up').show()
  $('#sign-in').show()

  $('.auth-message').text('Sign out successful')
}

const onSignOutFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Sign out failed')
}
const onChangePasswordSuccess = (response) => {
  $('.auth-message').text('Change password successful')
  $('#change-password').trigger('reset')
}

const onChangePasswordFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Change password failed')
  $('#change-password').trigger('reset')
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  store.currentPlayer = 'x'
  $('.game-message').html(`<p>Player ${store.currentPlayer}'s turn</p>`)
  $('.square').text('').on('click', events.onUpdateGame)
  // Show a new gameboard
}
const onCreateGameFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Failed to create game')
}

const onUpdateGameSuccess = (response) => {
  store.game = response.game
  changePlayer()
  if (!store.game.over) {
    $('.game-message').html(`<p>Player ${store.currentPlayer}'s turn</p>`)
  }
  console.log(store)
}
const onUpdateGameFailure = (response) => {
  console.log(response)
}

const onGetGamesSuccess = (response) => {
  console.log(response)
  $('#games-played').text(response.games.length)
}
const onGetGamesFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Failed to retrieve games played')
}

const onUpdateSquare = (token, squareId) => {
  store.game.cells[squareId] = token
  $('#' + squareId).html(`<p>${token}</p>`)
  $('#' + squareId).off()
}

const onGameOver = (winner) => {
  $('.game-message').text(`${winner} wins`)
  $('.square').off()
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure,
  onCreateGameSuccess,
  onCreateGameFailure,
  onUpdateGameSuccess,
  onUpdateGameFailure,
  onGetGamesSuccess,
  onGetGamesFailure,
  onUpdateSquare,
  onGameOver
}
