import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ranking',
  imports: [],
  templateUrl: './ranking.html',
  styleUrl: './ranking.css'
})
export class Ranking {
  @Input() score: number = 0;
  @Input() playerName: string = '';
  @Input() ranking: number = 0;

  constructor() {
    
  }
}
