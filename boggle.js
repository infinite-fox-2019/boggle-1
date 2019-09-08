const dictionary = require('./data')

class Boggle{
  construcor(){
    this.board = this.makeBoard()
    this.word = dictionary

  }

  makeBoard(){
    let alphabet = 'ABCDEFGHIJKLNOPQRSTUVWXYZ'
    let board = []
    for(let i=0 ; i<4 ; i++){
      let penampung = []
      for(let j=0 ; j<4 ; j++){
        penampung.push(alphabet[Math.floor(Math.random() * alphabet.length)])
      }
      board.push(penampung)
    }
    return board
  }



  checkFirstLetter(word) {
    let location = []
    for(i=0 ; i<this.board.length ; i++){
      for(j=0 ; j<this.board[0].length ; j++){
        if(board[i][j] === word[0]){
          location.push([i,j])
        }
        word.split('')
        word.shift()
      }
    }
  }

  nextLocation(){
    const direction = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]

    for(i=0; i<direction.length ; i++){
      for(j=0 ; j<direction[i].length ; j++){

      }
    }
  }

  solve(){

  }
}


/*
generate random board
[ [ 'L', 'D', 'Z', 'Z' ],
  [ 'I', 'I', 'U', 'K' ],
  [ 'G', 'X', 'A', 'A' ],
  [ 'R', 'O', 'J', 'R' ] ]

for each word in the dictionary,
for each letter in the word
for each of the coordinate in the board
match the letters using the location variable
if the next letter is not
get starting point by
*/


var newBoard = new Boggle(dictionary)


console.log(newBoard.makeBoard())
