'use strict'
const store = require('../store')
const gamelogic = require('./gamelogic')
const api = require('./api')

const onSignUpSuccess = (response) => {
  $('.auth-message').text('Sign up successful for ' + response.user.email).addClass('successful')
  $('#sign-up').trigger('reset')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('successful')
  }, 2000)
}

const onSignUpFailure = (response) => {
  const resText = JSON.parse(response.responseText)
  let errMsg = ''
  for (const key in resText) {
    errMsg = errMsg + ' ' + key + ' ' + resText[key] + '. '
  }
  $('.auth-message').text('Sign up failed: ' + errMsg).addClass('failure')
  $('#sign-up').trigger('reset')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('failure')
  }, 2000)
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
  $('.auth-message').text('Sign in successful').addClass('successful')
  $('#sign-in').trigger('reset')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('successful')
  }, 2000)
}

const onSignInFailure = (response) => {
  if (response.statusText === 'Unauthorized') {
    $('.auth-message').text('Sign in failed: Incorrect email or password').addClass('failure')
  } else {
    $('.auth-message').text('Sign in failed').addClass('failure')
  }
  $('#sign-in').trigger('reset')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('failure')
  }, 2000)
}

const onSignOutSuccess = (response) => {
  $('.gameboard').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-up').show()
  $('#sign-in').show()

  $('.auth-message').text('Signed out successfully').addClass('successful')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('successful')
  }, 2000)
}

const onSignOutFailure = (response) => {
  $('.auth-message').text('Sign out failed').addClass('failure')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('failure')
  }, 2000)
}
const onChangePasswordSuccess = (response) => {
  $('.auth-message').text('Change password successful').addClass('successful')
  $('#change-password').trigger('reset')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('successful')
  }, 2000)
}

const onChangePasswordFailure = (response) => {
  console.log(response)
  $('.auth-message').text('Change password failed').addClass('failure')
  $('#change-password').trigger('reset')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('failure')
  }, 2000)
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  store.currentPlayer = 'x'
  $('.game-message').text(`New Game started \nPlayer ${store.currentPlayer}'s turn`)
  gamelogic.resetGameBoard()
}
const onCreateGameFailure = (response) => {
  $('.auth-message').text('Failed to create game').addClass('failure')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('failure')
  }, 2000)
}

const onUpdateGameSuccess = (response) => {
  store.game = response.game
  gamelogic.changePlayer()
  if (!store.game.over) {
    $('.game-message').html(`<p>Player ${store.currentPlayer}'s turn</p>`)
  }
}

const onUpdateGameFailure = (response) => {
  $('.auth-message').text('Failed to update game').addClass('failure')
  setTimeout(() => {
    $('.auth-message').text('').removeClass('failure')
  }, 2000)
}

const onGetGamesSuccess = (response) => {
  $('#games-played').text(response.games.length)
}
const onGetGamesFailure = (response) => {
  $('.auth-message').text('Failed to retrieve games played')
}

const onUpdateSquare = (token, squareId) => {
  store.game.cells[squareId] = token
  $('#' + squareId).text(token)
}

const onGameOver = (winner) => {
  if (winner === 'draw') {
    $('.game-message').text(`Draw`)
  } else {
    $('.game-message').text(`${winner} wins`)
  }
}

const onInvalidSquare = () => {
  $('.game-message').text(`Square is already marked, Please choose another square.`)
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
  onGameOver,
  onInvalidSquare
}
