const data = require('./data');

class Boogle {
    constructor (data) {
        this.list = data;
        // this.kamus = this.printKamus();
        this.games = [];
        this.resultt = [];
    }
    // printKamus () {
    //     let dasar = []
    //     for(let i=0; i<this.list.length; i++){
    //         // let worddd = this.list;
    //         // let randomm = Math.floor(Math.random() * (worddd.length));
    //         // let so = worddd[randomm]
    //         dasar.push(this.list[i]);
    //     }
    //     // let dasar = ['DOG','FAT','CAR','DO','FIT','AS','BA','CS']
    //     return dasar;
    // }
    shake () {
        // let result = []
        //[['D','O','A','V'],['G','G','G','S'],['D','T','A','F'],['E','O','T','A'],];
        for(let i=0; i<4; i++){
            this.games.push([]);
            for(let j=0; j<4; j++){
                let kamus = 'AAAAAAAAAABBCCDDEEEEEEEEEEEFFGGHHIIIIIIIIIIJJKKLLMMNNOOOOOOPPQQRRSSTTUUUUUUVVWWXXYYZZ';
                let random = Math.floor(Math.random() * (kamus.length))
                let hasRand = kamus[random];
                this.games[i].push(hasRand);
            }
        }
        return this.games;
    }
    // takeIndex ( tempI ,tempJ ) {
    //     let nameWay = [];
    //     let indexi = tempI;
    //     let indexj = tempJ;
    //     let i = 0;
    //     while( i < 8 ) {
    //         indexi += this.arah[i].i;
    //         indexj += this.arah[i].j;
    //         if(this.games[indexi] === undefined || this.games[indexj] === undefined ) {
    //             indexi = tempI;
    //             indexj = tempJ;
    //             i++;
    //         }
    //         else{
    //             nameWay.push({i : this.arah[indexi].i, j : this.arah[indexj].j });
    //             indexi = tempI;
    //             indexj = tempJ;
    //             i++
    //         }
    //     }
    //     return nameWay;
    // }
    finder () {
        this.shake();
        console.table(this.games)
        for( let i=0; i<this.games.length; i++ ) {
            for( let j=0; j<this.games[i].length; j++ ) {
                for( let k=0; k<this.list.length; k++ ) {
                    if( this.games[i][j] === this.list[k][0] ) {
                        this.solve( i , j , this.list[k] );
                    }
                }
            }
        }
        // console.log(this.games);
        console.log(`ada ${this.resultt.length} kata : \n ${this.resultt}`);
    }
    solve (tempI , tempJ , word) {
        let arah = [
            { name : 'atas', i : -1, j : 0 },
            { name : 'atas-kanan', i : -1, j : 1 },
            { name : 'kanan', i : 0, j : 1 },
            { name : 'bawah-kanan', i : 1, j : 1 },
            { name : 'bawah', i : 1, j : 0 },
            { name : 'bawah-kiri', i : 1, j : -1 },
            { name : 'kiri', i : 0, j : -1 },
            { name : 'kiri-atas', i : -1, j : -1 }
        ];
        let flag = true;
        let count = 1; //pencarian selanjutnya index word ke 1;
        let histories = [];

        while ( flag ) {
            let found = false;
            for( let i=0; i<arah.length; i++ ) {
                let newtempI = tempI + arah[i].i;
                let newtempJ = tempJ + arah[i].j;

                if( newtempI >= 0 && newtempI < this.games.length && newtempJ >= 0 && newtempJ < this.games.length ) {
                    if( this.games[newtempI][newtempJ] === word[count] ) {
                        histories.push({i : tempI, j : tempJ, value : this.games[tempI][tempJ]});
                        tempJ = newtempJ;
                        tempI = newtempI;
                        count++;
                        found = true;
                        this.games[tempI][tempJ] = ' ';
                        break;
                    }
                }
            }
            if( !found ) {
                flag = false;
            }
            if( count === word.length ) {
                flag = false;
                this.resultt.push(word);
            }
        }
        for( let i=0; i< histories.length; i++ ) {
            this.games[histories[i].i][histories[i].j] = histories[i].value ;
            break;
        }
    }
}

const game = new Boogle (data);
// console.log(game.printKamus());
// console.log(game.pecahKamus());
// console.log(game.realKamus)
// console.log(game.solve())
// console.log(game.check());
// console.log(game.kamus);
// console.log(game.checkSaja('DOG'))
game.finder();
// console.log(game.checkSaja())