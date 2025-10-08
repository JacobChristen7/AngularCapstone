import { Injectable, signal } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject, map } from 'rxjs';

export interface Score {
  playerName: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  latestScore = signal(0);
  latestPlayerName = signal('');
  latestRank = signal(0);

  setScore(s: number) { this.latestScore.set(s); }
  setPlayerName(n: string) { this.latestPlayerName.set(n); }
  setRank(r: number) { this.latestRank.set(r); }

  scores$: Observable<Score[]>;

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.scores$ = this.getScores().pipe(
      map(scores => scores.sort((a, b) => b.score - a.score))
    );
  
    this.latestScore$.subscribe(latest => {
      if (latest) {
        this.setLatestScoreAndRank(latest.score, latest.playerName);
      }
    });
  
    // // On init, check persisted score
    // const persisted = this.getPersistedLatestScore();
    // if (persisted) {
    //   this.setLatestScoreAndRank(persisted.score, persisted.playerName);
    // }
  }

  getScores(): Observable<Score[]> {
    const scoresRef = collection(this.firestore, 'scores');
    return collectionData(scoresRef, { idField: 'id' }) as Observable<Score[]>;
  }

  addScore(scoreRecord: { playerName: string; score: number }) {
    // Only allow adding score if user is authenticated
    const user = (this.authService as any).auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to add score.');
    }
    const scoresRef = collection(this.firestore, 'scores');
    return addDoc(scoresRef, scoreRecord);
  }

  private latestScoreSubject = new BehaviorSubject<{ score: number, playerName: string } | null>(null);
  latestScore$ = this.latestScoreSubject.asObservable();

  // setLatestScore(score: number, playerName: string) {
  //   this.latestScoreSubject.next({ score, playerName });
  //   localStorage.setItem('latestScore', JSON.stringify({ score, playerName }));
  // }

  // getPersistedLatestScore() {
  //   const data = localStorage.getItem('latestScore');
  //   return data ? JSON.parse(data) : null;
  // }

  setLatestScoreAndRank(score: number, playerName: string) {
    this.setScore(score)
    this.setPlayerName(playerName);
    this.getScores().subscribe(scores => {
      // Sort scores descending
      const sorted = scores.sort((a, b) => b.score - a.score);
      // Find the rank (index + 1)
      const rank = sorted.findIndex(s => s.playerName === playerName && s.score === score) + 1;
      this.setRank(rank)
      console.log(this.latestRank)
    });
  }
}