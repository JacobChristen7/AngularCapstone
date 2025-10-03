import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
}