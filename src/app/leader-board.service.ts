import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { Player } from './Player';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderBoardService implements OnInit{

  playerlist!: AngularFirestoreCollection <Player>;
  players: any; //den innehålla observable 

  constructor( private __afs: AngularFirestore,
               ) { }

  /* ngOnInit(): void {
    this.playerlist = this.__afs.collection('players')//link to collection in DB

    this.players = this.playerlist.snapshotChanges().pipe( 
    map(action=> { 
      return action.map( a => {
        const data = a.payload.doc.data() as Player; //Extract the content of the Document = object of <Player>
        const id = a.payload.doc.id; //Extract id for this document
        console.log(id, data);
        
        return { id, data };
        
      })
    })
  );
  } */

  ngOnInit(): void {
    
  }

  postPlayerScore(playerScore: Player){
    this.__afs.collection('players').add(playerScore)
  }

  getPlayers(){
    this.playerlist = this.__afs.collection('players');

    return this.playerlist.snapshotChanges().pipe(
        map(action => {
            return action.map(a => {
                const data = a.payload.doc.data() as Player;
                const id = a.payload.doc.id; //Extract id for this document
                console.log(id, data);
                return { id, data };
                
            });
        })
    );
  } 


}
