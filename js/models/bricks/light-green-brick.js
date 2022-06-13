'use strict';

import {BaseBrick} from "./base-brick.js";

export class LightGreenBrick extends BaseBrick {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.image = new Image();
    this.image.src = 'img/bricks/light_green_0.png';
  }

  draw(context) {
    if (this.intact) {
      context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}
