
/**
 * interface for game objects.
 * 
 */
export class GameObject {
  constructor(x, y, w, h, collidable) {
    this.x = x;
    this.y = y;
    this.collidable = collidable === undefined ? true : collidable;

    if(h === undefined) { // x, y, r
      this.radius = w;
    } else { // x, y, w, h
      this.width = w;
      this.height = h;
    }
  }

  animate() {

  }

  draw() {
    
  }
}