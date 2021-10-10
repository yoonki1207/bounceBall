import {Wall} from './wall.js';
import {BREAKABLE_WALL} from './constants.js';

export class BreakableWall extends Wall {
  type = BREAKABLE_WALL;

  constructor(x, y, w, h) {
    super(x, y, w, h);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#12ca51';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }

  deleteObject() {
    this.collidable = false;
    this.x = this.y = this.width = this.height = -1;
  }
}