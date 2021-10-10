import {GameObject} from './gameObject.js';
import {WALL} from './constants.js';

export class Wall extends GameObject {
  type = WALL;
  
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}