const data = require('./data.js');
// let cari = ['ANI','ANDA']

// let board = [['A','N','D','C'],
//             ['G','A','A','C'],
//             ['G','J','K','I'],
//             ['U','Y','T','R']];
// ;

function boardGenerator(besarBoard){
    let board = [];
    let arrIn = [];
    const data = ['A','A','A','A','B','C','D','E','E','E','F','G','H','I','I','J','K','L','M','N','O','O','O','O','P','Q','R','S','T','U','U','U','V','W','X','Y','Z']

    for(let i = 0; i<besarBoard*besarBoard; i += besarBoard){
        arrIn = [];
        for(let j = 0; j<besarBoard; j++){
            let random = data[Math.floor(Math.random() * data.length)]
            arrIn.push(random)
        }
        board.push(arrIn)
    }
    return board;
}

function kataChooser(board, arr) {
    let kata = []
    for(let i = 0; i<arr.length; i++){
        let isThere = false;
        isThere = pencariKoordinat(board, arr[i])
        if(isThere == true){
            kata.push(arr[i]);
        }
    }
    if(kata.length == 0){
        return 'Tidak Ditemukan Kata'
    }
    else{
        return kata;
    }
}

function pencariKoordinat(board, kata) {
    let isKata = false;
    let huruf = kata[0];
    let koordinat = []

    for(let i = 0; i<board.length; i++){
        for(j = 0; j<board[i].length; j++){
            if(huruf == board[i][j]){
                let penampung = board[i][j]
                koordinat.push(i,j)
                penampung += board[i][j];
                board[i][j] = ' ';
                isKata = solver(board, kata, koordinat)
                if(isKata == true){
                    return true;
                }
                board[i][j] = penampung;
                koordinat = []
            }
        }
    }
    if (penampung.length == 0){
        return false;
    }
}

function solver(board, kata, koordinat){
    let historyKoordinat = [];
    let kataSementara = kata[0];
    for(let i = 1; i<kata.length; i++){
        if(i <1){
            return false;
        }

        if(kata[i] == board[koordinat[0]-1][koordinat[1]-1]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]-1],[koordinat[1]-1]];
            kataSementara += board[koordinat[0]-1][koordinat[1]-1];
        }
        else if(kata[i] == board[koordinat[0]-1][koordinat[1]]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]-1],[koordinat[1]]];
            kataSementara += board[koordinat[0]-1][koordinat[1]];
        }
        else if(kata[i] == board[koordinat[0]-1][koordinat[1]+1]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]-1],[koordinat[1]+1]];
            kataSementara += board[koordinat[0]-1][koordinat[1]+1];
        }
        else if(kata[i] == board[koordinat[0]][koordinat[1]-1]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]],[koordinat[1]-1]];
            kataSementara += board[koordinat[0]][koordinat[1]-1];
        }
        else if(kata[i] == board[koordinat[0]][koordinat[1]+1]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]],[koordinat[1]+1]];
            kataSementara += board[koordinat[0]][koordinat[1]+1];
        }
        else if(kata[i] == board[koordinat[0]+1][koordinat[1]-1]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]+1],[koordinat[1]-1]];
            kataSementara += board[koordinat[0]+1][koordinat[1]-1];
        }
        else if(kata[i] == board[koordinat[0]+1][koordinat[1]]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]+1],[koordinat[1]]];
            kataSementara += board[koordinat[0]+1][koordinat[1]];
        }
        else if(kata[i] == board[koordinat[0]+1][koordinat[1]+1]){
            historyKoordinat.push(koordinat);
            koordinat = [[koordinat[0]+1],[koordinat[1]+1]];
            kataSementara += board[koordinat[0]+1][koordinat[1]+1];
        }
        else{
            i--;
            board[koordinat[0]][koordinat[1]] = ' ';
            koordinat = historyKoordinat[historyKoordinat.length -1];
            historyKoordinat.splice(historyKoordinat-1, 1);
        }
    }
    return true;
}
