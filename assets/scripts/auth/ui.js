'use strict'
const store = require('../store')

const onSignUpSuccess = (response) => {
  $('.message').text('Sign up successful')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = (response) => {
  console.log(response)
  $('.message').text('Sign up failed')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  $('.gameboard').show()
  $('#change-password').show()
  $('#sign-out').show()
  $('#sign-up').hide()
  $('#sign-in').hide()

  $('.message').text('Sign in successful')
  $('#sign-in').trigger('reset')
}

const onSignInFailure = (response) => {
  console.log(response)
  $('.message').text('Sign in failed')
  $('#sign-in').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('.gameboard').hide()
  $('#change-password').hide()
  $('#sign-out').hide()
  $('#sign-up').show()
  $('#sign-in').show()

  $('.message').text('Sign out successful')
}

const onSignOutFailure = (response) => {
  console.log(response)
  $('.message').text('Sign out failed')
}
const onChangePasswordSuccess = (response) => {
  $('.message').text('Change password successful')
  $('#change-password').trigger('reset')
}

const onChangePasswordFailure = (response) => {
  console.log(response)
  $('.message').text('Change password failed')
  $('#change-password').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure,
  onChangePasswordSuccess,
  onChangePasswordFailure
}
