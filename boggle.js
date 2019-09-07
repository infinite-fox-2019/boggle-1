const words = require('./data')
const alphabet = 'aaaaabcdeeeeefghiiiiijklmnooooopqrstuuuuuvwxyz'

class Boggle {
  constructor(words, alphabet) {
    this.words = words
    this.alphabet = alphabet
  }

  solver() {

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

    return board
  }
}

const boggle = new Boggle(words.slice(0, 5), alphabet)

const board = boggle.board()
console.log(boggle.solve(board))
