const words = require('./data')
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

class Boggle {
  constructor(words, alphabet, dimension) {
    this.words = words
    this.alphabet = alphabet
    this.dimension = dimension
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

    for (let i = 0; i < this.dimension; i++) {
      for (let j = 0; j < this.dimension; j++) {
        for (let k = 0; k < this.words.length; k++) {
          const word = this.words[k]
          if (this.board[i][j] === word[0] && this.findNextLetters(word, i, j)) {
            result.push(word)
          }
        }
      }
    }

    const filterResult = result.filter((item, index) => result.indexOf(item) === index)
    console.log(`Found ${filterResult.length} ${(filterResult.length === 1 ? 'word' : 'words')} from ${this.words.length} words`)
    console.log(filterResult.join(', '))
    return filterResult
  }

  generateLetters() {
    let randomLetters = ''

    for (let i = 0; i < this.dimension * this.dimension; i++) {
      const randomNum = Math.floor(Math.random() * 26)
      randomLetters += this.alphabet[randomNum]
    }

    return randomLetters
  }

  board() {
    const randomLetters = this.generateLetters()
    const board = []

    for (let i = 0; i < randomLetters.length; i += this.dimension) {
      const temp = []
      for (let j = 0; j < this.dimension; j++) {
        temp.push(randomLetters[i + j].toUpperCase())
      }
      board.push(temp)
    }

    console.log(board)
    return board
  }
}

const boggle = new Boggle(words, alphabet, 10)

boggle.solver()
