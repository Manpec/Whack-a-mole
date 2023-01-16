import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LeaderBoardComponent } from './leader-board/leader-board.component';

const routes: Routes = [
  {path:'', component: BoardComponent},
  {path:'leaderboard', component: LeaderBoardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
