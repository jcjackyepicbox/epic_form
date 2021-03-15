import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function IconThankyouSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill={color || '#000'}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width,
        height,
        verticalAlign,
      }}
    >
      <path d="M14 2V12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14H6.5V0H12C12.5304 0 13.0391 0.210714 13.4142 0.585786C13.7893 0.960859 14 1.46957 14 2Z"></path>{' '}
      <path d="M3 1H5V13H3V1Z"></path>
      <path d="M0 3H1.5V11H0V3Z"></path>
    </svg>
  );
}

export default IconThankyouSvg;
