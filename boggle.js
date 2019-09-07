const dictionary = require('./data.js').Data;

class Boggle {
    constructor (dictionary) {
        this.dictionary = dictionary;
        this.boardDisplay = [];
        this.alphabethVokal = 'AIUEO';
        this.alphabethConst = 'BCDFGHJKLMNPQRSTVWXYZ';
    }
    randomAlphabethVokal () {
        let randomVokal = Math.floor(Math.random()*5);
        return this.alphabethVokal[randomVokal];
    }
    randomAlphabethConst () {
        let randomConst = Math.floor(Math.random()*21);
        return this.alphabethConst[randomConst];
    }
    board () {
        for (let i = 0; i < 8; i++) {
            this.boardDisplay.push([]);
            for (let j = 0; j < 8; j++) {
                this.boardDisplay[i].push(this.randomAlphabethConst());
            }
        }
        let count = 0;
        while (count < 2) {
            for (let i = 0; i < 8; i++) {
                let index = Math.floor(Math.random()*4);
                    this.boardDisplay[i][index] = this.randomAlphabethVokal();
                }
            count++;
        }
        console.log(`\n╔══════════════╗\n║ Boggle Board ║\n╚══════════════╝`);
        return this.boardDisplay;
    }
    joinBoard () {
        this.board();
        let result = [];                
        for (let i = 0; i < this.boardDisplay.length; i++) {
            result.push(this.boardDisplay[i].join('|'));
            
        }
        console.table(result);
        console.log(`╔════════╗\n║ Result ║\n╚════════╝`);
        // return result;
    }
}
let game = new Boggle (dictionary);
// console.log(game.board());
game.joinBoard();

 