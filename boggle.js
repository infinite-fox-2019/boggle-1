const library = require('./data.js')


class Boggle {

    constructor(library) {
        this.library = library
        this.board = this.board()
    }

    eachSolve(word,board) {
        
        let koordinat = headWord(word,board)
        if(!koordinat.length)return false
        let status = koordinat.map( x => {
            return eachSolve(word , board , x)
        })
        
        return status.some( e => {
            return e === true
        })
        
        function eachSolve(word,board,koordinat) {
            let track = []
        
            track.push(koordinat)
            if (track[0] === false) return false
            let words = word.slice(1)
        
        
            for (let i = 0; i < words.length; i++) {
                let koordinat = track[track.length - 1];
                if (words[i] === undefined) return false
                if (checkMove(koordinat, words[i])) {
                    track.push(checkMove(koordinat, words[i]))
                } else {
                    i -= 2
                    track.push(track[track.length - 2])
                }
            }
        
            return true
        
            function checkMove(coord, letter) {
        
                if (utara(coord, letter) && checkTrack(track, utara(coord, letter))) {
                    return utara(coord, letter)
                } else if (barat(coord, letter) && checkTrack(track, barat(coord, letter))) {
                    return barat(coord, letter)
                } else if (timur(coord, letter) && checkTrack(track, timur(coord, letter))) {
                    return timur(coord, letter)
                } else if (selatan(coord, letter) && checkTrack(track, selatan(coord, letter))) {
                    return selatan(coord, letter)
                } else if (baratDaya(coord, letter) && checkTrack(track, baratDaya(coord, letter))) {
                    return baratDaya(coord, letter)
                } else if (baratLaut(coord, letter) && checkTrack(track, baratLaut(coord, letter))) {
                    return baratLaut(coord, letter)
                } else if (timurLaut(coord, letter) && checkTrack(track, timurLaut(coord, letter))) {
                    return timurLaut(coord, letter)
                } else if (tenggara(coord, letter) && checkTrack(track, tenggara(coord, letter))) {
                    return tenggara(coord, letter)
                } else return false
        
        
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
                    if (row < board.length - 1 && col > 0) {
                        if (board[row + 1][col - 1] === letter) return { row: row + 1, col: col - 1 }
                        else return false
                    } else {
                        return false
                    }
                }
                function baratLaut(koordinat, letter) {
                    let row = koordinat.row
                    let col = koordinat.col
                    if (row > 0 && col > 0) {
                        if (board[row - 1][col - 1] === letter) return { row: row - 1, col: col - 1 }
                        else return false
                    } else {
                        return false
                    }
                }
                function timurLaut(koordinat, letter) {
                    let row = koordinat.row
                    let col = koordinat.col
                    if (row > 0 && col < board.length - 1) {
                        // console.log(board[row-1][col+1] , letter , row-1,col+1 , row,col );
        
                        if (board[row - 1][col + 1] === letter) return { row: row - 1, col: col + 1 }
                        else return false
                    } else {
                        return false
                    }
                }
                function tenggara(koordinat, letter) {
                    let row = koordinat.row
                    let col = koordinat.col
                    // console.log(letter , row-1,col+1 , row,col );
                    if (row < board.length - 1 && col < board.length - 1) {
        
                        if (board[row + 1][col + 1] === letter) return { row: row + 1, col: col + 1 }
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
        
        
        
        }
        
        function headWord(word, board) {
            let container = []
                       
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[i].length; j++) {
                    if (board[i][j] === word[0])  container.push( { row : i , col : j} )
                }
            }
        
            if(container.length > 0)return container
            else return false
        }
    }

    board() {
        let randomWords = 'AAAAAABCDEEEEEFGHIIIIJKLMNOOOOOPQRSTUVWXYZ'

        let out = []
        let temp = []

        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0 && i !== 0) {
                out.push(temp)
                temp = []
            }
            temp.push(randomWords[Math.round(Math.random() * 41)])
        }
        out.push(temp)
        return out
    }

    solve() {
        let library = this.library
        let board = this.board
        let counter = 0
        let words = []
        for (let i = 0; i < library.length; i++) {
            if (this.eachSolve(library[i], board)) {
                words.push( library[i] )
                counter++
            }
        }
        return {board, words , counter}
    }
}


let game = new Boggle(library)
console.log(game.solve())


