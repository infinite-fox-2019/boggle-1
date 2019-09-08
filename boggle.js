class Boogle {
  constructor(array, size = 4) {
    this.shake = this.shake(size)
    this.getDirectory = array || ['GET', 'JOB', 'BETA', 'ZEBRA', 'BOBO']
    this.result = []
  }

  shake(size) {
    // let boardStatic = [
    //   ['A', 'K', 'J', 'D'],
    //   ['Z', 'A', 'O', 'H'],
    //   ['G', 'E', 'B', 'R'],
    //   ['T', 'F', 'J', 'V']
    // ];
    // return boardStatic
    let board = [];
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < size; i++) {
      let line = [];
      for (let j = 0; j < size; j++) {
        let random = Math.floor(Math.random() * 26);
        line.push(alphabet[random]);
      }
      board.push(line);
    }
    return board;
  }

  solve() {
    let board = this.shake
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        for (let k = 0; k < this.getDirectory.length; k++) {
          if (board[i][j] === this.getDirectory[k][0]) {
            this.findTheWords(this.getDirectory[k], i, j)
          }
        }
      }
    }
    console.log(this.printBorad(this.shake));
    console.log(`${this.result.length} words found`);
    console.log(`Here's the words :`);
    let printWords = []
    for (let i = 0; i < this.result.length; i++) {
      printWords.push([`${i + 1}. ${this.result[i]}`])
    }
    return printWords.join('\n');
  }

  findTheWords(word, i, j) {
    //direction = up > up-right > right > bottom-right > bottom > bottom-left > left > up-left
    let directions = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
    let isFound = false
    let nextIndex = 1
    let check = []
    while (isFound === false) {
      let checkNextChart = false
      for (let k = 0; k < directions.length; k++) {
        let row = i + directions[k][0]
        let col = j + directions[k][1]
        if (row >= 0 && row < this.shake.length) {
          if (col >= 0 && col < this.shake.length) {
            if (this.shake[row][col] === word[nextIndex]) {
              check.push([i, j])
              i = row
              j = col
              let notCurrent = true
              if (nextIndex > 1) {
                if (check[check.length - 2][0] === row && check[check.length - 2][1] === col) {
                  notCurrent = false
                }
                else {
                  check.push([row, col])
                }
              }
              if (notCurrent) {
                nextIndex++
                checkNextChart = true
                break;
              }
            }
          }
        }
      }
      if (checkNextChart === false) {
        isFound = true
      }
      if (nextIndex === word.length) {
        isFound = true
        this.result.push(word)
      }
    }
  }

  printBorad(board) {
    console.log('Boogle Board : \n')
    console.log('   ---------------')
    for (let i = 0; i < board.length; i++) {
      board[i].unshift(' ')
      board[i].push(' ')
      console.log(board[i].join(' | '))
      console.log('  |---------------|')
    }
    return `\nBoard complete...\n`
  }
}

const data = require('./data.js')
const game = new Boogle(data);
console.log(game.solve());

