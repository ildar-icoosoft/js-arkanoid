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
    this.currentLayerIds_ = [];
  }

  /**
   * Помещает слои на холст. Затем, при вызове метода draw() эти слои будут отрисованы. Все остальные слои, которые ранее были добавлены на холст, удалятся.
   * Все слои будут активны. Если какой-либо слой уже был на холсте и он был в состоянии паузы, то снимется с паузы.
   * @param {string[]} newLayerIds - Идентификаторы слоёв. Слои будут расположены в том порядке, в котором находятся в массиве. Пример ["intro", "game", "pause"].
   */
  putLayersOnCanvas(newLayerIds) {
    for (let id of newLayerIds) {
      if (!this.allLayers_[id]) {
        throw Error(`unknown layer ${id}`);
      }
    }

    /**
     * Вызываем хук деактивации у текущих слоёв, которые будут удалены, при условии,
     * что они сейчас не находятся в состоянии паузы. (т.к. при постановке на паузу у слоёв уже вызывался этот хук)
     */
    this.currentLayerIds_.forEach((id) => {
      const layer = this.allLayers_[id];

      if (!newLayerIds.includes(id)) {
        if (!layer.paused) {
          layer.onDeactivate();
        }
        layer.paused = false;
      }
    });

    /**
     * Вызываем хук активации у новых слоёв, которых ранее не было, либо были на паузе.
     */
    newLayerIds.forEach((id) => {
      const layer = this.allLayers_[id];

      if (this.currentLayerIds_.includes(id)) {
        if (layer.paused) {
          layer.onActivate();
        }
      } else {
        // Вызываем хук активации у тех слоёв, которые раньше были скрыты, а теперь будут показаны
        layer.onActivate();
      }

      // убираем флаг paused для всех новых слоёв
      layer.paused = false;
    });

    // клонируем массив на всякий случай, если вдруг кто-то потом изменит входящий параметр по ссылке
    this.currentLayerIds_ = [...newLayerIds];
  }

  /**
   *
   * @param {string} id - Идентификатор слоя
   * @returns {BaseLayer}
   */
  get(id) {
    return this.allLayers_[id];
  }

  /**
   * Подготовка данных в слоях к следующему кадру. У всех видимых слоёв вызывается метод update(), кроме тех, которые поставлены на паузу
   */
  update() {
    this.currentLayerIds_.forEach(id => {
      if (!this.allLayers_[id].paused) {
        this.allLayers_[id].update();
      }
    });
  }

  /**
   * Отрисовка всех видимых слоёв. У всех видимых слоёв вызывается метод draw()
   */
  draw() {
    this.currentLayerIds_.forEach(id => this.allLayers_[id].draw());
  }

  /**
   * Возвращает true, если у какого-нибудь видимого слоя есть анимация и
   * ему нужен вызов методов update() и draw() для каждого кадра
   */
  hasAnimation() {
    return this.currentLayerIds_.some(id => this.allLayers_[id].hasAnimation && !this.allLayers_[id].paused);
  }
}
