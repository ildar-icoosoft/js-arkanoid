import {SPACE_WIDTH} from "./space.js";

/**
 * Возвращает true, если две прямоугольника пересекаются. Иначе false
 * @param box1
 * @param box2
 * @return {boolean}
 */
export function isColliding(box1, box2) {
  if ((box1.rx < box2.lx) || (box2.rx < box1.lx)) {
    return false;
  }

  if ((box1.ry < box2.ly) || (box2.ry < box1.ly)) {
    return false;
  }

  return true;
}

/**
 * Вычисляет, произошёл ли удар со стеной
 * @todo Вместо этого нужно будет заранее (в момент начала движения шарика) вычислять, когда произойдет удар
 * @param ball
 * @returns {('horizontal' | 'vertical')[]}
 */
export function calculateWallCollision(ball) {
  let newX = ball.x + ball.xStep;
  let newY = ball.y + ball.yStep;

  let res = [];

  if (newX < 0 || newX > SPACE_WIDTH - ball.width) {
    res.push('vertical');
  }
  if (newY < 0) {
    res.push('horizontal');
  }

  return res;
}

/**
 * Вычисляет момент столкновения шарика с препятствием
 * @todo. Определять, что шарик никогда не попадёт в фигуру
 * @param ball - шарик в любой момент времени до столкновения
 * @param brickBox - границы кирпича
 * @returns {{plane: 'horizontal' | 'vertical', collisionCoordinates: {x: number, y: number}, steps: number}}
 * plane. vertical - если удар пришёлся на вертикальную плоскость (боковую). horizontal - если на горизонтальную (верх или низ).
 * collisionCoordinates. x - координата x левого верхнего угла шарика (шарик у нас на самом деле квадрат). y - координата y левого верхнего угла шарика
 * steps - количество шагов (кадров), через которое шарик столкнётся с препятствием
 */
export function calculateCollision(ball, brickBox) {
  const ballBox = ball.box();

  let maxX = null;
  let maxY = null;

  if (ballBox.lx < brickBox.lx && ballBox.rx < brickBox.lx) {
    maxX = brickBox.lx - ball.width;
  } else if (ballBox.lx > brickBox.rx && ballBox.rx > brickBox.rx) {
    maxX = brickBox.rx;
  }

  if (ballBox.ly < brickBox.ly && ballBox.ry < brickBox.ly) {
    maxY = brickBox.ly - ball.width;
  } else if (ballBox.ly > brickBox.ry && ballBox.ry > brickBox.ry) {
    maxY = brickBox.ry;
  }

  let tX = 0; // Расстояние до плоскости X
  let tY = 0; // Расстояние до плоскости Y

  if (maxX !== null) {
    tX = Math.abs((maxX - ballBox.lx) / ball.xStep);
  }
  if (maxY !== null) {
    tY = Math.abs((maxY - ballBox.ly) / ball.yStep);
  }

  const t = Math.max(tX, tY);

  const bX = Math.floor(ballBox.lx + t * ball.xStep);
  const bY = Math.floor(ballBox.ly + t * ball.yStep);

  if (tX > tY) {
    return {
      steps: Math.ceil(tX),
      plane: 'vertical',
      collisionCoordinates: {
        x: bX,
        y: bY
      },
    }
  } else {
    return {
      steps: Math.ceil(tY),
      plane: 'horizontal',
      collisionCoordinates: {
        x: bX,
        y: bY
      },
    }
  }
}

export function bounceFromPaddle(ball, paddle, collisionCoordinates) {
  /**
   *  Расстояние от левого края лопатки до точки, куда ударился шарик. 0 - самая левая точка, 1 - самая правая
    * @type {number}
   */
  const pointFromLeft = (collisionCoordinates.x + ball.width - paddle.x) / (paddle.width + ball.width);

  const k = 0.6; // коэффициент, чтобы при ударе шарика о край, он не летел слишком горизонтально

  /**
   * Расстояние от середины лопатки до точки, куда ударился шарик. От 0 до k. 0 - середина. k - левый и правый край.
   * @type {number}
   */
  let pointFromMiddle = Math.abs(2 * pointFromLeft - 1) * k;

  const angle = Math.atan2(ball.yStep, ball.xStep) * 180 / Math.PI;

  const newAngle = pointFromLeft < 0.5 ? (1 - pointFromMiddle) * (180 - angle) : 180 - (1 - pointFromMiddle) * angle;

  const stepLength = Math.sqrt(ball.xStep ** 2 + ball.yStep ** 2);

  ball.xStep = -Math.cos(newAngle * Math.PI / 180) * stepLength;
  ball.yStep = -Math.sin(newAngle * Math.PI / 180) * stepLength;
}

