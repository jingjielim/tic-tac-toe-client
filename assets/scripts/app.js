'use strict'
const events = require('./game/events')
// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  $('.gameboard').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-up').hide()
  $('.sign-in-btn').on('click', events.showSignIn)
  $('.sign-up-btn').on('click', events.showSignUp)
  $('#sign-up').on('submit', events.onSignUp)
  $('#sign-in').on('submit', events.onSignIn)
  $('#sign-out').on('click', events.onSignOut)
  $('#change-password').on('submit', events.onChangePassword)

  $('#create-game').on('click', events.onCreateGame)
  $('#get-games').on('click', events.onGetGames)
  $('.square').on('click', events.onUpdateGame)

  // Development shortcut
  setTimeout(() => {
    $('#sign-in-form').trigger('submit')
  }, 500)
})
