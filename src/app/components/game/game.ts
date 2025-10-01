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
    { id: 1, animate: false, posX: 200, direction: -1 }
  ];
  nextId = 2;
  score = 0;
  get currentBlock() {
    return this.blocks.find(b => b.id === this.nextId - 1);
  }
  get theBlockWeJustDropped() {
    return this.blocks.find(b => b.id === this.nextId - 2);
  }

  constructor() {
    this.animate();
  }
  dropBlock() {
    const block = this.currentBlock;
    if (block) {
      if (block.posX > -20 && block.posX < 20) {
        this.blocks.unshift({ id: this.nextId++, animate: true, posX: 200, direction: -1 });
        const blockWeJustDropped = this.theBlockWeJustDropped;
        if (blockWeJustDropped) {
          blockWeJustDropped.posX = 0
        }
        this.score++;
      } else {
        console.log("Game over!");
      }
    } else {
      console.log("No block to drop!");
    }
  }
  animate() {
    const block = this.currentBlock;
    if (block) {
      if (block.posX >= 200) block.direction = -1;
      if (block.posX <= -200) block.direction = 1;
      block.posX += 2 * block.direction;
    }
    requestAnimationFrame(() => this.animate());
  }
}
