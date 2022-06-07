'use strict';

import { SPACE_WIDTH } from './space.js';

const BALL_WIDTH = 20;
const BALL_HEIGHT = 20;
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
    this.image = new Image();
    this.image.src = 'images/ball.png';
    this.reset();
  }

  reset() {
    this.x = BALL_X;
    this.y = BALL_Y;
    this.xStep = BALL_SPEED;
    this.yStep = BALL_SPEED;
    this.width = BALL_WIDTH;
    this.height = BALL_HEIGHT;
  }

  update() {
    this.x += this.xStep;
    this.y += this.yStep;

    if ((this.x < 0) || (this.x + this.width > SPACE_WIDTH)) {
      this.bounceX();
    } else if (this.y < 0) {
      this.bounceY();
    }
  }

  bounceX() {
    this.xStep *= -1;
    this.update();
  }

  bounceY() {
    this.yStep *= -1;
    this.update();
  }

  draw(context) {
    context.save();
    context.fillStyle = '#fff';
    context.beginPath();
    context.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
  }

  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + this.width,
      ry: this.y + this.height
    };
  }
}
