export class Mole {

    //moleState
     //0: hide empty
     //1: out  finns mole i hålet
     //2: hit
 
     moleState: number
     holeNumber: number
     reactionTime: number
     ms: number
     intervalId: any
    

     constructor(public num: number, public observer: any) {//constructor:インスタンス化をすれば必ず実行されるメソッド 初期化メソッド
         this.moleState = 0; //num => 0を代入　それをmoleState にする= hide 
         this.holeNumber = num;
         this.reactionTime = 4000;//4000miliseconds default. Kan inte bli högre än det
         this.ms = 0;
     }
 
     show() { //vid start()
         // If the mole is already out, 
          console.log(`in hole class: NO.${this.holeNumber} hole, before state: ${this.moleState}`);
         if(this.moleState === 0) { //When mole is hide empty , mole comes out
             this.moleState = 1;
             this.intervalId = setInterval(()=>{
                this.ms++
             },10)
              console.log(`NO.${this.holeNumber} hole, after state: ${this.moleState}`);
             return true;
         }   else {
             return false;
         }
     }

     checkReactionTime(){
        if(this.ms > 0 && this.reactionTime > this.ms){
            this.reactionTime = this.ms
            console.log("miliseconds:" ,this.reactionTime)
        }
     }
     
     //smacked メソッドはモグラの状態を「ヒット」に変更してオブザーバーに通知し
     smacked() { //vid hit()
        if(this.moleState === 1) {
            clearInterval(this.intervalId)
            this.checkReactionTime()
            this.ms = 0;
            this.moleState = 2;//when mole  comes out, hit mole
            console.log("hit ", this.moleState);

            this.observer.next(); //For counter ++
            
             setTimeout(() => {
                 this.moleState = 0
             }, 1000)
             return true;
         }   else    {
             return false;
         }
     }
 
     hide() {
         if(this.moleState === 1) {
             this.moleState = 0;
             clearInterval(this.intervalId);
             this.checkReactionTime();
             this.ms=0;
         }
     }
 
     isShown() {
         return this.moleState;
     }
 
 }
 