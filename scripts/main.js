import { Car } from "./modules/car.js";
import { Road } from "./modules/road.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const road = new Road(canvas.width / 2, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);

animate();

function animate() {
  const viewportHeight = window.innerHeight;
  if (canvas.height !== viewportHeight) {
    canvas.height = viewportHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  car.update();

  ctx.save();
  const carScreenPosition = -car.y + canvas.height * 0.7;
  ctx.translate(0, carScreenPosition);

  road.draw(ctx);
  car.draw(ctx);

  ctx.restore();
  
  requestAnimationFrame(animate);
}
