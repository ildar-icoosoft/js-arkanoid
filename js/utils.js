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
 * Возвращает направление шарика после удара
 * @param ball
 * @param brickBox
 * @returns [xStep, yStep]
 */
export function getNewBallDirection(ball, brickBox) {
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
    tY = Math.abs((maxY - ballBox.lx) / ball.yStep);
  }

  if (tX > tY) {
    return [-ball.xStep, ball.yStep];
  } else {
    return [ball.xStep, -ball.yStep];
  }
}
