
const wordList = require('./data').words
// const wordList = ["ABA", "EVANS"]


class Boogle {
    constructor(besarBoard, kumpulanKata){
        this.hasil = []
        this.board (besarBoard)
        this.semuaKata = kumpulanKata
        this.history = []
        this.kordinatNow = 0
        this.ada = []
        this.ketemu = []
    }

    board (besar){
        let kamus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        for(let i = 0 ; i<besar ; i++){
            this.hasil.push([])
            for(let j = 0 ; j<besar ; j++){
                this.hasil[i].push(kamus[Math.floor(Math.random() * 26)])
            }
        }
        // this.hasil = [
        //     [ 'D', 'E', 'V', 'E'],
        //     [ 'A', 'V', 'A', 'V'],
        //     [ 'N', 'D', 'B', 'A'],
        //     [ 'S', 'Z', 'S', 'N']
        // ]
        console.table(this.hasil);
    }

    solve (){
        for(let i = 0 ; i<this.semuaKata.length ; i++){
            for(let j = 0 ; j<this.semuaKata[i].length-1 ; j++){
                if(j == 0){
                    this.kordinatNow = this.carikordinat(this.semuaKata[i][j])
                }
                while(this.kordinatNow != 0){
                    let kordinatNext = this.carikordinat(this.semuaKata[i][j+1])
                    this.ada.push(this.kordinatNow[0])
                    if (this.cariCocok(this.kordinatNow[0], kordinatNext).length != 0){
                        let kordinatCocok = this.cariCocok(this.kordinatNow[0], kordinatNext)
                        if(kordinatCocok != 0){
                            this.history.push([j, this.kordinatNow, kordinatCocok, this.ada])
                            this.kordinatNow = kordinatCocok
                            if(j == this.semuaKata[i].length-2){
                                this.ketemu.push(this.semuaKata[i])
                                // console.log(this.ada);
                            }
                            break
                        }
                    }
                    this.kordinatNow = this.kordinatNow.slice(1)
                    if(this.kordinatNow == 0 || this.history.length != 0){
                        if(this.history.length == 0){
                            break
                        }
                        this.kordinatNow = this.history[this.history.length-1][1].slice(1)
                        let flag = false
                        while(this.kordinatNow.length == 0){
                            this.history.pop()
                            if(this.history.length == 0){
                                flag = true
                                break
                            }
                            this.kordinatNow = this.history[this.history.length-1][1].slice(1)
                        }
                        if(flag == true){
                            break
                        }
                        j = this.history[this.history.length-1][0]
                        kordinatNext = this.history[this.history.length-1][2]
                        this.ada = this.history[this.history.length-1][3]
                        this.history.pop()
                    }
                    this.ada.pop()
                    this.ada.push(this.kordinatNow[0])
                }
            }
            this.history = []
            this.kordinatNow = 0
            this.ada = []        }
        console.log(this.ketemu);
    }
    
    carikordinat (huruf){
        let posisi = []
        for(let i = 0 ; i<this.hasil.length ; i++){
            for(let j = 0 ; j<this.hasil[i].length ; j++){
                if (this.hasil[i][j] == huruf){
                    posisi.push([i, j])
                }
            }
        }
        return posisi
    }
    
    cariCocok (now, next){
        let cocok = []
        for(let i = 0 ; i<next.length ; i++){
            if(Math.abs(now[0] - next[i][0]) + Math.abs(now[1] - next[i][1]) <= 1 || Math.abs(now[0] - next[i][0]) == 1 && Math.abs(now[1] - next[i][1]) == 1){
                let flag = true
                for(let j = 0 ; j<this.ada.length ; j++){
                    if(this.ada[j][0] == next[i][0] && this.ada[j][1] == next[i][1]){
                        flag = false
                    }
                }
                if (flag == true){
                    cocok.push([next[i][0], next[i][1]])
                }
            }
        }
        return cocok
    }
}

let game = new Boogle(6, wordList)

game.solve()