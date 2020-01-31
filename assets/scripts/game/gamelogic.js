'use strict'

const store = require('../store')

function checkWin (currentPIndex) {
  let win = false
  const cells = store.game.cells
  const winTypes = [[cells[0], cells[1], cells[2]], [cells[3], cells[4], cells[5]], [cells[6], cells[7], cells[8]], [cells[0], cells[3], cells[6]], [cells[1], cells[4], cells[7]], [cells[2], cells[5], cells[8]], [cells[0], cells[4], cells[8]], [cells[2], cells[4], cells[6]]]
  winTypes.forEach(winType => {
    if (winType.every(cell => {
      return cell === currentPIndex
    })) {
      win = true
    }
  })
  return win
}

function isDraw () {
  const cells = store.game.cells
  // true if every cell is fill. false if any cell is empty
  return cells.every(cell => cell)
}

function changePlayer () {
  if (store.currentP === store.players[0]) {
    store.currentP = store.players[1]
  } else {
    store.currentP = store.players[0]
  }
}

function setGameBoard () {
  console.log(store)
  const cells = store.game.cells
  store.players = [{index: 'x', token: '❌', name: 'Player X'}, {index: 'o', token: '⭕️', name: 'Player O'}]
  store.currentP = store.players[0]
  $('.game-message').text(`New Game started. ${store.currentP.name}'s turn`)
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] === store.players[0].index) {
      $('#' + i).html(store.players[0].token)
    } else if (cells[i] === store.players[1].index) {
      $('#' + i).html(store.players[1].token)
    } else {
      $('#' + i).html(' ')
    }
  }
}

module.exports = {
  checkWin,
  isDraw,
  changePlayer,
  setGameBoard
}
