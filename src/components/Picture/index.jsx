import React, {useCallback, useEffect, useRef} from 'react';

const Picture = () => {
  const canvasRef = useRef();

  const resize = useCallback(() => {
    if (canvasRef?.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }
  }, [canvasRef]);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    // TODO: handle if browser doesn't support webgl
    const canvasCtx = canvasRef.current.getContext('webgl');

    canvasCtx.clearColor(0.0, 0.0, 0.0, 1.0);
    canvasCtx.clear(canvasCtx.COLOR_BUFFER_BIT);
  });

  return (
    <canvas ref={canvasRef}/>
  );
};

export default Picture;
