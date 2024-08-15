import { Component, OnInit, inject } from '@angular/core';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Firestore, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';
import { EditPlayerComponent } from '../edit-player/edit-player.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    PlayerComponent,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    GameInfoComponent,
    PlayerMobileComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  game: Game;
  gameId: string | any;
  gameOver = false;

  unsubGameDetails: () => void = () => {};
  routeParamsSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.game = new Game();
  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      this.startListeningToGameCollection(this.gameId);
    });
    console.log('Player Images:', this.game.player_profilImages);
  }

  startListeningToGameCollection(docId: string) {
    const gameDocRef = doc(this.firestore, 'game-details', docId);

    this.unsubGameDetails = onSnapshot(gameDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log('Updated data:', data);

        // Übertrage die Daten auf die game Instanz
        if (data) {
          this.game.currentPlayer = data['currentPlayer'] ?? 0;
          this.game.playedCards = data['playedCards'] ?? [];
          this.game.players = data['players'] ?? [];
          this.game.player_profilImages = data['player_profilImages'] ?? [];
          this.game.stack = data['stack'] ?? [];
          this.game.pickCardAnimation = data['pickCardAnimation'] ?? Boolean;
          this.game.currentCard = data['currentCard'] ?? String;
        }
      }
    });
  }

  async saveGame() {
    const gameDocRef = doc(this.firestore, 'game-details', this.gameId);

    await updateDoc(gameDocRef, this.game.toJson()).catch((err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.unsubGameDetails();
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'I understand', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
    } else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop() || '';
      this.game.pickCardAnimation = true;
    }
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 900);
  }

  checkPlayers() {
    if (this.game.players.length === 0) {
      this.openSnackBar('Please enter at least one Player to continue');
      return;
    } else {
      this.takeCard();
    }
  }

  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);
    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change == 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.player_profilImages.splice(playerId, 1);
        } else {
          this.game.player_profilImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((nameOfPlayer: string) => {
      if (nameOfPlayer && nameOfPlayer.length > 0) {
        this.game.players.push(nameOfPlayer);
        this.game.player_profilImages.push('avatar.png');
        this.saveGame();
      }
    });
  }
}
