import {BaseLayer} from "./base-layer.js";
import {SPACE_HEIGHT, SPACE_WIDTH} from "../space.js";
import {Heart} from "../models/heart.js";

const SCORE_X = 20;
const SCORE_Y = SPACE_HEIGHT - 20;

const LEVEL_X = SPACE_WIDTH - 20;
const LEVEL_Y = SPACE_HEIGHT - 20;

const HEARTS_GAP = 10;
const LIVES_Y = 10;

export class GameInfoLayer extends BaseLayer {
  draw() {
    const repo = this.repo;

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'left';
    this.context.fillText(`Score: ${repo.score}`, SCORE_X, SCORE_Y);
    this.context.restore();

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'right';
    this.context.fillText(`Level: ${repo.level + 1}`, LEVEL_X, LEVEL_Y);
    this.context.restore();

    for (let i = 1; i < repo.livesCount; i++) {
      const heart = new Heart();
      heart.x = this.space.width - (heart.width + HEARTS_GAP) * i - HEARTS_GAP / 2;
      heart.y = LIVES_Y;
      heart.draw(this.context);
    }
  }
}
