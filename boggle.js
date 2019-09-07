let data = require('./data');

class Boggle {
    constructor() {
        this.library = this.generateLibrary();
        this.board = [
            ['D', 'G', 'H', 'I'],
            ['K', 'L', 'P', 'S'],
            ['Y', 'E', 'U', 'T'],
            ['E', 'O', 'R', 'N'],
        ];
        this.dictionary = [
            'APPLE', 'SIT', 'TRIP', 'TURN', 'SUPER', 'DLEE', 'DLHSUNROEY'
        ];
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

        return this.board;
    }

    solve() {
        let isVisited = [];
        for(let i = 0; i < this.board.length; i++) {
            isVisited[i] = [];
            for(let j = 0; j < this.board[i].length; j++) {
                isVisited[i].push(false);
            }
        }

        //find every possible words that starts from every cell in board
        for(let i = 0; i < this.board.length; i++) {
            for(let j = 0; j < this.board[i].length; j++) {
                this.findWord(i, j, isVisited, '');
            }
        }
    }

    findWord(x, y, isVisited, strWord) {
        isVisited[x][y] = true;
        strWord += this.board[x][y];

        // console.log(strWord);
        if(this.dictionary.includes(strWord)) {
            if(!this.solutions.includes(strWord)) {
                this.solutions.push(strWord);
                console.log(strWord);
            }
        }

        //continue findWord to 8 cell around current cell
        for(let i = x - 1; i <= x + 1; i++) {
            for(let j = y - 1; j <= y + 1; j++) {
                if(i >= 0 && j >= 0 && i < this.board.length && j < this.board[x].length && !isVisited[i][j]) {
                    // console.log(this.board[i][j])
                    this.findWord(i, j, isVisited, strWord);
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
                // for(let j = 0; j < 4; j++) {
                //     result.push(letter);
                // }
                result.push(letter);
            }
        }
        
        return result;
    }

}

let game = new Boggle();
console.log(game.dictionary);
console.log(game.shake(4));
game.solve();