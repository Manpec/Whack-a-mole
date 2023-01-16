import { Component, OnInit } from '@angular/core';
import { Observable }  from 'rxjs/internal/Observable';



import { Mole } from '../Mole';
import { Player } from '../Player';
import { LeaderBoardService } from '../leader-board.service';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit{

  holes: Mole[] = []; 
  moleInterval: any; 
  gameInterval: any;  
  timeLeft: number = 10;
  holeObserver: any;
  holeObservable: any;
  currentNumberOfMoles:number = 0;
  isStartBtnDisabled: boolean = false;
  isPlaying: boolean = false;// showgameboard
  gameover: boolean = false;
  newPlayer: Player = { name:'' , score:0 };

  

  constructor(private __leaderboardService: LeaderBoardService) { }

  ngOnInit(): void { 
    /**
     * Create an observer to be passed to the new Hole
     */
     this.holeObservable = new Observable(observer => {
        this.holeObserver = observer;
       
        console.log(this.holeObservable);//Observable
        console.log(this.holeObserver); //Subscriber 
      }
    ) 
    /**
     * Subscribe to the observer created above to update the score
     */
    this.holeObservable.subscribe(() => {
        this.newPlayer.score++;
      }
    ) 

    for(let i = 0; i<25; i++) { //make an instans:Hole 
      this.holes.push(new Mole(i, this.holeObserver))//作成されたオブザーバーを新しい穴に渡します
    console.log(this.holes);
   // console.log(i, this.holeObserver);
    }
 }

 onSubmit(){
    this.isPlaying = true;
 }

  startGame(){
    this.newPlayer.score = 0;
    this.currentNumberOfMoles = 0;
    this.isStartBtnDisabled = true;
    this.moleInterval = setInterval(() => {
      if(this.currentNumberOfMoles < 3){// max three moles show on screen
      
        let randomMole = Math.floor(Math.random() * 25); //generate random number between 0-24
        
        this.holes[randomMole].show(); //use the random number as index of  holes array[] and pick up which mole is showing up
        this.currentNumberOfMoles++;
        console.log("current moles: ", this.currentNumberOfMoles)
     
        setTimeout(() =>{
          this.holes[randomMole].hide();
          this.currentNumberOfMoles--;
          console.log("current moles: ", this.currentNumberOfMoles)
        },4000);//efter 4 sekunder försvinner den
      }
      }, 800);

   
    this.gameInterval = setInterval(() => {//save the returned value 
      this.timeLeft -- //timeleft = timeleft -1
      if(this.timeLeft == 0) {
        this.stopGame(); 
        this.gameover= true;
        this.saveScore(); //för att använda DB!!!
      }
    }, 1000)

  }

  fastestReactionTime(){
    this.newPlayer.fastestReaction = this.holes[0].reactionTime;
    for (let i = 1; i < this.holes.length; i++) {
      console.log(this.holes[i].reactionTime)
      if(this.newPlayer.fastestReaction > this.holes[i].reactionTime){
        this.newPlayer.fastestReaction = this.holes[i].reactionTime;
      }
    }
  }

  stopGame() {
    clearInterval(this.moleInterval);
    clearInterval(this.gameInterval);
    this.fastestReactionTime();
    this.isStartBtnDisabled = false;
    this.timeLeft = 60;
   for(let i = 0; i < this.holes.length; i++){
      this.holes[i].hide();
    }
  }
  
  playAgain() {
    this.gameover = false;
    this.isPlaying = true;
  }

  saveScore() {
    this.__leaderboardService.postPlayerScore(this.newPlayer)
  } 

 
  hit(hole: Mole) { // this function starts when (click)event //import Mole class
    hole.smacked();
   

  }

  stateToClass(state: number) {
    switch(state) {
      /**
       *  Look in css file
       */
      case 0: return "hidden";
      case 1: return "shown";
      case 2: return "smacked";
      default: return ""
    }
}


}
