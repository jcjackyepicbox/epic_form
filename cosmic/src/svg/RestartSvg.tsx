import React from 'react';
import { ISvgProps } from '../../interfaces/general/svg.interface';

function RestartSvg({
  color,
  height,
  verticalAlign,
  width,
}: Partial<ISvgProps>) {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        height,
        width,
        verticalAlign,
      }}
    >
      <path
        d="M8.99497 7.62609e-06C4.8362 -0.00568472 1.36664 3.17599 1.01299 7.3197C0.659333 11.4634 3.53955 15.187 7.63914 15.8862C11.7387 16.5853 15.6903 14.0267 16.73 10H14.649C13.6318 12.8771 10.617 14.5324 7.64344 13.8465C4.66989 13.1605 2.68488 10.3519 3.03079 7.3199C3.3767 4.28792 5.94332 1.99856 8.99497 2.00001C10.5845 2.00234 12.1064 2.64379 13.218 3.78002L9.99997 7.00001H17V7.62609e-06L14.649 2.35002C13.1527 0.844637 11.1175 -0.0012743 8.99497 7.62609e-06Z"
        fill={color || '#2E3A59'}
      />
    </svg>
  );
}

export default RestartSvg;
