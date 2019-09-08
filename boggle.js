const dictionary = require('./data.js');

class Boggle {
  constructor(board_size) {
    this.board_size = board_size
    this.board = []
    this.words = dictionary.words
  }

  create_board() {
    let letter = `AAAAABCDEFGHIJKLMNOPQRSTUVWXYZ`
    for (let i = 0; i < this.board_size; i++) {
      this.board.push([])
      for (let j = 0; j < this.board_size; j++) {
        this.board[i].push(letter[Math.floor(Math.random() * letter.length)])
      }
    }
    return this.board
  }

  find_word(word, row, col) {
    if (word.length <= 1) return true; 
    this.board[row][col] = '' 
    let result = false

    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        let next_row = row + j
        let next_col = row + i
        if (next_row >= 0 && next_row < this.board.length && next_col >= 0 && next_col < this.board[next_row].length && this.board[next_row][next_col] === word[1] && this.find_word(word.slice(1), next_row, next_col)) {
          result = true
          break
        }
      }
    }

    this.board[row][col] = word[0]
    return result
  }

  validate_word(word) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] == word[0] && this.find_word(word, i, j)) {
          return true
        }
      }
    }
    return false
  }

  solve() {
    let result = []
    for (let i = 0; i < this.words.length; i++) {
      if(this.validate_word(this.words[i]))  {
        result.push(this.words[i])
      }
    }
    console.log('Found words: (' + result.length + ' words)')
    console.log(result);
  }

}

let StartBoggle = new Boggle(4);
console.log('Start Board: ')
console.log(StartBoggle.create_board());
console.log()
StartBoggle.solve();