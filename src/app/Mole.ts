export class Mole {

     moleState: number;
     holeNumber: number;
     reactionTime: number;
     ms: number;
     intervalId: any;
    

     constructor(public num: number, public observer: any) {
         this.moleState = 0; //moles are hiding in the beginning of the game
         this.holeNumber = num;
         this.reactionTime = 4000;//4000 miliseconds as default. Can not be higter than that
         this.ms = 0;
     }

     /**
      * Use a switch statement in stateToClass metod to determine which class to return based on the value of the status.
      * 
      case 0: return "hidden"
      case 1: return "shown"
      case 2: return "smacked" 
      */
 
     show() { //vid start()
        if(this.moleState === 0) { //If mole is empty(hidden), mole comes out
            this.moleState = 1;
            this.intervalId = setInterval(()=>{
                this.ms+=10;
            },10);
        }
    }

    smacked() { //vid hit()
        if(this.moleState === 1) { //If mole is busy(shown) 
            clearInterval(this.intervalId);
            this.checkReactionTime();
            this.ms = 0;
            this.moleState = 2; //If mole is busy(shown), smack mole
           // console.log("hit ", this.moleState);

            this.observer.next(); //score++ by notifying the observer that is listening to score (subscriber)
            
            setTimeout(() => { 
                this.moleState = 0 //hide the mole after 1 second
            }, 1000);
        }
    }
    
    hide() {
        if(this.moleState === 1) { //If mole is busy(shown) 
            this.moleState = 0;   //hide the moles
            clearInterval(this.intervalId);
            this.checkReactionTime();
            this.ms=0;
        }
    }
    
    /**
     * If the latest ms is faster than this.reactionTime then the ms becomes this.reactionTime for this hole. Every hole has this function running 
     */
    checkReactionTime(){
       if(this.ms > 0 && this.reactionTime > this.ms){
           this.reactionTime = this.ms
       }
    }
     
  
 

}
 