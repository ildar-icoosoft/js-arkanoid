export class BaseLayer {
  /**
   * @param {Game} game
   */
  constructor(game) {
    if (this.constructor === BaseLayer) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.game = game;
    this.space = game.space;
    this.context = game.space.context;
    this.repo = game.repo;
    this.paused = false;
  }

  pause() {
    if (!this.paused) {
      this.paused = true;
      this.onDeactivate();
    }
  }

  resume() {
    if (this.paused) {
      this.paused = false;
      this.onActivate();
    }
  }

  update() {}

  /**
   * Хук, срабатывающий при отображении слоя (не в режиме паузы), либо при снятии слоя с паузы
   */
  onActivate() {}

  /**
   * Хук, срабатывающий при скрытии слоя, либо при постановке слоя на паузу
   */
  onDeactivate() {}

  /**
   * @abstract
   */
  draw() {
    throw new Error("draw() method must be implemented");
  }
}
