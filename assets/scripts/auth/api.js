'use strict'

const config = require('../config')

const signUp = (userData) => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: userData
  })
}

const signIn = (userData) => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: userData
  })
}

module.exports = {
  signUp,
  signIn
}
