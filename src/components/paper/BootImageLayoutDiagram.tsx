interface BootImageLayoutDiagramProps {
  figure?: string;
  caption?: string;
}

export function BootImageLayoutDiagram({
  figure = "Figure 2",
  caption = "Layout of the 64 MiB boot-slot image. The internal descriptor at 0x57000 is the one an early build zeroed.",
}: BootImageLayoutDiagramProps) {
  return (
    <figure className="my-8 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-3.5 sm:p-7 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] max-w-full overflow-hidden">
      <figcaption className="mb-6 border-b-2 border-dashed border-[#0B3D2E]/40 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 font-bold">
            EXHIBIT // {figure.toUpperCase()}
          </span>
          <span className="font-pixel text-[9px] text-[#0B3D2E]/60">
            [ BINARY IMAGE MAP ]
          </span>
        </div>
        <span className="block font-mono text-base font-bold text-[#0B3D2E]">
          64 MiB Boot-Slot Layout (Partition p58)
        </span>
        <p className="mt-1 mb-0 font-mono text-xs text-[#0B3D2E]/80">
          {caption}
        </p>
      </figcaption>

      <div className="max-w-xl mx-auto font-mono text-xs border-3 border-[#0B3D2E] bg-[#041812] p-4 shadow-[4px_4px_0_#0B3D2E] text-[#FFFDF0] space-y-2">
        {/* Section 0: 0x000000 */}
        <div className="border border-[#FFD93B] bg-[#06231A] p-2.5">
          <div className="flex justify-between items-center text-[10px] text-[#FFD93B] border-b border-[#0B3D2E] pb-1 mb-1 font-bold">
            <span>0x000000</span>
            <span>lk2nd.img: AOSP boot header v0, ARM32 payload</span>
          </div>
          <div className="text-[11px] text-[#A7F3D0] space-y-0.5">
            <div>• SEANDROIDENFORCE trailer (16 B)</div>
            <div>• SignerVer02 structural header (512 B)</div>
          </div>
        </div>

        {/* Section 1: 0x057000 AVB Hash Descriptor (Critical) */}
        <div className="border-2 border-[#FF5C8A] bg-[#FF5C8A]/20 p-2.5">
          <div className="flex justify-between items-center text-[10px] text-[#FF5C8A] font-bold border-b border-[#FF5C8A]/40 pb-1 mb-1">
            <span>0x057000 (356,352 B)</span>
            <span>INTERNAL AVB HASH DESCRIPTOR (CRITICAL)</span>
          </div>
          <p className="m-0 text-[11px] text-[#FFFDF0] leading-relaxed">
            Must be preserved verbatim. Early assembly scripts zeroed the 0–512 KiB padding, causing S-Boot to abort with <code className="bg-[#0B3D2E] text-[#FF5C8A] px-1 font-bold">SECURE CHECK FAIL : boot.img</code>.
          </p>
        </div>

        {/* Section 2: Zero padding up to 512 KiB */}
        <div className="border border-dashed border-[#0B3D2E] bg-[#0B3D2E]/40 p-1.5 text-center text-[10px] text-[#A7F3D0]/70">
          Zero padding up to the 512 KiB boundary (0x080000)
        </div>

        {/* Section 3: 0x080000 Stage 2 */}
        <div className="border border-[#A7F3D0] bg-[#06231A] p-2.5">
          <div className="flex justify-between items-center text-[10px] text-[#A7F3D0] border-b border-[#0B3D2E] pb-1 mb-1 font-bold">
            <span>0x080000 (512 KiB)</span>
            <span>STAGE-2 LINUX IMAGE (AOSP header v2, 64-bit)</span>
          </div>
          <div className="text-[11px] text-[#FFFDF0]">
            Contains mainline Linux 7.1.3 Image.gz + SDM429 device tree blob + initramfs.
          </div>
        </div>

        {/* Section 4: Unused Partition Space */}
        <div className="border border-dashed border-[#0B3D2E] bg-[#0B3D2E]/20 p-2 text-center text-[10px] text-[#FFFDF0]/50">
          Unused partition storage (~62.5 MiB)
        </div>

        {/* Section 5: AVB Footer at partition boundary */}
        <div className="border border-[#34D399] bg-[#06231A] p-2.5">
          <div className="flex justify-between items-center text-[10px] text-[#34D399] border-b border-[#0B3D2E] pb-1 mb-1 font-bold">
            <span>64 MiB − 64 B</span>
            <span>AVB v1.0 FOOTER (&ldquo;AVBf&rdquo;)</span>
          </div>
          <p className="m-0 text-[10px] text-[#A7F3D0] leading-tight">
            Partition size: 67,108,864 bytes. S-Boot inspects footer structure; constructed with null algorithm to satisfy parser without Samsung keys.
          </p>
        </div>
      </div>
    </figure>
  );
}

export default BootImageLayoutDiagram;

