class Boggle {
    constructor() {
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.wordsLibrary = require('./data');
        this.board = [];
        this.result = [];
    }

    shake() {
        for(let i = 0; i < 4; i++) {
          this.board.push([]);
          for(let j = 0; j < 4; j++) {
            this.board[i].push(this.alphabet.charAt(Math.floor(Math.random() * this.alphabet.length)));
          }
        }
        return this.board;
      }

    wordsFinder() {
        this.shake();
        console.table(this.board);
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                for (let k = 0; k < this.wordsLibrary.length; k++) {
                    if (this.board[i][j] === this.wordsLibrary[k][0]) {
                        this.solve(i, j, this.wordsLibrary[k])
                    }
                }
            }
        }
        console.log(`${this.result.length} word(s) found: \n${this.result}`);
    }

    solve(coordinateI, coordinateJ, word) {
        const coordinates = [
            [-1, 0], // up
            [-1, 1], // up right
            [0, 1], // right
            [1, 1], // down right
            [1, 0], // down
            [1, -1], // down left
            [0, -1], // left
            [-1, -1] // up left
        ]

        let flag = true;
        let count = 1;
        let history = [];

        while (flag) {
            let isFound = false;
            for(let i = 0; i < coordinates.length; i++) {
                let currentI = coordinateI + coordinates[i][0];
                let currentJ = coordinateJ + coordinates[i][1];

                if(currentI >=0 && currentI < this.board.length && currentJ >= 0 && currentJ < this.board.length) {
                    if(this.board[currentI][currentJ] === word[count]) {
                        history.push([[coordinateI, coordinateJ], this.board[coordinateI][coordinateJ]]);
                        this.board[coordinateI][coordinateJ] = ' ';
                        coordinateJ = currentJ;
                        coordinateI = currentI;
                        count++
                        isFound = true;
                        break;
                    }
                }
            }
            if(isFound === false) {
                flag = false;
            }
            if(count === word.length) {
                flag = false;
                this.result.push(word);
            }
        }
        for(let i = 0; i < history.length; i++) {
            this.board[history[i][0][0]][history[i][0][1]] = history[i][1];
        }
    }

}

let game = new Boggle()

game.wordsFinder();