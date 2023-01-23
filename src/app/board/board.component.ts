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
  timeLeft: number = 20;
  holeObserver: any;
  holeObservable: any;
  currentNumberOfMoles:number = 0;
  isStartBtnDisabled: boolean = false;
  isPlaying: boolean = false;
  gameover: boolean = false;
  newPlayer: Player = { name:'' , score:0 };

  

  constructor(private __leaderboardService: LeaderBoardService) { }

  ngOnInit(): void {  
    /**
     * Create an observer to be passed to the new Hole
     */
     this.holeObservable = new Observable(subscriber => {
        this.holeObserver = subscriber;
      }) 

    /**
     * Subscribe to the observer created above to update the score
     */
    this.holeObservable.subscribe(() => {//lyssnar
        this.newPlayer.score++;
      }
    ) 
    /* *
    * Create 25 instances of the Mole class and put each instance into the "holes" array
    */
    for(let i = 0; i < 25; i++) { 
      this.holes.push(new Mole(i, this.holeObserver));      
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
        
        this.holes[randomMole].show(); //use the random number as index of the "holes" array and pick up which mole is showing up
        this.currentNumberOfMoles++;

        setTimeout(() =>{//the mole appears 4 seconds
          this.holes[randomMole].hide();
          this.currentNumberOfMoles--;
        },4000);
      }
      }, 800);

   
    this.gameInterval = setInterval(() => { 
      this.timeLeft --        // Reduce timer by 1
      if(this.timeLeft == 0) {
        this.stopGame(); 
        this.gameover = true;
        this.saveScore();     //save the score
      }
    }, 1000)

  }

  stopGame() {
    clearInterval(this.moleInterval);
    clearInterval(this.gameInterval); 
    this.fastestReactionTime();
    this.isStartBtnDisabled = false;
    this.timeLeft = 60;      //Reset timer 
    for(let i = 0; i < this.holes.length; i++){ 
      this.holes[i].hide();//All moles are hidden
    }
  }
  
  /**
   * this function compares every holes reactiontime and saves the fastest reactiontime
   */
  fastestReactionTime(){
    this.newPlayer.fastestReaction = this.holes[0].reactionTime;
    for (let i = 1; i < this.holes.length; i++) {
      if(this.newPlayer.fastestReaction > this.holes[i].reactionTime){
        this.newPlayer.fastestReaction = this.holes[i].reactionTime;
      }
    }
  }
  /**
   * Save score to database using Leaderboard-Service
  */
 saveScore() {
   this.__leaderboardService.postPlayerScore(this.newPlayer)
  } 
  
  playAgain() {
    this.gameover = false;
    this.isPlaying = true;
  }

  /**
   * linked to click event in the template
   */
  hit(hole: Mole){ 
    hole.smacked(); //smacked()function in Mole class
  }

  /**
   * linked to [ngClass]directiv in the template
   * stateToClass metod changes the class of the div to one of the three different states. 
   */
  stateToClass(state: number) {
    switch(state) {
      /**
       *  Look the respective class in css
       */
      case 0: return "hidden";
      case 1: return "shown";
      case 2: return "smacked";
      default: return ""
    }
  }


}
