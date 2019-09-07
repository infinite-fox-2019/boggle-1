const dictionary = require('./data.js')

class Boggle {
    constructor(size, libary) {
        this.size = size;
        this.libary = libary
        this.board = this.generateBoard()
        this.move = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ]
    }


    generateBoard() {
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let result = [];

        for (let i = 0; i < this.size; i++) {
            let row = []
            for (let j = 0; j < this.size; j++) {
                let randomLetter = letters[Math.floor(Math.random() * letters.length)]

                row.push(randomLetter)
            }
            result.push(row)
        }

        return result
    }

    solve() {
        let result = []

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                for (let k = 0; k < this.libary.length; k++) {
                    let word = this.libary[k]

                    if (word[0] === this.board[i][j] && this.checkVal(word, i, j)) {
                        result.push(word)
                    }
                }
            }
        }
        return result
    }

    checkVal(word, row, col) {

        if (word.length <= 1) return true
        this.board[row][col] = '#'


        for (let i = 0; i < this.move.length; i++) {
            let newRow = row + this.move[i][0]
            let newCol = row + this.move[i][0]

            if (newRow >= 0 && newRow < this.board.length && newCol >= 0 && newCol < this.board.length) {

                if (this.board[newRow][newCol] === word[1] && this.checkVal(word.slice(1), newRow, newCol)) {
                    this.board[row][col] = word[0]
                    return true
                }
            }
        }

        this.board[row][col] = word[0]
        return false

    }

    printBoard() {
        let result = ''
        let line = ''
        for (let i = 0; i < this.board.length; i++) {
            line += '===='
            let row = '|'
            this.board[i].forEach(el => {
                row += ` ${el} |`
            })
            if (i === this.board.length - 1) {
                result += row
            } else {
                result += row + '\n'
            }
        }
        console.log(line);
        console.log(result);
        console.log(line);

    }
}

const game = new Boggle(4, dictionary)

game.printBoard()
console.log(game.solve());
// console.log(game.board);



