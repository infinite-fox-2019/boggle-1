'use strict'

const input = process.argv.slice(2);
const row = input[0];
const col = input[1];

const dictionary = require('./data.js').Data;

class Boggle {
  constructor (dictionary, row, col) {
    this.board = this.shake(row, col);
    this.newDictionary = this.filterKamus(dictionary);
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
        debugger
        const randomIndex = Math.floor(Math.random() * 26);
        col.push(reference[randomIndex]);
      }
      row.push(col);
    }
    console.log(`Boggle Board`);
    return row;
  }

  filterKamus (dictionary) {
    const result = [];
    for (let i = 0; i < dictionary.length; i++) {
      if (this.inArray(this.board, dictionary[i][0])) {
        result.push(dictionary[i]);
      }
    }
    return result;
  }

  inArray (array, val) {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        if (val === array[i][j]) {
          return true;
        }
      }
    }
    return false;
  }

  checking () {
    const board = this.board;
    if (this.newDictionary.length == 0) return `Masukkan Kamus`;
    function firstWord (str) {
      const alphabetLocation = [];
      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          debugger;
          if (str[0] === board[i][j]) {
            alphabetLocation.push([i, j]);
          }
        }
      }
      return alphabetLocation;
    }

    const output = []
    for (let i = 0; i < this.newDictionary.length; i++) {
      const str = this.newDictionary[i];
      debugger
      const firstWordLocation = firstWord(str);
      if (firstWordLocation.length > 1) {
        let flag = false;
        let x = 0;
        while (flag === false && x < firstWordLocation.length) {
          if (validasi(str, firstWordLocation[x]) === true) {
            flag = true; 
            debugger;
            output.push(str);
            break;
          }
          x++;
        }
      } else if (firstWordLocation.length === 1) {
        if (validasi(str, firstWordLocation[0]) === true) {
          output.push(str);
        }
      }
    }

    function validasi (word, location) {
      let counter = 0;
      const locationlist = [[location[0], location[1]]];
      let noWord = false;
      while (counter < word.length - 1 && noWord === false) {
        let next = false;
        const x = location[1];
        const y = location[0];
        debugger;
        if (word[counter + 1] === board[y][x + 1] &&board[y][x + 1] !== undefined) {
          debugger;
          let flag = true;
          if (!cekKoordinat(locationlist, y, x + 1)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[1] = x + 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        debugger;
        if (next === false && board[y + 1] !== undefined && word[counter + 1] === board[y + 1][x]) {
          let flag = true;
          if (!cekKoordinat(locationlist, y + 1, x)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[0] = y + 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (next === false && word[counter + 1] === board[y][x - 1] && board[y][x - 1] !== undefined) {
          let flag = true;
          if (!cekKoordinat(locationlist, y, x - 1)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[1] = x - 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (next === false && board[y - 1] !== undefined && word[counter + 1] === board[y - 1][x]) {
          let flag = true;
          if (!cekKoordinat(locationlist, y - 1, x)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[0] = y - 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (next === false && board[y - 1] !== undefined && word[counter + 1] === board[y - 1][x + 1]) {
          let flag = true;
          if (!cekKoordinat(locationlist, y - 1, x + 1)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[0] = y - 1;
            location[1] = x + 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (next === false && board[y + 1] !== undefined && word[counter + 1] === board[y + 1][x + 1]) {
          let flag = true;
          if (!cekKoordinat(locationlist, y + 1, x + 1)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[0] = y + 1;
            location[1] = x + 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (next === false && board[y + 1] !== undefined &&word[counter + 1] === board[y + 1][x - 1]) {
          let flag = true;
          if (!cekKoordinat(locationlist, y + 1, x - 1)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[0] = y + 1;
            location[1] = x - 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (next === false &&board[y - 1] !== undefined && word[counter + 1] === board[y - 1][x - 1]
        ) {
          let flag = true;
          if (!cekKoordinat(locationlist, y - 1, x - 1)) {
            flag = false;
            noWord = true;
          }
          if (flag) {
            debugger;
            next = true;
            noWord = false;
            location[0] = y - 1;
            location[1] = x - 1;
            locationlist.push([location[0], location[1]]);
            counter++;
          }
        }
        if (noWord === true || next === false) {
          return false;
        }
      }
      if (counter === word.length - 1) {
        return true;
      }
      
      function cekKoordinat (arr, y, x) {
        for (let i = 0; i < arr.length; i++) {
          debugger;
          if (arr[i][0] === y && arr[i][1] === x) {
            debugger;
            return false;
          }
        }
        return true;
      }
    }
    console.log(`Result`);
    const result = output.length + ((output.length <= 1) ? ' Kata yang ditemukan: ' : ' Kata yang ditemukan: ');
    return console.log(result, output);
  }
}

const game = new Boggle(dictionary, row, col);
console.log(game.board);
game.checking();