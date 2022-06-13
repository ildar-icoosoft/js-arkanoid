'use strict';

import {YellowBrick} from "./models/bricks/yellow-brick.js";
import {RedBrick} from "./models/bricks/red-brick.js";
import {BlueBrick} from "./models/bricks/blue-brick.js";
import {BrownBrick} from "./models/bricks/brown-brick.js";
import {DarkGreenBrick} from "./models/bricks/dark-green-brick.js";
import {LightBlueBrick} from "./models/bricks/light-blue-brick.js";
import {LightGreenBrick} from "./models/bricks/light-green-brick.js";
import {OrangeBrick} from "./models/bricks/orange-brick.js";
import {PurpleBrick} from "./models/bricks/purple-brick.js";

const BRICK_PADDING = 0;
const BRICK_WIDTH = 75;
const BRICK_HEIGHT = 55;
const BRICK_COLUMNS = 8;

const BRICKS_X = 0;
const BRICKS_Y = 105;

const bricksMap = {
  bl: BlueBrick,
  br: BrownBrick,
  dg: DarkGreenBrick,
  lb: LightBlueBrick,
  lg: LightGreenBrick,
  or: OrangeBrick,
  pu: PurpleBrick,
  re: RedBrick,
  ye: YellowBrick
}

export const makeBricks = (level) => {
  const bricks = [];

  let x = BRICKS_X;
  let y = BRICKS_Y;

  for (let i = 0; i < level.length; i++) {
    if (level[i]) {
      if (bricksMap[level[i]]) {
        bricks.push(new bricksMap[level[i]](x, y, BRICK_WIDTH, BRICK_HEIGHT));
      } else if (level[i] !== '--') {
        throw Error(`unknown brick type ${level[i]}`);
      }
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
