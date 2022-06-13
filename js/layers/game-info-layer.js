import {BaseLayer} from "./base-layer.js";
import {SPACE_HEIGHT, SPACE_WIDTH} from "../space.js";

const SCORE_X = 20;
const SCORE_Y = SPACE_HEIGHT - 20;

const LEVEL_X = SPACE_WIDTH - 20;
const LEVEL_Y = SPACE_HEIGHT - 20;

const LIVES_X = SPACE_WIDTH - 20;
const LIVES_Y = 30;

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

    this.context.save();
    this.context.fillStyle = 'white';
    this.context.font = '18px sans';
    this.context.textAlign = 'right';
    this.context.fillText(`Lives: ${repo.livesCount}`, LIVES_X, LIVES_Y);
    this.context.restore();
  }
}
