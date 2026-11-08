interface PixelZucchiniProps {
  width?: number;
  height?: number;
  rotate?: number;
  className?: string;
}

export function PixelZucchini({
  width = 300,
  height = 125,
  rotate = -10,
  className = "",
}: PixelZucchiniProps) {
  return (
    <svg
      role="img"
      aria-label="Pixel art zucchini"
      viewBox="0 0 24 10"
      width={width}
      height={height}
      className={className}
      style={{
        shapeRendering: "crispEdges",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <rect x="1" y="3" width="20" height="1" fill="#0B3D2E" />
      <rect x="0" y="4" width="1" height="3" fill="#0B3D2E" />
      <rect x="21" y="4" width="2" height="3" fill="#0B3D2E" />
      <rect x="1" y="7" width="20" height="1" fill="#0B3D2E" />
      <rect x="21" y="3" width="1" height="1" fill="#0B3D2E" />
      <rect x="21" y="7" width="1" height="1" fill="#0B3D2E" />

      {/* Body green */}
      <rect x="1" y="4" width="20" height="3" fill="#2F9E5E" />

      {/* Ridges */}
      <rect x="4" y="4" width="1" height="3" fill="#7BD08F" />
      <rect x="8" y="4" width="1" height="3" fill="#7BD08F" />
      <rect x="12" y="4" width="1" height="3" fill="#7BD08F" />
      <rect x="16" y="4" width="1" height="3" fill="#7BD08F" />

      {/* Stem & tips */}
      <rect x="21" y="5" width="2" height="1" fill="#FFD93B" />
      <rect x="22" y="4" width="2" height="1" fill="#FFD93B" />
      <rect x="0" y="5" width="1" height="1" fill="#FFD93B" />
    </svg>
  );
}

