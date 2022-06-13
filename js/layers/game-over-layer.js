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

    this.context.font = '62px bold Fredoka One';
    this.context.textAlign = 'center';

    this.context.lineWidth = 11;
    this.context.strokeStyle = '#000';
    this.context.strokeText(message, x, y);

    this.context.lineWidth = 8;
    this.context.strokeStyle = '#D0D';
    this.context.strokeText(message, x, y);

    this.context.lineWidth = 5;
    this.context.strokeStyle = '#ccc';
    this.context.strokeText(message, x, y);

    this.context.fillStyle = '#DD00DD';
    this.context.fillText(message, x, y);

    this.context.restore();


    this.context.save();

    this.context.font = '20px Orbitron';
    this.context.textAlign = 'center';
    this.context.fillStyle = 'white';
    this.context.fillText('click to restart', x, y + 50);

    this.context.restore();
  }

  draw() {
    this.drawMessage('GAME OVER');
  }
}
