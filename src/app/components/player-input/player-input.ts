import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { PlayerService } from '../../services/player.service';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-player-input',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './player-input.html',
  styleUrl: './player-input.css'
})

export class PlayerInput {
  email: string = '';
  password: string = '';
  playerName: string = '';
  user: any = null;
  error: string = '';
  isLoginMode: boolean = true;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private authService: AuthService
  ) {}

  async signInEmail() {
    try {
      const result = await this.authService.signInEmail(this.email, this.password);
      this.user = result.user;
      this.error = '';
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async signUpEmail() {
    try {
      const result = await this.authService.signUpEmail(this.email, this.password);
      this.user = result.user;
      this.error = '';
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async signInGoogle() {
    try {
      const result = await this.authService.signInGoogle();
      this.user = result.user;
      this.error = '';
    } catch (err: any) {
      this.error = err.message;
    }
  }

  signOut() {
    this.authService.signOut();
    this.user = null;
    this.playerName = '';
  }

  startGame() {
    // Allow anyone to play, use playerName or fallback to user info if available
    let name = this.playerName;
    if (!name && this.user) {
      name = this.user.displayName || this.user.email;
    }
    this.playerService.setPlayerName(name);
    this.router.navigate(['/game']);
  }
}
