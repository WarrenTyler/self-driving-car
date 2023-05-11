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

    this.controls = new Controls();
  }
  // update() {
  //   if (this.controls.forward) {
  //     this.speed += this.acceleration;
  //   }
  //   if (this.controls.backward) {
  //     this.speed -= this.acceleration;
  //   }

  //   if (this.speed > this.maxSpeed) {
  //     this.speed = this.maxSpeed;
  //   }
  //   if (this.speed < -this.maxSpeed / 2) {
  //     this.speed = -this.maxSpeed / 2;
  //   }
    
  //   if (this.speed > 0) {
  //     this.speed -= this.friction;
  //   }
  //   if (this.speed < 0) {
  //     this.speed += this.friction;
  //   }


  //   this.y -= this.speed;
  // }
  update() {
    const { forward, backward } = this.controls;
  
    if (forward) {
      this.speed += this.acceleration;
    }
    if (backward) {
      this.speed -= this.acceleration;
    }
  
    this.speed = Math.max(-this.maxSpeed / 2, Math.min(this.speed, this.maxSpeed));
  
    if (this.speed > 0) {
      this.speed -= this.friction;
    } else if (this.speed < 0) {
      this.speed += this.friction;
    }
  
    this.y -= this.speed;
  }
  
  /**
   * Draws the Car on the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fill();
  }
}
