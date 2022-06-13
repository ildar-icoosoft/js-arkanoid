'use strict';

import {BaseBrick} from "./base-brick.js";

export class PurpleBrick extends BaseBrick {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.image = new Image();
    this.image.src = 'img/bricks/purple_0.png';
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
