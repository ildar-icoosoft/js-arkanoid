export class Heart {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.width = 20;
    this.height = 20;

    this.image = new Image();
    this.image.src = 'img/heart.svg';
  }

  /**
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.drawImage(
      this.image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
