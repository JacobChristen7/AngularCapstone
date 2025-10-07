import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Score {
  playerName: string;
  score: number;
  // Add other fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  constructor(private firestore: Firestore) {}

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
}