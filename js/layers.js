/**
 * Класс отвечает за отрисовку одного кадра на холсте.
 * В конструктор передаются все слои. Затем слои активируются с помощью метода show().
 */
export class Layers {
  /**
   * @param {Object.<string, BaseLayer>} layers - Все слои (не только видимые в данный момент). Объект с парами ключ - значение.
   * Ключ - идентификатор слоя
   * Значение - экземпляр класса слоя, унаследованного от BaseLayer
   */
  constructor(layers) {
    /**
     * Все слои (не только те, которые отображаются в данный момент)
     * @type {Object.<string, BaseLayer>}
     * @private
     */
    this.allLayers_ = layers;

    /**
     * Идентификаторы слоёв, которые отображаются в данный момент
     * @type {string[]}
     * @private
     */
    this.visibleLayerIds_ = [];
  }

  /**
   * Делает переданные слои видимыми, остальные слои отключает.
   * @param {string[]} nextIds - Идентификаторы слоёв. Если нужно поставить слой на
   * паузу, поставьте в конце идентификатора знак "-", например ["intro", "game-", "pause"].
   * В этом случае слой с игрой будет поставлен на паузу, поверх него будет отображаться слой с надписью "Пауза"
   */
  setVisibleLayers(nextIds) {
    /**
     * Идентификаторы видимых слоёв. Эти слои будут показаны, остальные слои будут скрыты
     * @type {string[]}
     * */
    const nextVisibleIds = [];

    /**
     * Идентификаторы видимых слоёв, которые поставлены на пуазу
     * @type {string[]}
     * */
    const nextPausedIds = [];

    for (let id of nextIds) {
      if (id.endsWith('-')) {
        id = id.slice(0, -1);
        nextPausedIds.push(id);
      }
      nextVisibleIds.push(id);

      if (!this.allLayers_[id]) {
        throw Error(`unknown layer ${id}`);
      }
    }

    /**
     * Вызываем хук деактивации у предыдущих слоёв в двух случаях:
     * 1. Если скрываем слой
     * 2. Если ставим слой на паузу
     */
    this.visibleLayerIds_.forEach((id) => {
      const layer = this.allLayers_[id];

      // Если слой находится на паузе, то он уже деактивирован и с ним ничего не делаем
      if (layer.paused) {
        return;
      }

      if (nextVisibleIds.includes(id)) {
        if (nextPausedIds.includes(id)) {
          // Вызываем хук деактивации у тех слоёв, которые ставим на паузу
          layer.onDeactivate();
        }
      } else {
        // Вызываем хук деактивации у тех слоёв, которые раньше отображались, а теперь будут скрыты
        layer.onDeactivate();
      }
    });

    /**
     * Вызываем хук активации у следующих слоёв в двух случаях:
     * 1. Если раньше слой был скрыт
     * 2. Если снимаем слой с паузы
     */
    nextVisibleIds.forEach((id) => {
      const layer = this.allLayers_[id];

      const shouldBePaused = nextPausedIds.includes(id);

      if (this.visibleLayerIds_.includes(id)) {
        if (layer.paused && !shouldBePaused) {
          // Если слой был и остаётся видимым, но раньше он был на паузе, а теперь не на
          // паузе, то вызываем хук активации
          layer.onActivate();
        }
      } else {
        // Вызываем хук активации у тех слоёв, которые раньше были скрыты, а теперь будут показаны
        if (!shouldBePaused) {
          layer.onActivate();
        }
      }

      // ставим флаг paused для всех новых слоёв
      layer.paused = nextPausedIds.includes(id);
    });

    this.visibleLayerIds_ = nextVisibleIds;
  }

  /**
   * Подготовка данных в слоях к следующему кадру. У всех видимых слоёв вызывается метод update(), кроме тех, которые поставлены на паузу
   */
  update() {
    this.visibleLayerIds_.forEach(id => {
      if (!this.allLayers_[id].paused) {
        this.allLayers_[id].update();
      }
    });
  }

  /**
   * Отрисовка всех видимых слоёв. У всех видимых слоёв вызывается метод draw()
   */
  draw() {
    this.visibleLayerIds_.forEach(id => this.allLayers_[id].draw());
  }

  /**
   * Возвращает true, если у какого-нибудь видимого слоя есть анимация и
   * ему нужен вызов методов update() и draw() для каждого кадра
   */
  hasAnimation() {
    return this.visibleLayerIds_.some(id => this.allLayers_[id].hasAnimation && !this.allLayers_[id].paused);
  }
}
