const library = require('./data')

class Boggle {
    constructor(library){
        this.board= this.board(4)
        this.library = library
    }

    printBoard() {
        let box = ''
        let line = ''
        for (let i = 0; i < this.board.length; i++) {
            line += '===='
            let row = '|'
            this.board[i].forEach(el => {
                row += ` ${el} |`
            })
            if (i === this.board.length - 1) {
                box += row
            } else {
                box += row + '\n'
            }
        }
        console.log(line);
        console.log(box);
        console.log(line);

    }

    shake () {
        let board = this.board
        let counter = 0
        let words = []
        for (let i = 0; i < this.library.length; i++) {
            if (this.solve(this.library[i], board)) {
                words.push(this.library[i])
                counter++
            }
        }
        return {words, counter }
    }

    solve (word, board) {

        let track = []

        track.push(firstLetter(word, board))
        if (track[0] === false) return false
        word = word.slice(1)
        for (let i = 0; i < word.length; i++) {
            let coord = track[track.length - 1]
            let leftWord = word[i]
            if (word[i] === undefined) {
                return false
            }
            if (N(coord, leftWord) && checkTrack(track, N(coord, leftWord))) {
                track.push(N(coord, leftWord))
            } else if (W(coord, leftWord) && checkTrack(track, W(coord, leftWord))) {
                track.push(W(coord, leftWord))
            } else if (E(coord, leftWord) && checkTrack(track, E(coord, leftWord))) {
                track.push(E(coord, leftWord))
            } else if (S(coord, leftWord) && checkTrack(track, S(coord, leftWord))) {
                track.push(S(coord, leftWord))
            } else if (SW(coord, leftWord) && checkTrack(track, SW(coord, leftWord))) {
                track.push(SW(coord, leftWord))
            } else if (NW(coord, leftWord) && checkTrack(track, NW(coord, leftWord))) {
                track.push(NW(coord, leftWord))
            } else if (EW(coord, leftWord) && checkTrack(track, EW(coord, leftWord))) {
                track.push(EW(coord, leftWord))
            } else if (SE(coord, leftWord) && checkTrack(track, SE(coord, leftWord))) {
                track.push(SE(coord, leftWord))
            } else {
                i -= 2
                track.push(track[track.length - 2])
            }
        }
        return true

        function firstLetter(word, board) {
            for (let i = 0; i < word.length; i++) {
                for (let j = 0; j < board.length; j++) {
                    for (let k = 0; k < board[j].length; k++) {
                        if (board[j][k] === word[i]) {
                            return { row: j, col: k }
                        }
                    }
                }
            }
            return false
        }

        function N(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (row > 0) {
                if (board[row - 1][col] === letter) return { row: row - 1, col: col }
                else return false
            } else {
                return false
            }
        }
        function S(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (row < board.length - 1) {
                if (board[row + 1][col] === letter) return { row: row + 1, col: col }
                else return false
            } else {
                return false
            }
        }
        function E(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (col < board[0].length - 1) {
                if (board[row][col + 1] === letter) return { row: row, col: col + 1 }
                else return false
            } else {
                return false
            }
        }
        function W(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (col > 0) {
                if (board[row][col - 1] === letter) return { row: row, col: col - 1 }
                else return false
            } else {
                return false
            }
        }
        function SW(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (row < board.length - 1 && col > 0) {
                if (board[row + 1][col - 1] === letter) return { row: row + 1, col: col - 1 }
                else return false
            } else {
                return false
            }
        }
        function NW(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (row > 0 && col > 0) {
                if (board[row - 1][col - 1] === letter) return { row: row - 1, col: col - 1 }
                else return false
            } else {
                return false
            }
        }
        function EW(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (row > 0 && col < board.length - 1) {
                if (board[row - 1][col + 1] === letter) return { row: row - 1, col: col + 1 }
                else return false
            } else {
                return false
            }
        }
        function SE(coord, letter) {
            let row = coord.row
            let col = coord.col
            if (row < board.length - 1 && col < board.length - 1) {
                if (board[row + 1][col + 1] === letter) return { row: row + 1, col: col + 1 }
                else return false
            } else {
                return false
            }
        }
        function checkTrack(track, coord) {
            let row = coord.row
            let col = coord.col
            for (let i = 0; i < track.length; i++) {
                if (track[i].row === row && track[i].col === col) {
                    return false
                }
            }
            return true
        }
    }

    board (dim) {
        const alphabet = 'AAAABCDEEEFGHIIIIJKLMNOOOPQRSTUUUVWXYZ';
        let boggleBoard = [];
        for (let i = 0; i < dim; i++) {
            boggleBoard.push([])
            for (let j = 0; j < dim; j++) {
                let random = Math.floor(Math.random() * alphabet.length-1)
                boggleBoard[i].push(alphabet[random])
            }
        }
        return boggleBoard;
    }
}

const game = new Boggle (library)
game.printBoard()
console.log(game.shake())
