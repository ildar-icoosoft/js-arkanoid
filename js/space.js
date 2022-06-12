'use strict';

export const SPACE_WIDTH = 1000;
export const SPACE_HEIGHT = 600;

export class Space {
  constructor(game, containerId) {
    this.width = SPACE_WIDTH;
    this.height = SPACE_HEIGHT;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    document.getElementById(containerId).appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
