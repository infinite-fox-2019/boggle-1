
const wordList = require('./data').words
// const wordList = ["EVANS"]

class Boogle {
    constructor(besarBoard, kumpulanKata){
        this.hasil = []
        this.board (besarBoard)
        this.semuaKata = kumpulanKata
        this.kordinatNow = []
        this.kordinatNext = []
    }

    board (besar){
        let kamus = "AAAABCDEEEEFGHIJKLMNOOOOPQRSTUUUUVWXYZ"
        for(let i = 0 ; i<besar ; i++){
            this.hasil.push([])
            for(let j = 0 ; j<besar ; j++){
                this.hasil[i].push(kamus[Math.floor(Math.random() * 38)])
            }
        }
        // this.hasil = [
        //     [ 'D', 'E', 'E', 'V'],
        //     [ 'L', 'V', 'A', 'H'],
        //     [ 'S', 'Q', 'N', 'K'],
        //     [ 'W', 'Z', 'V', 'S']
        // ]
        console.table(this.hasil);
    }

    // solve (){
    //     for(let i = 0 ; i<this.semuaKata.length ; i++){
    //         for(let j = 0 ; j<this.semuaKata[i].length-1 ; j++){
    //             this.kordinatNow = this.carikordinat(this.semuaKata[i][j])
    //             this.kordinatNext = this.carikordinat(this.semuaKata[i][j+1])
    //             this.cariCocok ()
    //         }
            
    //     }
    // }

    // carikordinat (huruf){
    //     let posisi = []
    //     for(let i = 0 ; i<this.hasil.length ; i++){
    //         for(let j = 0 ; j<this.hasil[i].length ; j++){
    //             if (this.hasil[i][j] == huruf){
    //                 posisi.push([i, j])
    //             }
    //         }
    //     }
    //     return posisi
    // }
    
    // cariCocok (){
        // console.log(this.kordinatNext);
        
        // if(Math.abs(this.kordinatNow[0][0] - this.kordinatNext[0][0])){

        // }
    // }
}

let game = new Boogle(4, wordList)

// game.solve()