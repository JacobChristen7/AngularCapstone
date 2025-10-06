import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButton } from '@angular/material/button';
import { LeaderBoard } from '../leader-board/leader-board';

import { ScoreService } from '../../services/score.service';
import { PlayerService } from '../../services/player.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  imports: [CommonModule, MatGridListModule, MatButton, LeaderBoard],
  templateUrl: './game.html',
  styleUrl: './game.css'
})

export class Game {
  gameWidth = 300
  blockHeight = 100;
  nextID = 2;
  score = 0;
  scoreScale = 1;
  modHowFarLeftAndRight = 1.1;
  blockSpeed = 300;
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

  constructor(private scoreService: ScoreService, private playerService: PlayerService) {
    this.animateBlock();
  }

  dropBlock() {
    if (this.buttonText === "Drop Block") {
      const currentBlock = this.currentBlock;
      const lastBlock = this.theBlockWeJustDropped;

      if (!currentBlock || !lastBlock) {
        console.log("Block is undefined!");
        return;
      }

      // Calculate difference in position
      const difference = Math.abs(currentBlock.posX - lastBlock.posX);
      const signedDifference = (currentBlock.posX - lastBlock.posX)
      const overlap = lastBlock.width - difference;

      currentBlock.posX = lastBlock.posX + signedDifference / 2;

      if (overlap <= 0) { //if they miss the skillshot
        this.blocks.shift()
        this.animateTowerEndGame()
        this.buttonText = "Try Again!"
      } else {
        const randomStartSpot = Number((Math.random() * (2 * this.gameWidth) - this.gameWidth).toFixed(1))
        const direction = randomStartSpot < 0 ? -1 : 1
        currentBlock.width = overlap
        this.blocks.unshift({ id: this.nextID++, posX: randomStartSpot, direction: direction, width: overlap, height: this.blockHeight });
        this.score++;
        this.animateScore();
      }

    } else {
      this.restartGame()
      this.buttonText = "Drop Block"
    }
  }

  private lastTime = performance.now();

  animateBlock(now?: number) {
    if (!now) now = performance.now();
    const delta = (now - this.lastTime) / 1000; // seconds
    this.lastTime = now;
  
    const block = this.currentBlock;
    if (block) {
      if (block.posX >= this.gameWidth * this.modHowFarLeftAndRight) block.direction = -1;
      if (block.posX <= -this.gameWidth * this.modHowFarLeftAndRight) block.direction = 1;
  
      // blockSpeed should now be in "pixels per second"
      block.posX += this.blockSpeed * block.direction * delta;
    }
  
    this.animationID = requestAnimationFrame((t) => this.animateBlock(t));
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
      block.posX *= this.endGameTowerScale
    })
    this.saveScore();
  }

  restartGame() {
    this.towerScale = 1;
    this.divBottomProperty = "auto";
    this.topPadding = String(160);
    this.endGameTransition = "none";
    this.nextID = 2;
    this.score = 0;
    this.blocks = [
      { id: 1, posX: 0, direction: -1, width: this.gameWidth, height: this.blockHeight },
      { id: 0, posX: 0, direction: 0, width: this.gameWidth, height: this.blockHeight }
    ];
    this.stopAnimation();
    this.animateBlock();
  }

  saveScore() {
    const name = this.playerService.getPlayerName();
    this.scoreService.addScore({ playerName: name, score: this.score });
  }
}
