import Image from "next/image";

interface PixelBroccoliProps {
  width?: number;
  height?: number;
  className?: string;
}

export function PixelBroccoli({
  width = 170,
  height = 170,
  className = "",
}: PixelBroccoliProps) {
  return (
    <Image
      src="/images/broccoli-icon-dark.png"
      alt="Official Broccoli App Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      style={{ display: "block" }}
      priority
    />
  );
}
