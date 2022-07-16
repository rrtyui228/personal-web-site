import { getRandomNumber } from 'utils';
import {
  initShaderProgram,
  vertexShaderSource,
  fragmentShaderSource,
} from './shaders';
import { getProgramInfo } from './program';
import { drawScene } from './scenes';
import { initBuffers } from './buffers';

class Webgl {
  COLOR_FACTOR = 0.05;

  ctx = null;

  shaderProgram = null;

  programInfo = null;

  buffers = null;

  squareRotation = 0.0;

  delta = 0;

  colors = [
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 0.0, 1.0, // red
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 0.0, 1.0, 1.0, // blue
  ];

  opacityIndexes = [3, 7, 11, 15];

  MIN = 0;

  MAX = 1;

  rotationSlowFactor = 6;

  constructor(canvasCtx) {
    this.ctx = canvasCtx;
  }

  init() {
    this.#initShaderProgram();
    this.#setProgramInfo();
    this.#initBuffers();
    this.#drawScene();

    const bindRender = this.render.bind(this);

    requestAnimationFrame(bindRender);

    return this;
  }

  render(now) {
    const nowSeconds = now * 0.001; // convert to seconds
    this.squareRotation += (nowSeconds - this.delta) / this.rotationSlowFactor;
    this.delta = nowSeconds;

    this.#changeColors(5);
    this.#drawScene();

    const bindRender = this.render.bind(this);

    requestAnimationFrame(bindRender);
  }

  #changeColors(chanceInPercents = 10) {
    const chance = chanceInPercents / 100;

    this.colors = this.colors.map((num, index) => {
      if (this.opacityIndexes.includes(index)) {
        return num;
      }

      const isIncrease = getRandomNumber(2) > 0.49;
      const isChange = getRandomNumber(1) <= chance;

      const newNum = isIncrease
        ? num + this.COLOR_FACTOR
        : num - this.COLOR_FACTOR;

      if (newNum > this.MAX) {
        return this.MAX;
      }

      if (newNum < this.MIN) {
        return this.MIN;
      }

      return isChange ? newNum : num;
    });

    this.#initBuffers();
  }

  #initShaderProgram() {
    this.shaderProgram = initShaderProgram(
      this.ctx,
      vertexShaderSource,
      fragmentShaderSource,
    );
  }

  #setProgramInfo() {
    this.programInfo = getProgramInfo(this.ctx, this.shaderProgram);
  }

  #initBuffers() {
    this.buffers = initBuffers(this.ctx, this.colors);
  }

  #drawScene() {
    drawScene(this.ctx, this.programInfo, this.buffers, this.squareRotation);
  }
}

export default Webgl;
