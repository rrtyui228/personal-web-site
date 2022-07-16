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
  constructor(canvasCtx) {
    this.ctx = canvasCtx;
    this.shaderProgram = null;
    this.programInfo = null;
    this.buffers = null;
    this.squareRotation = 0.0;
    this.delta = 0;
    this.colors = [
      1.0, 1.0, 1.0, 1.0, // white
      1.0, 0.0, 0.0, 1.0, // red
      0.0, 1.0, 0.0, 1.0, // green
      0.0, 0.0, 1.0, 1.0, // blue
    ];
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
    this.squareRotation += (nowSeconds - this.delta) / 4;
    this.delta = nowSeconds;

    this.changeColors();
    this.#drawScene();

    const bindRender = this.render.bind(this);

    requestAnimationFrame(bindRender);
  }

  changeColors() {
    this.colors = this.colors.map((num, index) => {
      const opacityIndexes = [3, 7, 11, 15];

      if (opacityIndexes.includes(index)) {
        return num;
      }

      const randomNum = getRandomNumber();
      const isChangeColor = getRandomNumber() > 0.9;

      return isChangeColor ? randomNum : num;
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
