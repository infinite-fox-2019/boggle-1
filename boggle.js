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
        let result = [];
        let board = this.shake();
        let kamus = this.kamus();
        console.log(`Random Kamus From data.js : 
        ${kamus}`);
        console.log(board);
        console.log(`Board ukuran ${this.input}X${this.input}`);
        console.log(`kata yg di temukan : `)
        //logic
        for (let i = 0; i < kamus.length; i++) {
            var kata = kamus[i];
            var statusKata = true;
            while (statusKata) {
                if (this.checkStatusCondition(kata)) {
                    statusKata = false;
                }
            }
            if (statusKata === false) {
                result.push(kata);
            }
        }
    };

    checkStatusCondition(kata) {
        let board = this.shake();
        var newKata = kata;

        for (let i = 1; i < newKata.length; i++) {
            let huruf = newKata[i];
            for (let j = 0; j < board.length; j++) {
                for (let k = 0; k < board[j].length; k++) {
                    let indexBoardNow = board[j][k];
                    if (indexBoardNow === huruf) {
                        let posRow = j;
                        let posCol = k;
                        let checkArrAda = this.checkNextIndexCondition(posRow, posCol, newKata);
                        if (checkArrAda.length === newKata.length) {
                            return true;
                        }
                        return false;
                    }
                }
            }
        }
    }

    checkNextIndexCondition(posRow, posCol, newKata) {
        var board = this.shake();
        let counterKata = 0;
        var row = posRow;
        var col = posCol;
        var listAda = [];
        while (counterKata < newKata.length - 1) {
            debugger;
            var newRow = row;
            var newCol = col;
            if (newRow === 0 && newCol === 0) {
                if (board[newRow][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                }
            }
            //pojok kanan atas
            else if (newRow === 0 && newCol === (this.input - 1)) {
                if (board[newRow][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                }
            }
            //pojok kiri bawah
            else if (newRow === (this.input - 1) && newCol === 0) {
                if (board[newRow - 1][newCol] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                }
            }
            //pojok kanan bawah
            else if (newRow === 0 && newCol === (this.input - 1)) {
                if (board[newRow - 1][newCol] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                }
            }
            //samping kiri
            else if (newRow !== 0 || newRow !== (this.input - 1) && newCol === 0) {
                if (board[newRow - 1][newCol] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol;
                    listAda.push('ada');
                }
            }
            //atas
            else if (newCol !== 0 || newCol !== (this.input - 1) && newRow === 0) {
                if (board[newRow][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol + 1;
                    listAda.push('ada');
                }
            }
            //samping kanan
            else if (newRow !== 0 || newRow !== (this.input - 1) && newCol === (this.input - 1)) {
                if (board[newRow - 1][newCol] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol;
                    listAda.push('ada');
                }
            }
            //bawah
            else if (newCol !== 0 || newCol !== (this.input - 1) && newRow === (this.input - 1)) {
                if (board[newRow][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol + 1;
                    listAda.push('ada');
                }
            } else {
                if (board[newRow - 1][newCol] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol + 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol + 1;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol;
                    listAda.push('ada');
                } else if (board[newRow + 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow + 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow;
                    newCol = newCol - 1;
                    listAda.push('ada');
                } else if (board[newRow - 1][newCol - 1] === newKata[counterKata]) {
                    newRow = newRow - 1;
                    newCol = newCol - 1;
                    listAda.push('ada');
                }
            }
            counterKata++
        }
        return listAda;
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