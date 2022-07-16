const applyBuffer = (ctx, buffer, arr) => {
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(arr), ctx.STATIC_DRAW);
};

export function initBuffers(gl) {
  const positionBuffer = gl.createBuffer();

  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];

  applyBuffer(gl, positionBuffer, positions);

  const colorBuffer = gl.createBuffer();

  const colors = [
    1.0, 1.0, 1.0, 1.0, // white
    1.0, 0.0, 0.0, 1.0, // red
    0.0, 1.0, 0.0, 1.0, // green
    0.0, 0.0, 1.0, 1.0, // blue
  ];

  applyBuffer(gl, colorBuffer, colors);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}
