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
  gameWidth = 300
  remainingWidth = 300;
  blockHeight = 100;
  nextID = 2;
  score = 0;
  scoreScale = 1;
  modHowFarLeftAndRight = 1.1;
  blockSpeed = 6;
  towerScale = 1;
  divBottomProperty = "auto";
  topPadding = String(160);
  endGameTowerScale = 0.4;
  endGameTransition = "none";
  animationID = 0;

  buttonText = "Drop Block"

  blocks = [
    { id: 1, posX: 0, direction: -1, width: this.gameWidth, height: this.blockHeight },
    { id: 0, posX: 0, direction: 0, width: this.gameWidth, height: this.blockHeight }
  ];

  get currentBlock() {
    return this.blocks.find(b => b.id === this.nextID - 1);
  }
  get theBlockWeJustDropped() {
    return this.blocks.find(b => b.id === this.nextID - 2);
  }

  constructor() {
    this.animateBlock();
  }

  dropBlock() {
    if (this.buttonText === "Drop Block") {
      const block = this.currentBlock;
      if (block) {
          if (Math.abs(block.posX) > this.remainingWidth) { //if they miss the skillshot
            this.blocks.shift()
            this.animateTowerEndGame()
            this.buttonText = "Try Again!"
          } else {
            const randomStartSpot = Number((Math.random() * (2 * this.gameWidth) - this.gameWidth).toPrecision(1))
            const direction = randomStartSpot < 0 ? -1 : 1
            const blockWeJustDropped = this.theBlockWeJustDropped;
            if (blockWeJustDropped) {
              this.remainingWidth -= Math.abs(this.currentBlock.posX)
              this.currentBlock.width = this.remainingWidth
              this.blocks.unshift({ id: this.nextID++, posX: randomStartSpot, direction: direction, width: this.remainingWidth, height: this.blockHeight });
              this.theBlockWeJustDropped.posX = 0;
            }
            this.score++;
            this.animateScore();
          }
      } else {
        console.log("Block is undefined!");
      }
    } else {
      this.restartGame()
      this.buttonText = "Drop Block"
    }
  }

  animateBlock() {
    const block = this.currentBlock;
    if (block) {
      if (block.posX >= this.gameWidth * this.modHowFarLeftAndRight) block.direction = -1;
      if (block.posX <= -this.gameWidth * this.modHowFarLeftAndRight) block.direction = 1;
      block.posX += this.blockSpeed * block.direction;
    }
    this.animationID = requestAnimationFrame(() => this.animateBlock());
  }

  stopAnimation() {
    if (this.animationID !== 0) {
      cancelAnimationFrame(this.animationID);
      this.animationID = 0;
    }
  }  

  animateScore() {
    this.scoreScale += 0.4;
    
    setTimeout(() => {
      this.scoreScale -= 0.4;
    }, 200)
  }

  animateTowerEndGame() {
    this.towerScale = this.endGameTowerScale;
    this.divBottomProperty = String(0);
    this.topPadding = String(0);
    this.endGameTransition = "width 1s ease, height 1s ease";
    this.blocks.forEach(block => {
      block.width *= this.endGameTowerScale
      block.height *= this.endGameTowerScale
    })
  }

  restartGame() {
    this.towerScale = 1;
    this.divBottomProperty = "auto";
    this.topPadding = String(160);
    this.endGameTransition = "none";
    this.nextID = 2;
    this.score = 0;
    this.remainingWidth = 300;
    this.blocks = [
      { id: 1, posX: 0, direction: -1, width: this.gameWidth, height: this.blockHeight },
      { id: 0, posX: 0, direction: 0, width: this.gameWidth, height: this.blockHeight }
    ];
    this.stopAnimation();
    this.animateBlock();
  }
}
