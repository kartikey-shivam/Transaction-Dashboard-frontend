import React from "react";

interface SpinnerProps {
  size?: number; // Size of the spinner (default: 40px)
  color?: string; // Color of the spinner (default: gray-500)
  className?: string; // Additional class names for customization
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  color = "text-gray-500",
  className = "",
}) => {
  return (
    <div
      className={`animate-spin ${color} ${className}`}
      style={{
        width: size,
        height: size,
        borderWidth: size / 10, // Border width is proportional to the size
      }}
    >
      <svg
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291A7.962 7.962 0 014 12H2c0 3.042 1.135 5.824 3 7.938l1-1.647z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;
