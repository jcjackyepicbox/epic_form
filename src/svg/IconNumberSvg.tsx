import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function IconNumberSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill={color || '#000'}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width,
        height,
        verticalAlign,
      }}
    >
      <path d="M12 6H14.217C15.202 6 16 5.1045 16 4H12V0C10.8955 0 10 0.798 10 1.783V4H6V0C4.8955 0 4 0.798 4 1.783V4H1.783C0.798 4 0 4.8955 0 6H4V10H1.783C0.798 10 0 10.8955 0 12H4V16C5.1045 16 6 15.202 6 14.217V12H10V16C11.1045 16 12 15.202 12 14.217V12H14.217C15.202 12 16 11.1045 16 10H12V6ZM6 10V6H10V10H6Z"></path>
    </svg>
  );
}

export default IconNumberSvg;
