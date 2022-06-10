'use strict';

export const SPACE_WIDTH = 1000;
export const SPACE_HEIGHT = 600;

const SCORE_X = 20;
const SCORE_Y = SPACE_HEIGHT - 20;

const LEVEL_X = SPACE_WIDTH - 20;
const LEVEL_Y = SPACE_HEIGHT - 20;

const LIVES_X = SPACE_WIDTH - 20;
const LIVES_Y = 30;

const MESSAGE_X = Math.floor(SPACE_WIDTH / 2);
const MESSAGE_Y = Math.floor(SPACE_HEIGHT / 2);


/**
 * Space object.
 */
export class Space {
  constructor(game, containerId) {
    this.game = game;

    this.canvas = document.createElement('canvas');
    this.canvas.width = SPACE_WIDTH;
    this.canvas.height = SPACE_HEIGHT;

    document.getElementById(containerId).appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
  }

  clear() {
    this.context.clearRect(0, 0, SPACE_WIDTH, SPACE_HEIGHT);

    this.context.save();
    this.context.fillStyle = "#0f0736";
    this.context.fillRect(0, 0, SPACE_WIDTH, SPACE_HEIGHT);
    this.context.restore();

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'left';
    this.context.fillText(`Score: ${this.game.score}`, SCORE_X, SCORE_Y);
    this.context.restore();

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'right';
    this.context.fillText(`Level: ${this.game.level + 1}`, LEVEL_X, LEVEL_Y);
    this.context.restore();

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'right';
    this.context.fillText(`Lives: ${this.game.livesCount}`, LIVES_X, LIVES_Y);
    this.context.restore();
  }

  drawMessage(message) {
    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '32px sans';
    this.context.textAlign = 'center';
    this.context.fillText(message, MESSAGE_X, MESSAGE_Y);
    this.context.restore();
  }

  drawIntro() {
    this.drawMessage('Welcome to Arkanoid. Click to start');
  }

  drawGameOver() {
    this.drawMessage('GAME OVER. Click to start again');
  }

  drawYouWin() {
    this.drawMessage('YOU WIN. Click to start again');
  }

  drawPause() {
    this.drawMessage('PAUSE. Click to resume');
  }
}
