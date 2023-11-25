const SPEED = 0.01

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem
    this.reset()
  }
// getting the position of the paddle from js 
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    )
  }
// setting the position of the paddle which will change as the cursor
  set position(value) {
    this.paddleElem.style.setProperty("--position", value)
  }

  rect() {
    return this.paddleElem.getBoundingClientRect()
  }

  reset() {
    this.position = 50
  }
// computer paddle fuctioning with respect to wall
  update(change, ballHeight) {
    this.position += SPEED * change * (ballHeight - this.position)
  }
}