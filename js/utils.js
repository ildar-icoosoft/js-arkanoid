export function isColliding(box1, box2) {
  if ((box1.rx < box2.lx) || (box2.rx < box1.lx)) {
    return false;
  }

  if ((box1.ry < box2.ly) || (box2.ry < box1.ly)) {
    return false;
  }

  return true;
}
