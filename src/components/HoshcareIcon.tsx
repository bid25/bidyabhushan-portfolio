import Image from "next/image";

interface HoshcareLogoProps {
  width?: number;
  height?: number;
  className?: string;
  rotate?: number;
}

export function HoshcareLogo({
  width = 170,
  height = 42,
  className = "",
  rotate = 0,
}: HoshcareLogoProps) {
  return (
    <Image
      src="/images/hoshcare-logo.png"
      alt="Hoshcare Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      style={{
        display: "block",
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
      }}
      priority
    />
  );
}

// Backward-compatible alias
export const HoshcareIcon = HoshcareLogo;
