export class Mole {

     moleState: number;
     holeNumber: number;
     reactionTime: number;
     ms: number;
     intervalId: any;
     scoreObserver:any;
     
    

     constructor(public num: number, public observer: any) {
         this.moleState = 0; //moles are hiding in the beginning of the game
         this.holeNumber = num;
         this.reactionTime = 4000;//4000 miliseconds as default. Can not be higter than that
         this.ms = 0;
         this.scoreObserver = observer;
        
     }

     /**
      * Use a switch statement in "moleStateChangeCssClass" metod to determine which CSS class to return based on the value of the status.
      */
 
     show() { //shows the moles after the game starts randomly
        if(this.moleState === 0) { //If mole is empty(hidden), mole comes out
        this.moleState = 1; //css class becomes shown
            this.intervalId = setInterval(()=>{
                this.ms+=10;
            },10);
        }
    }

    smacked() { //on smack()
        if(this.moleState === 1) { //If mole is shown 
            clearInterval(this.intervalId);
            this.checkReactionTime();
            this.ms = 0;
            this.moleState = 2; //molestate becomes smacked and css class changes, 
         

            this.scoreObserver.next(); //score++ by notifying the observer that is listening to score (subscriber)
            
            setTimeout(() => { 
                this.moleState = 0 //hide the mole after 1 second and css class becomes hidden
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
 