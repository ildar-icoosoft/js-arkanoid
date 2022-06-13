'use strict';

export class BaseBrick {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height) {
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

  /**
   * @param {CanvasRenderingContext2D} context
   * @abstract
   */
  draw(context) {
    throw new Error("draw() method must be implemented");
  }

  /**
   * @return {{rx: number, ry: number, lx: number, ly: number}}
   */
  box() {
    return {
      lx: this.x,
      ly: this.y,
      rx: this.x + this.width,
      ry: this.y + this.height
    };
  }
}
