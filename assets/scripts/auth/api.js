'use strict'

const config = require('../config')

const signUp = (userData) => {
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: userData
  })
}

module.exports = {
  signUp
}
