import { Car } from "./modules/car.js";
import { Road } from "./modules/road.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

// Create a Road instance with a center at the bottom of the canvas
const road = new Road(canvas.width / 2, canvas.width * 0.9);

// Create a Car instance positioned at the center of the first lane (lane index 1)
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

// Animation loop
animate();

function animate() {
  // Adjust canvas height to match the viewport height
  const viewportHeight = window.innerHeight;
  if (canvas.height !== viewportHeight) {
    canvas.height = viewportHeight;
  }

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update car position and properties
  car.update();

  // Save the canvas state
  ctx.save();

  // Calculate the vertical position of the car on the screen
  const carVerticalPosition = -car.y + canvas.height * 0.7;

  // Translate the canvas to adjust for the car's vertical position on the screen
  ctx.translate(0, carVerticalPosition);

  // Draw the road and car on the canvas
  road.draw(ctx);
  car.draw(ctx);

  // Restore the canvas state
  ctx.restore();

  // Request the next animation frame
  requestAnimationFrame(animate);
}
