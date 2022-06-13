import {BaseLayer} from "./base-layer.js";
import {Paddle} from "../models/paddle.js";
import {Ball} from "../models/ball.js";
import {makeBricks} from "../bricks-factory.js";
import {LEVELS} from "../levels.js";
import {bounceFromPaddle, calculateCollision, calculateWallCollision, isColliding} from "../utils.js";

export class GameLayer extends BaseLayer {

  constructor(game) {
    super(game);

    this.hasAnimation = true;
    this.paddle = new Paddle(this.space);
    this.ball = new Ball();
    this.bricks = makeBricks(LEVELS[game.repo.level]);

    this.paddle.stickBall(this.ball);

    this.repo.addEventListener('resurrect', () => this.resurrect());
    this.repo.addEventListener('resetLevel', () => this.reset());
  }

  keyDownHandler = (event) => {
    if (event.code === 'ArrowLeft') {
      this.paddle.moveTo(0);
    } else if (event.code === 'ArrowRight') {
      this.paddle.moveTo(this.space.width - this.paddle.width);
    }
  };

  keyUpHandler = (event) => {
    if (event.code === 'Enter' || event.code === 'Space') {
      if (this.paddle.ball) {
        this.paddle.throwBall();
      }
    } else if (event.code === 'ArrowLeft') {
      // Останавливать движение лопатки нужно только если ранее была нажата та же кнопка
      if (this.paddle.targetX === 0) {
        this.paddle.stopMove();
      }
    } else if (event.code === 'ArrowRight') {
      // Останавливать движение лопатки нужно только если ранее была нажата та же кнопка
      if (this.paddle.targetX === this.space.width - this.paddle.width) {
        this.paddle.stopMove();
      }
    }
  };

  mouseMoveHandler = (event) => {
    const relativeX = (event.clientX - this.space.canvas.offsetLeft) / this.space.ratio;

    let targetX = relativeX - this.paddle.width / 2;
    if (targetX < 0) {
      targetX = 0;
    }
    if (targetX > this.space.width - this.paddle.width) {
      targetX = this.space.width - this.paddle.width;
    }
    this.paddle.moveTo(targetX);
  };

  mouseClickHandler = () => {
    if (this.paddle.ball) {
      this.paddle.throwBall();
    }
  };

  blurHandler = () => {
    this.repo.showPauseBackdrop();
  };

  onActivate() {
    document.addEventListener('keydown', this.keyDownHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('click', this.mouseClickHandler);
    window.addEventListener('blur', this.blurHandler);
  }

  onDeactivate() {
    document.removeEventListener('keydown', this.keyDownHandler);
    document.removeEventListener('keyup', this.keyUpHandler);
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('click', this.mouseClickHandler);
    window.removeEventListener('blur', this.blurHandler);
  }

  draw() {
    const context = this.context;

    this.paddle.draw(context);
    this.ball.draw(context);

    this.bricks.forEach((brick) => {
      brick.draw(context);
    });
  }

  update() {
    this.paddle.update();
    this.handleBallCollision_();
    this.ball.update();
    this.updateGameStatus_();
  }

  reset() {
    this.paddle.reset();
    this.ball.reset();
    this.bricks = makeBricks(LEVELS[this.repo.level]);
    this.bricks.forEach((brick) => {
      brick.reset();
    });
    this.paddle.stickBall(this.ball);
  }

  // после проигрыша, когда игрок теряет жизнь
  resurrect() {
    this.paddle.reset();
    this.ball.reset();
    this.paddle.stickBall(this.ball);
  }

  /**
   * @private
   */
  updateGameStatus_() {
    if (this.ball.y > this.space.height - this.ball.width) {
      this.repo.lose();
    } else {
      if (this.isLevelComplete_()) {
        this.repo.win();
      }
    }
  }

  /**
   * @private
   */
  isLevelComplete_() {
    return this.bricks.filter(brick => brick.intact && brick.affectsPassageOfLevel).length === 0;
  }

  /**
   * @private
   */
  handleBallCollision_() {
    this.handleWallCollision_();

    this.handleBrickCollision_();

    this.handlePaddleCollision_();
  }

  /**
   * @private
   */
  handleWallCollision_() {
    const ball = this.ball;

    const wallCollision = calculateWallCollision(ball);
    if (wallCollision.includes('vertical')) {
      ball.xStep *= -1;
    }
    if (wallCollision.includes('horizontal')) {
      ball.yStep *= -1;
    }
  }

  /**
   * @private
   */
  handlePaddleCollision_() {
    const ball = this.ball;

    const newX = ball.x + ball.xStep;
    const newY = ball.y + ball.yStep;

    if (!isColliding(ball.box(), this.paddle.box()) && isColliding({
      lx: newX,
      ly: newY,
      rx: newX + ball.width,
      ry: newY + ball.width
    }, this.paddle.box())) {
      const paddleCollision = calculateCollision(this.ball, this.paddle.box());
      if (paddleCollision.plane === 'vertical') {
        ball.xStep *= -1;
      } else if (paddleCollision.plane === 'horizontal') {
        bounceFromPaddle(ball, this.paddle, paddleCollision.collisionCoordinates);
      }
    }
  }

  /**
   * @private
   */
  handleBrickCollision_() {
    const ball = this.ball;

    const newX = ball.x + ball.xStep;
    const newY = ball.y + ball.yStep;
    for (const brick of this.bricks) {
      if (brick.intact && isColliding({
        lx: newX,
        ly: newY,
        rx: newX + ball.width,
        ry: newY + ball.width
      }, brick.box())) {
        const brickCollision = calculateCollision(this.ball, brick.box());
        if (brickCollision.plane === 'vertical') {
          ball.xStep *= -1;
        } else {
          ball.yStep *= -1;
        }

        brick.hit();
        if (!brick.intact) {
          this.repo.hitBrick();
        }

        break;
      }
    }
  }
}
