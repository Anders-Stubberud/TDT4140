import React, { FC } from "react";

interface TrashCanIconProps {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  label?: string;
}

export const TrashCanIcon2: FC<TrashCanIconProps> = ({
  fill = 'currentColor',
  size,
  height,
  width,
  label,
  ...props
}) => {
  const iconStyle = {
    cursor: "pointer", // Add pointer cursor on hover
  };

  return (
    <svg
      width={size || width || 20}
      height={size || height || 20}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={iconStyle} // Apply inline styles
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5H5V19C5 20.1 5.9 21 7 21H17C18.1 21 19 20.1 19 19V5H20C20.6 5 21 4.6 21 4C21 3.4 20.6 3 20 3H16.3L15.5 2H8.5L7.7 3H4C3.4 3 3 3.4 3 4C3 4.6 3.4 5 4 5ZM6.5 7C6.2 7 6 7.2 6 7.5C6 7.8 6.2 8 6.5 8H17.5C17.8 8 18 7.8 18 7.5C18 7.2 17.8 7 17.5 7H6.5ZM9 17C9 17.6 9.4 18 10 18C10.6 18 11 17.6 11 17V10C11 9.4 10.6 9 10 9C9.4 9 9 9.4 9 10V17ZM13 17C13 17.6 13.4 18 14 18C14.6 18 15 17.6 15 17V10C15 9.4 14.6 9 14 9C13.4 9 13 9.4 13 10V17Z"
        fill={fill}
      />
    </svg>
  );
};

export default TrashCanIcon2;
