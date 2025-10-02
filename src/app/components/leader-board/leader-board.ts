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
    { name: 'Ben', score: 20 }
  ];
}
