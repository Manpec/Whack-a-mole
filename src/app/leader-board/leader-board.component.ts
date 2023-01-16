import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { Player } from '../Player';
import { LeaderBoardService } from '../leader-board.service';

@Component({
  selector: 'app-leader-board',
  template: `
    <H1>Hiscore</H1>
    <table class="table table-borered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let player of this.topPlayers" > 
          <td>{{ player.data.name }}</td>
          <td>{{ player.data.score }}</td>
        </tr>
      </tbody>
    </table>   
    <h3>Honorable Reward-fastest reaction time</h3>
    <table class="table table-borered">
      <tbody>
        <tr>
          <td>{{ fastestPlayer?.data.name }}</td>
          <td>{{ fastestPlayer?.data.fastestReaction }} ms</td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-primary"
     (click)="onBtnClick()">Back to Game</button>
  `,
  styles: [
  ]
})
export class LeaderBoardComponent implements OnInit{

  players: any[]; //den innehålla observable 
  fastestPlayer: any;
  topPlayers:any[]; 

  
  constructor( private __router: Router,
               public __leaderboardService: LeaderBoardService,
               ){}

  onBtnClick(){
    this.__router.navigate(['']); //Back to Game
  }

  
  ngOnInit(): void {
    this.__leaderboardService.getPlayers().subscribe(data=>{
      this.players = data

      this.players.sort((a,b) => b.data.score-a.data.score); //sort score
      this.topPlayers = this.players.slice(0,10) //Top10 high-score
      
  
        this.fastestPlayer = this.players[0];
        for (let i = 1; i < this.players.length; i++) {
          if (this.players[i].fastestReaction < this.fastestPlayer.fastestReaction) {
            this.fastestPlayer = this.players[i];
          }
        } 
        console.log(this.fastestPlayer.data);
        console.log(this.fastestPlayer.data.name);
        
       
        
      }) 
    }
    
  }
