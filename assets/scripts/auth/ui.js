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
  console.log(store)
  $('.message').text('Sign in successful')
  $('#sign-up').trigger('reset')
}

const onSignInFailure = (response) => {
  console.log(response)
  $('.message').text('Sign in failed')
  $('#sign-up').trigger('reset')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure
}
