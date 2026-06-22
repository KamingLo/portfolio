import React from 'react';
import type { SimpleIcon as SimpleIconType } from 'simple-icons';

interface SimpleIconProps extends React.SVGProps<SVGSVGElement> {
  icon: SimpleIconType;
  size?: number | string;
}

export const SimpleIcon = ({ icon, size = 24, className = '', ...props }: SimpleIconProps) => {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{icon.title}</title>
      <path d={icon.path} />
    </svg>
  );
};
