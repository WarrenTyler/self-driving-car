import { Car } from "./modules/car.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const car = new Car(100, 100, 30, 50);

animate();

function animate() {
  const viewportHeight = window.innerHeight;
  if (canvas.height !== viewportHeight) {
    canvas.height = viewportHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  car.update();
  car.draw(ctx);

  requestAnimationFrame(animate);
}
