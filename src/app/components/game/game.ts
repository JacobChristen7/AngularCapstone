import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-game',
  imports: [CommonModule, MatGridListModule, MatButton],
  templateUrl: './game.html',
  styleUrl: './game.css'
})
export class Game {
  blocks = [
    { id: 1 }
  ];
  nextId = 2;

  dropBlock() {
    this.blocks.unshift({ id: this.nextId++ });
  }
}
