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
    {id: 1, animate: false }
  ];
  nextId = 2;

  dropBlock() {
    this.blocks.unshift({ id: this.nextId++, animate: true});
    const block = this.blocks.find(b => b.id === this.nextId - 2)
    if (block) {
      block.animate = false
    }
  }
}
