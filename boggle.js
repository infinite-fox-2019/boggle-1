class Boggle {
    constructor(num) {
        this.dict = require('./data')
        this.num = num
        this.move = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        this.board = this.makeBoard()
    }

    makeBoard() {
        const lib = `abcdefghijklmnopqrstuvwxyz`.toUpperCase()
        let board = []
        for (let i = 0; i < this.num; i++) {
            let row = []
            for (let j = 0; j < this.num; j++) {
                let random = Math.floor(Math.random() * lib.length)
                row.push(lib[random])
            }
            board.push(row)
        }

        return board
    }

    solve() {
        let output = []
        let leng = this.board.length
        for (let i = 0; i < leng; i++) {
            for (let j = 0; j < leng; j++) {
                for (let k = 0; k < this.dict.length; k++) {
                    let word = this.dict[k]
                    if (this.board[i][j] === word[0] && this.line(word, i, j)) {
                        output.push(word)
                    }
                }
            }
        }
        return output
    }

    line(word, coorI, coorJ) {
        if (word.length <= 1) return true
        this.board[coorI][coorJ] = '[-]'

        for (let i = 0; i < this.move.length; i++) {
            let nextI = coorI + this.move[i][0]
            let nextJ = coorJ + this.move[i][1]
            if (this.chekAll(nextI, nextJ, word)) {
                this.board[coorI][coorJ] = word[0]
                return true
            }
        }

        this.board[coorI][coorJ] = word[0]
        return false
    }


    chekAll(nextI, nextJ, word) {
        let len = this.board.length
        if (nextI >= 0 && nextI < len &&
            nextJ >= 0 && nextJ < len &&
            this.board[nextI][nextJ] === word[1] &&
            this.line(word.slice(1), nextI, nextJ)) {
            return true
        }
        return false
    }

    print() {
        console.log(this.board);
        console.log(`\n${this.solve().length} Words Found:\n`);
        console.log(this.solve());
    }

}


let boggleSolver = new Boggle(4)
boggleSolver.print()