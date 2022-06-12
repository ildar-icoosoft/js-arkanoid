'use strict';

import {SimpleBrick} from "./models/bricks/simple-brick.js";

const BRICK_PADDING = 5;
const BRICK_WIDTH = 90;
const BRICK_HEIGHT = 25;
const BRICK_COLUMNS = 10;

const BRICKS_X = 25;
const BRICKS_Y = 50;

export const makeBricks = (level) => {
  const bricks = [];

  let x = BRICKS_X;
  let y = BRICKS_Y;

  for (let i = 0; i < level.length; i++) {
    if (level[i]) {
      bricks.push(new SimpleBrick(x, y, BRICK_WIDTH, BRICK_HEIGHT));
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
