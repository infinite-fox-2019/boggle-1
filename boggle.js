let data = require('./data');

class Boggle {
    constructor() {
        this.library = [];
        this.dictionary = data.words;
        this.board = [];
        this.letters = [];
        this.solutions = [];
    }

    shake(side) {
        this.generateLibrary(side);

        let result = [];
        for(let i = 0; i < side; i++) {
            result[i] = [];
            for(let j = 0; j < side; j++) {
                let randomIndex = Math.floor(Math.random() * Math.floor(this.library.length));
                result[i].push(this.library[randomIndex]);
                this.letters.push(this.library[randomIndex]);
            }
        }

        this.board = result;
        console.log(result);
    }

    solve() {
        this.trimDictionary();
        console.log('solution:');

        //generate flag isVisited that mirrors the board and set all value to false
        let isVisited = [];
        for(let i = 0; i < this.board.length; i++) {
            isVisited[i] = [];
            for(let j = 0; j < this.board[i].length; j++) {
                isVisited[i].push(false);
            }
        }

        // loop every cell in board to find words that starts with the cell's letter value
        for(let i = 0; i < this.board.length; i++) {
            for(let j = 0; j < this.board[i].length; j++) {
                this.findWord(i, j, isVisited, '');
            }
        }

        console.log(`${this.solutions.length} words found!`);
    }

    findWord(x, y, isVisited, word) {
        isVisited[x][y] = true;
        word += this.board[x][y];

        if(this.dictionary.includes(word)) {
            if(!this.solutions.includes(word)) {
                this.solutions.push(word);
                console.log(word);
            }
        }

        //continue findWord to 8 cells around current cell
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) {
                if(i >= 0 && j >= 0 && i < this.board.length && j < this.board[x].length && !isVisited[i][j]) {
                    this.findWord(i, j, isVisited, word);
                }
            }
        }

        isVisited[x][y] = false;
    }

    trimDictionary() {
        for(let i = this.dictionary.length; i >= 0; i--) {
            if(!this.isPossibleSolution(String(this.dictionary[i]))) {
                this.dictionary.splice(i, 1);
            }
        }
    }

    isPossibleSolution(word) {
        let pattern = this.letters.slice('');
        for(let i = 0; i < word.length; i++) {
            if(pattern.indexOf(word[i]) >= 0) {
                pattern.splice(pattern.indexOf(word[i]), 1);
            } else {
                return false;
            }
        }
        return true;
    }    

    generateLibrary(side) {
        let result = [];
        for(let i = 0; i < 26; i++) {
            let letter = String.fromCharCode(65 + i);
            result.push(letter);
        }
        
        this.library = result;
    }

}

let game = new Boggle();
game.shake(4);
game.solve();
