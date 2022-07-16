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
  }

  init() {
    this.initShaderProgram();
    this.setProgramInfo();
    this.initBuffers();
    this.drawScene();
  }

  initShaderProgram() {
    this.shaderProgram = initShaderProgram(
      this.ctx,
      vertexShaderSource,
      fragmentShaderSource,
    );
  }

  setProgramInfo() {
    this.programInfo = getProgramInfo(this.ctx, this.shaderProgram);
  }

  initBuffers() {
    const buffersPositions = initBuffers(this.ctx);
    this.buffers = { position: buffersPositions };
  }

  drawScene() {
    drawScene(this.ctx, this.programInfo, this.buffers);
  }
}

export default Webgl;
