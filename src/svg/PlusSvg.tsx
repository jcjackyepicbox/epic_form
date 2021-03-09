import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function PlusSvg({ height, width, verticalAlign }: Partial<ISvgProps>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width,
        height,
        verticalAlign,
      }}
    >
      <path d="M13 13V19H11V13H5V11H11V5H13V11H19V13H13Z" fill="#2E3A59" />
    </svg>
  );
}

export default PlusSvg;
