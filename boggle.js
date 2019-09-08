const data = require("./data");

class Boggle {
  constructor() {
    this.board = this.generateBoard();
    this.word = data;
  }

  generateBoard() {
    let alphabet = "AAAAAAAABBBCCDDEEEEEEFFFHHHIIIIIJJLKMMMNNOPPPQQRRSTTUUUUUUVVVWWXXYYZZ";
    let board = [];
    let temp = [];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        temp.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
      }
      board.push(temp);
      temp = [];
    }
    return board;
  }

  checkFirstLetter(board,word,track) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] == word[0]) {
          track.push({ row: i, col: j, letter: word[0] });
          return { row: i, col: j };
        }
      }
    }
    return false
  }

  result(word){
    let track = []
    let string = word
    if (this.checkFirstLetter(this.board, string,track) === false) {
      return false
    }
    string = string.slice(1);
    for (let i = 0; i < string.length; i++) {
      if (this.check(track[track.length - 1], string[i]) && this.checkTrack(track, (this.check(track[track.length - 1], string[i])))
      ) {
        track.push(this.check(track[track.length - 1], string[i]));
      } else {
        i-=2;
        track.push(track[track.length-2]);
        if (i < 0){
          return false
        }
      }
    }
  }

  solve(){
    let total = []
    let kata = this.word
    let board = this.board
    let counter = 0
    for ( let i = 0; i< kata.length;i++){
      if (this.result(kata[i]) !== false){
        total.push(kata[i])
        counter++
      }
    }
    return {board,total,counter}
  }

  check(koordinat, letter) {
    if (this.topRight(koordinat, letter)) {
      return this.topRight(koordinat, letter);
    } else if (this.right(koordinat, letter)) {
      return this.right(koordinat, letter);
    } else if (this.bottomRight(koordinat, letter)) {
      return this.bottomRight(koordinat, letter);
    } else if (this.bottom(koordinat, letter)) {
      return this.bottom(koordinat, letter);
    } else if (this.bottomLeft(koordinat, letter)) {
      return this.bottomLeft(koordinat, letter);
    } else if (this.left(koordinat, letter)) {
      return this.left(koordinat, letter);
    } else if (this.topLeft(koordinat, letter)) {
      return this.topLeft(koordinat, letter);
    } else if (this.top(koordinat, letter)) {
      return this.top(koordinat, letter);
    } else {
      return false;
    }
  }

  checkTrack(track, koordinat) {
    let row = koordinat.row;
    let col = koordinat.col;
    for (let i = 0; i < track.length; i++) {
      if (track[i] === undefined){
        return false;
      }
      if (track[i].row === row && track[i].col === col) { 
        return false;
      }
    }
    return true;
  }

  top(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (row > 0) {
      if (this.board[row - 1][col] === letter) {
        return { row: row - 1, col: col, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  topRight(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (row > 0 && col < this.board.length - 1) {
      if (this.board[row - 1][col + 1] === letter) {
        return { row: row - 1, col: col + 1, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  right(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (col < this.board.length - 1) {
      if (this.board[row][col + 1] === letter) {
        return { row: row, col: col + 1, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  bottomRight(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (row < this.board.length - 1 && col < this.board.length - 1) {
      if (this.board[row + 1][col + 1] === letter) {
        return { row: row + 1, col: col + 1, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  bottom(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (row < this.board.length - 1) {
      if (this.board[row + 1][col] === letter) {
        return { row: row + 1, col: col, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  bottomLeft(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (row < this.board.length - 1 && col > 0) {
      if (this.board[row + 1][col - 1] === letter) {
        return { row: row + 1, col: col - 1, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  left(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (col > 0) {
      if (this.board[row][col - 1] === letter) {
        return { row: row, col: col - 1, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  
  topLeft(koordinat, letter) {
    let row = koordinat.row;
    let col = koordinat.col;
    if (col > 0 && row > 0) {
      if (this.board[row - 1][col - 1] === letter) {
        return { row: row - 1, col: col - 1, letter };
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}

let game = new Boggle();
console.log(game.solve())
