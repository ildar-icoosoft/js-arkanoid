import {Space, SPACE_WIDTH} from "./space.js";
import {Paddle} from "./paddle.js";
import {Ball} from "./ball.js";
import {LEVELS} from "./levels.js";
import {makeBricks} from "./brick.js";
import {getNewBallDirection, isColliding} from './utils.js';

export class Game {
  constructor(containerId) {
    this.space = new Space(this, containerId);
    this.paddle = new Paddle();
    this.ball = new Ball();
    this.level = 0;
    this.bricks = makeBricks(LEVELS[this.level]);
    this.gameOver = false;
    this.gameOnPause = false;
    this.score = 0;

    document.addEventListener('keydown', (event) => {
      if (!this.gameOver) {
        if (event.key === 'ArrowLeft') {
          this.paddle.leftDown();
        } else if (event.key === 'ArrowRight') {
          this.paddle.rightDown();
        }
      }
    });

    document.addEventListener('keyup', (event) => {
      if (this.gameOver) {
        if (event.key === 'Enter') {
          this.reset();
          this.start();
        }
      } else {
        if (event.key === 'ArrowLeft') {
          this.paddle.leftUp();
        } else if (event.key === 'ArrowRight') {
          this.paddle.rightUp();
        }
      }
    });

    document.addEventListener('mousemove', (event) => {
      const relativeX = event.clientX - this.space.canvas.offsetLeft;

      let targetX = relativeX - this.paddle.width / 2;
      if (targetX < 0) {
        targetX = 0;
      }
      if (targetX > this.space.canvas.width - this.paddle.width) {
        targetX = this.space.canvas.width - this.paddle.width;
      }
      this.paddle.moveTo(targetX);
    });

    window.addEventListener('blur', () => {
      if (!this.gameOver && !this.gameOnPause) {
        this.pause();
      }
    });

    window.addEventListener('click', () => {
      if (this.gameOnPause) {
        this.gameOnPause = false;
        this.start();
      }
    });
  }

  start() {
    this.gameLoop();
  }

  pause() {
    this.gameOnPause = true;
  }

  update() {
    this.paddle.update();
    this.updateBallCoordinates();
  }

  updateBallCoordinates() {
    const ball = this.ball;

    let newX = ball.x + ball.xStep;
    let newY = ball.y + ball.yStep;

    if (newX < 0 || newX > SPACE_WIDTH - ball.width) {
      ball.xStep *= -1;
      newX = ball.x + ball.xStep;
    }
    if (newY < 0) {
      ball.yStep *= -1;
      newY = ball.y + ball.yStep;
    }

    for (const brick of this.bricks) {
      if (brick.intact() && isColliding({lx: newX, ly: newY, rx: newX + ball.width, ry: newY + ball.width}, brick.box())) {
        const [newXStep, newYStep] = getNewBallDirection(this.ball, brick.box());
        ball.xStep = newXStep;
        ball.yStep = newYStep;

        newX = ball.x + ball.xStep;
        newY = ball.y + ball.yStep;

        brick.hit();
        if (!brick.intact()) {
          this.score++;
        }

        break;
      }
    }

    ball.x = newX;
    ball.y = newY;
  }

  bounceY() {
    this.ball.yStep *= -1;
    this.updateBallCoordinates();
  }

  reset() {
    this.paddle.reset();
    this.ball.reset();

    this.bricks.forEach((brick) => {
      brick.reset();
    });

    this.gameOver = false;
    this.score = 0;
  }

  intactBricksCount() {
    return this.bricks.length - this.score;
  }

  gameLoop() {
    let youWin = false;

    this.update();

    if (this.ball.y > this.space.canvas.height - this.ball.width) {
      this.gameOver = true;
    } else if (isColliding(this.paddle.box(), this.ball.box())) {
      this.bounceY();
    } else {
      if (this.intactBricksCount() === 0) {
        this.gameOver = true;
        youWin = true;
      }
    }

    this.space.clear();

    if (this.gameOver) {
      if (youWin) {
        this.space.drawYouWin();
      } else {
        this.space.drawGameOver();
      }
    } else if (this.gameOnPause) {
      this.space.drawPause();
      this.draw();
    } else {
      this.draw();
      window.requestAnimationFrame(() => this.gameLoop());
    }
  }

  draw() {
    this.paddle.draw(this.space.context);
    this.ball.draw(this.space.context);

    this.bricks.forEach((brick) => {
      brick.draw(this.space.context);
    });
  }
}
