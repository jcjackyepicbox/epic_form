import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function IconChoiceSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="14"
      height="10"
      viewBox="0 0 14 10"
      fill={color || '#000'}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width,
        height,
        verticalAlign,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.7072.707124L5.00008 9.41423.292969 4.70712c.781051-.78104 2.047381-.78104 2.828431 0L5.00008 6.5858 10.8788.707124c.781-.7810482 2.0473-.7810482 2.8284 0z"
      ></path>
    </svg>
  );
}

export default IconChoiceSvg;
