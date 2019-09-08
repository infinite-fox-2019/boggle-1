class TheBoggle {
    //provide the boggle skeleton
    constructor() {
        //the library is imported from the data.js file as an object of array
        this.lib = require('./data')
        this.board = []
        this.result = []
    }

    //head() is the main method to execute this game
    head(num) { 
        //the num is obtained from terminal input : 
        //node boggle.js 4 to provide a 4x4 board dimension
        //node boogle.js 7 to provide a 7x7 board dimension
        if (process.argv[2] < 4 || !process.argv[2]) {
            num = 4
        } else {
            num = process.argv[2]
        }

        this.shake(num)

        //display the board on the terminal
        console.log(this.board)
       
        //compare the letter contains in the board with the first letter of each word in the library
        //and pass the value of i, j and the associated word in the library to the solver method as it's input parameter
        for (let i=0; i<this.board.length; i++) {
            for (let j=0; j<this.board[i].length; j++) {
                for (let k=0; k<this.lib.words.length; k++) {
                    if (this.board[i][j] === this.lib.words[k][0]) {
                        this.solver(i, j, this.lib.words[k])
                    }
                }
            }
        }
        //inform the user how many words found
        console.log(`\n YAY! We've found ${this.result.length} words! \n There are ${this.result}.`)
    }

    //insert randomize letter to the board
    shake(num) {
        let lib = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        for(let i=0; i<num; i++) {
            this.board.push([])
            for(let j=0; j<num; j++) {
                this.board[i][j] = lib[Math.floor(Math.random() * 25) + 1]
            }
        }
        return this.board
        
    }

    //solver method is the brain behind it all
    //coorI, coorJ, and word is the parameter passed from the head method
    solver(coorI, coorJ, word) {
        const theBoard = this.board
        //coordinates variable is declared to store the helper index for checking the letter neighbors in 8 directions (horizontal, vertical, and diagonal)
        const coordinates = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]
        let flag = true
        let cursor = 1
        let history = []

        while (flag) {
            let isAvailable = false

            for(let i=0; i<coordinates.length; i++) {
                let checkedI = coorI + coordinates[i][0]
                let checkedJ = coorJ + coordinates[i][1]

                //the checking area is restricted only inside the board
                if (checkedI >= 0 && checkedI < theBoard.length && checkedJ >= 0 && checkedJ < theBoard.length) {
                    if (theBoard[checkedI][checkedJ] === word[cursor]) {
                        history.push([[coorI, coorJ], theBoard[coorI][coorJ]])
                        //the letter that has been pushed to the history is removed to avoid doublechecking for the same letter
                        theBoard[coorI][coorJ] = ' '
                        coorI = checkedI
                        coorJ = checkedJ
                        cursor++
                        isAvailable = true
                        break
                    }
                }
            }

            if (isAvailable === false) {
                flag = false
            }

            if (cursor === word.length) {
                flag = false
                this.result.push(word)
            }
        }

        for (let i=0; i<history.length; i++) {
            theBoard[history[i][0][0]][history[i][0][1]] = history[i][1]
        }
    }

}

//create one instance child for the boggle parent named boggle
let boggle = new TheBoggle()

//proceed!
boggle.head()