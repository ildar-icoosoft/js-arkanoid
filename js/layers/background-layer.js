import {BaseLayer} from "./base-layer.js";

export class BackgroundLayer extends BaseLayer {
  draw() {
    this.context.save();
    this.context.fillStyle = "#0f0736";
    this.context.fillRect(0, 0, this.space.width, this.space.height);
    this.context.restore();
  }
}














