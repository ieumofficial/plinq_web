"use client";

interface LogoProps {
  variant?: "light" | "dark";
  size?: number;
}

export default function Logo({ variant = "dark", size = 32 }: LogoProps) {
  const squareSize = size * 0.4;
  const gap = size * 0.06;
  const gridSize = squareSize * 2 + gap;
  const radius = squareSize * 0.15;
  const fontSize = size * 0.85;

  const gradientId = `plinq-text-gradient-${variant}`;
  const circleGradientId = `plinq-circle-gradient-${variant}`;

  const fromColor = variant === "dark" ? "#3A5162" : "#BFD6E7";
  const toColor = variant === "dark" ? "#76A5C8" : "#6C8DA5";

  return (
    <div className="flex items-center" style={{ gap: size * 0.3 }}>
      <svg
        width={gridSize}
        height={gridSize}
        viewBox={`0 0 ${gridSize} ${gridSize}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top-left square */}
        <rect
          x={0}
          y={0}
          width={squareSize}
          height={squareSize}
          rx={radius}
          fill="#3D5466"
        />
        {/* Top-right circle with gradient */}
        <defs>
          <linearGradient id={circleGradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6BA7CC" />
            <stop offset="100%" stopColor="#3D5466" />
          </linearGradient>
        </defs>
        <circle
          cx={squareSize + gap + squareSize / 2}
          cy={squareSize / 2}
          r={squareSize / 2}
          fill={`url(#${circleGradientId})`}
        />
        {/* Bottom-left square */}
        <rect
          x={0}
          y={squareSize + gap}
          width={squareSize}
          height={squareSize}
          rx={radius}
          fill="#6BA7CC"
        />
        {/* Bottom-right square */}
        <rect
          x={squareSize + gap}
          y={squareSize + gap}
          width={squareSize}
          height={squareSize}
          rx={radius}
          fill="#67859B"
        />
      </svg>
      <svg
        height={fontSize}
        viewBox="0 0 120 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block" }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={fromColor} />
            <stop offset="100%" stopColor={toColor} />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="28"
          fill={`url(#${gradientId})`}
          fontFamily="'Wanted Sans Variable', 'Wanted Sans', Inter, sans-serif"
          fontSize="32"
          fontWeight="600"
          letterSpacing="-0.5"
        >
          plinq
        </text>
      </svg>
    </div>
  );
}
