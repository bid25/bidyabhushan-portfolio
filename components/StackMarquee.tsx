export function StackMarquee() {
  const items = "REACT NATIVE ★ NODE ★ NESTJS ★ PRISMA ★ POSTGRESQL ★ REDIS ★ GEMINI API ★ THREE.JS";

  return (
    <div className="w-full bg-[#0B3D2E] text-[#FFD93B] border-t-4 border-b-4 border-[#0B3D2E] py-4 px-8 font-pixel text-xs leading-loose overflow-hidden whitespace-nowrap select-none">
      <div className="mq flex">
        <span className="pr-12">{items}</span>
        <span className="pr-12">{items}</span>
        <span className="pr-12">{items}</span>
        <span className="pr-12">{items}</span>
      </div>
    </div>
  );
}

