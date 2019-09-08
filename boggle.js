const alphabet = require('./data')

class Boggle{
    
    constructor (){
      this.kamus = alphabet
      this.papan = this.papan()
      this.gerak =  [
                      [-1, 0], //atas
                      [1, 0], //bawah
                      [0, 1], //kanan
                      [0, -1], //kiri
                      [-1, 1], //diag atas kanan 
                      [-1, -1], //diag atas kiri
                      [1, 1], //diag bawah kanan
                      [1, -1] // diag bawah kiri
                    ]
    }

    randomHuruf () {
      let huruf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      let randomH = Math.floor (Math.random () * 26)

      return huruf[randomH]
    }
    


    papan () {

      let outPapan = []
      for(let i = 0; i < 4; i++){
        
        let tempPapan = []     
        for(let j = 0; j < 4 ; j++){
          tempPapan.push(this.randomHuruf())
        }
        outPapan.push(tempPapan)
      }

      return outPapan
    }



    penyelesaian () {
      let papan = this.papan
      
      console.table(papan)
      
      let kamus = this.kamus
      let hasilKata = []

      for(let i = 0; i<papan.length;i++){
        for(let j = 0; j<papan[i].length;j++){
        
          for(let k = 0; k<kamus.length;k++){
            
            let kata = kamus[k]
            if (kata[0] === this.papan[i][j] && this.cekWord(kata, i, j) ){
                hasilKata.push(kata)
            }
          }
        }
      }
      
      let filter = new Set(hasilKata)
      let hasilArr  = [...filter]

      console.log(`Kata yang ditemukan: ${hasilArr.join(',')}`)
    }


    cekWord(cekKata,korI,korJ){
      
      if(cekKata.length <= 1){
        return true;
      }

      this.papan[korI][korJ] = null
      
        for(let k = 0; k < this.gerak.length; k++){
            
          let row = korI + this.gerak[k][0]
          let col = korJ + this.gerak[k][1]
          
          if(row >= 0 && col >= 0 && row < 4 && col < 4 ){
            if(this.papan[row][col] === cekKata[1] && this.cekWord(cekKata.slice(1) ,row ,col)){
              this.papan[korI][korJ] = cekKata[0]
              return true
              }
            }
          }

      this.papan[korI][korJ] = cekKata[0]
      return false
    }

}

let game = new Boggle()

game.penyelesaian()