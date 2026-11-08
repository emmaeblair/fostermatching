import React from "react";

interface DogPawShapeProps {
  className?: string;
  fill?: string;
}

export function DogPawShape({
  className = "w-24 h-24",
  fill = "currentColor",
}: DogPawShapeProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Exact 4-toe paw print silhouette matched from user reference */}
      <path
        d="M 60.0,0.0 L 65.7,0.0 L 70.0,2.1 L 75.0,12.1 L 74.3,20.7 L 71.4,26.4 L 69.3,29.3 L 63.6,32.1 L 57.9,30.7 L 53.6,26.4 L 50.7,20.7 L 51.4,9.3 L 53.6,5.0 L 60.0,0.0 Z M 26.4,3.6 L 32.1,3.6 L 37.9,6.4 L 42.9,16.4 L 42.9,26.4 L 41.4,30.7 L 39.3,33.6 L 32.1,36.4 L 27.9,35.0 L 23.6,31.4 L 18.6,21.4 L 19.3,11.4 L 21.4,7.1 L 26.4,3.6 Z M 87.9,24.3 L 90.7,24.3 L 96.4,27.1 L 99.3,31.4 L 100.0,40.0 L 97.9,47.1 L 92.9,52.9 L 88.6,55.0 L 82.9,55.0 L 80.0,53.6 L 76.4,49.3 L 75.7,39.3 L 80.0,29.3 L 84.3,25.7 L 87.9,24.3 Z M 8.6,32.9 L 15.7,34.3 L 22.1,41.4 L 23.6,45.7 L 24.3,48.6 L 23.6,57.1 L 20.7,61.4 L 16.4,63.6 L 12.1,63.6 L 7.9,61.4 L 3.6,57.1 L 0.7,51.4 L 0.0,41.4 L 2.9,35.7 L 8.6,32.9 Z M 45.7,39.3 L 55.7,39.3 L 62.9,42.9 L 72.9,57.1 L 85.7,65.7 L 88.6,71.4 L 89.3,78.6 L 86.4,85.7 L 83.6,88.6 L 75.0,91.4 L 53.6,90.0 L 47.9,91.4 L 35.0,97.1 L 27.9,96.4 L 23.6,94.3 L 20.7,91.4 L 17.9,85.7 L 17.9,77.1 L 22.1,70.0 L 31.4,60.7 L 33.6,52.1 L 37.1,45.0 L 40.0,42.1 L 45.7,39.3 Z"
      />
    </svg>
  );
}
