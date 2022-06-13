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
      // @todo. Подумать над более изящным решением запуска gameLoop
      // Если у текущих слоёв есть анимация, значит gameLoop вызывается после каждого кадра.
      // Если нет, то gameLoop не вызывается и нужно его вызвать после помещения слоёв на холст putLayersOnCanvas()
      const needToStartGameLoop = !this.layers.hasAnimation();

      this.layers.putLayersOnCanvas(event.detail);
      if (needToStartGameLoop) {
        this.gameLoop_();
      }
    });

    this.repo.addEventListener('pauseLayer', (event) => {
      this.layers.get(event.detail).pause();
    });

    this.repo.addEventListener('resumeLayer', (event) => {
      const needToStartGameLoop = !this.layers.hasAnimation();

      this.layers.get(event.detail).resume();

      // @todo. Подумать над более изящным решением запуска gameLoop
      if (needToStartGameLoop) {
        this.gameLoop_();
      }
    });
  }

  start() {
    this.repo.showIntroScreen();
  }

  /**
   * @private
   */
  gameLoop_() {
    this.layers.update();

    this.space.clear();

    this.layers.draw();

    if (this.layers.hasAnimation()) {
      window.requestAnimationFrame(() => this.gameLoop_());
    }
  }
}
