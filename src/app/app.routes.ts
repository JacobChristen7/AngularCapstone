import { Routes } from '@angular/router';
import { Game } from './components/game/game';
import { PlayerInput } from './components/player-input/player-input';
import { LeaderBoard } from './components/leader-board/leader-board';
import { SignUp } from './components/sign-up/sign-up';

export const routes: Routes = [
  { path: 'game', component: Game },
  { path: 'player-input', component: PlayerInput },
  { path: '', redirectTo: 'player-input', pathMatch: 'full' },
  { path: 'leader-board', component: LeaderBoard },
  { path: 'sign-up', component: SignUp }
];