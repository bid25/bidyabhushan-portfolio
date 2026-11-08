export function StackMarquee() {
  const items =
    "REACT NATIVE ★ TYPESCRIPT ★ NODE.JS ★ NESTJS ★ POSTGRESQL ★ SQLITE FTS5 ★ PRISMA ★ REDIS ★ GEMINI API ★ THREE.JS ★ REACT SKIA ★ NEXT.JS ★ ARM64 LINUX KERNEL ★ BARE-METAL BRINGUP ★ QUALCOMM EDL ★ INITRAMFS ★ EMBEDDED C++ ★ PYTHON ★ DOCKER ★ SUPABASE RLS ★";

  return (
    <div className="w-full bg-[#0B3D2E] text-[#FFD93B] border-t-4 border-b-4 border-[#0B3D2E] py-4 px-8 font-pixel text-xs leading-loose overflow-hidden whitespace-nowrap select-none">
      <div className="mq flex" style={{ animationDuration: "50s" }}>
        <span className="pr-12">{items}</span>
        <span className="pr-12">{items}</span>
        <span className="pr-12">{items}</span>
        <span className="pr-12">{items}</span>
      </div>
    </div>
  );
}

