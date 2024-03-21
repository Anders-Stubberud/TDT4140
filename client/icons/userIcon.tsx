import React from "react";

const UserIcon = ({
  fill = 'none',
  stroke = 'currentColor',
  size,
  height,
  width,
  label,
  ...props
}: {
  fill?: string;
  stroke?: string;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      aria-label={label}
      {...props}
    >
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
      />
      <path
        fill={fill}
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
      />
    </svg>
  );
};

export default UserIcon;
