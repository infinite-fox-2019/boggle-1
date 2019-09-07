const dictionary = require('./data')

class Boogle {
    constructor(kamus){
        this.boardPrint = this.board(kamus)
    }
    
    board(kamus){
        console.log(kamus);
    }
}

let game = new Boogle(dictionary)

console.log(game.boardPrint);

