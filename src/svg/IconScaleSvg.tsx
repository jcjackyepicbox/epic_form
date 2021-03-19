import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function IconScaleSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="14"
      height="13"
      viewBox="0 0 14 13"
      fill={color || '#000'}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height,
        width,
        verticalAlign,
      }}
    >
      <path d="M12 0c1.1045 0 2 .8955 2 2v11h-4V0h2zM4 10.5V13H0V8.5h2c1.1045 0 2 .8955 2 2zM9 6v7H5V4h2c1.1045 0 2 .8955 2 2z"></path>
    </svg>
  );
}

export default IconScaleSvg;
