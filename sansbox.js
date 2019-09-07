const library = require('./data')

function solve(word, board) {

    let track = []

    track.push(headWord(word, board))
    if(track[0] === false)return false
    word = word.slice(1)
    

    for (let i = 0; i < word.length; i++) {
        let koordinat = track[track.length - 1];
        
        if(word[i] === undefined) return false

        if(checkMove(koordinat , word[i])){
            track.push(checkMove(koordinat , word[i]))
        } else {
            i -= 2
            track.push(track[track.length - 2])
        }
    }
    
    return true




    function headWord(word, board, lastRow = 0, lastCol = 0) {
        for (let i = 0; i < word.length; i++) {
            for (let j = 0; j < board.length; j++) {
                // console.log(board[i])
                for (let k = 0; k < board[j].length; k++) {

                    if (board[j][k] === word[i]) {
                        return { row: j, col: k }
                    }
                }
            }
        }
        return false
    }

    function checkMove(coord, letter){
        if (utara(coord, letter) && checkTrack(track, utara(coord, letter))) {
            return utara(coord, letter)
        } else if (barat(coord, letter) && checkTrack(track, barat(coord, letter))) {
            return barat(coord, letter)
        } else if (timur(coord, letter) && checkTrack(track, timur(coord, letter))) {
            return timur(coord, letter)
        } else if (selatan(coord, letter) && checkTrack(track, selatan(coord, letter))) {
            return selatan(coord, letter)
        }  else if (baratDaya(coord, letter) && checkTrack(track, baratDaya(coord, letter))) {
            return baratDaya(coord, letter)
        } else if (baratLaut(coord, letter) && checkTrack(track, baratLaut(coord, letter))) {
            return baratLaut(coord, letter)
        } else if (timurLaut(coord, letter) && checkTrack(track, timurLaut(coord, letter))) {
            return timurLaut(coord, letter)
        } else if (tenggara(coord, letter) && checkTrack(track, tenggara(coord, letter))) {
            return tenggara(coord, letter)
        } else return false
    }

    function utara(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        if (row > 0) {
            if (board[row - 1][col] === letter) return { row: row - 1, col: col }
            else return false
        } else {
            return false
        }
    }
    function selatan(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        // console.log(board[row+1][col],letter);

        if (row < board.length - 1) {
            if (board[row + 1][col] === letter) return { row: row + 1, col: col }
            else return false
        } else {
            return false
        }
    }
    function timur(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        // console.log(board[row][col+1] , letter);

        if (col < board[0].length - 1) {
            if (board[row][col + 1] === letter) return { row: row, col: col + 1 }
            else return false
        } else {
            return false
        }
    }
    function barat(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        if (col > 0) {
            if (board[row][col - 1] === letter) return { row: row, col: col - 1 }
            else return false
        } else {
            return false
        }
    }

    function baratDaya(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        if (row < board.length-1 && col > 0) {
            if (board[row+1][col-1] === letter) return { row: row +1 , col: col-1 }
            else return false
        } else {
            return false
        }
    }
    function baratLaut(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        if (row > 0 && col > 0) {
            if (board[row-1][col-1] === letter) return { row: row -1 , col: col-1 }
            else return false
        } else {
            return false
        }
    }
    function timurLaut(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        if (row > 0 && col < board.length-1) {
            // console.log(board[row-1][col+1] , letter , row-1,col+1 , row,col );
            
            if (board[row-1][col+1] === letter) return { row: row -1 , col: col+1 }
            else return false
        } else {
            return false
        }
    }

    function tenggara(koordinat, letter) {
        let row = koordinat.row
        let col = koordinat.col
        // console.log(letter , row-1,col+1 , row,col );
        if (row < board.length-1 && col <board.length-1) {
            
            if (board[row+1][col+1] === letter) return { row: row+1 , col: col+1 }
            else return false
        } else {
            return false
        }
    }
    
    function checkTrack(track, koordinat) {
        let row = koordinat.row
        let col = koordinat.col

        for (let i = 0; i < track.length; i++) {
            if (track[i].row === row && track[i].col === col) {
                return false
            }
        }
        return true
    }

}



function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}
function board(num){
    let randomWords = 'AAAAAABCDEEEEEFGHIIIIJKLMNOOOOOPQRSTUVWXYZ'
    
    let out = []
    let temp = []

    for(let i = 0; i < num*num; i++){
        if(i % num === 0 && i !== 0){
            out.push(temp)
            temp = []   
        }
        temp.push(randomWords[Math.round(Math.random()*41)])
    }
    out.push(temp)
    return out
}
let counter = 0
let words = []
let boards = board(4)
console.log(boards)
for( let i = 0; i < library.length; i++){
    if(solve( library[i] , boards )){
        words.push(library[i])
        counter++
    }else{
        // console.log('GAADA COY ==> ' , library[i]);
    }
}
console.log(words)
console.log(counter)
