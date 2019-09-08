//NOTE: Masukkan ukuran papan pada process.argv[2] dan nama kamu pada process.argv[3]
//contoh: node boggle 7 Devita

//import data
const wordList = require('./data').words
//deklarasi kelas
class Boogle {
    constructor(boardSize, listData) {
        this.boardSize = boardSize
        //kamus untuk mencocokkan kata
        this.data = listData
        //papan berisi kata huruf random
        this.papan = this.shake()
    }
    //generate papan secara random
    shake() {
        let papan = []
        if (this.boardSize < 4) {
            return 'minimal board size is 4'

        }
        for (let i = 0; i < this.boardSize; i++) {
            let boardDalam = []
            for (let j = 0; j < this.boardSize; j++) {
                let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                let random = alphabets[Math.floor(Math.random() * alphabets.length)]
                boardDalam.push(random)
            }
            papan.push(boardDalam)
        }
        return papan
    }

    solve() {
        //variabel words menampung kata-kata yang berhasil ditemukan
        let words = []
        //kamus untuk mencocokkan
        let Data = this.data
        //mencocokkan tiap kata pada Data mulai dari huruf pertamanya
        for (let i = 0; i < Data.length; i++) {
            //jika value method findLetter true berarti Data[i] ditemukan pada papan boggle
            if (this.findLetter(Data[i][0], Data[i])) {
                //push ke array variabel words untuk ditampilkan ke display
                words.push(Data[i])

            }

        }
        //jika panjang array words adalah 0, berarti tidak ada kata yang di push == tidak ada kata yang cocok
        if (words.length === 0) {
            return 'Sorry, no words found!'
        } else {
        //output jika ditemukan kata yang cocok
            console.log('=====  C O N G R A T U L A T I O N  =====')
            return `${process.argv[3]}, say thanks to computer, because computer founds you ${words.length} word(s) in this game! \n \n ${words.join(', ')}`

        }
    }

    findLetter(letter, word) {
        //mencari huruf pertama dari word di setiap sel papan
        for (let i = 0; i < this.papan.length; i++) {
            for (let j = 0; j < this.papan[i].length; j++) {
                //jika ada yang sama, maka cek kesamaan huruf berikutnya dari word ke sel sekelilingnya
                if (this.papan[i][j] === letter) {
                    //cek seluruh huruf selanjutnya dari word di method cekDirection. Jika true === match
                    if (this.cekDirection(i, j, word)) {

                        return true

                    } else {

                        return false

                    }
                }
            }
        }
    }

    cekDirection(indexI, indexJ, word) {
        //menyimpan semua sel yang pernah dicek dan digunakan
        let visited = []
        //yang pertama dicek pastinya adalah posisi huruf pertama dari word
        visited.push([indexI, indexJ])
        let index = 1
        //looping ini terjadi selama kata ke index selalu cocok dan value index kurang dari panjang word yang sedang dicocokkan
        while (index < word.length) {
            //membuat batasan posisi pengecekan dari sel target
            let iStart = indexI - 1     //atasnya sel
            let jStart = indexJ - 1     //kirinya sel
            let iEnd = indexI + 1       //bawahnya sel
            let jEnd = indexJ + 1       //kanannya sel

            //pengaturan jika batasan posisi pengecekan ternyata diluar bidang papan
            if (iStart < 0) {
                iStart = 0
            }
            if (jStart < 0) {
                jStart = 0
            }
            if (iEnd >= this.boardSize) {
                iEnd = this.boardSize - 1
            }
            if (jEnd >= this.boardSize) {
                jEnd = this.boardSize - 1
            }

            //flagging
            let alphabet = false
            //pengecekan dimulai dari atas sel sampai bawah sel, dari kiri sel sampai kanan sel
            for (let i = iStart; i <= iEnd; i++) {
                for (let j = jStart; j <= jEnd; j++) {
                    //jika element sel target sama dengan word ke index dan elemen sel target belum pernah digunakan maka 
                    if (this.papan[i][j] === word[index] && this.cekVisited(i, j, visited)) {
                        //masukkan ke array visited, berarti sekarang posisi sel tersebut pernah digunakan
                        visited.push([i, j])
                        //merubah value indexI dan indexJ untuk pemanggilan fungsi berikutnya 
                        indexI = i
                        indexJ = j
                        //mengubah value flagging
                        alphabet = true
                    }
                }
            }
            //jika element dari tiap sel di daerah batasan telah dicek dan tidak ada yang cocok maka flagging tetap false, berarti word ke index tidak ada yang sama dengan elemen sel target == tidak match 
            if (!alphabet) {
                return false
            }
            //jika alphabet sebelumnya true, maka lanjut cek word ke index+1 (huruf selanjutnya dari kata). Prosesnya looping.
            index++
        }
        //jika tidak pernah masuk kondisi tidak cocok(yang akan menghentikan proses), berarti seluruh huruf pada word cocok, maka return true
        return true
    }

    cekVisited(indexI, indexJ, visited) {
        //untuk setiap posisi yang pernah dicek dan digunakan (datanya diperoleh dari variabel visited)
        for (let i = 0; i < visited.length; i++) {
            //jika indexI dan indexJ memiliki kesamaan dengan elemen array visited, berarti posisi tersebut sudah pernah dicek dan digunakan, maka tidak boleh digunakan lagi
            if (visited[i][0] === indexI && visited[i][1] === indexJ) {
                return false   
            }
        }
        //jika tidak pernah masuk kondisi memiliki kesamaan, berarti elemen sel di posisi tersebut belum pernah digunakan sehingga boleh digunakan
        return true
    }
}
let size = process.argv[2]
let bobog = new Boogle(size, wordList)
console.log(`==== WELCOME TO THE BOGGLE LAND, ${process.argv[3].toUpperCase()} ====`)
console.table(bobog.papan)
console.log(bobog.solve())