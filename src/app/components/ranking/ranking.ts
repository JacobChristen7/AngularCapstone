import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Score, ScoreService } from '../../services/score.service';

@Component({
  selector: 'app-ranking',
  imports: [RouterLink],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class Ranking {
  @Input() score: number = 0;
  @Input() playerName: string = '';
  @Input() ranking: number = 0;

  constructor(private scoreService: ScoreService) {
    this.score = scoreService.latestScore
    this.playerName = scoreService.latestPlayerName
    this.ranking = scoreService.latestRank
  }
}
