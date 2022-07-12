import {Space} from "./space.js";
import {GameLayer} from "./layers/game-layer.js";
import {PauseLayer} from "./layers/pause-layer.js";
import {GameInfoLayer} from "./layers/game-info-layer.js";
import {IntroLayer} from "./layers/intro-layer.js";
import {GameOverLayer} from "./layers/game-over-layer.js";
import {WinLayer} from "./layers/win-layer.js";
import {Layers} from "./layers.js";
import {BackgroundLayer} from "./layers/background-layer.js";
import {GameRepository} from "./game-repository.js";

export class Game {
  /**
   * @param {string} containerId
   */
  constructor(containerId) {
    this.space = new Space(this, containerId);
    this.repo = new GameRepository();

    this.layers = new Layers({
      background: new BackgroundLayer(this),
      intro: new IntroLayer(this),
      game: new GameLayer(this),
      gameInfo: new GameInfoLayer(this),
      pause: new PauseLayer(this),
      win: new WinLayer(this),
      gameOver: new GameOverLayer(this),
    });

    this.repo.addEventListener('updateLayersList', (event) => {
      this.layers.putLayersOnCanvas(event.detail);
    });

    this.repo.addEventListener('pauseLayer', (event) => {
      this.layers.get(event.detail).pause();
    });

    this.repo.addEventListener('resumeLayer', (event) => {
      this.layers.get(event.detail).resume();
    });
  }

  start() {
    this.repo.showIntroScreen();
    this.gameLoop_();
  }

  /**
   * @private
   */
  gameLoop_() {
    this.layers.update();

    this.space.clear();

    this.layers.draw();

    window.requestAnimationFrame(() => this.gameLoop_());
  }
}
