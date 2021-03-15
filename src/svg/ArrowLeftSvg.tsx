import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function ArrowLeftSvg({
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
        d="M3.83 5L7.41 1.41L6 0L0 6L6 12L7.41 10.59L3.83 7H16V5H3.83Z"
        fill={color || '#2E3A59'}
      />
    </svg>
  );
}

export default ArrowLeftSvg;
