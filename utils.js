
/**
 * calculate distance of two points
 * @param {object} dot1 dot1 has x and y members
 * @param {object} dot2 dot2 has same members with dot1
 */
export function distance(dot1, dot2) {
  return Math.sqrt(Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2));
}

/**
 * 
 */
export function isCollisionTopCircle(rect, ball) {
  if(!rect.collidable) return false;
  if(ball.x < rect.x + rect.width && ball.x > rect.x && ball.y + ball.radius > rect.y){
    if(rect.y > ball.y) {
      return true;
    }
  }
  else if(ball.y < rect.y && 
            (
              distance({x: ball.x, y: ball.y}, {x: rect.x, y: rect.y}) < ball.radius ||
              distance({x: ball.x, y: ball.y}, {x: rect.x + rect.width, y: rect.y}) < ball.radius
            )
          ) {
    return true;
  }
  else {
    return false;
  }
}

export function isCollisionCircle(rect, ball) {
  if((rect.x > ball.x && rect.y > ball.y) ||
     (rect.x + rect.width < ball.x && rect.y > ball.y) ||
     (rect.x + rect.width < ball.x && rect.y + rect.height < ball.y) ||
     (rect.x > ball.x && rect.y + rect.height < ball.y)
     ) { // 공이 모서리 쪽일 때
    if(
      distance({x: ball.x, y: ball.y}, {x: rect.x, y: rect.y}) < ball.radius ||
      distance({x: ball.x, y: ball.y}, {x: rect.x + rect.width, y: rect.y}) < ball.radius ||
      distance({x: ball.x, y: ball.y}, {x: rect.x + rect.width, y: rect.y + rect.height}) < ball.radius ||
      distance({x: ball.x, y: ball.y}, {x: rect.x, y: rect.y + rect.height}) < ball.radius
      ) { // 모서리에 닿으면
      return true;
    } else {
      return false;
    }
  } else {
    const r = {x: rect.x-ball.radius, y: rect.y-ball.radius, width: rect.width + ball.radius*2, height: rect.height+ball.radius*2};
    const ret = r.x < ball.x && r.y < ball.y && 
      r.x + r.width > ball.x && r.y + r.height > ball.y;
    if(ret
      ) {
      return true;
    } else {
      return false;
    }
  }
}

export function isCollisionStar(ball, star) {
  return distance({x: ball.x, y: ball.y}, {x: star.x, y: star.y}) < ball.radius + star.radius;
}