'use strict';

import {SPACE_WIDTH, SPACE_HEIGHT} from './space.js';

const PADDLE_WIDTH = 150;
const PADDLE_HEIGHT = 25;
const PADDLE_SPEED = 25;
const PADDLE_BOTTOM = 100;
const PADDLE_X = Math.floor((SPACE_WIDTH - PADDLE_WIDTH) / 2);
const PADDLE_Y = SPACE_HEIGHT - PADDLE_BOTTOM;
const PADDLE_BEGIN = 0;
const PADDLE_END = SPACE_WIDTH - PADDLE_WIDTH;

/**
 * Paddle object.
 */
export class Paddle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = PADDLE_X;
    this.y = PADDLE_Y;
    this.width = PADDLE_WIDTH;
    this.height = PADDLE_HEIGHT;
    this.targetX = null; // точка, в которую направляется лопатка. null если она неподвижна
  }

  leftDown() {
    this.targetX = -1;
  }

  rightDown() {
    this.targetX = PADDLE_END;
  }

  leftUp() {
    if (this.targetX === -1) {
      this.targetX = null;
    }
  }

  rightUp() {
    if (this.targetX === PADDLE_END) {
      this.targetX = null;
    }
  }

  moveTo(x) {
    this.targetX = x;
  }

  update() {
    if (this.targetX !== null) {
      if (Math.abs(this.targetX - this.x) <= PADDLE_SPEED) {
        this.x = this.targetX;
        this.targetX = null;
      } else {
        if (this.targetX < this.x) {
          this.x -= PADDLE_SPEED;
        } else {
          this.x += PADDLE_SPEED;
        }
      }

      if (this.x < PADDLE_BEGIN) {
        this.x = PADDLE_BEGIN;
        this.targetX = null;
      } else if (this.x > PADDLE_END) {
        this.x = PADDLE_END;
        this.targetX = null;
      }
    }
  }

  draw(context) {
    context.save();
    context.fillStyle = 'rgb(200, 121, 255)';
    context.fillRect(this.x, this.y, PADDLE_WIDTH, PADDLE_HEIGHT);
    context.restore();
  }

  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + PADDLE_WIDTH,
      ry: this.y + PADDLE_HEIGHT
    };
  }
}
