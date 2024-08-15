import { Component, Input} from '@angular/core';
import { GameComponent } from '../game/game.component';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [GameComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input()nameOfPlayer = 'Player';
  @Input()playerActive = false;
  @Input()profileImage = 'avatar.png';


  ngOnInit() {
    console.log('Profile Image:', this.profileImage);
  }

}
