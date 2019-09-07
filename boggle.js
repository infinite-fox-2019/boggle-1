const kamus = require('./data.js');
const dummy = 'KAMUDIAADANKAKUZASKNVYLARYTLANYLATSVRTLUSKUNTAAIIAOAAOUOUAUOUOAUOIAUIJVJSKJSKJFKJSDKJSKFJKSFKSJFKSJFKJFKJFKFKSKSFKSJFKSJFOUA'

class Boggle {
  constructor(kamus, ukuran = 10){
    this.ukuran = ukuran
    this.kamus = kamus
    this.board = this.generateBoard()
  }

  generateBoard(){
    let board = [];
    // const dummy = 'KAMUDIAADANKAKUR';
    let counter = 0;
    for( let i = 0; i < this.ukuran; i++){
      board.push([]);
      for(let j = 0; j < this.ukuran; j++){
        board[i].push(dummy[counter])
        counter++;
      }
    }
    return board;
  }

  // visited(){
  //   let output = [];
  //   for(let i = 0; i < this.ukuran; i++){
  //     output.push([]);
  //     for(let j = 0; j < this.ukuran; j++){
  //       output[i].push(false)
  //     }
  //   }
  //   return output;
  // }

  solve(){
    let result = [];
    for(let i = 0; i < this.ukuran; i++){
      for(let j = 0; j < this.ukuran; j++){
        for(let k = 0; k < kamus.length; k++){
          let kata = kamus[k];
          if(kata[0] == this.board[i][j] && this.dfs(kata,i,j)){
            result.push(kata)
          }
        }
      }
    }
    console.log(result);
    
    return result;
  }

  dfs(kata,i,j){
    
    if(kata.length <= 1){
      return true;
    }

    this.board[i][j] = '#'

    for(let ii = -1; ii <= 1; ii++){
      for(let jj = -1; jj <= 1; jj++){

        let row = i+ii <= 0 ? i : i+ii;
        let col = j+jj <= 0 ? j : j+jj;

        if(row >= 0 && col >= 0 && row < this.ukuran && col < this.ukuran){
          
          // console.log([row,col]);
          
            if(this.board[row][col] == kata[1] && this.dfs(kata.slice(1) ,row ,col)){
              this.board[i][j] = kata[0];
              return true;
            }
          

        

        }
      }
    }

    this.board[i][j] = kata[0];
    return false;

  }
}

let game = new Boggle(kamus);

console.log(game.solve());
console.log(game.board);

