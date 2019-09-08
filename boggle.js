const words = require ('./data')

class Boggle {
  constructor(dimension) {
    this.dimension = dimension
    this.words = words

    this.wordsFound = []
    this.board = []

    this.shake(dimension)
  }

  shake(dimension) {
    // set a library of alphabet, make more on each frequently recurring letter in Indonesian language
    const lib = 'AAAAAAAAAAABCDEEEEEEEEFGHIIIIIIIIIIJKLMNOOOOOOOOOOOOOOOOOOPQRSTUUUUUUUUUUUUUUUUVWXYZ'
    for (let i = 0; i < dimension; i++) {
      this.board.push([])
      for (let j = 0; j < dimension; j++) {
        let rand = Math.floor(Math.random()*50)
        this.board[i].push(lib[rand])
      }
    }
  }

  solve () {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[0].length; j++) {
        for (let w = 0; w < words.length; w++) {
          let kata = words[w]
          if (kata[0] === this.board[i][j] && this.moveNext(kata, i, j)) {
            this.wordsFound.push(kata)
          }
        }
      }
    }
    return `${this.wordsFound.length} kata ditemukan: "${this.wordsFound.join(', ')}"`
  }

  moveNext (kata, i, j) {
    let neighbours = [
      [-1,-1], // "↖"
      [-1, 0], // "↑"
      [-1, 1], // "↗"
      [0, -1], // "←"
      [0,  1], // "→"
      [1, -1], // "↙"
      [1,  0], // "↓"
      [1,  1], // "↘"
    ]

    if (kata.length == 1) {
      return true
    }

    this.board[i][j] = '+'

    for (let n = 0; n < neighbours.length; n++) {
      let row = i + neighbours[n][0]
      let col = j + neighbours[n][1]
      if (
      row >= 0 && row < this.board.length && 
      col >= 0 && col < this.board[0].length) {
        if (this.board[row][col] == kata[1] && this.moveNext(kata.slice(1), row, col)) {
          this.board[row][col] === kata[0]
          return true
        }
      }
    }

    this.board[i][j] = kata[0]
    return false
  }
}

var game = new Boggle(5)

console.log(game.board);
console.log(game.solve());




