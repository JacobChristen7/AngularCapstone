import { Routes } from '@angular/router';
import { Game } from './components/game/game';
import { PlayerInput } from './components/player-input/player-input';
import { LeaderBoard } from './components/leader-board/leader-board';

export const routes: Routes = [
  { path: 'game', component: Game },
  { path: 'player-input', component: PlayerInput },
  { path: '', redirectTo: 'player-input', pathMatch: 'full' },
  { path: 'leader-board', component: LeaderBoard }
];