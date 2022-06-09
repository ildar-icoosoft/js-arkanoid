'use strict';

const BALL_WIDTH = 20;
const BALL_SPEED = 5;
const BALL_X = 400;
const BALL_Y = 400;

/**
 * Ball object.
 *
 * @author Onur Cinar
 */
export class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = BALL_X;
    this.y = BALL_Y;
    this.xStep = BALL_SPEED;
    this.yStep = BALL_SPEED;
    this.width = BALL_WIDTH;

    /**
     * @type {null | 'paddle' | 'wall' | 'brick'}
     */
    this.lastHitBy = null;
  }

  draw(context) {
    context.save();

    const radius = this.width / 2;

    context.beginPath();
    context.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

  markAsHitByPaddle() {
    this.lastHitBy = 'paddle';
  }

  markAsHitByWall() {
    this.lastHitBy = 'wall';
  }

  markAsHitByBrick() {
    this.lastHitBy = 'brick';
  }

  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + this.width,
      ry: this.y + this.width
    };
  }
}
