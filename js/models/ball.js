'use strict';

const BALL_WIDTH = 20;

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

    // context.createLinearGradient(this.x, this.y, this.x + this.width, this.y + this.width);

    const gradient = context.createRadialGradient(this.x + radius / 2,this.y + radius / 2, radius,this.x + radius / 2,this.y + radius / 2,radius / 3);
    gradient.addColorStop(0, "#092d56");
    gradient.addColorStop(1, "#506ce3");
    context.fillStyle = gradient;

    // context.fillStyle = 'white';
    context.beginPath();
    context.arc(this.x + radius, this.y + radius, radius, 0, 2 * Math.PI);
    context.fill();
    context.restore();
  }

  update() {
    this.x += this.xStep;
    this.y += this.yStep;
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
