class Boggle {
    constructor() {
        this.wordsLibrary = require('./data');
        this.boardDisplay = [];
        this.alphabethVokal = 'AIUEO';
        this.alphabethConst = 'BCDFGHJKLMNPQRSTVWXYZ';
        this.result = [];
    }
    randomAlphabethVokal() {
        let randomVokal = Math.floor(Math.random() * 5);
        return this.alphabethVokal[randomVokal];
    }
    randomAlphabethConst() {
        let randomConst = Math.floor(Math.random() * 21);
        return this.alphabethConst[randomConst];
    }
    board() {
        for (let i = 0; i < 4; i++) {
            this.boardDisplay.push([]);
            for (let j = 0; j < 4; j++) {
                this.boardDisplay[i].push(this.randomAlphabethConst());
            }
        }
        for (let i = 0; i < 4; i++) {
            let index = Math.floor(Math.random() * 4);
            this.boardDisplay[i][index] = this.randomAlphabethVokal();
        }

    }
    wordsFinder() {
        this.board();
        for (let i = 0; i < this.boardDisplay.length; i++) {
            for (let j = 0; j < this.boardDisplay[i].length; j++) {
                for (let k = 0; k < this.wordsLibrary.length; k++) {
                    if (this.boardDisplay[i][j] === this.wordsLibrary[k][0]) {
                        this.solve(i, j, this.wordsLibrary[k])
                    }
                }
            }
        }
        console.log(`\n╔🧡 💛 💚 💙 💙 💜 🧡 ╗\n║    B💟 ggle   ║\n╚══════════════╝`);
        console.table(this.boardDisplay);
        console.log(`\n╔══════════════╗\n║💟  Result💯  💟 ║\n╚══════════════╝`);
        console.log(this.result);
    }
    solve(indeksI, indeksJ, word) {
        const coordinates = [[-1, 0],[-1, 1],[0, 1],[1, 1],[1, 0],[1, -1],[0, -1],[-1, -1]];
        let flag = true;
        let count = 1;
        let history = [];
        while (flag) {
            let isFind = false;
            for (let i = 0; i < coordinates.length; i++) {
                let currentI = indeksI + coordinates[i][0];
                let currentJ = indeksJ + coordinates[i][1];
                if (currentI >= 0 && currentI < this.boardDisplay.length && currentJ >= 0 && currentJ < this.boardDisplay.length) {
                    if (this.boardDisplay[currentI][currentJ] === word[count]) {
                        history.push([[indeksI, indeksJ],this.boardDisplay[indeksI][indeksJ]]);
                        this.boardDisplay[indeksI][indeksJ] = ' ';
                        indeksJ = currentJ;
                        indeksI = currentI;
                        count++
                        isFind = true;
                        break;
                    }
                }
            }
            if (isFind === false) {
                flag = false;
            }
            if (count === word.length) {
                flag = false;
                this.result.push(word);
            }
        }
        for (let i = 0; i < history.length; i++) {
            this.boardDisplay[history[i][0][0]][history[i][0][1]] = history[i][1];
        }
    }
}
let game = new Boggle()
game.wordsFinder();
