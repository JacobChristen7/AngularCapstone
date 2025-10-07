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

  latestScore: number = 0;
  latestPlayerName: string = '';
  latestRank: number = 0;

  constructor(private scoreService: ScoreService) {
    this.scores$ = this.scoreService.getScores().pipe(
      map(scores => scores.sort((a, b) => b.score - a.score).slice(0, 10))
    );

    this.scoreService.latestScore$.subscribe(latest => {
      if (latest) {
        this.setLatestScoreAndRank(latest.score, latest.playerName);
      }
    });

    // On init, check persisted score
    const persisted = this.scoreService.getPersistedLatestScore();
    if (persisted) {
      this.setLatestScoreAndRank(persisted.score, persisted.playerName);
    }
  }

  setLatestScoreAndRank(score: number, playerName: string) {
    this.latestScore = score;
    this.latestPlayerName = playerName;
    this.scoreService.getScores().subscribe(scores => {
      // Sort scores descending
      const sorted = scores.sort((a, b) => b.score - a.score);
      // Find the rank (index + 1)
      this.latestRank = sorted.findIndex(s => s.playerName === playerName && s.score === score) + 1;
    });
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
