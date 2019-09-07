const data = require('./data');

class Boogle {
    constructor (data) {
        this.list = data;
        this.realKamus = this.pecahKamus();
        this.games = this.printBoard();
    }

    randWords () {
        let book = 'AAAAAABBCCDDEEEEEEFFGGHHIIIIIJJKKLLMMNNOOOOOOPPQQRRSSTTUUUUUUVVWWXXYYZZ';
        let cetak = [];
        let i = 0;
        while(i<16){
            let j = Math.floor(Math.random() * 71);
            cetak.push(book[j]);
            i++;
        }
        return cetak;
    }
    printKamus () {
        let dasar = []
        for(let i=0; i<this.list.length; i++){
            dasar.push(this.list[i]);
        }
        return dasar;
    }
    pecahKamus () {
        let awal = this.printKamus();
        let count = 0;
        let result = []
        for(let i=0; i<awal.length; i++){
            result.push([])
            for(let j=0; j<awal[i].length; j++){
                result[count].push(awal[i][j])
            }
            count++;
        }
        return result;
    }
    printBoard(){
        let huruf = this.randWords();
        // let cetak = [];    
        let papan = []
        let count = 0;
        for(let i=0; i<4; i++){
            papan.push([]);
            for(let j=0; j<4; j++){
                papan[i].push(huruf[count]);
                count++;
            }
        }
        return papan;
    }
    check () {
        let kams = this.realKamus;
        let bord = this.games;
        let index = [];
        let tamp = ''
        let k = 0;
        while(k)
        for(let i=0; i<bord.length; i++) {
            for(let j=0; j<bord[i].length; j++) {
                if(this.checkPos( kams, i , j )) {
                    tamp += bord[i][j];
                    break;
                }
            }
        }
        return tamp;
    }
    checkPos ( kms, i , j ) {
        // for(let i=0; i<brd.length; i++) {
            // for(let j=0; j<brd[i].length; j++) {
                let check = false;
                if( i === 0 && j === 0 ) { //check kanan 2x2 ;
                    if( this.games[i][j+1] === kms[0] || this.games[i+1][j+1] === kms[0] || this.games[i+1][j] === kms[0] ) check = true;
                }
                if( i === 0 && j === 3 ) { // check kiri 2x2 ;
                    if( this.games[i][j-1] === kms[0] || this.games[i+1][j-1] === kms[0] || this.games[i+1][j] === kms[0] ) check = true;
                }
                if( i === 3 && j === 0 ) { // check kanan atas 2x2 ;
                    if( this.games[i-1][j] === kms[0] || this.games[i-1][j+1] === kms[0] || this.games[i][j+1] === kms[0] ) check = true;
                }
                if( i === 3 && j === 3 ) { // check kiri atas 2x2 ;
                    if( this.games[i][j-1] === kms[0] || this.games[i-1][j-1] === kms[0] || this.games[i-1][j] === kms[0] ) check = true;
                }
                if( i === 0 && j === 1 || j === 2 ) { //check kiri, kanan, bawah ;
                    if( this.games[i][j-1] === kms[0] || this.games[i][j+1] === kms[0] || this.games[i+1][j-1] === kms[0] || this.games[i+1][j] === kms[0] || this.games[i+1][j+1] === kms[0] ) check = true;
                }
                if( i === 3 && j === 1 || j === 2 ) { //check kiri, kanan, atas ;
                    if( this.games[i-1][j-1] === kms[0] || this.games[i-1][j+1] === kms[0] || this.games[i][j+1] === kms[0] || this.games[i][j-1] === kms[0] || this.games[i][j] === kms[0] ) check = true;
                }
                if( i === 1 || i === 2 && j === 0 ) { //check atas, bawah, kanan ;
                    if( this.games[i-1][j] === kms[0] ||this.games[i+1][j] === kms[0] ||this.games[i][j+1] === kms[0] ||this.games[i-1][j+1] === kms[0] ||this.games[i+1][j+1] === kms[0] ) check = true;
                }
                if( i === 1 || i === 2 && j ===3 ) { //check atas, bawah, kiri ;
                    if( this.games[i-1][j] === kms[0] ||this.games[i+1][j] === kms[0] ||this.games[i][j-1] === kms[0] ||this.games[i-1][j-1] === kms[0] ||this.games[i+1][j-1] === kms[0] ) check = true;
                }
                if( i === 1 && j === 1 || i === 1 && j === 2 || i === 2 && j === 1 || i === 2 && j ===2 ) {
                    if( this.games [i][j-1] === kms[0] ||this.games [i][j+1] === kms[0] ||this.games [i-1][j] === kms[0] ||this.games [i+1][j] === kms[0] ||this.games [i-1][j-1] === kms[0] ||this.games [i+1][j+1] === kms[0] ||this.games [i+1][j-1] === kms[0] ||this.games [i-1][j+1] === kms[0] ) check = true;
                }
                if( check ) {
                    return [i,j]
                }else {
                    return 'tidak menemukan apa2 silakan coba lagi';
                }
            // }
        // }
    }
}

const game = new Boogle (data);
// console.log(game.printKamus());
// console.log(game.pecahKamus());
console.log(game.realKamus)
console.log(game.games)
console.log(game.check());
// console.log(game)