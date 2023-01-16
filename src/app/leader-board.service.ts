import { Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Player } from './Player';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService {

  playerlist!: AngularFirestoreCollection <Player>;
  fastestPlayer!: AngularFirestoreCollection <Player>;
  players: any; //den innehålla observable 

  constructor( private __afs: AngularFirestore ) { }


  postPlayerScore(playerScore: Player){
    this.__afs.collection('players').add(playerScore)
  }

  getFastestReaction(){
    this.fastestPlayer = this.__afs.collection('players', ref => ref.orderBy('fastestReaction', 'asc').limit(1));
    return this.fastestPlayer.snapshotChanges().pipe(
        map(action => {
            return action.map(a => {
                const data = a.payload.doc.data() as Player;
                const id = a.payload.doc.id; 
                console.log(id, data);
                return { id, data };
                
            });
        })
    );
  }

  getPlayers(){
    this.playerlist = this.__afs.collection('players', ref => ref.orderBy('score', 'desc').limit(10)); //order the collection by score field in descending order
    return this.playerlist.snapshotChanges().pipe(
        map(action => {
            return action.map(a => {
                const data = a.payload.doc.data() as Player;
                const id = a.payload.doc.id; 
                console.log(id, data);
                return { id, data };
                
            });
        })
    );
  } 


}
