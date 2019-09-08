class Boggle {
    constructor(row, col, kamus, dummy) {
        this.kamus = kamus
        this.row = row
        this.col = col
        this.board = this.generateBoard()
        //this.board = dummy
        this.pola = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
    }

    generateBoard() {
        let huruf ="AAAAAAABCDEEEEEEFGHIIIIIIJKLMNOOOOOOPQRSTUUUUUUVWXYZ"
        let board = []
        for(let i=0; i<this.row; i++){
            let line = []
            for(let j=0; j<this.col; j++){
                let randomNum = Math.floor(Math.random()*huruf.length)
                line.push(huruf[randomNum])
            }
            board.push(line)
        }
        return board
    }


    line(word, posI, posJ) {
        if (word.length <= 1) {
            return true
        }
        this.board[posI][posJ] = " "

        for (let i = 0; i < this.pola.length; i++) {
            let rangeI = posI + this.pola[i][0]
            let rangeJ = posJ + this.pola[i][1]
            if (this.checkArea(rangeI, rangeJ, word)) {
                this.board[posI][posJ] = word[0]
                return true
            }
        }

        this.board[posI][posJ] = word[0]
        return false
    }

    checkArea(rangeI, rangeJ, word) {
        if (rangeI >= 0 && rangeI < this.board.length &&
            rangeJ >= 0 && rangeJ < this.board.length &&
            this.board[rangeI][rangeJ] === word[1] &&
            this.line(word.slice(1), rangeI, rangeJ)) {
            return true
        }
        return false
    }

    solve() {
        let hasil = []
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board.length; j++) {
                for (let k = 0; k < this.kamus.length; k++) {
                    let word = this.kamus[k]
                    if (this.board[i][j] === word[0] && this.line(word, i, j)) {
                        hasil.push(word)
                    }
                }
            }
        }
        return hasil
    }

    printHasil(){
        console.log(this.board)
        console.log
        (
        `kata yang ditemukan : ${this.solve().length}\nhasil :  ${this.solve()}`
        )
    }

}

let source=require("./data")
let kamus = source.kata
let dumWords = ["KUDA","AKU", "BARA", "BAKU", "GARUDA"]
const dummy = [
    ["A","B","A","K"],
    ["K","G","A","U"],
    ["U","A","R","D"],
    ["G","W","I","A"]
]


let boggleSolver = new Boggle(4, 4, kamus, dummy)
//console.log(dummy)
console.log(boggleSolver.printHasil())