import * as GLOBAL from './constants.js';

const COS36 = Math.cos(Math.PI / 5);

export class Star {
  type = GLOBAL.STAR;

  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.smallRadius = radius * (Math.pow(COS36, 2) - 0.5) / (COS36-Math.pow(COS36, 3));
    this.rotate = 0;
  }

  animate(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = '#DBCF55';
    ctx.fillStyle = '#E9F252';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotate);
    this.rotate += 0.05;
    ctx.moveTo(0, this.radius)
    for(let i = 0; i < 11; i++) {
      if(i%2 == 0) {
        ctx.lineTo(0, this.radius);
      } else {
        ctx.lineTo(0, this.smallRadius);
      }
      ctx.rotate(Math.PI / 5);
    }
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}