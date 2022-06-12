import {BaseLayer} from "./base-layer.js";

export class GameOverLayer extends BaseLayer {
  keyUpHandler = (event) => {
    if (event.key === 'Enter') {
      this.repo.restartGame();
    }
  }

  mouseClickHandler = () => {
    this.repo.restartGame();
  }

  onActivate() {
    document.addEventListener('keyup', this.keyUpHandler);
    document.addEventListener('click', this.mouseClickHandler);
  }

  onDeactivate() {
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('click', this.mouseClickHandler);
  }

  drawMessage(message) {
    const x = Math.floor(this.space.width / 2);
    const y = Math.floor(this.space.height / 2);

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '32px sans';
    this.context.textAlign = 'center';
    this.context.fillText(message, x, y);
    this.context.restore();
  }

  draw() {
    this.drawMessage('GAME OVER. Click to start again');
  }
}
