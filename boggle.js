class BoggleBoard{
	constructor(){
        this.alphabet = 'abcdefghijklmnopqrstuvwxyz'
        this.board = []
        this.dictionary = require('./data.js')
	}


    // ASSIGN INDEX TO ALPHABET
	randomLetterGenerator(){
        let randomNumberGenerator = Math.floor(Math.random() * Math.floor(26))
		return this.alphabet[randomNumberGenerator].toUpperCase()
	}


    // GENERATE ALL RANDOM ALPHABETS IN ARRAY FORM
	shake(num = 4){
		let result = []
		for(let i  = 0 ; i < num ; i++){
			result.push([])
			for(let j = 0 ; j < num ; j++){
				result[i].push(this.randomLetterGenerator())
			}
		}
		this.board = result
	}


    // PRINT BORDERED LAYOUT
	printBoard(board = this.board){
		let layout = ""
		layout += ` +${"---+".repeat(board.length)}\n`

		for(let i = 0 ; i < board.length ; i++){
			layout += `  | ${board[i].join(" | ")} |\n`
			layout+=`  +${"---+".repeat(board.length)}\n`
		}
		return layout
	}


    // CHECK HISTORY FOR SAME COORDINATES
	isThisCoordinateAlreadyPassedBefore(passedCoordinates, row, column){
		for(let coordinate of passedCoordinates){
			let rowPassed = coordinate[0]
            let columnPassed = coordinate[1]

			if(row === rowPassed && column === columnPassed) {
                return true
            }
		}
		return false
	}


	solve(){
		let wordsFound =[]
		let board = this.board
		for(let word of this.dictionary){
			if(boggle.isThisWordFound(word,board)){
				wordsFound.push(word)
			}
        }
    console.log(`${wordsFound.length} words found:\n${wordsFound.sort().join("\n")}`)
}


	isThisWordFound(wordSearchHistory, board){
		for(let i = 0 ; i < board.length ; i++){
			for(let j = 0 ; j< board[i].length ; j++){
				if(board[i][j]=== wordSearchHistory[0]){
                    let passedCoordinates = []
                    passedCoordinates.push([i,j])
					if(this.searchAroundGivenCoordinate(i,j,wordSearchHistory.slice(1),board,passedCoordinates)=== true){
						return true
					}
				}
			}
		}
		return false
	}

	searchAroundGivenCoordinate(row, column, wordSearchHistory, board, passedCoordinates){
        const directions =
        [
			{row : 0, column : 1, directionHeaded : "right"},
			{row : 1, column : 1, directionHeaded : "downRight"},
			{row : 1, column : 0, directionHeaded : "down"},
			{row : 1, column :-1, directionHeaded : "downLeft"},
			{row : 0, column :-1, directionHeaded : "left"},
			{row :-1, column :-1, directionHeaded : "upperLeft"},
			{row :-1, column : 0, directionHeaded : "up"},
			{row :-1, column : 1, directionHeaded : "upperRight"}
        ]

		for(let i = 0; i < directions.length; i++){
			let rowPositionToMove = directions[i]["row"]
			let columnPositionToMove = directions[i]["column"]

			let newRowPosition = row + (rowPositionToMove)
			let newColumnPosition = column + (columnPositionToMove)

			if(!this.isThisCoordinateAlreadyPassedBefore(passedCoordinates,
				newRowPosition,
                newColumnPosition))
                {
				if(
					board[newRowPosition] &&
					board[newRowPosition][newColumnPosition] &&
					board[newRowPosition][newColumnPosition] === wordSearchHistory[0]
				)
				{

					if(wordSearchHistory.length ===1){
						return true
					}
					else{
                        passedCoordinates.push([newRowPosition,
                            newColumnPosition])
						return true &&
						this.searchAroundGivenCoordinate(newRowPosition,
							newColumnPosition,
							wordSearchHistory.slice(1),
							board,
							passedCoordinates)
					}
				}
			}
		}
		return false
	}
}



let boggle = new BoggleBoard()


boggle.shake()
console.log("BOARD: \n", boggle.printBoard())
boggle.solve()