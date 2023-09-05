import { Controls } from "./controls.js";

export class Car {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.maxSpeed = 3;
    this.speed = 0;
    this.acceleration = 0.2;
    this.friction = 0.05;
    this.angle = 0;

    this.controls = new Controls();
  }
  update() {
    this.#move();
  }

  #move() {
    // Calculate acceleration based on control inputs (forward/backward)
    const acceleration = this.controls.forward
      ? this.acceleration
      : this.controls.backward
      ? -this.acceleration
      : 0;

    // Apply acceleration to the speed
    this.speed += acceleration;

    // Ensure speed stays within the specified range
    this.speed = Math.max(
      -this.maxSpeed / 2,
      Math.min(this.maxSpeed, this.speed)
    );

    // If there's a non-zero speed, adjust the car's angle
    if (this.speed !== 0) {
      // Determine the direction of the speed (forward/backward)
      const flip = Math.sign(this.speed);

      // Adjust the angle based on left/right controls
      this.angle +=
        0.03 * flip * (this.controls.left ? 1 : this.controls.right ? -1 : 0);
    }

    // Apply friction to slow down the car
    this.speed -= Math.sign(this.speed) * this.friction;

    // If the speed is very close to zero, set it to zero to prevent drift
    this.speed = Math.abs(this.speed) < this.friction ? 0 : this.speed;

    // Update the car's position based on its angle and speed
    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  /**
   * Draws the Car on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  draw(ctx) {
    // Save the current state of the canvas context
    ctx.save();

    // Translate the canvas to the car's position
    ctx.translate(this.x, this.y);

    // Rotate the canvas to match the car's angle (negative angle to rotate clockwise)
    ctx.rotate(-this.angle);

    // Begin a path and draw a filled rectangle representing the car
    ctx.beginPath();
    ctx.rect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.fill();

    // Restore the canvas to its previous state (undo the translation and rotation)
    ctx.restore();
  }
}
