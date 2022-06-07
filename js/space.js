'use strict';

export const SPACE_WIDTH = 1000;
export const SPACE_HEIGHT = 600;

const SCORE_X = 20;
const SCORE_Y = SPACE_HEIGHT - 20;

const LEVEL_X = SPACE_WIDTH - 20;
const LEVEL_Y = SPACE_HEIGHT - 20;

const MESSAGE_X = Math.floor(SPACE_WIDTH / 2);
const MESSAGE_Y = Math.floor(SPACE_HEIGHT / 2);


/**
 * Space object.
 *
 * @author Onur Cinar
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

    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'left';
    this.context.fillText(`Score: ${this.game.score}`, SCORE_X, SCORE_Y);

    this.context.font = '18px sans';
    this.context.textAlign = 'right';
    this.context.fillText(`Level: ${this.game.level}`, LEVEL_X, LEVEL_Y);
  }

  drawMessage(message) {
    this.context.font = '32px sans';
    this.context.textAlign = 'center';
    this.context.fillText(message, MESSAGE_X, MESSAGE_Y);
  }

  drawGameOver() {
    this.drawMessage('GAME OVER');
  }

  drawYouWin() {
    this.drawMessage('YOU WIN');
  }

  drawPause() {
    this.drawMessage('PAUSE');
  }
}
