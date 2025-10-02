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
  gameWidth = 350
  remainingWidth = 300;
  nextID = 2;
  score = 0;
  scoreScale = 1;
  modHowFarLeftAndRight = 1.2;
  blockSpeed = 6;
  towerScale = "100%";
  divBottomProperty = "auto";

  blocks = [
    { id: 1, posX: 0, direction: -1, width: this.gameWidth },
    { id: 0, posX: 0, direction: 0, width: this.gameWidth }
  ];

  get currentBlock() {
    return this.blocks.find(b => b.id === this.nextID - 1);
  }
  get theBlockWeJustDropped() {
    return this.blocks.find(b => b.id === this.nextID - 2);
  }

  constructor() {
    this.animate();
  }

  dropBlock() {
    const block = this.currentBlock;
    if (block) {
        if (Math.abs(block.posX) > this.remainingWidth) {
          this.blocks.shift()
          this.animateTowerEndGame()
          console.log("Game Over!")
        } else {
          const randomStartSpot = Number((Math.random() * (2 * this.gameWidth) - this.gameWidth).toPrecision(1))
          const direction = randomStartSpot < 0 ? -1 : 1
          const blockWeJustDropped = this.theBlockWeJustDropped;
          if (blockWeJustDropped) {
            this.remainingWidth -= Math.abs(this.currentBlock.posX)
            this.currentBlock.width = this.remainingWidth
            this.blocks.unshift({ id: this.nextID++, posX: randomStartSpot, direction: direction, width: this.remainingWidth });
            this.theBlockWeJustDropped.posX = 0;
          }
          this.score++;
          this.animateScore();
        }
    } else {
      console.log("Block is undefined!");
    }
  }

  animate() {
    const block = this.currentBlock;
    if (block) {
      if (block.posX >= this.gameWidth * this.modHowFarLeftAndRight) block.direction = -1;
      if (block.posX <= -this.gameWidth * this.modHowFarLeftAndRight) block.direction = 1;
      block.posX += this.blockSpeed * block.direction;
    }
    requestAnimationFrame(() => this.animate());
  }

  animateScore() {
    this.scoreScale += 0.4;
    
    setTimeout(() => {
      this.scoreScale -= 0.4;
    }, 200)
  }

  animateTowerEndGame() {
    this.towerScale = "20%";
    this.divBottomProperty = "0";
  }

}
