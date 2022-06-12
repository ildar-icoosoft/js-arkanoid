'use strict';

import {BaseModel} from "../base-model.js";

export class BaseBrick extends BaseModel {
  constructor(x, y, width, height) {
    super();
    if (this.constructor === BaseBrick) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.affectsPassageOfLevel = true;
    this.reset();
  }

  reset() {
    this.intact = true;
  }

  hit() {
    this.intact = false;
  }

  draw(_context) {
    throw new Error("draw() method must be implemented");
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
