let data = require('./data');

class Boggle {
    constructor() {
        this.library = this.generateLibrary();
        this.board = [];
        this.words = data.words;
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
        return result;
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
console.log(game.shake(4));