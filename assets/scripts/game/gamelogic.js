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

function bestMove () {
  const cells = store.game.cells
  const minimaxCells = [[], [], []]
  let k = 0
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      minimaxCells[i].push(cells[k])
      k++
    }
  }

  const bestmove = findBestMove(minimaxCells)
  return bestmove.row * 3 + bestmove.col
}

function isMovesLeft (cells) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (!cells[i][j]) {
        return true
      }
    }
  }
  return false
}

function minimaxEval (cells) {
  const player = 'o'
  const opponent = 'x'
  for (let row = 0; row < 3; row++) {
    if (cells[row][0] === cells[row][1] && cells[row][1] === cells[row][2]) {
      if (cells[row][0] === player) {
        return 10
      } else if (cells[row][0] === opponent) {
        return -10
      }
    }
  }
  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (cells[0][col] === cells[1][col] && cells[1][col] === cells[2][col]) {
      if (cells[0][col] === player) {
        return 10
      } else if (cells[0][col] === opponent) {
        return -10
      }
    }
  }

  // Checking for Diagonals for X or O victory.
  if (cells[0][0] === cells[1][1] && cells[1][1] === cells[2][2]) {
    if (cells[0][0] === player) {
      return 10
    } else if (cells[0][0] === opponent) {
      return -10
    }
  }

  if (cells[0][2] === cells[1][1] && cells[1][1] === cells[2][0]) {
    if (cells[0][2] === player) {
      return 10
    } else if (cells[0][2] === opponent) {
      return -10
    }
  }
  // Else if none of them have won then return 0
  return 0
}

function minimax (cells, depth, isMax) {
  const player = 'o'
  const opponent = 'x'
  const score = minimaxEval(cells)

  // If Maximizer has won the game return his/her
  // evaluated score
  if (score === 10) {
    return score
  }

  // If Minimizer has won the game return his/her
  // evaluated score
  if (score === -10) {
    return score
  }

  // If there are no more moves and no winner then
  // it is a tie
  if (isMovesLeft(cells) === false) {
    return 0
  }
  // If this maximizer's move
  if (isMax) {
    let best = -1000

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (cells[i][j] === '') {
          // Make the move
          cells[i][j] = player

          // Call minimax recursively and choose
          // the maximum value
          best = Math.max(best, minimax(cells, depth + 1))

          // Undo the move
          cells[i][j] = ''
        }
      }
    }
    return best
  } else {
    // If this minimizer's move
    let best = 1000

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (cells[i][j] === '') {
          // Make the move
          cells[i][j] = opponent
          // Call minimax recursively and choose
          // the minimum value
          best = Math.min(best, minimax(cells, depth + 1, !isMax))
          // Undo the move
          cells[i][j] = ''
        }
      }
    }
    return best
  }
}

function findBestMove (cells) {
  const player = 'o'
  const opponent = 'x'
  let bestVal = -1000
  const bestMove = {}
  bestMove.row = -1
  bestMove.col = -1

  // Traverse all cells, evaluate minimax function for
  // all empty cells. And return the cell with optimal
  // value.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if cell is empty
      if (cells[i][j] === '') {
        // Make the move
        cells[i][j] = player
        // compute evaluation function for this
        // move.
        const moveVal = minimax(cells, 0, false)

        // Undo the move
        cells[i][j] = ''

        // If the value of the current move is
        // more than the best value, then update
        // best/
        if (moveVal > bestVal) {
          bestMove.row = i
          bestMove.col = j
          bestVal = moveVal
        }
      }
    }
  }
  return bestMove
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
  isDraw,
  bestMove
}
