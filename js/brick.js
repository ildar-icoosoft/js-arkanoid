'use strict';

const BRICK_BLUE_ID = 'brick-blue';
const BRICK_GREEN_ID = 'brick-green';
const BRICK_PURPLE_ID = 'brick-purple';
const BRICK_RED_ID = 'brick-red';
const BRICK_YELLOW_ID = 'brick-yellow';

const BRICK_PADDING = 5;
const BRICK_WIDTH = 90;
const BRICK_HEIGHT = 25;
const BRICK_COLUMNS = 10;

const BRICKS_X = 25;
const BRICKS_Y = 50;

/**
 * Brick object.
 */
export class Brick {
  constructor(id, x, y, energy) {
    this.initialX = x;
    this.initialY = y;
    this.initialEnergy = energy;
    this.reset();
  }

  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.energy = this.initialEnergy;
  }

  hit() {
    if (this.intact()) {
      this.energy--;
    }
  }

  intact() {
    return (this.energy > 0);
  }

  draw(context) {
    if (this.intact()) {
      context.save();
      context.fillStyle = '#09F';
      context.fillRect(this.x, this.y, BRICK_WIDTH, BRICK_HEIGHT);
      context.restore();
    }
  }

  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + BRICK_WIDTH,
      ry: this.y + BRICK_HEIGHT
    };
  }
}

export function makeBrick(id, x, y) {
  switch (id) {
    case 1:
      return new Brick(BRICK_RED_ID, x, y, 1);

    case 2:
      return new Brick(BRICK_GREEN_ID, x, y, 1);

    case 3:
      return new Brick(BRICK_YELLOW_ID, x, y, 2);

    case 4:
      return new Brick(BRICK_BLUE_ID, x, y, 2);

    case 5:
      return new Brick(BRICK_PURPLE_ID, x, y, 3);

    default:
      return null;
  }
}

export function makeBricks(level) {
  const bricks = [];

  let x = BRICKS_X;
  let y = BRICKS_Y;

  for (let i = 0; i < level.length; i++) {
    const brick = makeBrick(level[i], x, y);
    if (brick) {
      bricks.push(brick);
    }

    if ((i + 1) % BRICK_COLUMNS === 0) {
      x = BRICKS_X;
      y += BRICK_HEIGHT + BRICK_PADDING;
    } else {
      x += BRICK_WIDTH + BRICK_PADDING;
    }
  }

  return bricks;
}
