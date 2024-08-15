import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent {
  cardAction = [
    {
      title: 'Ace (Waterfall)',
      description:
        'Everyone has to start drinking at the same time. As soon as player 1 stops drinking, player 2 may stop drinking. Player 3 may stop as soon as player 2 stops drinking, and so on.',
    },
    { title: 'Two (You)', description: 'You decide who drinks' },
    { title: 'Three (Me)', description: 'Congrats! Drink a shot!' },
    {
      title: 'Four (Category)',
      description:
        'Come up with a category (e.g. Colors). Each player must enumerate one item from the category.',
    },
    {
      title: 'Five (Bust a jive)',
      description:
        'Player 1 makes a dance move. Player 2 repeats the dance move and adds a second one. ',
    },
    { title: 'Six (Chicks)', description: 'All girls drink.' },
    {
      title: 'Seven (Heaven)',
      description: 'Put your hands up! The last player drinks!',
    },
    {
      title: 'Eight (Mate)',
      description:
        'Pick a mate. Your mate must always drink when you drink and the other way around.',
    },
    {
      title: 'Nine (Rhyme)', description: 'Pick a word. In a clockwise direction, the other players have to figure it out. Anyone who repeats a word or cannot find a new rhyme has to take a sip.'
    },
    { title: 'Ten (Thumbmaster)', description: 'Touch the tabletop with your thumb. The last player to touch the table has to take a sip.' },
    { title: 'Jack (Men)', description: 'All men drink.' },
    { title: 'Queen (Quizmaster)', description: 'The Quizmaster can ask anyone a question. If you get caught answering the question, you must drink.' },
    {
      title: 'Never have i ever...',
      description:
        'Say something you nnever did. Everyone who did it has to drink.',
    },
    {
      title: 'King (Rule)',
      description:
        'Make a rule. Everyone needs to drink when he breaks the rule.',
    },
  ];

  title = '';
  description = '';
  @Input() card: string = '';


  ngOnChanges() {
    if (this.card) {
      console.log('currentCard is', this.card);
      
      let cardNumber = +this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}
