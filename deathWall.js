import {GameObject} from './gameObject.js';
import {DEATH_WALL} from './constants.js';

export class DeathWall extends GameObject {
  type = DEATH_WALL;
  
  constructor(x, y, width, height) {
    super(x, y, width, height);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#FF4444';
    ctx.strokeStyle = '#F0E746';
    ctx.arc((this.x+this.width)/2, (this.y+this.height)/2, 0.8*(this.width > this.height ? this.height : this.width), 0, Math.PI * 2 );
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
  }
}