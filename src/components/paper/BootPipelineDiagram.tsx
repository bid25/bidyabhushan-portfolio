interface BootPipelineDiagramProps {
  figure?: string;
  caption?: string;
}

export function BootPipelineDiagram({
  figure = "Figure 1",
  caption = "Boot pipeline. Tomato: never written. Yellow: lk2nd. Green and cream: the two operating systems.",
}: BootPipelineDiagramProps) {
  return (
    <figure className="my-8 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-3.5 sm:p-7 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] max-w-full overflow-hidden">
      <figcaption className="mb-6 border-b-2 border-dashed border-[#0B3D2E]/40 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 font-bold">
            EXHIBIT // {figure.toUpperCase()}
          </span>
          <span className="font-pixel text-[9px] text-[#0B3D2E]/60">
            [ ARCHITECTURAL FLOWCHART ]
          </span>
        </div>
        <span className="block font-mono text-base font-bold text-[#0B3D2E]">
          System Boot Pipeline &amp; Execution Handoff
        </span>
        <p className="mt-1 mb-0 font-mono text-xs text-[#0B3D2E]/80">
          {caption}
        </p>
      </figcaption>

      <div className="flex flex-col items-center max-w-2xl mx-auto space-y-3 font-mono text-xs">
        {/* Tier 1: Qualcomm Primary Bootloader */}
        <div className="w-full border-2 border-[#0B3D2E] bg-[#FFFDF0] p-3 shadow-[2px_2px_0_#0B3D2E] text-center">
          <div className="font-bold text-[#0B3D2E]">
            Qualcomm PBL → SBL1 → TrustZone / RPM
          </div>
          <div className="text-[11px] text-[#0B3D2E]/70 mt-0.5">
            Silicon and vendor firmware (unmodified)
          </div>
        </div>

        {/* Down Arrow */}
        <div className="font-mono text-sm font-bold text-[#0B3D2E]">↓</div>

        {/* Tier 2: Samsung S-Boot */}
        <div className="w-full border-3 border-[#0B3D2E] bg-[#FF5C8A]/25 p-3.5 shadow-[3px_3px_0_#0B3D2E]">
          <div className="flex items-center justify-between gap-2 border-b border-[#0B3D2E]/30 pb-1 mb-1">
            <span className="font-bold text-[#0B3D2E]">
              Samsung S-Boot (aboot, p16): NEVER WRITTEN
            </span>
            <span className="font-pixel text-[8px] bg-[#FF5C8A] text-[#0B3D2E] px-1.5 py-0.5 font-bold">
              FACTORY UNTOUCHED
            </span>
          </div>
          <p className="m-0 text-[11px] text-[#0B3D2E]/90 leading-relaxed">
            Download Mode host; reads boot slot p58; exact PMIC selector match (<code className="bg-[#FFFDF0] px-1">0x10016 0x25 0 0</code>) ⇒ <code className="bg-[#FFFDF0] px-1 font-bold">dtbo_needed = false</code> (vendor DTBO skipped).
          </p>
        </div>

        {/* Down Arrow */}
        <div className="font-mono text-sm font-bold text-[#0B3D2E]">↓</div>

        {/* Tier 3: lk2nd Second-Stage Bootloader */}
        <div className="w-full border-3 border-[#0B3D2E] bg-[#FFD93B] p-3.5 shadow-[4px_4px_0_#0B3D2E]">
          <div className="flex items-center justify-between gap-2 border-b border-[#0B3D2E]/30 pb-1 mb-1">
            <span className="font-bold text-[#0B3D2E]">
              lk2nd (boot slot, p58; AOSP header v0, ARM32)
            </span>
            <span className="font-pixel text-[8px] bg-[#0B3D2E] text-[#FFD93B] px-1.5 py-0.5 font-bold">
              SECOND STAGE
            </span>
          </div>
          <p className="m-0 text-[11px] text-[#0B3D2E] leading-relaxed">
            Menu on JD9367 panel; Vol Up (TLMM 91), Vol Down &amp; Power (PMIC PON); Fastboot, EDL, Recovery, OS Selection.
          </p>
        </div>

        {/* Split Indicators */}
        <div className="w-full flex justify-around text-sm font-bold text-[#0B3D2E] pt-1">
          <span>↙ (Option A)</span>
          <span>(Option B) ↘</span>
        </div>

        {/* Tier 4: Dual OS Targets */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Target A: Arch Linux ARM */}
          <div className="border-3 border-[#0B3D2E] bg-[#A7F3D0] p-3.5 shadow-[3px_3px_0_#0B3D2E]">
            <div className="font-pixel text-[10px] text-[#0B3D2E] border-b border-[#0B3D2E]/30 pb-1 mb-2 font-bold">
              LINUX 7.1.3 (ARCH ARM64)
            </div>
            <ul className="m-0 pl-4 space-y-1 text-[11px] text-[#0B3D2E]/90 list-disc">
              <li>Image.gz + sdm429-samsung-gto.dtb</li>
              <li>initramfs mounts p69 (arch_root)</li>
              <li>switch_root → Arch Linux ARM</li>
              <li>XFCE 4.20 Desktop (llvmpipe)</li>
            </ul>
          </div>

          {/* Target B: LineageOS 21 */}
          <div className="border-3 border-[#0B3D2E] bg-[#FFFDF0] p-3.5 shadow-[3px_3px_0_#0B3D2E]">
            <div className="font-pixel text-[10px] text-[#0B3D2E] border-b border-[#0B3D2E]/30 pb-1 mb-2 font-bold">
              LINEAGEOS 21 (ANDROID 14)
            </div>
            <ul className="m-0 pl-4 space-y-1 text-[11px] text-[#0B3D2E]/90 list-disc">
              <li>Writes cookie 0x77665502 to IMEM</li>
              <li>Issues warm reset via PMIC</li>
              <li>S-Boot cold-boots recovery slot (p57)</li>
              <li>Android 14 userland boots cleanly</li>
            </ul>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default BootPipelineDiagram;

