/**
 * Creates a shader of the given type, uploads the source and compiles it.
 * @param {WebGLRenderingContext} gl - webgl canvas context
 * @param {Number} type - shader type
 * @param {String} source - shader source
 * @return {WebGLShader|null}
 */
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object
  gl.shaderSource(shader, source);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    // TODO: handle error with alert
    // eslint-disable-next-line no-console
    console.error(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);

    return null;
  }

  return shader;
}

/**
 * Initialize a shader program, so WebGL knows how to draw our data
 * @param {WebGLRenderingContext} gl - webgl canvas context
 * @param {String} vsSource - string with executive code for vertex shader
 * @param {String} fsSource - string with executive code for fragment shader
 * @return {null|WebGLProgram}
 */
export function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    // TODO: handle error with alert
    gl.getProgramInfoLog(shaderProgram);

    return null;
  }

  return shaderProgram;
}

export const vertexShaderSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    
    varying lowp vec4 vColor;
    
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
`;

export const fragmentShaderSource = `
    varying lowp vec4 vColor;

    void main(void) {
      gl_FragColor = vColor;
    }
`;
