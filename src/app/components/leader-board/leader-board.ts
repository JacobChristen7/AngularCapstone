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

  constructor(private scoreService: ScoreService) {
    this.scores$ = this.scoreService.getScores().pipe(
      map(scores => scores.sort((a, b) => b.score - a.score).slice(0, 10))
    );
  }
}
