import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ranking',
  imports: [RouterLink],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class Ranking {
  ranking = 0;
  score = 0;

  constructor() {
    
  }

  getRanking() {
    
  }
}
