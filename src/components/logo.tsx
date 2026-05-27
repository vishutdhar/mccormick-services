type LogoProps = {
  width?: number;
  className?: string;
};

export function Logo({ width = 40, className }: LogoProps) {
  const height = Math.round(width * 1);
  return (
    <svg
      role="img"
      aria-label="McCormick Services"
      width={width}
      height={height}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>McCormick Services</title>
      <g fill="none" stroke="none">
        <path
          d="M32 6 L46 30 L38 30 L38 38 L26 38 L26 30 L18 30 Z"
          fill="#a6ce38"
          transform="rotate(0 32 32)"
        />
        <path
          d="M32 6 L46 30 L38 30 L38 38 L26 38 L26 30 L18 30 Z"
          fill="#6b7f2c"
          transform="rotate(120 32 32)"
        />
        <path
          d="M32 6 L46 30 L38 30 L38 38 L26 38 L26 30 L18 30 Z"
          fill="#2f4f1c"
          transform="rotate(240 32 32)"
        />
      </g>
    </svg>
  );
}
