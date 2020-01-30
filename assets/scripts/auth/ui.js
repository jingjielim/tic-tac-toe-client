'use strict'

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

module.exports = {
  onSignUpSuccess,
  onSignUpFailure
}
