const FILLED = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const OUTLINE = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 0, 0, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1],
  [0, 1, 0, 0, 0, 1, 0],
  [0, 0, 1, 0, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

interface PixelHeartProps {
  filled: boolean;
}

function PixelHeart({ filled }: PixelHeartProps) {
  const cells = filled ? FILLED : OUTLINE;

  return (
    <svg
      viewBox="0 0 7 6"
      width="18"
      height="16"
      aria-hidden="true"
      shapeRendering="crispEdges"
      className="block"
    >
      {cells.flatMap((row, y) =>
        row.map((on, x) =>
          on ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="currentColor"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default PixelHeart;
