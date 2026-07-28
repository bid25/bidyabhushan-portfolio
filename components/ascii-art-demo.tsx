"use client";
import { AsciiArt } from "@/components/ui/ascii-art";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useMediaQuery, IS_MOBILE } from "@/hooks/useMediaQuery";

export default function AsciiArtDemo() {
  const { resolvedTheme } = useTheme();
  const isMobile = useMediaQuery(IS_MOBILE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="mx-auto aspect-[4/3] w-full max-w-[1070px] bg-bone dark:bg-void" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <AsciiArt
      src="/ascii-art.webp"
      resolution={isMobile ? 120 : 280}
      colored={true}
      artAspectRatio={4/3}
      animated={false}
      inverted={!isDark}
      backgroundColor={isDark ? "var(--color-void)" : "var(--color-bone)"}
      className="mx-auto aspect-[4/3] w-full max-w-[1070px] bg-bone dark:bg-void brightness-150"
    />
  );
}
