'use strict';

export const SPACE_WIDTH = 600;
export const SPACE_HEIGHT = 600;

/**
 * Класс для управления холстом. Отвечает за создание холста, масштабирование
 * по размерам элемента-контейнера и за очистку холста.
 */
export class Space {
  /**
   * @param {Game} game
   * @param {string} containerId
   */
  constructor(game, containerId) {
    /**
     * Ширина холста без учёта масштабирования
     * @type {number}
     */
    this.width = SPACE_WIDTH;

    /**
     * Высота холста без учёта масштабирования
     * @type {number}
     */
    this.height = SPACE_HEIGHT;

    this.ratio = 1;

    this.container = document.getElementById(containerId);

    this.canvas = document.createElement('canvas');

    this.container.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');

    this.updateCanvasSize();
    window.addEventListener('resize', () => {
      this.updateCanvasSize();
      game.layers.draw();
    })
  }

  /**
   * Меняем размер холста под размеры контейнера.
   * Всё содержимое холста масштабируется.
   */
  updateCanvasSize() {
    this.ratio = Math.min(this.container.clientWidth / this.width, this.container.clientHeight / this.height);

    this.canvas.width = this.width * this.ratio;
    this.canvas.height = this.height * this.ratio;

    this.context.scale(this.ratio, this.ratio);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }
}
