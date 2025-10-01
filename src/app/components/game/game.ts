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
    {id: 1, animate: false, posX: 0, direction: 1}
  ];
  nextId = 2;

  constructor() {
    this.animate();
  }

  dropBlock() {
    this.blocks.unshift({ id: this.nextId++, animate: true, posX: 0, direction: 1});
    // const block = this.blocks.find(b => b.id === this.nextId - 2)
    // if (block) {
    //   block.animate = false
    // }
  }

  animate() {
    const block = this.blocks.find(b => b.id === this.nextId - 1)
    if (block) {
      // Reverse direction at bounds
      if (block.posX >= 100) block.direction = -1;
      if (block.posX <= -100) block.direction = 1;
      block.posX += 2 * block.direction;
    }
    requestAnimationFrame(() => this.animate());
  }

}
