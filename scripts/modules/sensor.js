import { lerp } from "./utils.js";

export class Sensor {
  /**
   * Initializes a new instance of the Sensor class.
   * @param {Car} car - The car object to which this sensor is attached.
   */
  constructor(car) {
    this.car = car;
    this.rayCount = 5; // Number of rays to cast
    this.rayLength = 150; // Length of each ray
    this.raySpread = Math.PI / 2; // Spread angle of the rays (90 degrees)

    this.rays = [];
  }

  update() {
    this.#castRays(); // Invoke the ray casting function
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      // Calculate the ray angle using linear interpolation (lerp)
      const rayAngle = lerp(
        this.raySpread / 2, // Start angle (half of ray spread)
        -this.raySpread / 2, // End angle (negative half of ray spread)
        this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1)
        // If there's only one ray, set the angle to 0.5 (straight ahead),
        // otherwise, interpolate based on the ray index and count.
      );

      const start = { x: this.car.x, y: this.car.y };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };
      this.rays.push([start, end]);
    }
  }

  /**
   * Draws the sensor rays on the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas context to draw on.
   */
  draw(ctx) {
    for (let i = 0; i < this.rayCount; i++) {
      const [start, end] = this.rays[i];
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }
  }
}
