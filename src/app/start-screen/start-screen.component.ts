import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss',
})
export class StartScreenComponent {
  firestore: Firestore = inject(Firestore);


  constructor(private router: Router) {}


  async newGame() {
   let game = new Game();
      const docRef = await this.addGameInfo(game); // Add game info and get document reference
      if (docRef) {
        // Navigate to the game page with the new game ID
        this.router.navigateByUrl(`/game/${docRef.id}`);
      }
  }

  async addGameInfo(game: Game) {
      const collectionRef = collection(this.firestore, 'game-details');
      const docRef = await addDoc(collectionRef, game.toJson());
      console.log('Game added with ID:', docRef.id);
      return docRef; 
  }
}