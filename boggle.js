const library = require ('./data');

class Boggle {
    constructor(row,column) {
        this.board = this.generateBoard(row,column)
    }

    generateBoard(row,column) {
        //Dummy board ------------->
        // const board = [
        //     ['A',' ',' ','M',' '],
        //     ['G','A','K','U',' '],
        //     [' ',' ',' ','S','U'],
        //     [' ','K',' ',' ','H'],
        //     [' ','I','T','A',' ']
        // ]
        
        let board = [];
        let alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        for (let i = 0; i < row; i++) {
            let subBoard = [];
            for (let j = 0; j < column; j++) {
                let numRandom = Math.floor(Math.random()*alpha.length);
                subBoard.push(alpha[numRandom])
            }   
            board.push(subBoard)
        }

        console.log(board);
        return board
    };


    findingNemo (disctionary) {
        let gatherWords = [];
        for (let i = 0;i < disctionary.length; i++) {
            if (this.findWordOnBoard(disctionary[i]) == true) {
                gatherWords.push(disctionary[i])
            }
        }
        
        gatherWords.forEach(ele =>{
            console.log(`Found ${ele}`)
        })
        if (gatherWords.length == 0) {
            console.log(`Not found any Words`)
        }
        return ''
    };

    findWordOnBoard (word) {
        for (let i = 0; i < this.board.length;i++) {
            for (let j = 0; j < this.board[i].length;j++) {
                if (word[0] == this.board[i][j]) {
                    let position = [
                        [i,j]
                    ]
                    let splitWord = word.split('');
                    splitWord.shift();
                    if (this.nextAlpha(splitWord,position) == true) {
                        return true;
                    }
                }
            }
        }
        return false;
    };

    nextAlpha(word,position){

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

        let finWord = false;
        let lastPos = position[position.length-1];

        for (let i = 0;i < move.length; i++) {
            let x = lastPos[0] + move[i][0];
            let y = lastPos[1] + move[i][1];

            if (x >= 0 && x < this.board.length) {
                if (y >= 0 && y < this.board.length) {
                    if (this.board[x][y] == word[0] && this.check([x,y],position) == true) {
                        finWord = true;
                        var coor = [x,y]
                    }
                }
            }
        }

        if (word.length == 0) {
            return true;
        }

        if (finWord == true) {
            let newPosition = position
            newPosition.push(coor);
            word.shift();
            return this.nextAlpha(word,newPosition)
        }

        return false;

    };

    check(position,index) {
        for (let i = 0; i < index.length; i++) {
            if (position[0] == index[i][0] && position[1] == index[i][1]) {
                return false;
            }
        }
        return true;
    }



}///



// const disctionary = ['AGAK','MUSUH','AKU','KITA']
// let ace = new Boggle (3,4);
// ace.findingNemo(disctionary)

let ace = new Boggle(10,10);
ace.findingNemo(library)




