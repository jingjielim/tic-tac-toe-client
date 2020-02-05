'use strict'

const store = require('../store')

function checkWin (cells) {
  let isWin = false
  let winner = ''
  let winningType = []
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
      isWin = true
      // Store the winner's index and the winning type when a win happens
      winner = winType[0]
      switch (currentWinType) {
        case (0): {
          winningType = [0, 1, 2]
          break
        }
        case (1): {
          winningType = [3, 4, 5]
          break
        }
        case (2): {
          winningType = [6, 7, 8]
          break
        }
        case (3): {
          winningType = [0, 3, 6]
          break
        }
        case (4): {
          winningType = [1, 4, 7]
          break
        }
        case (5): {
          winningType = [2, 5, 8]
          break
        }
        case (6): {
          winningType = [0, 4, 8]
          break
        }
        case (7): {
          winningType = [2, 4, 6]
          break
        }
      }
    }
    currentWinType++
  })
  return [isWin, winner, winningType]
}

function isDraw (cells) {
  // true if every cell is fill. false if any cell is empty
  return cells.every(cell => cell) && !checkWin(cells)[0]
}

// Start of Minimax Algorithm
function findBestMove () {
  const cells = store.game.cells.slice()
  const player = 'o'
  let bestVal = -1000
  let bestMove

  // Traverse all cells, evaluate minimax function for all empty cells. And return the cell with optimal value.
  for (let i = 0; i < 9; i++) {
    // Check if cell is empty
    if (cells[i] === '') {
      // Make the move
      cells[i] = player
      // compute evaluation function for this move.
      const moveVal = minimax(cells, 0, false)
      // Undo the move
      cells[i] = ''
      // If the value of the current move is more than the best value, then update best
      if (moveVal > bestVal) {
        bestMove = i
        bestVal = moveVal
      }
    }
  }
  return bestMove
}

// Recursive minimax function, returns best possible score of the cell that called it
function minimax (cells, depth, isMax) {
  const player = 'o'
  const opponent = 'x'
  const score = minimaxEval(cells)

  // If Maximizer has won the game return his/her evaluated score
  if (score === 10) {
    // minus depth to give priority to wins with fewer moves
    return score - depth
  }

  // If Minimizer has won the game return his/her evaluated score
  if (score === -10) {
    // add depth to give priority to wins with fewer move
    return score + depth
  }

  // If there are no more moves and no winner then it is a tie
  if (isMovesLeft(cells) === false) {
    return 0
  }
  // If this maximizer's move
  if (isMax) {
    let best = -1000

    // Traverse all cells
    for (let i = 0; i < 9; i++) {
      // Check if cell is empty
      if (cells[i] === '') {
        // Make the move
        cells[i] = player
        // Call minimax recursively and choose the maximum value
        best = Math.max(best, minimax(cells, depth + 1, !isMax))
        // Undo the move
        cells[i] = ''
      }
    }
    return best
  } else {
    // If this minimizer's move
    let best = 1000
    // Traverse all cells
    for (let i = 0; i < 9; i++) {
      // Check if cell is empty
      if (cells[i] === '') {
        // Make the move
        cells[i] = opponent
        // Call minimax recursively and choose
        // the minimum value
        best = Math.min(best, minimax(cells, depth + 1, !isMax))
        // Undo the move
        cells[i] = ''
      }
    }
    return best
  }
}

function isMovesLeft (cells) {
  for (let i = 0; i < 9; i++) {
    if (!cells[i]) {
      return true
    }
  }
  return false
}

function minimaxEval (cells) {
  const winStat = checkWin(cells)
  if (winStat[1] === 'o') {
    return 10
  } else if (winStat[1] === 'x') {
    return -10
  } else {
    return 0
  }
}

module.exports = {
  checkWin,
  isDraw,
  findBestMove
}
