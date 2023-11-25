const INITIAL_VELOCITY = 0.040 

const VELOCITY_INCREASE = 0.00001

export default class Ball {
  constructor(ballElem) {
    this.ballElem = ballElem
    this.reset()
  }
// get the function form css to make changes in the position of asteroid  
  get x() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
  }
// this will change the position of the asteroid according to the js change function
  set x(value) {
    this.ballElem.style.setProperty("--x", value)
  }
// get the function form css to make changes in the position of asteroid
  get y() {
    return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
  }
// this will change the position of the asteroid according to the js change function
  set y(value) {
    this.ballElem.style.setProperty("--y", value)
  }

  rect() {
    return this.ballElem.getBoundingClientRect()
  }
// reset function will determine the asteroids direction using vectors by adding sin and cos function by using the random
// the asteroid will start from different direction on every load
  reset() {
    this.x = 50
    this.y = 50
    this.direction = { x: 0 }
    if (
      Math.abs(this.direction.x) <= 0.2 ||
      Math.abs(this.direction.x) >= 0.9
    ) {
      const heading = randomNumberBetween(0, 2 * Math.PI)
//determines the direction of the asteroid
      this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
    }
    this.velocity = INITIAL_VELOCITY
  }
// update function is adding the velocity which has be set priorly, it first calls the x and y function and 
// then gives it a direction ,a velocity and integrates it with frame change fuction to make the animation smooth
  update(change, paddleRects) {
    this.x += this.direction.x * this.velocity * change
    this.y += this.direction.y * this.velocity * change
    this.velocity += VELOCITY_INCREASE * change
    const rect = this.rect()

// condition that if the asteroid strikes the bottom or top of the screen it will bounce back (the top and bottom of screen
// are specifed by window.innerheight) which is done by giving the direction negative i.e -1
    if (rect.bottom >= window.innerHeight || rect.top <= 0) {
      this.direction.y *= -1
    }

    if (paddleRects.some(r => isCollision(r, rect))) {
      this.direction.x *= -1
    }
  }
}
// creating random number for direction of asteroid
function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min
}
// conditions that if the the asteroid collision happens on the paddle will bounce back
function isCollision(rect1, rect2) {
  return (
    rect1.left <= rect2.right &&
    rect1.right >= rect2.left &&
    rect1.top <= rect2.bottom &&
    rect1.bottom >= rect2.top
  )
}