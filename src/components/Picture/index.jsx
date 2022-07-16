import React, { useCallback, useEffect, useRef } from 'react';
import Webgl from 'plugins/webgl';

function Picture() {
  const canvasRef = useRef();

  const onResize = useCallback(() => {
    if (canvasRef?.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (canvasRef) {
      // TODO: handle if browser doesn't support webgl
      const canvasCtx = canvasRef.current.getContext('webgl');

      new Webgl(canvasCtx).init();
    }
  }, [canvasRef]);

  return (
    <canvas ref={canvasRef} />
  );
}

export default Picture;
