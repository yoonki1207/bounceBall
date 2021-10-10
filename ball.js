import {GameObject} from './gameObject.js';
import * as GLOBAL from './constants.js';
import {isCollisionTopCircle, isCollisionCircle, isCollisionStar} from './utils.js';
import {BallController} from './controller/ballController.js';

const GRAVITY = 9.8;
const JUMP_POWER = 5;
const DELTA_T = 1/60;

export class Ball extends GameObject {
  type = GLOBAL.BALL;

  constructor(x, y, radius) {
    super(x, y, radius);
    this.vx = 0;
    this.vy = 0;
    this.isOver = false;
    this.isDead = false;
  }

  animate(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#ee4242';
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
    ctx.fill();
    ctx.closePath();
    this.update();
  }

  update() {
    this.vy += GRAVITY * DELTA_T;
    this.y += this.vy;
  }

  jump() {
    this.y -= this.vy;
    this.vy = -JUMP_POWER;
    this.update(); // 없앨 것
  }

  setLocate(x, y) {
    this.x = x;
    this.y = y;
  }

  resetLocate(x, y) {
    this.setLocate(x, y);
    this.vx = this.vy = 0;
  }

  collisionCheck(obj) {
    const type = obj.type;
    if(type == GLOBAL.WALL) {
      if(isCollisionCircle(obj, this)) {
        this.jump();
      }
    } else if(type == GLOBAL.DEATH_WALL) {
      if(isCollisionCircle(obj, this)) {
        this.isDead = true;
      }
    } else if(type == GLOBAL.BREAKABLE_WALL) {
      if(isCollisionCircle(obj, this)) {
        this.jump();
        obj.deleteObject();
        console.log('del');
      }
    } else if(type == GLOBAL.STAR) {
      if(isCollisionStar(obj, this)) {
        this.isOver = true;
      }
    }
  }
}