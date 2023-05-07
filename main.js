import { Car } from "./car.js";

/** @type {HTMLCanvasElement} */
const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const car = new Car(100, 100, 30, 50);
car.draw(ctx);
