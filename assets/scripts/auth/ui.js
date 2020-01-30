'use strict'
const store = require('../store')

const onSignUpSuccess = (response) => {
  console.log(response)
  $('.message').text('Sign up successful')
  $('#sign-up').trigger('reset')
}

const onSignUpFailure = (response) => {
  console.log(response)
  $('.message').text('Sign up failed')
  $('#sign-up').trigger('reset')
}

const onSignInSuccess = (response) => {
  console.log(response.user.token)
  store.user = response.user
  $('.gameboard').show()
  console.log(store)
  $('.message').text('Sign in successful')
  $('#sign-in').trigger('reset')
}

const onSignInFailure = (response) => {
  console.log(response)
  $('.message').text('Sign in failed')
  $('#sign-in').trigger('reset')
}

const onChangePasswordSuccess = (response) => {
  console.log(response)
  console.log(store)
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
  onChangePasswordSuccess,
  onChangePasswordFailure
}
