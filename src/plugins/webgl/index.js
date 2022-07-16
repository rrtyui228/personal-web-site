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
    this.squareRotation += nowSeconds - this.delta;
    this.delta = nowSeconds;

    this.#drawScene();

    const bindRender = this.render.bind(this);

    requestAnimationFrame(bindRender);
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
    this.buffers = initBuffers(this.ctx);
  }

  #drawScene() {
    drawScene(this.ctx, this.programInfo, this.buffers, this.squareRotation);
  }
}

export default Webgl;
