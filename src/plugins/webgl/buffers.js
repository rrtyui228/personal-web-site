const applyBuffer = (ctx, buffer, arr) => {
  ctx.bindBuffer(ctx.ARRAY_BUFFER, buffer);
  ctx.bufferData(ctx.ARRAY_BUFFER, new Float32Array(arr), ctx.STATIC_DRAW);
};

export function initBuffers(gl, colors) {
  const positionBuffer = gl.createBuffer();

  const positions = [
    1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    -1.0, -1.0,
  ];

  applyBuffer(gl, positionBuffer, positions);

  const colorBuffer = gl.createBuffer();

  applyBuffer(gl, colorBuffer, colors);

  return {
    position: positionBuffer,
    color: colorBuffer,
  };
}
