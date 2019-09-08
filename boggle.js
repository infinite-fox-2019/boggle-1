const data = require('./data');

// Un-Comment untuk argv
// const row = process.argv[2];
// const col = process.argv[3];

class Boogle {
    constructor (data) {
        this.list = data;
        this.games = [];
        this.resultt = [];
    }
    shake () {
        // Un-Comment untuk board fix 4x4 ;
        for(let i=0; i<4; i++){
            this.games.push([]);
            for(let j=0; j<4; j++){
                let kamus = 'AAAAAAAAAABBCCDDEEEEEEEEEEEFFGGHHIIIIIIIIIIJJKKLLMMNNOOOOOOPPQQRRSSTTUUUUUUVVWWXXYYZZ';
                let random = Math.floor(Math.random() * (kamus.length))
                let hasRand = kamus[random];
                this.games[i].push(hasRand);
            }
        }
        // Un-Comment untuk boards sesuai argv .. dengan format * node boggle.js 10 10 *
        // for(let i=0; i<row; i++){
        //     this.games.push([]);
        //     for(let j=0; j<col; j++){
        //         let kamus = 'AAAAAAAAAABBCCDDEEEEEEEEEEEFFGGHHIIIIIIIIIIJJKKLLMMNNOOOOOOPPQQRRSSTTUUUUUUVVWWXXYYZZ';
        //         let random = Math.floor(Math.random() * (kamus.length))
        //         let hasRand = kamus[random];
        //         this.games[i].push(hasRand);
        //     }
        // }
        return this.games;
    }
    main () {
        this.shake();
        console.log(this.games)
        for( let i=0; i<this.games.length; i++ ) {
            for( let j=0; j<this.games[i].length; j++ ) {
                for( let k=0; k<this.list.length; k++ ) {
                    if( this.games[i][j] === this.list[k][0]) {
                        this.solve( i , j , this.list[k] );
                    }
                }
            }
        }
        console.log(`ada ${this.resultt.length} kata:'\n ${this.resultt}`)
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
        let count = 1; 
        let histories = [];

        while ( flag ) {
            let found = false;
            for( let i=0; i<arah.length; i++ ) {
                let newtempI = tempI + arah[i].i;
                let newtempJ = tempJ + arah[i].j;
                if( newtempI >= 0 && newtempI < this.games.length && newtempJ >= 0 && newtempJ < this.games.length ) {
                    if( this.games[newtempI][newtempJ] === word[count] ) {
                        histories.push({i : tempI, j : tempJ, value : this.games[tempI][tempJ]});
                        this.games[tempI][tempJ] = ' ';
                        tempJ = newtempJ;
                        tempI = newtempI;
                        count++;
                        found = true;
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
                break;
            }
        }
        for( let i=0; i< histories.length; i++ ) {
            this.games[histories[i].i][histories[i].j] = histories[i].value ;
            break;
        }
    }
}
const game = new Boogle (data);
game.main();