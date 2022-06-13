import {BaseLayer} from "./base-layer.js";

export class PauseLayer extends BaseLayer {
  keyUpHandler = (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      this.repo.hidePauseBackdrop();
    }
  }

  mouseClickHandler = () => {
    this.repo.hidePauseBackdrop();
  }

  onActivate() {
    document.addEventListener('keyup', this.keyUpHandler);
    document.addEventListener('click', this.mouseClickHandler);
  }

  onDeactivate() {
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('click', this.mouseClickHandler);
  }

  /**
   * @param {string} message
   * @private
   */
  drawMessage_(message) {
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
  }

  draw() {
    this.drawMessage_('Pause');
  }
}
