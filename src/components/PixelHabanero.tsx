interface PixelHabaneroProps {
  width?: number;
  height?: number;
  rotate?: number;
  className?: string;
}

export function PixelHabanero({
  width = 110,
  height = 95,
  rotate = -6,
  className = "",
}: PixelHabaneroProps) {
  return (
    <svg
      role="img"
      aria-label="Pixel art habanero pepper"
      viewBox="0 0 22 20"
      width={width}
      height={height}
      className={className}
      style={{
        shapeRendering: "crispEdges",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* Stem (#0B3D2E outline, #2F9E5E body, #B9D94A tip) */}
      <rect x="13" y="1" width="3" height="1" fill="#0B3D2E" />
      <rect x="12" y="2" width="2" height="1" fill="#0B3D2E" />
      <rect x="14" y="2" width="2" height="1" fill="#B9D94A" />
      <rect x="16" y="2" width="1" height="1" fill="#0B3D2E" />
      <rect x="11" y="3" width="1" height="2" fill="#0B3D2E" />
      <rect x="12" y="3" width="2" height="2" fill="#2F9E5E" />
      <rect x="14" y="3" width="1" height="2" fill="#0B3D2E" />

      {/* Calyx Cap (where stem meets pepper) */}
      <rect x="8" y="5" width="8" height="1" fill="#0B3D2E" />
      <rect x="9" y="6" width="6" height="1" fill="#2F9E5E" />

      {/* Main Body Top Border */}
      <rect x="6" y="6" width="3" height="1" fill="#0B3D2E" />
      <rect x="15" y="6" width="3" height="1" fill="#0B3D2E" />
      <rect x="4" y="7" width="2" height="1" fill="#0B3D2E" />
      <rect x="18" y="7" width="2" height="1" fill="#0B3D2E" />

      {/* Side Walls */}
      <rect x="3" y="8" width="1" height="4" fill="#0B3D2E" />
      <rect x="2" y="10" width="1" height="4" fill="#0B3D2E" />
      <rect x="19" y="8" width="1" height="4" fill="#0B3D2E" />
      <rect x="20" y="10" width="1" height="3" fill="#0B3D2E" />

      {/* Lower Taper & Lobes */}
      <rect x="3" y="14" width="1" height="2" fill="#0B3D2E" />
      <rect x="4" y="16" width="2" height="1" fill="#0B3D2E" />
      <rect x="6" y="17" width="3" height="1" fill="#0B3D2E" />
      <rect x="9" y="18" width="3" height="1" fill="#0B3D2E" />
      <rect x="12" y="18" width="2" height="1" fill="#0B3D2E" />
      <rect x="14" y="17" width="3" height="1" fill="#0B3D2E" />
      <rect x="17" y="16" width="2" height="1" fill="#0B3D2E" />
      <rect x="19" y="13" width="1" height="3" fill="#0B3D2E" />

      {/* Bottom Tip */}
      <rect x="10" y="19" width="3" height="1" fill="#0B3D2E" />

      {/* Primary Body Fill: Fiery Pink-Red (#FF5C8A) */}
      <rect x="6" y="7" width="12" height="1" fill="#FF5C8A" />
      <rect x="4" y="8" width="15" height="2" fill="#FF5C8A" />
      <rect x="3" y="10" width="17" height="3" fill="#FF5C8A" />
      <rect x="3" y="13" width="16" height="2" fill="#FF5C8A" />
      <rect x="4" y="15" width="14" height="1" fill="#FF5C8A" />
      <rect x="6" y="16" width="10" height="1" fill="#FF5C8A" />
      <rect x="9" y="17" width="4" height="1" fill="#FF5C8A" />

      {/* Deep Shadow Tone (#B0432A) on right lobe */}
      <rect x="17" y="9" width="2" height="4" fill="#B0432A" />
      <rect x="16" y="13" width="2" height="2" fill="#B0432A" />
      <rect x="13" y="15" width="3" height="1" fill="#B0432A" />

      {/* Vibrant Hot Amber Core & Highlight (#FFD93B / #FFF6C2) */}
      <rect x="6" y="9" width="5" height="4" fill="#FFD93B" />
      <rect x="7" y="13" width="4" height="2" fill="#FFD93B" />
      <rect x="7" y="9" width="2" height="2" fill="#FFF6C2" />

      {/* Crease line defining characteristic habanero fold */}
      <rect x="11" y="9" width="1" height="5" fill="#B0432A" />
    </svg>
  );
}

