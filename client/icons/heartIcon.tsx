import React from "react";
import { useTheme } from "next-themes"; // Assuming you're using next-themes

const HeartIcon: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const { theme } = useTheme(); // Access the current theme using useTheme()

  // Determine fill color based on theme and isActive status
  let fillColor = isActive ? "#ff0000" : "none";
  const strokeColor = isActive ? "#ff0000" : (theme === "dark" ? "#ffffff" : "#000000");

  return (
    <svg
      fill={fillColor}
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="2"
      />
    </svg>
  );
};

export default HeartIcon;
