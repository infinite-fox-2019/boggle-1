class Bogle{
    constructor(words){
        this.words = words
        this.boards = this.board()
        this.visited = []
    }
    
    solve(){
        clearScreen()
        let hasil = []
        for(let i = 0; i < this.boards.length; i++){
            for( let j = 0; j < this.boards[i].length; j++){
                for(let k = 0; k < this.words.length; k++){
                    if(this.checkAll(this.boards, this.words[k], i, j, 0)){
                        clearScreen()
                        hasil.push(words[k])
                        console.log(this.boards);
                        this.visited = []
                        console.log(hasil);
                        sleep()
                    }
                }
            }
        }
        clearScreen()
        console.log(this.boards);
        return hasil
    }

    checkAll(board, words, i, j, index){
        // Base case -> apabila index == words.length
        if(index == words.length)return true

        // Pengecekan i, j, sudah pernah dilewati atau belum dan words.charAt(index) tdk sama dengan board[i][j]
        if(i < 0 || i >= board.length || j < 0 || j >= board[i].length || words.charAt(index) != board[i][j] || this.checkVisited(i,j)) return false
        
        // Jika i, j, words[0] == boards[i][j] dan blm pernah dilewati
        // push i & j ke visited
        this.visited.push([[i],[j]])

        // Cek  words index+1 
        // Cek Horizontal
        if((this.checkAll(board, words, i-1, j, index+1)) ||
        (this.checkAll(board, words, i+1, j, index+1)) ||
        // Cek Vertical
        (this.checkAll(board, words, i, j-1, index+1)) ||
        (this.checkAll(board, words, i, j+1, index+1)) ||
        // Cek Diagonal
        (this.checkAll(board, words, i+1, j+1, index+1)) ||
        (this.checkAll(board, words, i+1, j-1, index+1)) ||
        (this.checkAll(board, words, i-1, j-1, index+1)) ||
        (this.checkAll(board, words, i-1, j+1, index+1))) return true

        this.visited.pop()
        // return false
    }

    // Cek apakah pernah dilewati atau tidak
    checkVisited(i, j){
        for(let k = 0; k < this.visited.length; k++){
            if(this.visited[k][0] == i && this.visited[k][1] == j) return true
        }
        return false
    }

  // Membuat Board dengan huruf Random
    board(){
        let boards = []
        let char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'        

        for(let i = 0; i < 4; i++){
            let temp = []
            for(let j = 0; j < 4; j++){
                let random = Math.floor(Math.random()*26)
                temp.push(char[random])
            }
            boards.push(temp)
        }
        return boards
    }
}

function clearScreen () {
    // Un-comment this line if you have trouble with console.clear();
    return process.stdout.write('\033c');
    console.clear();
}

function sleep (milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > 200) {
            break;
        }
    }
}

var words = require('./data').words
var game = new Bogle(words)
console.log(game.solve());

