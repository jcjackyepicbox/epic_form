import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function IconWelcomeSvg({
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
      <path d="M0 2V12C0 12.5304 0.210714 13.0391 0.585786 13.4142C0.960859 13.7893 1.46957 14 2 14H7.5V0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2Z"></path>
      <path d="M11 1H9V13H11V1Z"></path>
      <path d="M14 3H12.5V11H14V3Z"></path>
    </svg>
  );
}

export default IconWelcomeSvg;
