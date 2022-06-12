'use strict';

import {BaseBrick} from "./base-brick.js";

export class SimpleBrick extends BaseBrick {
  draw(context) {
    if (this.intact) {
      context.save();
      context.fillStyle = '#09F';
      context.fillRect(this.x, this.y, this.width, this.height);
      context.restore();
    }
  }
}
