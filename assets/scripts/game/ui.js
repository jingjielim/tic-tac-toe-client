'use strict'
const store = require('../store')
const gamelogic = require('./gamelogic')

const sysMsg = (type, state, msg) => {
  $('.sys-message').append(`<p class="${type}"> ${msg}`)
  $(`.${type}`).addClass(`${state}`)
  setTimeout(() => {
    $(`.${type}`).remove()
  }, 3500)
}

const onSignUpSuccess = (response) => {
  // console.log('sign up user')
  // console.log(response)
  $('.sign-up-form').trigger('reset')
  const msg = `Sign up successful for ${response.user.email}`
  const type = 'sign-up-s'
  const state = 'successful'
  sysMsg(type, state, msg)
}

const onSignUpFailure = (response) => {
  $('.sign-up-form').trigger('reset')
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
  $('.sign-in-form').trigger('reset')
  $('.signed-in-options').show()
  $('#change-password-btn').show()
  $('#sign-out').show()
  $('#sign-up').hide()
  $('#sign-in').hide()
  $('.start-game-btn').show()

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
  $('.sign-in-form').trigger('reset')
}

const onSignOutSuccess = (response) => {
  $('.gameboard').hide()
  $('#change-password-btn').hide()
  $('#sign-out').hide()
  $('#sign-in').show()
  $('.signed-in-options').hide()

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
  $('.change-password-form').trigger('reset')
  $('.failed-change').text('')
  const msg = 'Change password successful'
  const state = 'successful'
  const type = 'change-pw-s'
  sysMsg(type, state, msg)
  $('#changePWModal').modal('hide')
}

const onChangePasswordFailure = (response) => {
  $('.change-password-form').trigger('reset')
  $('.failed-change').text('Failed to change password. Please try again.')
  $('.failed-change').addClass('failure')
}

const onCreateGameSuccess = (response) => {
  store.game = response.game
  renderGameBoard()
  $('.game-message').html(`New Game started. ${store.currentP.name}'s turn`)
}
const onCreateGameFailure = (response) => {
  const msg = 'Failed to create game'
  const state = 'failure'
  const type = 'create-game-f'
  sysMsg(type, state, msg)
}

const onUpdateGameSuccess = (response) => {
  store.game = response.game
  renderGameBoard()
}

const onUpdateGameFailure = (response) => {
  const msg = 'Failed to update game'
  const state = 'failure'
  const type = 'update-game-f'
  sysMsg(type, state, msg)
}

const onGetGamesSuccess = (response) => {
  $('.games-played').html(`Total games played: ${response.games.length}`)
}
const onGetGamesFailure = (response) => {
  const msg = 'Failed to get games'
  const state = 'failure'
  const type = 'get-game-f'
  sysMsg(type, state, msg)
}

const onGetGameSuccess = (response) => {
  $('.show-game-form').trigger('reset')
  store.game = response.game
  $('.gameboard').slideDown()
  $('#start-game').hide()
  renderGameBoard()
}
const onGetGameFailure = (response) => {
  $('.show-game-form').trigger('reset')
  const msg = 'Game not found!'
  const state = 'failure'
  const type = 'get-game-f'
  sysMsg(type, state, msg)
}

const onGetUnfinishedGamesSuccess = (response) => {
  if (response.games.length === 0) {
    const msg = 'No unfinished games found! Start a new game.'
    const state = 'failure'
    const type = 'get-unfinished-game-f'
    sysMsg(type, state, msg)
  } else {
    store.unfinishedgames = []
    response.games.forEach(game => store.unfinishedgames.push(game.id))
    console.log(store.unfinishedgames)
    let games = '<option selected>Game ID</option>'
    store.unfinishedgames.forEach(game => {
      games += `<option value="${game}">${game}</option>`
    })
    $('#unfinished-game').empty()
    $('#unfinished-game').append(games)
    $('.unfinished-games').hide()
    $('.show-game-form').show()
  }
}

const onGetUnfinishedGamesFailure = (response) => {
  const msg = 'Failed to get unfinished games'
  const state = 'failure'
  const type = 'get-unfinished-game-f'
  sysMsg(type, state, msg)
}

// const onJoinGameSuccess = (response) => {
//   store.game = response.game
//   $('.join-game-form').trigger('reset')
//   const msg = `Joined game ${store.game.id}`
//   const state = 'successful'
//   const type = 'join-game-s'
//   sysMsg(type, state, msg)
//   $('.gameboard').show()
//   $('.signed-in-options').hide()
//   renderGameBoard()
// }
// const onJoinGameFailure = (response) => {
//   $('.join-game-form').trigger('reset')
//   const msg = 'Failed to join game'
//   const state = 'failure'
//   const type = 'join-game-f'
//   sysMsg(type, state, msg)
// }

const onUpdateSquare = (currentP, squareId) => {
  store.game.cells[squareId] = currentP.index
  $('#' + squareId).text(currentP.token).addClass('inactive-square')
}

const onGameOverMsg = () => {
  if (gamelogic.isDraw(store.game.cells)) {
    $('.game-message').html(`Game over. Draw game.`)
  } else {
    if (store.winIndex === store.players[0].index) {
      $('.game-message').html(`Game over. ${store.players[0].name} won.`)
    } else {
      $('.game-message').html(`Game over. ${store.players[1].name} won.`)
    }
  }
}

const onInvalidSquare = () => {
  $('.game-message').html(`Square is already marked, Please choose another square.`)
}

function renderGameBoard () {
  const cells = store.game.cells
  const playerX = store.game.player_x.email
  let playerO
  if (store.game.player_o) {
    playerO = store.game.player_o.email
  } else if (store.AI) {
    playerO = 'Computer'
  } else {
    playerO = 'Player O'
  }

  store.players = [{index: 'x', token: '❌', name: playerX}, {index: 'o', token: '⭕️', name: playerO}]
  const numX = cells.filter(cell => cell === 'x').length
  const numO = cells.filter(cell => cell === 'o').length
  if (numX === numO) {
    store.currentP = store.players[0]
  } else {
    store.currentP = store.players[1]
  }
  $('.game-id').html(`Current Game ID: ${store.game.id}`)
  $('.opponent').html(`Playing against ${playerO}`)

  for (let i = 0; i < cells.length; i++) {
    $('#' + i).removeClass('inactive-square win-square')
    if (cells[i] === store.players[0].index) {
      $('#' + i).html(store.players[0].token).addClass('inactive-square')
    } else if (cells[i] === store.players[1].index) {
      $('#' + i).html(store.players[1].token).addClass('inactive-square')
    } else {
      $('#' + i).html(' ')
    }
  }

  if (store.game.over) {
    for (let i = 0; i < cells.length; i++) {
      $('#' + i).addClass('inactive-square')
    }
    if (gamelogic.checkWin(cells)) {
      store.winType.forEach(i => {
        $('#' + i).addClass('win-square')
      })
    }
    onGameOverMsg()
    $('.unfinished-games').show()
    $('.show-game-form').hide()
  } else {
    $('.game-message').html(`${store.currentP.name}'s turn`)
  }
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
  onGetGameSuccess,
  onGetGameFailure,
  onGetUnfinishedGamesSuccess,
  onGetUnfinishedGamesFailure,
  // onJoinGameSuccess,
  // onJoinGameFailure,
  onUpdateSquare,
  onGameOverMsg,
  onInvalidSquare
}
