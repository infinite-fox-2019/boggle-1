class BoogleBoard {
    constructor(data){
        this.dict = data
        this.board = []
    }
    shake(number){
        let result = this.board
        for(let i=0; i<number; i++){
            result.push([])
            for(let j=0; j<number; j++){
                result[i].push(String.fromCharCode(Math.floor(Math.random()*26)+65))
            }
        }
        return result
    }

    boggleFind(board,word){
        let queue = []
        let rows = board.length
        let cols = board[0].length
        for(let i=0; i<rows; i++){
            for(let j=0; j<cols; j++){
                if(board[i][j]===word[0]){
                    queue.push([[i,j]])
                }
            }
        }
        while(queue.length !== 0){
            let letterFound = queue.pop()

            if(letterFound.length===word.length){
                return true
            }

            let [x,y] = letterFound[letterFound.length-1]
            for(let k= -1; k<=1; k++){
                for(let l= -1; l<=1; l++){
                    if(k!==0 && l!==0){
                        let dx = x+k
                        let dy = y+l

                        if((board[dx]||[])[dy]===word[letterFound.length]&& !this.arrayString(letterFound,[[dx,dy]])){
                            queue.push(letterFound.slice().concat([[dx,dy]]))
                        }
                    }
                }
            }
        }
        return false
    }
    arrayString(children,parent){
        let item = parent.toString()
        return children.some(function(arr){
            return item === arr.toString()
        })
    }
    filterDict(board,dict){
        return dict.filter(word => this.boggleFind(board,word))
    }
    solve(){
        let result = this.filterDict(this.board,this.dict)
        console.log(`${result.length} words found: ${result.join(',\n')}`)
    }
}


let kamus = require('./data')
let play = new BoogleBoard(kamus);

play.shake(4);
play.solve()