import {BaseLayer} from "./base-layer.js";
import {SPACE_HEIGHT, SPACE_WIDTH} from "../space.js";
import {Heart} from "../models/heart.js";

const SCORE_X = 20;
const SCORE_Y = 50;

const LEVEL_X = SPACE_WIDTH - 20;
const LEVEL_Y = SPACE_HEIGHT - 15;

const HEARTS_GAP = 10;
const LIVES_Y = 10;

export class GameInfoLayer extends BaseLayer {
  /**
   * @param {Game} game
   */
  constructor(game) {
    super(game);
    this.heart = new Heart();
  }

  draw() {
    const repo = this.repo;

    this.context.save();
    this.context.fillStyle = '#0095DD';
    this.context.font = 'bold 50px Orbitron';
    this.context.textAlign = 'left';
    this.context.fillText(repo.score, SCORE_X, SCORE_Y);
    this.context.restore();

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '14px Orbitron';
    this.context.textAlign = 'right';
    this.context.fillText(`Level ${repo.level + 1}`, LEVEL_X, LEVEL_Y);
    this.context.restore();

    for (let i = 1; i < repo.livesCount; i++) {
      this.heart.x = this.space.width - (this.heart.width + HEARTS_GAP) * i - HEARTS_GAP / 2;
      this.heart.y = LIVES_Y;
      this.heart.draw(this.context);
    }
  }
}
