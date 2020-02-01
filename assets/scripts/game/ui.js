'use strict'
const store = require('../store')
const gamelogic = require('./gamelogic')

const sysMsg = (type, state, msg) => {
  $('.sys-message').append(`<p class="${type}"> ${msg}`)
  $(`.${type}`).addClass(`${state}`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 2000)
}

const onSignUpSuccess = (response) => {
  // console.log('sign up user')
  // console.log(response)
  $('#sign-up-form').trigger('reset')
  const msg = `Sign up successful for ${response.user.email}`
  const type = 'sign-up-s'
  const state = 'successful'
  sysMsg(type, state, msg)
}

const onSignUpFailure = (response) => {
  $('#sign-up-form').trigger('reset')
  const resText = JSON.parse(response.responseText)
  let msg = ''
  for (const key in resText) {
    msg = msg + ' ' + key + ' ' + resText[key] + '. '
  }
  const type = 'sign-up-f'
  const state = 'failure'
  sysMsg(type, state, msg)
}

const onSignInSuccess = (response) => {
  // console.log('sign in user:')
  // console.log(response)
  $('#sign-in-form').trigger('reset')
  $('.start-game-btn').show()
  $('#change-password-btn').show()
  $('#sign-out').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  store.user = response.user
  // api.createGame()
  //   .then(onCreateGameSuccess)
  //   .catch(onCreateGameFailure)
  const msg = `${response.user.email} signed in`
  const state = 'successful'
  const type = 'sign-in-s'
  sysMsg(type, state, msg)
}

const onSignInFailure = (response) => {
  let msg
  if (response.statusText === 'Unauthorized') {
    msg = 'Sign in failed: Incorrect email or password'
  } else {
    msg = 'Sign in failed'
  }
  const state = 'failure'
  const type = 'sign-in-f'
  sysMsg(type, state, msg)
  $('#sign-in-form').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('.gameboard').hide()
  $('#change-password-btn').hide()
  $('#sign-out').hide()
  $('#sign-in').show()
  $('.start-game-btn').hide()

  // Delete all store items related to this session
  Object.keys(store).forEach(function (key) { delete store[key] })
  const msg = 'Signed out successfully'
  const state = 'successful'
  const type = 'sign-out-s'
  sysMsg(type, state, msg)
}

const onSignOutFailure = (response) => {
  const msg = 'Signed out failed'
  const state = 'failure'
  const type = 'sign-out-f'
  sysMsg(type, state, msg)
}

const onChangePasswordSuccess = (response) => {
  $('#change-password-form').trigger('reset')
  $('.failed-change').text('')
  const msg = 'Change password successful'
  const state = 'successful'
  const type = 'change-pw-s'
  sysMsg(type, state, msg)
  $('#changePWModal').modal('hide')
}

const onChangePasswordFailure = (response) => {
  $('#change-password-form').trigger('reset')
  $('.failed-change').text('Failed to change password. Please try again.')
  $('.failed-change').addClass('failure')
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  gamelogic.setGameBoard()
}
const onCreateGameFailure = (response) => {
  const msg = 'Failed to create game'
  const state = 'failure'
  const type = 'create-game-f'
  sysMsg(type, state, msg)
}

const onUpdateGameSuccess = (response) => {
  store.game = response.game
  gamelogic.changePlayer()
  if (!store.game.over) {
    $('.game-message').html(`${store.currentP.name}'s turn`)
  }
}

const onUpdateGameFailure = (response) => {
  const msg = 'Failed to update game'
  const state = 'failure'
  const type = 'update-game-f'
  sysMsg(type, state, msg)
}

const onGetGamesSuccess = (response) => {
  $('.games-played').text(`Total games played: ${response.games.length}`)
}
const onGetGamesFailure = (response) => {
  const msg = 'Failed to get games'
  const state = 'failure'
  const type = 'get-game-f'
  sysMsg(type, state, msg)
}

const onUpdateSquare = (currentP, squareId) => {
  store.game.cells[squareId] = currentP.index
  $('#' + squareId).text(currentP.token).addClass('inactive-square')
}

const onGameOver = (winner) => {
  $('.square').addClass('inactive-square')
  if (winner === 'draw') {
    $('.game-message').text(`Draw`)
  } else {
    store.winType.forEach(cell => {
      $(`#${cell}`).addClass('win-square')
    })
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
