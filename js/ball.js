'use strict';

const BALL_WIDTH = 20;

/**
 * Ball object.
 */
export class Ball {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = 0;
    this.y = 0;
    this.xStep = 0;
    this.yStep = 0;
    this.width = BALL_WIDTH;
  }

  draw(context) {
    context.save();

    const radius = this.width / 2;

    context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI, false);
    context.fill();
    context.restore();
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
