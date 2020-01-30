'use strict'
const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

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
  console.log(userData)
  api.signIn(userData)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

module.exports = {
  onSignUp,
  onSignIn
}
