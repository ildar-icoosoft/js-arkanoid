const image = new Image();
image.src = 'img/heart.svg';

export class Heart {
  constructor() {
    this.x = 0;
    this.y = 0;

    this.width = 20;
    this.height = 20;
  }

  draw(context) {
    context.drawImage(
      image,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
