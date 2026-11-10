interface PixelDroneGcsProps {
  width?: number;
  height?: number;
  rotate?: number;
  className?: string;
}

export function PixelDroneGcs({
  width = 160,
  height = 90,
  rotate = 0,
  className = "",
}: PixelDroneGcsProps) {
  return (
    <svg
      role="img"
      aria-label="Pixel art drone ground station"
      viewBox="0 0 32 18"
      width={width}
      height={height}
      className={className}
      style={{
        shapeRendering: "crispEdges",
        transform: `rotate(${rotate}deg)`,
      }}
    >
      {/* Outer Outlines (#0B3D2E) */}
      {/* Propellers Left Rotor */}
      <rect x="1" y="2" width="7" height="1" fill="#FF5C8A" />
      <rect x="0" y="3" width="9" height="1" fill="#0B3D2E" />
      <rect x="3" y="1" width="3" height="1" fill="#0B3D2E" />
      <rect x="4" y="4" width="1" height="2" fill="#0B3D2E" />

      {/* Propellers Right Rotor */}
      <rect x="24" y="2" width="7" height="1" fill="#FF5C8A" />
      <rect x="23" y="3" width="9" height="1" fill="#0B3D2E" />
      <rect x="26" y="1" width="3" height="1" fill="#0B3D2E" />
      <rect x="27" y="4" width="1" height="2" fill="#0B3D2E" />

      {/* Diagonal Arms */}
      <rect x="5" y="5" width="4" height="2" fill="#0B3D2E" />
      <rect x="8" y="7" width="4" height="2" fill="#0B3D2E" />
      <rect x="23" y="5" width="4" height="2" fill="#0B3D2E" />
      <rect x="20" y="7" width="4" height="2" fill="#0B3D2E" />

      {/* Arm Fills (Subtle Green) */}
      <rect x="6" y="5" width="2" height="1" fill="#2F9E5E" />
      <rect x="9" y="7" width="2" height="1" fill="#2F9E5E" />
      <rect x="24" y="5" width="2" height="1" fill="#2F9E5E" />
      <rect x="21" y="7" width="2" height="1" fill="#2F9E5E" />

      {/* Main Avionics Fuselage Outer Box */}
      <rect x="11" y="6" width="10" height="7" fill="#0B3D2E" />

      {/* Central Canopy / Body Fill */}
      <rect x="12" y="7" width="8" height="5" fill="#FFF0B3" />

      {/* Antenna Mast */}
      <rect x="15" y="3" width="2" height="3" fill="#0B3D2E" />
      <rect x="15" y="2" width="2" height="1" fill="#FF5C8A" />
      {/* Telemetry Radio Wave Pixels */}
      <rect x="13" y="1" width="1" height="1" fill="#FFD93B" />
      <rect x="18" y="1" width="1" height="1" fill="#FFD93B" />

      {/* Avionics Eye / Sensor Lens */}
      <rect x="13" y="8" width="6" height="3" fill="#06231A" />
      <rect x="14" y="9" width="4" height="1" fill="#FFD93B" />
      <rect x="15" y="9" width="2" height="1" fill="#FF5C8A" />

      {/* Status LED */}
      <rect x="13" y="12" width="2" height="1" fill="#2F9E5E" />
      <rect x="17" y="12" width="2" height="1" fill="#FF5C8A" />

      {/* Bottom Landing Skids */}
      <rect x="10" y="13" width="2" height="2" fill="#0B3D2E" />
      <rect x="20" y="13" width="2" height="2" fill="#0B3D2E" />
      <rect x="8" y="15" width="5" height="1" fill="#0B3D2E" />
      <rect x="19" y="15" width="5" height="1" fill="#0B3D2E" />
      <rect x="9" y="16" width="3" height="1" fill="#FFD93B" />
      <rect x="20" y="16" width="3" height="1" fill="#FFD93B" />
    </svg>
  );
}

