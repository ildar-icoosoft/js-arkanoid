export class BaseModel {
  constructor() {
    if (this.constructor === BaseModel) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  /**
   * @abstract
   */
  box() {
    throw new Error("box() method must be implemented");
  }

  /**
   * @param {CanvasRenderingContext2D} context
   * @abstract
   */
  draw(context) {
    throw new Error("draw() method must be implemented");
  }

  /**
   * @abstract
   */
  reset() {
    throw new Error("rest() method must be implemented");
  }

  /**
   * @abstract
   */
  update() {
    throw new Error("update() method must be implemented");
  }
}
