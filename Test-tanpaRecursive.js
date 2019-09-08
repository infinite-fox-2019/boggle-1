const board = [
    ['L', 'D', 'I', 'A', 'I'],
    ['S', 'Z', 'T', 'K', 'K'],
    ['K', 'A', 'M', 'U', 'I'],
    ['G', 'Y', 'A', 'T', 'Y'],
    ['G', 'Y', 'A', 'Y', 'P']
]
let move = [
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1]
]
// let library = ['AKU','KAMU'];

const library = require ('./data.js')

let gatherWord = [];

for (let i = 0;i < library.length;i++) {
    for (let j = 0;j < board.length;j++) {
        for (let k = 0; k < board[j].length;k++) {
            if (board[j][k] == library[i][0]) {
                let getWord = [];
                getWord.push(library[i][0])
                let positionAfter = [
                    [j,k]
                ]
                let words = library[i].split('');
                words.shift();
                let limitLoop = library[i].length;
                let currentPos = [j,k];
                while (limitLoop > 0) {
                    let x = currentPos[0];
                    let y = currentPos[1];
                    let positionNext = [];
                    for (let a = 0;a < move.length; a++) {
                        let s = x + move[a][0];
                        let q = y + move[a][1];
                        if (s >= 0 && q >= 0) {
                            if (s < board.length && q < board[0].length) {
                                positionNext.push([s,q]);
                            }
                        }
                    }//end loop a;
                    let fixPosition = [];
                    for (let a = 0;a < positionNext.length;a++) {
                        let s = positionNext[a][0];
                        let q = positionNext[a][1];
                        let samePos = false;
                        for (let b = 0;b < positionAfter.length;b++) {
                            if (s == positionAfter[b][0] && q == positionAfter[b][1]) {
                                samePos = true;
                            }
                        }
                        if (samePos == false) {
                            fixPosition.push([s,q])
                        }
                    }                          
                    let checkAlpha = words[0];
                    for (let a = 0;a < fixPosition.length;a++) {
                        let s = fixPosition[a][0];
                        let q = fixPosition[a][1];
                        
                        if (board[s][q] == checkAlpha) {
                            getWord.push(checkAlpha)
                            words.shift();
                            currentPos = [s,q];
                            positionAfter.push([s,q]);
                            
                            break;
                        }
                    }
                    limitLoop--
                }//while
                if (getWord.length == library[i].length) {
                    gatherWord.push(getWord.join(''))
                    i++
                }
                }
            }
        }
    }

    
console.log(gatherWord)

















