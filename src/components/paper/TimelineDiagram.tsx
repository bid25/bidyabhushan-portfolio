interface TimelineDiagramProps {
  figure?: string;
  caption?: string;
}

export function TimelineDiagram({
  figure = "Figure 4",
  caption = "Timeline reconstructed from photographs, 15 October to 9 November 2026.",
}: TimelineDiagramProps) {
  const events = [
    {
      date: "15 OCT",
      title: "Layout Rejected",
      desc: "Secure check fails on boot.img (AVB offset 0x57000 zeroed).",
      status: "FAIL",
      statusColor: "bg-[#FF5C8A] text-[#0B3D2E]",
    },
    {
      date: "17 OCT",
      title: "Custom Image Accepted",
      desc: "Preserved 0-512 KiB prefix; S-Boot boots orange state warning.",
      status: "PASS",
      statusColor: "bg-[#FFD93B] text-[#0B3D2E]",
    },
    {
      date: "18 OCT",
      title: "lk2nd Fastboot Reached",
      desc: "Fastboot getvar reports JD9367 panel ID; keys hooked.",
      status: "BOOT",
      statusColor: "bg-[#A7F3D0] text-[#0B3D2E]",
    },
    {
      date: "21 OCT",
      title: "Arch + XFCE Up",
      desc: "First graphical desktop on Linux 7.1.3 (llvmpipe software raster).",
      status: "DESKTOP",
      statusColor: "bg-[#A7F3D0] text-[#0B3D2E]",
    },
    {
      date: "23 OCT",
      title: "vbmeta Iteration",
      desc: "Download Mode secure check tests; device ID verified.",
      status: "CHECK",
      statusColor: "bg-[#FFD93B] text-[#0B3D2E]",
    },
    {
      date: "24 OCT",
      title: "LineageOS 21 First Run",
      desc: "eMMC enumerates as mmcblk1; initramfs root device mismatch.",
      status: "DEBUG",
      statusColor: "bg-[#FF5C8A] text-[#0B3D2E]",
    },
    {
      date: "25 OCT",
      title: "Storage Mounted",
      desc: "p69 ext4 mounted; dual-boot selector menu operational.",
      status: "STORAGE",
      statusColor: "bg-[#A7F3D0] text-[#0B3D2E]",
    },
    {
      date: "26 OCT",
      title: "Peripherals & Notices",
      desc: "XFCE panel crash debugged; Android notification shade boots.",
      status: "TUNE",
      statusColor: "bg-[#FFD93B] text-[#0B3D2E]",
    },
    {
      date: "09 NOV",
      title: "Dual-Boot Validated",
      desc: "Final menu with hardware telemetry; Arch Linux & LineageOS 21 live.",
      status: "SUCCESS",
      statusColor: "bg-[#0B3D2E] text-[#FFD93B]",
    },
  ];

  return (
    <figure className="my-8 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-3.5 sm:p-7 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] max-w-full overflow-hidden">
      <figcaption className="mb-6 border-b-2 border-dashed border-[#0B3D2E]/40 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 font-bold">
            EXHIBIT // {figure.toUpperCase()}
          </span>
          <span className="font-pixel text-[9px] text-[#0B3D2E]/60">
            [ EMPIRICAL BRING-UP LOG ]
          </span>
        </div>
        <span className="block font-mono text-base font-bold text-[#0B3D2E]">
          Chronological Development Sequence (15 Oct - 9 Nov 2026)
        </span>
        <p className="mt-1 mb-0 font-mono text-xs text-[#0B3D2E]/80">
          {caption}
        </p>
      </figcaption>

      <div className="relative pl-6 sm:pl-8 border-l-4 border-[#0B3D2E] space-y-5 font-mono text-xs my-4">
        {events.map((ev, i) => (
          <div key={i} className="relative group">
            {/* Node marker on timeline */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-none bg-[#FFFDF0] border-3 border-[#0B3D2E] group-hover:bg-[#FF5C8A] transition-colors" />

            <div className="border-2 border-[#0B3D2E] bg-[#FFFDF0] p-3 shadow-[2px_2px_0_#0B3D2E]">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#0B3D2E]/20 pb-1 mb-1">
                <span className="font-pixel text-[10px] text-[#0B3D2E]">
                  {ev.date}
                </span>
                <span
                  className={`font-pixel text-[8px] px-1.5 py-0.5 border border-[#0B3D2E] font-bold ${ev.statusColor}`}
                >
                  {ev.status}
                </span>
              </div>
              <div className="font-bold text-[#0B3D2E] text-xs sm:text-sm">
                {ev.title}
              </div>
              <div className="text-[11px] text-[#0B3D2E]/80 mt-0.5 leading-snug">
                {ev.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}

export default TimelineDiagram;

