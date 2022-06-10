import {Space} from "./space.js";
import {Paddle} from "./paddle.js";
import {Ball} from "./ball.js";
import {LEVELS} from "./levels.js";
import {makeBricks} from "./brick.js";
import {
  bounceFromPaddle,
  calculateCollision,
  calculateWallCollision,
  isColliding
} from './utils.js';

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
    this.handleWallCollision();

    this.handleBrickCollision();

    this.handlePaddleCollision();

    const ball = this.ball;

    ball.x += ball.xStep;
    ball.y += ball.yStep;
  }

  handleWallCollision() {
    const ball = this.ball;

    const wallCollision = calculateWallCollision(ball);
    if (wallCollision.includes('vertical')) {
      ball.xStep *= -1;
    }
    if (wallCollision.includes('horizontal')) {
      ball.yStep *= -1;
    }
  }

  handlePaddleCollision() {
    const ball = this.ball;

    const newX = ball.x + ball.xStep;
    const newY = ball.y + ball.yStep;

    if (!isColliding(ball.box(), this.paddle.box()) && isColliding({lx: newX, ly: newY, rx: newX + ball.width, ry: newY + ball.width}, this.paddle.box())) {
      const paddleCollision = calculateCollision(this.ball, this.paddle.box());
      if (paddleCollision.plane === 'vertical') {
        ball.xStep *= -1;
      } else if (paddleCollision.plane === 'horizontal') {
        bounceFromPaddle(ball, this.paddle, paddleCollision.collisionCoordinates);
      }
    }
  }

  handleBrickCollision() {
    const ball = this.ball;

    const newX = ball.x + ball.xStep;
    const newY = ball.y + ball.yStep;
    for (const brick of this.bricks) {
      if (brick.intact() && isColliding({lx: newX, ly: newY, rx: newX + ball.width, ry: newY + ball.width}, brick.box())) {
        const brickCollision = calculateCollision(this.ball, brick.box());
        if (brickCollision.plane === 'vertical') {
          ball.xStep *= -1;
        } else {
          ball.yStep *= -1;
        }

        brick.hit();
        if (!brick.intact()) {
          this.score++;
        }

        break;
      }
    }
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
