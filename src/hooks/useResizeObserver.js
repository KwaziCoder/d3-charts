import React, { useEffect, useState } from "react";
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);

  useEffect(() => {
    const observeTraget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTraget);

    return () => {
      resizeObserver.unobserve(observeTraget);
    };
  }, [ref]);
  return dimensions;
};

export default useResizeObserver;