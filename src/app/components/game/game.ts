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
  width = 200;
  threshold = 50;
  nextId = 2;
  score = 0;

  blocks = [
    { id: 1, posX: this.width, direction: -1 }
  ];

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
      if (block.posX > (this.threshold - (2 * this.threshold)) && block.posX < this.threshold) {
        const randomStartSpot = Number((Math.random() * (2 * this.width) - this.width).toPrecision(1))
        const direction = randomStartSpot < 0 ? -1 : 1
        this.blocks.unshift({ id: this.nextId++, posX: randomStartSpot, direction: direction });
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
      if (block.posX >= this.width) block.direction = -1;
      if (block.posX <= -this.width) block.direction = 1;
      block.posX += 2 * block.direction;
    }
    requestAnimationFrame(() => this.animate());
  }

}
