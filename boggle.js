'use strict'

const input = process.argv.slice(2);
const row = input[0];
const col = input[1];

const dictionary = require('./data.js').Data;

class Boggle {
  constructor (dictionary, row, col) {
    this.board = this.shake(row, col);
    this.newDictionary = this.filterDictionary(dictionary);
  }

  shake (num1, num2) {
    if (num1 < 4 || num2 < 4) {
      return `Invalid input. Row and column must be at least 4 in length`;
    }
    const reference = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`;
    const row = [];
    for (let i = 0; i < num1; i++) {
      const col = [];
      for (let j = 0; j < num2; j++) {
        const randomIndex = Math.floor(Math.random() * 26);
        col.push(reference[randomIndex]);
      }
      row.push(col);
    }
    console.log(`Boggle Board `);
    return row;
  }

}

const game = new Boggle(dictionary, row, col)
console.log(game.board)
game.checking();