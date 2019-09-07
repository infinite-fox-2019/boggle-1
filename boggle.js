let data = require('./data');

class Boggle {
    constructor() {
        this.library = this.generateLibrary();
        this.board = [];
        this.dictionary = data.words;
        this.solutions = [];
    }

    shake(side) {
        let result = [];
        for(let i = 0; i < side; i++) {
            result[i] = [];
            for(let j = 0; j < side; j++) {
                let randomIndex = Math.floor(Math.random() * Math.floor(this.library.length));
                result[i].push(this.library[randomIndex]);
            }
        }

        this.board = result;
        console.log(result);
    }

    solve() {
        //generate flag isVisited that mirrors the board and set all value to false
        let isVisited = [];
        for(let i = 0; i < this.board.length; i++) {
            isVisited[i] = [];
            for(let j = 0; j < this.board[i].length; j++) {
                isVisited[i].push(false);
            }
        }

        //loop every cell in board to find words that starts with the cell's letter value
        for(let i = 0; i < this.board.length; i++) {
            for(let j = 0; j < this.board[i].length; j++) {
                this.findWord(i, j, isVisited, '');
            }
        }
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

        //continue findWord to 8 cell around current cell
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) {
                if(i >= 0 && j >= 0 && i < this.board.length && j < this.board[x].length && !isVisited[i][j]) {
                    // console.log(this.board[i][j])
                    this.findWord(i, j, isVisited, word);
                }
            }
        }

        isVisited[x][y] = false;
    }

    generateLibrary() {
        let result = [];
        let vowels = ['A', 'E', 'I', 'U', 'O'];
        for(let i = 0; i < 26; i++) {
            let letter = String.fromCharCode(65 + i);
            result.push(letter);
            if(vowels.includes(letter)) {
                for(let j = 0; j < 4; j++) {
                    result.push(letter);
                }
                result.push(letter);
            }
        }
        
        return result;
    }

}

let game = new Boggle();
game.shake(4);
game.solve();