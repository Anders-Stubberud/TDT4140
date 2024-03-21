import React, { FC } from "react";
import { useTheme } from "next-themes"; // Assuming you're using next-themes

interface SortIconProps {
  size?: number;
}

const SortIcon: FC<SortIconProps> = ({ size = 20 }) => {
  const { theme } = useTheme(); // Access the current theme using useTheme()

  // Determine fill color based on theme
  const fillColor = theme === "light" ? "#000000" : "#ffffff";

  return (
    <svg
      className="feather feather-edit"
      fill={fillColor}
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 490 490"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="85.877,154.014 85.877,428.309 131.706,428.309 131.706,154.014 180.497,221.213 217.584,194.27 108.792,44.46 0,194.27 37.087,221.213"
      />
      <polygon
        points="404.13,335.988 404.13,61.691 358.301,61.691 358.301,335.99 309.503,268.787 272.416,295.73 381.216,445.54 490,295.715 452.913,268.802"
      />
    </svg>
  );
};

export default SortIcon;