export const getProgramInfo = (ctx, program) => ({
  program,
  attribLocations: {
    vertexPosition: ctx.getAttribLocation(program, 'aVertexPosition'),
  },
  uniformLocations: {
    projectionMatrix: ctx.getUniformLocation(program, 'uProjectionMatrix'),
    modelViewMatrix: ctx.getUniformLocation(program, 'uModelViewMatrix'),
  },
});
