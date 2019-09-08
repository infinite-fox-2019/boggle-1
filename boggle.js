class Boogle {
	constructor(kamus) {
		this.dictionary = kamus;
		this.size = 0;
		this.boggleBoard = [];
		this.boardRun = [];
	}

	board(num) {
        this.size = num;
        let konsonan = 'BCDFGHJKLMNPQRSTVWXYZ'
        let vokal = 'AIUEO'
		let output = [];
		for (let i = 0; i < num; i++) {
			let temp = [];
			for (let j = 0; j < num; j++) {
                let konsonanRandom = konsonan[Math.floor(Math.random() * konsonan.length)]
                let vokalRandom = vokal[Math.floor(Math.random() * vokal.length)]
                let randomDice = Math.round(Math.random())
                if (randomDice == 0) {
                    temp.push(vokalRandom);
                } else {
                    temp.push(konsonanRandom);
                }
			}
			output.push(temp);
		}
        this.boggleBoard = output;
        // console.log(this.boggleBoard);
        // return output
	}

	solve(){
        //tampung kata yang di dapat
        //loop kata dari kamus 1/1
        //buat blueprintBroard dengan cara di mapping, tujuannya supaya ga seleksi huruf yang udah kita seleksi
        //kalau udh di mapping, pindahin katanya, lalu di cek 1/1 hurufnya
        // kalau true push ke tampung kata
        let yesDapatKata = [];
        for (var i = 0; i < this.dictionary.length; i++){
            this.boardRun = this.mappingWords(true, this.size);
            if (this.cariKata(this.dictionary[i])){
                if (this.size <= 4) {
                    this.clearScreen()
                    console.log(`menampilkan ukuran board default ${this.size}x${this.size}`);
                    console.log(`-----------BOGGLE----------`);
                    console.log(this.boggleBoard);
                    console.log(`\n--- processing mencari kata dimulai`);
                    console.log(`kata ditemukan:\n${yesDapatKata}`);
                    this.sleep(500)
                    yesDapatKata.push(this.dictionary[i])
                } else {
                    this.clearScreen()
                    console.log(`menampilkan ukuran board ${this.size}x${this.size}`);
                    console.log(`-----------BOGGLE----------`);
                    console.log(this.boggleBoard);
                    console.log(`\n--- processing mencari kata dimulai`);
                    console.log(`kata ditemukan:\n${yesDapatKata}`);
                    this.sleep(500)
                    yesDapatKata.push(this.dictionary[i])
                }
            };
        }
        this.clearScreen()
        this.showBoard()
        console.log(`\n--- processing selesai`);
        console.log(`Selamat ${yesDapatKata.length} kata ditemukan:\n${yesDapatKata.join(', ')}`);
    }

    mappingWords(condition, num) {
        let arr = [];
        for (let i = 0; i < num; ++i) {
            let temp = [];
            for (let j = 0; j < num; j++) {
                temp.push(condition);
            }
            arr.push(temp);
        }
        // console.log(arr);
        return arr;
    }
    
    cariKata(kata) { //cek katanya per abjad
        //bikin koordinat awal
        //cek koordinat pertama
        //cek lagi koordinat selanjutnya
        // klo ga ada skip, ganti kata lain
        let index = { x: 0, y: 0 };
        if (this.cariHurufPertama(kata[0], index) !== true){ //cek ada kata pertama ga?
            // console.log(`masuk index pertama, ${index.x}`);            
            return false;
        } else if (this.hurufSelanjutnya(kata, index) !== true){
            // console.log(`masuk index selanjutnya, ${index.x}`);
            return false;
        } else {
            return true;
        }
	}

    cariHurufPertama(huruf, index) {
        for (index.x = 0; index.x < this.boggleBoard.length; index.x++) { // loop Setiap baris atau proses checking 1 baris
            for (index.y = 0; index.y < this.boggleBoard.length; index.y++) { // loop setiap index atau checking 1/1 colom dari baris ke i
                if (this.boggleBoard[index.x][index.y] == huruf){ //dapet huruf pertamanya di sebelah mana atau index ke berapa
                    return true;
                }
            }
        }
        return false;
    }

    hurufSelanjutnya(kata, index){
        //pastiin kata itu ada
        //lalu mulai proses checking dengan rumus
        //potong katanya jadi huruf perhuruf
        //sampai kata itu habis maka kembalikan dengan nilai TRUE dan taraa dapat deh kata yang dicheck tadi
        // console.log(kata);
        // console.log(index);
		if (kata.length == 0){
            return true;
        } else if (this.hurufAman(kata[0], index.x, index.y) == false){
            return false;
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goTop(index))){
            return true;
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goTopRight(index))){
            return true;
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goRight(index))){
            return true;
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goBottomRight(index))){
            return true
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goBottom(index))){
            return true
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goBottomLeft(index))){
            return true
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goLeft(index))){
            return true
        } else if (this.hurufSelanjutnya(kata.slice(1), this.goTopLeft(index))){
            return true
        } else {
            this.boardRun[index.x][index.y] = true;
            return false;
        }
    }

    hurufAman(char, x, y) {
        // pasikan koordinatnya lebih dari 0
        // pastikan juga koordinat ga lebih dari size x ataupun y nya / gal lebih dari row sama column
        if (x >= 0 && y >=0){
            if (x < this.size && y < this.size) {
                // [tambahan] cek juga kalau koordinat yang dimaksud tepat dan benar, agar tidak mengulang huruf yang sama co/BOBO,KIKI,KOKO dll
                if (this.boggleBoard[x][y] == char && this.boardRun[x][y] == true) {
                    this.boardRun[x][y] = false; //jadiin false pada mapping supaya ga manggil huruf yang udh di seleksi
                    return true;
                }
                return false;
            }
            return false;
        }
        return false;
    }

    // RUMUS --- GAMEBOARD BOGGLE
    goTop(index) {
        // console.log('dapat index di atasnya, pindahin koordinat ke atas');
        return { x: index.x-1, y: index.y};
    }
    goTopRight(index) {
        // console.log('dapat index di atasnya sebelah kanan, pindahin koordinat ke atas kanan');
        return { x: index.x-1, y: index.y+1};
    }
    goRight(index) {
        // console.log('dapat index di sebelah kanan, pindahin koordinat ke kanan');
        return { x: index.x, y: index.y+1};
    }
    goBottomRight(index) {
        // console.log('dapat index di bawahnya sebelah kanan, pindahin koordinat ke bawah kanan');        
        return { x: index.x+1, y: index.y+1};
    }
    goBottom(index) {
        // console.log('dapat index di bawahnya, pindahin koordinat ke bawah');
        return { x: index.x+1, y: index.y};
    }
    goBottomLeft(index) {
        // console.log('dapat index di bawahnya sebelah kiri, pindahin koordinat ke bawah kiri');
        return { x: index.x+1, y: index.y-1};
    }
    goLeft(index) {
        // console.log('dapat index di sebelah kiri, pindahin koordinat ke kiri');
        return { x: index.x, y: index.y-1};
    }
    goTopLeft(index) {
        // console.log('dapat index di atasnya sebelah kiri, pindahin koordinat ke atas kiri');        
        return { x: index.x-1, y: index.y-1};
    }

    showBoard() {
        console.log(`-----------BOGGLE----------`);
        console.log(this.boggleBoard);
    }

    clearScreen() {
        // Un-comment this line if you have trouble with console.clear();
        // return process.stdout.write('\033c');
        console.clear();
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }
}

const searchIt = require('./data')
let ukuranBoard = process.argv[2] //Process ARGV
let defaultUKuran = 4 //kalau ga input ARGV tampilin ukuran standard
var game = new Boogle(searchIt);

if (ukuranBoard == undefined) {
    game.board(defaultUKuran);
    // game.showBoard();
    game.solve();
} else if (ukuranBoard < 4) {
    console.log('ukuran board tidak valid minimal 4x4');
} else {
    game.board(ukuranBoard);
    // game.showBoard();
    game.solve();
}