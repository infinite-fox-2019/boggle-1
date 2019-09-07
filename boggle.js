const words = require('./data')
// const alphabet = 'aaaaabcdeeeeefghiiiiijklmnooooopqrstuuuuuvwxyz'
const alphabet = 'abcdefghijklmnopqrstuvwxyz'
// const words = ['COOL', 'CACA', 'CALL', 'BLUE', 'MAN', 'YELL', 'GIRL', 'CODE', 'TELL', 'EYE', 'DATE']
// const alphabet = 'cmtsdaxilltepeys'

// const board = [
//   ['c', 'm', 't', 's'],
//   ['d', 'a', 'x', 'i'],
//   ['l', 'l', 't', 'e'],
//   ['p', 'e', 'y', 's'],
// ]

class Boggle {
  constructor(words, alphabet) {
    this.words = words
    this.alphabet = alphabet
    this.board = this.board()
    this.moves = [ [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1], [0, 1] ]
  }

  checkAllMoves(word, i, j) {
    const boardLength = this.board.length

    if (!this.board[i]) return false
    if (this.board[i][j] === word[1] && i < boardLength && j < boardLength && i >= 0 && j >= 0 && this.findNextLetters(word.slice(1), i, j)) {
      return true
    }
    return false
  }

  findNextLetters(word, i, j) {
    if (word.length === 1) return true
    this.board[i][j] = null

    for (let move of this.moves) {
      const newI = move[0] + i
      const newJ = move[1] + j

      if (this.checkAllMoves(word, newI, newJ)) {
        this.board[i][j] = word[0]
        return true
      }
    }

    this.board[i][j] = word[0]
    return false
  }

  solver() {
    const result = []

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        for (let k = 0; k < this.words.length; k++) {
          const word = this.words[k]
          if (this.board[i][j] === word[0] && this.findNextLetters(word, i, j)) {
            result.push(word)
          }
        }
      }
    }

    const filterResult = result.filter((item, index) => result.indexOf(item) === index)
    console.log(filterResult.join(', '))
    return filterResult
  }

  generateLetters() {
    let randomLetters = ''

    for (let i = 0; i < 16; i++) {
      const randomNum = Math.floor(Math.random() * 26)
      randomLetters += this.alphabet[randomNum]
    }

    return randomLetters
  }

  board() {
    const randomLetters = this.generateLetters()
    const board = []

    for (let i = 0; i < randomLetters.length; i += 4) {
      const temp = []
      for (let j = 0; j < 4; j++) {
        temp.push(randomLetters[i + j].toUpperCase())
      }
      board.push(temp)
    }

    console.log(board)
    return board
  }
}

const boggle = new Boggle(words, alphabet)

boggle.solver()
