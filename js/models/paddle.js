'use strict';

const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 25;
const PADDLE_SPEED = 25;
const PADDLE_BOTTOM = 100;

export class Paddle {
  constructor(space) {
    this.ball = null;
    this.speed = PADDLE_SPEED;
    this.space = space;
    this.reset();
  }

  reset() {
    this.x = Math.floor((this.space.width - PADDLE_WIDTH) / 2);
    this.y = this.space.height - PADDLE_BOTTOM;
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;
    this.targetX = null; // Точка, в которую направляется лопатка. null если она неподвижна
  }

  stickBall(ball) {
    this.ball = ball;
    this.ball.xStep = 0;
    this.ball.yStep = 0;
  }

  throwBall() {
    this.ball.xStep = 1;
    this.ball.yStep = -6;

    this.ball = null;
  }

  moveTo(x) {
    this.targetX = x;
  }

  stopMove() {
    this.targetX = null;
  }

  update() {
    if (this.targetX !== null) {
      if (Math.abs(this.targetX - this.x) <= this.speed) {
        this.x = this.targetX;
        this.targetX = null;
      } else {
        if (this.targetX < this.x) {
          this.x -= this.speed;
        } else {
          this.x += this.speed;
        }
      }
    }

    if (this.ball) {
      this.ball.x = this.x + this.width / 2 - this.ball.width / 2;
      this.ball.y = this.y - this.ball.width;
    }
  }

  draw(context) {
    context.save();
    context.fillStyle = 'rgb(200, 121, 255)';
    context.fillRect(this.x, this.y, this.width, this.height);
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
