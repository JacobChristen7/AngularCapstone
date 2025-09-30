import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-game',
  imports: [MatGridListModule, MatButton],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {

}
