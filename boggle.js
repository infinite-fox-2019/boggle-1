const kamus = require('./data.js');
const huruf = 'AAAAAAAAAAAAAABCDEEEEEEEEEEEFGHIIIIIIIIIIIIIJKLMNOOOOOOOOOOOOOOOOOOOOOPQRSTUUUUUUUUUUUUUUUUUUUVWXYZ'

class Boggle {
  constructor(kamus, ukuran = 5){
    this.ukuran = ukuran
    this.kamus = kamus
    this.board = this.generateBoard()
  }

  generateBoard(){
    let board = [];
    for( let i = 0; i < this.ukuran; i++){
      board.push([]);
      for(let j = 0; j < this.ukuran; j++){

        // Secara otomatis akan memasukkan huruf random kedalam board
        board[i].push(huruf[Math.ceil(Math.random()*huruf.length-1)])
      }
    }
    return board;
  }

  solve(){
    let result = [];
    for(let i = 0; i < this.ukuran; i++){
      for(let j = 0; j < this.ukuran; j++){
        for(let k = 0; k < kamus.length; k++){

          // Disini menggunakan sistem cek berdasarkan kata yang berada dalam kamus,
          // jika kata tidak ditemukan, maka ia akan langsung dimasukkan kedala result[]
          let kata = kamus[k];
          if(kata[0] === this.board[i][j] && this.search(kata,i,j)){
            result.push(kata)
          }
        }
      }
    }
    return result;
  }

  search(kata,i,j){
    
    // Base case rekurusif, jika sudah mentok dan
    // hanya tersisa satu huruf, maka langsung
    // direturn true
    if(kata.length == 1){
      return true;
    }
    
    // huruf yang pernah dilewati ditandai dengan 
    // symbol '#' agar tidak terjadi pengecekan kembali
    this.board[i][j] = '#'
    
    // Ini merupakan proses perpidahan,
    // saya mensimulasikan perubahan 8 arah berdasarkan i dan j
    // dengan for looping
    for(let ii = -1; ii <= 1; ii++){
      for(let jj = -1; jj <= 1; jj++){
        let row = i+ii <= 0 ? i : i+ii;
        let col = j+jj <= 0 ? j : j+jj;
        if(row >= 0 && col >= 0 && row < this.ukuran && col < this.ukuran){
          if(this.board[row][col] == kata[1] && this.search(kata.slice(1) ,row ,col)){
            // Jika kata semua huruf kemungkinan sudah di cek,
            // maka rubah kembali symbol '#' menjadi huruf yang semestinya,
            // agar proses bisa terus berjalan
            this.board[i][j] = kata[0];
            return true;
          }
        }
      }
    }

    // Walaupun gagal, rubah kembali huruf menjadi keadaan semula
    this.board[i][j] = kata[0];
    return false;
  }
}

let game = new Boggle(kamus,10);

console.log(game.solve())
console.log(`\nBanyak kata yang ditemukan adalah = ${game.solve().length}\n`);
console.log(game.board);