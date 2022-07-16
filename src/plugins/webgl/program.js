export const getProgramInfo = (ctx, program) => ({
  program,
  attribLocations: {
    vertexPosition: ctx.getAttribLocation(program, 'aVertexPosition'),
    vertexColor: ctx.getAttribLocation(program, 'aVertexColor'),
  },
  uniformLocations: {
    projectionMatrix: ctx.getUniformLocation(program, 'uProjectionMatrix'),
    modelViewMatrix: ctx.getUniformLocation(program, 'uModelViewMatrix'),
  },
});
