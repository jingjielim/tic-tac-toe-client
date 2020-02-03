'use strict'
const events = require('./game/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.gameboard').hide()
  $('#change-password-btn').hide()
  $('#sign-out').hide()
  $('#sign-up').hide()
  $('.signed-in-options').hide()

  // Visual change actions
  $('.sign-in-btn').on('click', events.showSignIn)
  $('.sign-up-btn').on('click', events.showSignUp)
  $('#change-password-btn').on('click', events.showChangePW)
  $('.start-game-btn').on('click', events.onStartGame)
  $('#get-games').on('click', events.onGetGames)
  $('.unfinished-games').on('click', events.onGetUnfinishedGames)
  $('#create-game').on('click', events.onCreateGame)
  $('.square').on('click', events.onSquareClick)

  // Form actions
  $('.sign-up-form').on('submit', events.onSignUp)
  $('.sign-in-form').on('submit', events.onSignIn)
  $('#sign-out').on('click', events.onSignOut)
  $('.change-password-form').on('submit', events.onChangePassword)
  $('.join-game-form').on('submit', events.onJoinGame)
  $('.show-game-form').on('submit', events.onGetGame)

  // Development shortcut
  // $('#sign-in').hide()
  // setTimeout(() => {
  //   $('#signInEmail').val('j@eee')
  //   $('#signInPassword').val('1')
  //   $('.sign-in-form').trigger('submit')
  // }, 500)
})
