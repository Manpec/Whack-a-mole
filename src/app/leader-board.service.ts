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

  constructor( private __afs: AngularFirestore ) { }

  /**
   * Add a new player's score to the collection. 
   */
  postPlayerScore(playerScore: Player){
    this.__afs.collection('players').add(playerScore)
  }

  
    /**
     * Order the collection by fastestReaction field in ascending order
     */
  getFastestReaction(){
    this.fastestPlayer = this.__afs.collection('players', ref => ref.orderBy('fastestReaction', 'asc').limit(1));
    return this.fastestPlayer.snapshotChanges().pipe(
        map(action => {
            return action.map(a => {
                const data = a.payload.doc.data() as Player;
                return { data };
                
            });
        })
    );
  }
    /**
     * Order the collection by score field in descending order
     */
  getPlayers(){
    this.playerlist = this.__afs.collection('players', ref => ref.orderBy('score', 'desc').limit(10)); 
    return this.playerlist.snapshotChanges().pipe(
        map(action => {
            return action.map(a => {
                const data = a.payload.doc.data() as Player;
                return { data };
                
            });
        })
    );
  } 


}
