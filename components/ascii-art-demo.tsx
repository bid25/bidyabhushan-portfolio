"use client";
import { AsciiArt } from "@/components/ui/ascii-art";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AsciiArtDemo() {
  const { resolvedTheme } = useTheme();
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
      src="/ascii-art.jpg"
      resolution={260}
      colored={true}
      artAspectRatio={4/3}
      animationStyle="fade"
      animationDuration={1.5}
      animateOnView={false}
      inverted={!isDark}
      className="mx-auto aspect-[4/3] w-full max-w-[1070px] bg-bone dark:bg-void"
    />
  );
}
