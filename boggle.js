"use strict"

class Boggle {
  constructor(dictionary) {
    this.listWords = [dictionary[0], dictionary[30260]]; 
    this.randomBoard = //this.shake(4) //use method shake to generate random Board
    [
      [ 'M', 'F', 'Z', 'G' ],
      [ 'A', 'U', 'S', 'Q' ],
      [ 'L', 'B', 'A', 'S' ],
      [ 'V', 'R', 'P', 'B' ] 
    ];
  }

  valid(word) {
    let isWords = [];
    for (let i = 0; i < this.randomBoard.length; i++) {
      for (let j = 0; j < this.randomBoard[i].length; j++) {
        if (this.randomBoard[i][j] === word[0]) {
          isWords.push([word[0], [i, j]]);
          this.randomBoard[i][j] = '0';
          j = this.randomBoard[i].length;
          i = this.randomBoard.length-1;
        }
      }
    }
    if (isWords[isWords.length-1]) {
      for (let i = 1; i < word.length; i++) {
        let row = isWords[isWords.length-1][1][0];
        let col = isWords[isWords.length-1][1][1];
        for (let j = row-1; j <= row+1; j++) {
          for (let k = col-1; k <= col+1; k++) {
            if (j >= 0 && j < this.randomBoard.length && k >= 0 && k < this.randomBoard.length) {
              if (this.randomBoard[j][k] === word[i]) {
                isWords.push([word[i], [j, k]]);
                this.randomBoard[j][k] = '0';
                k = col+1;
                j = row+1;
              }
            }
          }
        }
      }
    }
    let strCheck = '';
    for (let i = 0; i < isWords.length; i++) {
      strCheck += isWords[i][0];
    }
    for (let i = 0; i < isWords.length; i++) {
      this.randomBoard[isWords[i][1][0]][isWords[i][1][1]] = isWords[i][0];
    }
    if (strCheck === word) {
      return true;
    } else {
      return false;
    }
  }

  solve() {
    let foundWords = [];
    let notFoundWords = [];
    for (let i = 0; i < this.listWords.length; i++) {
      if (this.valid(this.listWords[i])) {
        foundWords.push(this.listWords[i]);
      } else {
        notFoundWords.push(this.listWords[i]);
      }
    }
    return foundWords;
  }

  shake(size) {
    let alphabets = [];
    for (let i = 0; i < 26; i++) {
      alphabets.push(String.fromCharCode(65+i));
    }
    let board = [];
    for (let i = 0; i < size; i++) {
      let rowBoard = [];
      for (let j = 0; j < size; j++) {
        rowBoard.push(alphabets[(Math.floor(Math.random() * 26))]);
      }
      board.push(rowBoard);
    }
    return board;
  }

  printResult () {
    for (let i = 0; i < this.randomBoard.length; i++) {
      console.log(this.randomBoard[i].join('|'));
    }
    console.log('');
    let found = this.solve();
    console.log(`${found.length} words found:`);
    for (let i = 0; i < found.length; i++) {
      console.log(found[i]);
    }
  }
}


var dictionary = require('./data');
var game = new Boggle(dictionary)

// game.shake(4);

// game.solve();
game.printResult();