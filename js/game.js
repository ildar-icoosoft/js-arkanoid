import {Space} from "./space.js";
import {Paddle, PADDLE_WIDTH} from "./paddle.js";
import {Ball} from "./ball.js";
import {LEVELS} from "./levels.js";
import {makeBricks} from "./brick.js";
import {isColliding} from './utils.js';

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
      this.paddle.x = relativeX - PADDLE_WIDTH / 2;
      if (this.paddle.x < 0) {
        this.paddle.x = 0;
      } else if (this.paddle.x > this.space.canvas.width - PADDLE_WIDTH) {
        this.paddle.x = this.space.canvas.width - PADDLE_WIDTH;
      }
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
    this.ball.update();
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

  checkBallCollidingBricks() {
    const ballBox = this.ball.box();

    for (const brick of this.bricks) {
      if (brick.intact() && isColliding(ballBox, brick.box())) {
        this.ball.bounceY();

        brick.hit();
        if (!brick.intact()) {
          this.score++;
        }

        break;
      }
    }
  }

  intactBricksCount() {
    return this.bricks.length - this.score;
  }

  gameLoop() {
    let youWin = false;

    this.update();

    if (this.paddle.y < this.ball.y) {
      this.gameOver = true;
    } else if (isColliding(this.paddle.box(), this.ball.box())) {
      this.ball.bounceY();
    } else {
      this.checkBallCollidingBricks();
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
