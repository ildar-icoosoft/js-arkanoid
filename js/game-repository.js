import {LEVELS} from "./levels.js";

const LIVES_COUNT = 3;

/**
 * Класс содержит стейт и методы для изменения стейта. Используется для того, чтобы компоненты могли взаимодействовать
 * друг с другом. Содержит методы для изменения стейта и вещает события, на которые подписываются компоненты.
 */
export class GameRepository extends EventTarget {
  constructor() {
    super();

    this.layers = [];

    this.score = 0;

    this.livesCount = LIVES_COUNT;

    this.level = 0;
  }

  showIntroScreen() {
    this.layers = ['background', 'intro'];
    this.updateLayersList_();
  }

  showGameScreen() {
    this.layers = ['background', 'gameInfo', 'game', ];
    this.updateLayersList_();
  }

  showPauseBackdrop() {
    this.layers = [
      ...this.layers,
      'pause'
    ];
    this.updateLayersList_();
    this.pauseLayer_('game');
  }

  hidePauseBackdrop() {
    this.layers = this.layers.filter(id => id !== 'pause');
    this.updateLayersList_();
  }

  /**
   * Обновляет список слоёв (при этом автоматически убирается пауза со всех слоёв, если она была)
   * @param {string[]} layers - Идентификаторы слоёв на холсте
   * @private
   */
  updateLayersList_() {
    this.dispatchEvent(new CustomEvent('updateLayersList', {detail: this.layers}));
  }

  /**
   * Ставит слой на паузу
   * @param id - Идентификатор слоя
   * @private
   */
  pauseLayer_(id) {
    this.dispatchEvent(new CustomEvent('pauseLayer', {detail: id}));
  }

  /**
   * Убирает статус паузы со слоя
   * @param id - Идентификатор слоя
   * @private
   */
  resumeLayer_(id) {
    this.dispatchEvent(new CustomEvent('resumeLayer', {detail: id}));
  }

  lose() {
    this.livesCount--;
    if (this.livesCount === 0) {
      this.layers = [
        ...this.layers,
        'gameOver'
      ];
      this.updateLayersList_();
      this.pauseLayer_('game');
    } else {
      this.pauseLayer_('game');
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('resurrect'));
        this.resumeLayer_('game');
      }, 1000);
    }
  }

  win() {
    if (this.level < LEVELS.length - 1) {
      this.level++;
      this.pauseLayer_('game');
      setTimeout(() => {
        this.dispatchEvent(new CustomEvent('resetLevel'));
        this.resumeLayer_('game');
      }, 1000);
    } else {
      this.layers = [
        ...this.layers,
        'win'
      ];
      this.updateLayersList_();
      this.pauseLayer_('game');
    }
  }

  restartGame() {
    this.level = 0;
    this.livesCount = LIVES_COUNT;
    this.score = 0;
    this.dispatchEvent(new CustomEvent('resetLevel'));
    this.showGameScreen();
  }

  hitBrick() {
    this.score += 10;
  }
}
