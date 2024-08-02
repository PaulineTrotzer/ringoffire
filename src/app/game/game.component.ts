import { Component, OnInit } from '@angular/core';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GameInfoComponent } from '../game-info/game-info.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent implements OnInit {
  pickCardAnimation = false;
  game: Game;
  currentCard: string = '';


  constructor(public dialog: MatDialog, private snackBar: MatSnackBar) {
    this.game = new Game();
  }

  ngOnInit() {
    console.log(this.game);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'I understand', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }


  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop() || '';
      this.pickCardAnimation = true;
    }
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 900);
  }

  checkPlayers(){
    if (this.game.players.length === 0) {
      this.openSnackBar('Please enter at least one Player to continue');
      return; 
    } else {
      this.takeCard()
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((nameOfPlayer: string) => {
      if (nameOfPlayer && nameOfPlayer.length > 0) {
        this.game.players.push(nameOfPlayer);
      }
    });
  }
}
