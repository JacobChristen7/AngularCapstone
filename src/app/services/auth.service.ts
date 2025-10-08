import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private auth: Auth) {
    // Listen for auth state changes
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async signUpEmail(email: string, password: string) {
    const result = await createUserWithEmailAndPassword(this.auth, email, password);
    this.userSubject.next(result.user); // Set the user immediately
    return result;
  }

  async signInEmail(email: string, password: string) {
    const result = await signInWithEmailAndPassword(this.auth, email, password);
    this.userSubject.next(result.user);
    return result;
  }

  async signInGoogle() {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(this.auth, provider);
    this.userSubject.next(result.user);
    return result;
  }

  async signOut() {
    await signOut(this.auth);
    this.userSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}