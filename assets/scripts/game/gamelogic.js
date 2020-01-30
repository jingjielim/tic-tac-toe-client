'use strict'

const store = require('../store')

function checkWin (token) {
  let win = false
  const cells = store.game.cells
  const winTypes = [[cells[0], cells[1], cells[2]], [cells[3], cells[4], cells[5]], [cells[6], cells[7], cells[8]], [cells[0], cells[3], cells[6]], [cells[1], cells[4], cells[7]], [cells[2], cells[5], cells[8]], [cells[0], cells[4], cells[8]], [cells[2], cells[4], cells[6]]]
  winTypes.forEach(winType => {
    if (winType.every(cell => {
      return cell === token
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
  if (store.currentPlayer === 'o') {
    store.currentPlayer = 'x'
  } else if (store.currentPlayer === 'x') {
    store.currentPlayer = 'o'
  }
}

function resetGameBoard () {
  $('.square').text('')
}

module.exports = {
  checkWin,
  isDraw,
  changePlayer,
  resetGameBoard
}
