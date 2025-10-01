import { Routes } from '@angular/router';
import { Game } from './components/game/game';
import { PlayerInput } from './components/player-input/player-input';

export const routes: Routes = [
  { path: 'game', component: Game },
  { path: 'player-input', component: PlayerInput },
  { path: '', redirectTo: 'player-input', pathMatch: 'full' }
];
