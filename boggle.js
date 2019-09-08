//menggunakan argv, jadi jika input : 6, maka board berukuran 6x6, contoh : node boggle.js 6
class Boogle {
    constructor(arrayData, gameParameter) {
        this.data = arrayData;
        this.input = gameParameter;
    }

    randomHurufNonVokal() {
        //untuk random hurufNonVokal
        let alphabetNonVokal = 'BCDFGHJKLMNPQRSTVWXYZ';
        let randomAlphabetNonVokal = alphabetNonVokal[Math.floor(Math.random() * alphabetNonVokal.length)];
        return randomAlphabetNonVokal;
    };

    randomHurufVokal() {
        //untuk random hurufVokal
        let alphabetVokal = 'AIUEO';
        let randomAlphabetVokal = alphabetVokal[Math.floor(Math.random() * alphabetVokal.length)];
        return randomAlphabetVokal;
    };
    //release 0
    shake() {
        //untuk board
        let inputRowCol = this.input;
        let outputBoard = [];
        for (let i = 0; i < inputRowCol; i++) {
            let tempBoard = [];
            for (let j = 0; j < inputRowCol; j++) {
                //seleksi ketika length genap maka huruf vokal dan sebaliknya
                if (tempBoard.length % 2 === 0) {
                    tempBoard.push(this.randomHurufVokal());
                } else {
                    tempBoard.push(this.randomHurufNonVokal());
                }
            }
            outputBoard.push(tempBoard);
        }
        return outputBoard;
    };
    //release 1
    kamus() {
        let kamus = this.data;
        let listArrKamus = [];
        //memasukan random kata dari data.js ke array listArrKamus
        while (listArrKamus.length <= 5) {
            let randomKata = kamus[Math.floor(Math.random() * kamus.length)];
            listArrKamus.push(randomKata);
        }
        return listArrKamus;
    };
    //release 2
    solver() {
        let board = this.shake();
        let kamus = this.kamus();
        console.log(`Random Kamus From data.js : 
        ${kamus}`);
        console.log(board);
        console.log(`Board ukuran ${this.input}X${this.input}`);
        logic
        for (let i = 0; i < kamus.length; i++) {
            let kata = kamus[i];
            let counterHuruf = 0;
            while (kata.length > 0) {
                let huruf = kata[counterHuruf];
                for (let j = 0; j < board.length; j++) {
                    for (let k = 0; k < board[j].length; k++) {
                        if (huruf === board[j][k]) {
                            let row = j;
                            let col = k;
                            if (this.checkCondition(kata, row, col)) {

                            }
                        }
                    }
                }
            }
        }
    };

    checkCondition(kata, row, col) {
        let board = this.shake();
        let arrayCheck = [];
        for (let i = 1; i < kata.length; i++) {
            let huruf = kata[i];
            let status = true;
            while (status) {
                if (row === 0 && col === 0) {
                    if (board[row][col + 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row + 1][col] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row + 1][col + 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    }
                } else if (row === 0 && col === (this.input - 1)) {
                    if (board[row][col - 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row + 1][col] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row + 1][col - 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    }
                } else if (row === (this.input - 1) && col === 0) {
                    if (board[row - 1][col] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row][col + 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row - 1][col + 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    }
                } else if (row === 0 && col === (this.input - 1)) {
                    if (board[row - 1][col] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row][col + 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    } else if (board[row - 1][col + 1] === huruf) {
                        status = false;
                        arrayCheck.push('ada');
                    }
                }
                status = false;
            }
        }

        return false;
    }

};
//function untuk interface
function setup() {
    let data = require('./data.js');
    let arrayData = data.words;
    let gameParameter = parameter[0];
    let game = new Boogle(arrayData, gameParameter);
    //yg di outputkan :
    game.shake();
    game.solver();

};
//parameter inputan user dari node
var parameter = process.argv.slice(2);
setup();