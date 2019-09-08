const words = require ('./data')

let dummy= [
  ['D', 'A', 'T', 'A'],
  ['U', 'Z', 'U', 'R'],
  ['R', 'A', 'A', 'K'],
  ['I', 'N', 'I', 'U']
]

class Boggle {
  constructor(dimension) {
    this.board = []
    this.wordsExist = []
    this.shake(dimension)
    this.verticalCheck(0)
    this.horizontalCheck(0)
  }

  shake(dimension) {
    // set a library of alphabet, make more on each frequently recurring letter in Indonesian language
    const lib = 'AAAAABCDDEEEEFGHIIIIJKKKLMMNNNNOOPQRRSSTTTUUUVWXYZ'
    // let board = []
    for (let i = 0; i < dimension; i++) {
      this.board.push([])
      for (let j = 0; j < dimension; j++) {
        let rand = Math.floor(Math.random()*50)
        this.board[i].push(lib[rand])
      }
    }
  }

  verticalCheck(num) {
    
    // console.log(this.board);
    while (num < this.board.length) {
      let tempBoard = ''
      for (let i = 0; i < this.board.length; i++) {
        tempBoard += this.board[i][num]
      }
      while (tempBoard.length > 0) {
        for (let i = 0; i < words.length; i++) {
          if (tempBoard === words[i]) {
            this.wordsExist.push(words[i])
          }
        }
        tempBoard = tempBoard.slice(0, -1)
      }
      
      tempBoard = ''
      num++
    }
  }

  horizontalCheck(num) {
    let boardH = this.board
    while (num < boardH.length) {
      while(boardH[num].length > 0) {
        for (let i = 0; i < words.length; i++) {
          if (boardH[num].join('') === words[i]) {
            this.wordsExist.push(words[i])
          }
        }
        boardH[num].pop()
      }
      num++
    }
  }
}

var game = new Boggle()
// console.log(game.wordsExist);
// console.log(game.shake(5));
// console.log(game.wordsExist);
game.shake(5)
console.log(game.board);
console.log(game.wordsExist);




