import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, map } from 'rxjs';

export interface Score {
  playerName: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  latestScore = 0;
  latestPlayerName = "";
  latestRank = 0;
  scores$: Observable<Score[]>;

  constructor(private firestore: Firestore) {
    this.scores$ = this.getScores().pipe(
      map(scores => scores.sort((a, b) => b.score - a.score).slice(0, 10))
    );
  
    this.latestScore$.subscribe(latest => {
      if (latest) {
        this.setLatestScoreAndRank(latest.score, latest.playerName);
      }
    });
  
    // On init, check persisted score
    const persisted = this.getPersistedLatestScore();
    if (persisted) {
      this.setLatestScoreAndRank(persisted.score, persisted.playerName);
    }
  }

  getScores(): Observable<Score[]> {
    const scoresRef = collection(this.firestore, 'scores');
    return collectionData(scoresRef, { idField: 'id' }) as Observable<Score[]>;
  }

  addScore(scoreRecord: { playerName: string; score: number }) {
    const scoresRef = collection(this.firestore, 'scores');
    return addDoc(scoresRef, scoreRecord);
  }

  private latestScoreSubject = new BehaviorSubject<{ score: number, playerName: string } | null>(null);
  latestScore$ = this.latestScoreSubject.asObservable();

  setLatestScore(score: number, playerName: string) {
    this.latestScoreSubject.next({ score, playerName });
    localStorage.setItem('latestScore', JSON.stringify({ score, playerName }));
  }

  getPersistedLatestScore() {
    const data = localStorage.getItem('latestScore');
    return data ? JSON.parse(data) : null;
  }

  setLatestScoreAndRank(score: number, playerName: string) {
    this.latestScore = score;
    this.latestPlayerName = playerName;
    this.getScores().subscribe(scores => {
      // Sort scores descending
      const sorted = scores.sort((a, b) => b.score - a.score);
      // Find the rank (index + 1)
      this.latestRank = sorted.findIndex(s => s.playerName === playerName && s.score === score) + 1;
    });
  }
}