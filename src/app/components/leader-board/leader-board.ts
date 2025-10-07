import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreService, Score } from '../../services/score.service';
import { Ranking } from '../ranking/ranking';
import { Observable, map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-leader-board',
  imports: [CommonModule, MatCardModule, Ranking],
  templateUrl: './leader-board.html',
  styleUrl: './leader-board.css'
})
export class LeaderBoard {
  
  scores$: Observable<Score[]>;

  constructor(public scoreService: ScoreService) {
    this.scores$ = scoreService.scores$
  }

  // Function for mouse background movement
  onMouseMove(event: MouseEvent) {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    // Calculate position as percent
    const posX = 46 + x * 8; // Range
    const posY = 46 + y * 8; // Range
    document.documentElement.style.setProperty('--bg-pos', `${posX}% ${posY}%`);
  }
}
