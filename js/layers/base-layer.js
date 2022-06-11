export class BaseLayer extends EventTarget {
  /**
   * @param {Game} game
   */
  constructor(game) {
    super();

    if (this.constructor === BaseLayer) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.hasAnimation = false;
    this.game = game;
    this.space = game.space;
    this.context = game.space.context;
    this.paused = false;
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
