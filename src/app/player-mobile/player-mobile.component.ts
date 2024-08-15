import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss',
})
export class PlayerMobileComponent {
  @Input() nameOfPlayer: 'Player' | any;
  @Input() playerActive = false;
  @Input()profileImage = 'avatar.png'

  ngOnInit() {
    console.log('Profile Image:', this.profileImage);
  }

}

