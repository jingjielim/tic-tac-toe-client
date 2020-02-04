'use strict'

const store = require('../store')

function checkWin (cells) {
  let win = false
  let currentWinType = 0
  const winTypes = [
    [cells[0], cells[1], cells[2]],
    [cells[3], cells[4], cells[5]],
    [cells[6], cells[7], cells[8]],
    [cells[0], cells[3], cells[6]],
    [cells[1], cells[4], cells[7]],
    [cells[2], cells[5], cells[8]],
    [cells[0], cells[4], cells[8]],
    [cells[2], cells[4], cells[6]]
  ]
  winTypes.forEach(winType => {
    if (winType.every(cell => {
      return cell && cell === winType[0]
    })) {
      win = true
      // Store the winner's index and the winning type when a win happens
      store.winIndex = winType[0]
      switch (currentWinType) {
        case (0): {
          store.winType = [0, 1, 2]
          break
        }
        case (1): {
          store.winType = [3, 4, 5]
          break
        }
        case (2): {
          store.winType = [6, 7, 8]
          break
        }
        case (3): {
          store.winType = [0, 3, 6]
          break
        }
        case (4): {
          store.winType = [1, 4, 7]
          break
        }
        case (5): {
          store.winType = [2, 5, 8]
          break
        }
        case (6): {
          store.winType = [0, 4, 8]
          break
        }
        case (7): {
          store.winType = [2, 4, 6]
          break
        }
      }
    }
    currentWinType++
  })
  return win
}

function isDraw (cells) {
  // true if every cell is fill. false if any cell is empty
  return cells.every(cell => cell) && !checkWin(cells)
}

// function changePlayer () {
//   if (store.currentP === store.players[0]) {
//     store.currentP = store.players[1]
//   } else {
//     store.currentP = store.players[0]
//   }
// }

module.exports = {
  checkWin,
  isDraw
}
