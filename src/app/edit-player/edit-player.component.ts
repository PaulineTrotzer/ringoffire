import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-player',
  standalone: true,
  imports: [
    CommonModule,
    DialogAddPlayerComponent,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule
  ],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss',
})
export class EditPlayerComponent {
  allProfilePictures = [
    'man_bigTeeth.png',
    'man_black.png',
    'man_cap.png',
    'man_oldGlasses.png',
    'man_pipe.png',
    'woman_beanie.png',
    'woman_black.png',
    'woman_blondeHair.png',
    'woman_blueHair.png',
  ];

  readonly dialogRef = inject(MatDialogRef<EditPlayerComponent>);

  onNoClick() {
    this.dialogRef.close();
  }
}
