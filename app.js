import {Wall} from './wall.js';
import {DeathWall} from './deathWall.js';
import {BreakableWall} from './breakableWall.js';
import {Ball} from './ball.js';
import {BallController} from './controller/ballController.js';
import {Star} from './star.js';
import {GameObject} from './gameObject.js';
import {isCollisionTopCircle, isCollisionCircle} from './utils.js';
import {WallCreator} from './controller/wallCreator.js';
import {levelData} from './resource/levelData.js';
import * as GLOBAL from './constants.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    // 레티나 디스플레이에서도 잘 보이도록 하려고 한 코드인데 모바일에서 뭔가 오류가 남.
    this.pixelRatio = window.devicePixelRatio > 1 ? 1 : 1;
    this.resize();

    this.stageWidth = 600;
    this.stageHeight = 400;

    this.level = 0;
    this.levelData = levelData[this.level];

    this.gameObjects = [];
    this.init();
    

    window.requestAnimationFrame(this.animate.bind(this));
    // Event Listeners
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
    window.addEventListener('mousedown', this.onMouseDown.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  init() {
    this.gameObjects = [];
    this.levelData.map(obj => {this.addGameObject(obj.type, obj.info)});
  }

  addGameObject(type, info) {
    const {x, y, w, h, r} = info;
    switch(type) {
      case GLOBAL.WALL:
      this.gameObjects.push(new Wall(x, y, w, h));
      break;
      case GLOBAL.DEATH_WALL:
      this.gameObjects.push(new DeathWall(x, y, w, h));
      break;
      case GLOBAL.BREAKABLE_WALL:
      this.gameObjects.push(new BreakableWall(x, y, w, h));
      break;
      case GLOBAL.BALL:
      this.ball = new Ball(x, y, r);
      this.ballController = new BallController(this.ball);
      this.gameObjects.push(this.ball);
      break;
      case GLOBAL.STAR:
      this.star = new Star(x, y, r);
      this.gameObjects.push(this.star);
      break;
    }
  }

  onKeyDown(evet) {
    console.log(event.keyCode);
    switch(event.keyCode) {
      case 27: // ESC
      this.ball.setLocate(100, 100);
      break;
      case 37:
      this.ballController.setState('left');
      break;
      case 38:
      break;
      case 39:
      this.ballController.setState('right');
      break;
      case 40:
      break;
    }
  }

  onKeyUp(event) {
    switch(event.keyCode) {
      case 37:
      this.ballController.setState('stop');
      break;
      case 38:
      break;
      case 39:
      this.ballController.setState('stop');
      break;
      case 40:
      break;
    }
  }

  onMouseDown(e) {
    this.wallCreator = new WallCreator(e.offsetX, e.offsetY);
  }

  onMouseMove(e) {
    
  }

  onMouseUp(e) {
    let x = this.wallCreator.startX;
    let y = this.wallCreator.startY;
    let w = this.wallCreator.endX - x;
    let h = this.wallCreator.endY - y;
    if(w < 0) {
      x += w;
      w = -w;
    }
    if(h < 0) {
      y += h;
      h = -h;
    }
    const type = e.button == 0 ? GLOBAL.WALL : GLOBAL.DEATH_WALL;
    this.addGameObject(type, {x: x, y: y, w: w, h: h});
    this.wallCreator = null;
  }

  checkNext() {
    if(this.ball.isOver) {
      this.level++;
      this.resetLevelData();
    }
    if(this.ball.isDead) {
      this.resetLevelData();
    }
  }

  resetLevelData() {
    this.levelData = levelData[this.level % levelData.length];
    this.init();
  }

  /**
   * this function calls 60 times per second 
   */
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ball.animate(this.ctx);
    if(this.wallCreator) {
      this.wallCreator.animate(this.ctx);
    }
    this.star.animate(this.ctx);
    this.update();
  }

  update() {
    this.checkNext();
    this.ballController.update();
    this.gameObjects.map((obj) => {
      if(obj instanceof GameObject)
        obj.draw(this.ctx);
      this.ball.collisionCheck(obj);
    });
  }

  resize() {
    this.canvas.width = 600;
    this.canvas.height = 400;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);
  }
}

window.onload = () => {
  new App();
}