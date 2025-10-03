import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-leader-board',
  imports: [CommonModule, MatCardModule],
  templateUrl: './leader-board.html',
  styleUrl: './leader-board.css'
})
export class LeaderBoard {
  players = [
    { name: 'Swags', score: 230 },
    { name: 'Jake', score: 22 },
    { name: 'Ben', score: 20 },
    { name: 'James', score: 20 },
    { name: 'Max', score: 18 },
    { name: 'Sawyer', score: 17 },
    { name: 'Swags Rival', score: 250 },
    { name: 'Dave', score: 19 },
    { name: 'Fail >.<', score: -100 },
    { name: 'Juny', score: 19 },
    { name: 'JC', score: 3 }
  ];

  get sortedPlayers() {
    return [...this.players].sort((a, b) => b.score - a.score);
  }
}
