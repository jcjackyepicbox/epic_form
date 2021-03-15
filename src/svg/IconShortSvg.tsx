import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function IconShortSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="14"
      height="6"
      viewBox="0 0 14 6"
      fill={color || '#000'}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width,
        height,
        verticalAlign,
      }}
    >
      <path d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z"></path>
    </svg>
  );
}

export default IconShortSvg;
