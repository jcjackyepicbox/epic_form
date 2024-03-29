import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function BoldCheckSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="16"
      height="12"
      viewBox="0 0 16 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height,
        width,
        verticalAlign,
      }}
    >
      <path
        d="M5.52495 11.657L0.574951 6.707L1.98895 5.293L5.52645 8.8265L5.52495 8.828L14.01 0.343002L15.424 1.757L6.93895 10.243L5.52595 11.656L5.52495 11.657Z"
        fill={color || '#2E3A59'}
      />
    </svg>
  );
}

export default BoldCheckSvg;
