import {Space} from "./space.js";
import {GameLayer} from "./layers/game-layer.js";
import {PauseLayer} from "./layers/pause-layer.js";
import {GameInfoLayer} from "./layers/game-info-layer.js";
import {IntroLayer} from "./layers/intro-layer.js";
import {GameOverLayer} from "./layers/game-over-layer.js";
import {WinLayer} from "./layers/win-layer.js";
import {Layers} from "./layers.js";
import {BackgroundLayer} from "./layers/background-layer.js";
import {LEVELS} from "./levels.js";

const LIVES_COUNT = 3;

export class Game {
  constructor(containerId) {
    this.livesCount = LIVES_COUNT;
    this.level = 0;
    this.score = 0;
    this.space = new Space(this, containerId);

    const backgroundLayer = new BackgroundLayer(this);
    const introLayer = new IntroLayer(this);
    const gameLayer = new GameLayer(this);
    const gameInfoLayer = new GameInfoLayer(this);
    const pauseLayer = new PauseLayer(this);
    const winLayer = new WinLayer(this);
    const gameOverLayer = new GameOverLayer(this);

    this.layers = new Layers({
      background: backgroundLayer,
      intro: introLayer,
      game: gameLayer,
      gameInfo: gameInfoLayer,
      pause: pauseLayer,
      win: winLayer,
      gameOver: gameOverLayer,
    });

    introLayer.addEventListener('next', () => {
      this.showGameScreen(false);
    });

    gameLayer.addEventListener('pause', () => {
      this.showPauseScreen();
    });

    gameLayer.addEventListener('lose', () => {
      this.livesCount--;
      if (this.livesCount === 0) {
        this.showGameOverScreen();
      } else {
        this.showGameScreen(true);
        setTimeout(() => {
          gameLayer.resurrect();
          this.showGameScreen(false);
        }, 1000);
      }
    });

    gameLayer.addEventListener('hitBrick', () => {
      this.score++;
    })

    pauseLayer.addEventListener('resume', () => {
      this.showGameScreen(false);
    });

    winLayer.addEventListener('restart', () => {
      this.level = 0;
      this.livesCount = LIVES_COUNT;
      gameLayer.reset();
      this.showGameScreen(false);
    });

    gameOverLayer.addEventListener('restart', () => {
      this.level = 0;
      this.livesCount = LIVES_COUNT;
      this.score = 0;
      gameLayer.reset();
      this.showGameScreen(false);
    });

    gameLayer.addEventListener('win', (event) => {
      this.showGameScreen(true);

      if (this.level < LEVELS.length - 1) {
        this.level++;
        setTimeout(() => {
          gameLayer.reset();
          this.showGameScreen(false);
        }, 1000);
      } else {
        this.showWinScreen();
      }
    });
  }

  start() {
    this.showIntroScreen();
  }

  showIntroScreen() {
    this.showLayers(['background', 'intro']);
  }

  /**
   * @param {boolean} paused
   */
  showGameScreen(paused) {
    this.showLayers(['background', `game${paused ? '-' : ''}`, 'gameInfo']);
  }

  showPauseScreen() {
    this.showLayers(['background', 'game-', 'gameInfo', 'pause']);
  }

  showGameOverScreen() {
    this.showLayers(['background', 'game-', 'gameInfo', 'gameOver']);
  }

  showWinScreen() {
    this.showLayers(['background', 'game-', 'gameInfo', 'win']);
  }

  /**
   * Показывает слои
   * @param {string[]} layers - Идентификаторы слоёв
   */
  showLayers(layers) {
    // Если у текущих слоёв нет анимации, то метод gameLoop не вызывается после каждого кадра и нужно будет вызвать
    // gameLoop после установки видимых слоёв через setVisibleLayers()
    let needToStartGameLoop = false;
    if (!this.layers.hasAnimation()) {
      needToStartGameLoop = true;
    }
    this.layers.setVisibleLayers(layers);
    if (needToStartGameLoop) {
      this.gameLoop();
    }
  }

  gameLoop() {
    this.layers.update();

    this.space.clear();

    this.layers.draw();

    if (this.layers.hasAnimation()) {
      window.requestAnimationFrame(() => this.gameLoop());
    }
  }
}
