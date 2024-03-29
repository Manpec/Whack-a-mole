import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderBoardService } from '../leader-board.service';

@Component({
  selector: 'app-leader-board',
  template: `
  <div class="container">
    <h1>Top 10 Players</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let player of players" > 
          <td>{{ player.data.name }}</td>
          <td >{{ player.data.score }}</td>
        </tr>
        </tbody>
    <h3 class="header">Honorable Reward-fastest reaction time</h3>
    <thead>
        <tr>
          <th>Name</th>
          <th>Reaction</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{ fastestPlayer?.name }}</td>
        <td >{{ fastestPlayer?.fastestReaction }} ms</td>
      </tr>
    </tbody>
    </table>
    <button type="button" class="btn btn-primary"
     (click)="onBtnClick()">Back to Game</button>
</div>
  `,
  styles: [`
.container{margin-top: 100px; max-width:700px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap:50px;} tr, td {font-size:20px;} .header{text-align:center; margin-top:100px; margin-bottom:25px;}
  `
  ]
})
export class LeaderBoardComponent implements OnInit{

  players: any[]; 
  fastestPlayer: any; 

  
  constructor( private __router: Router,
               private __leaderboardService: LeaderBoardService
               ){}

  onBtnClick(){
    this.__router.navigate(['']); //Back to Game
  }

  /**
   * Retrieve player data from a database using LearderBoard-service.
   */
  ngOnInit(): void {
    this.__leaderboardService.getPlayers().subscribe(data=>{
      this.players = data;
    }); 

    this.__leaderboardService.getFastestReaction().subscribe(data=>{
      this.fastestPlayer = data[0].data;
    });  
    }
    
  }
