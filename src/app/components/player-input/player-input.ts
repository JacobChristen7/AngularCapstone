import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-input',
  imports: [MatInputModule, MatButtonModule],
  templateUrl: './player-input.html',
  styleUrl: './player-input.css'
})
export class PlayerInput {
  constructor(private router: Router, private playerService: PlayerService) {}

  startGame(playerName: string) {
    this.playerService.setPlayerName(playerName);
    this.router.navigate(['/game']);
  }
}
