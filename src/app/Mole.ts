export class Mole {

    //moleState
     //0: hide empty
     //1: out  finns mole i hålet
     //2: hit
 
     moleState: number
     holeNumber: number
    
 
     constructor(public num: number, public observer: any) {//constructor:インスタンス化をすれば必ず実行されるメソッド 初期化メソッド
         this.moleState = 0; //num => 0を代入　それをmoleState にする= hide 
         this.holeNumber = num;
     }
 
     show() {
         // If the mole is already out, 
          console.log(`in hole class: NO.${this.holeNumber} hole, before state: ${this.moleState}`);
         if(this.moleState === 0) { //When mole is hide empty , mole comes out
             this.moleState = 1;
              console.log(`NO.${this.holeNumber} hole, after state: ${this.moleState}`);
          
           
             return 
         }   else {
             return false;
         }
     }
 
     smacked() {
         if(this.moleState === 1) {
             this.moleState = 2;//when mole  comes out, hit mole
             console.log("hit ", this.moleState);
             this.observer.next(true);
           
             let that = this;
             setTimeout(function(){
                 that.moleState = 0
             }, 1000)
             return true;
         }   else    {
             return false;
         }
     }
 
     hide() {
         if(this.moleState === 1) {
             this.moleState = 0;
         }
     }
 
     isShown() {
         return this.moleState;
     }
 
 }
 