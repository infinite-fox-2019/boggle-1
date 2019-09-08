
var dictionary = require('./data');



class Boggle {
    constructor (num) {
        this.board = this.generateBoard(num)
        // this.words = require('./data');
        this.words = ['AYAM','TELOR','MAMA','PAPA','TIDUR']
        this.result = this.solve()
    }

    generateBoard(num) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        let board = []
        for(let i = 0 ; i < num ; i++){
            let temp = []
            for(let j = 0 ; j < num ; j++){
                temp.push(alphabet[Math.floor(Math.random() * alphabet.length)])
            }
            board.push(temp)
        }
        return board
    }

    solve(){
        let base = this.board
        let words = this.words
        let result = []
        for(let i = 0 ; i < words.length; i++){
            for( let j = 0 ; j < base.length; j++){
                for( let k = 0 ; k <base[j].length; k++){
                    if(base[j][k] === words[i][0]){
                        let start = [[j,k]]
                        let found = this.checkBoard(base, words[i].slice(1), j ,k , start)
                        if(found === true){
                            result.push(words[i])
                        }
                    }
                }
            }
        }
        return result
    }

    checkBoard(board, words, row, col, start){
        if(words.length < 1){
            return true
        }else{
            let rowCheck = row-1
            let colCheck = col-1

            for(let i = 0 ; i < rowCheck+3; i++){
                for(let j = 0 ; j < colCheck+3; j++){
                    if(i > 0 && j > 0 && i< board.length && j < board[0].length){
                        let pass = true
                        for(let k = 0; k < start.length; k++){
                            if(start[k][0] === i && start[k][1] === j){
                                pass = false
                            }
                        }
                        if(pass === true){
                            if(words[0] === board[i][j]){
                                start.push([i,j])
                                return true && this.checkBoard(board, words.slice(1), i, j , start)
                            }
                        }
                    }
                }
            }
            return false
        }
    }   
}





let game = new Boggle(8)
console.log(game.board)
console.log(game.result)


 