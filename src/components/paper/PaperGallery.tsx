import Image from "next/image";

interface GalleryImage {
  src: string;
  label: string; // e.g. "(a) 18 Oct"
  caption: string;
  alt?: string;
}

interface PaperGalleryProps {
  figure: string;
  title: string;
  caption: string;
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  note?: string;
}

export function PaperGallery({
  figure,
  title,
  caption,
  images,
  columns = 3,
  note,
}: PaperGalleryProps) {
  const gridColsClass =
    columns === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      : columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";

  return (
    <figure className="my-8 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-3.5 sm:p-7 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] max-w-full overflow-hidden">
      <figcaption className="mb-6 border-b-2 border-dashed border-[#0B3D2E]/40 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 font-bold">
            EXHIBIT // {figure.toUpperCase()}
          </span>
          <span className="font-pixel text-[9px] text-[#0B3D2E]/60">
            [ HARDWARE RECORD PHOTOGRAPHS ]
          </span>
        </div>
        <span className="block font-mono text-base sm:text-lg font-bold text-[#0B3D2E] leading-snug">
          {title}
        </span>
        <p className="mt-2 mb-0 font-mono text-xs sm:text-[13px] text-[#0B3D2E]/85 leading-relaxed">
          {caption}
        </p>
      </figcaption>

      {/* Grid of hardware screen photographs */}
      <div className={`grid ${gridColsClass} gap-4`}>
        {images.map((img, idx) => (
          <div
            key={idx}
            className="flex flex-col border-2 border-[#0B3D2E] bg-[#041812] shadow-[3px_3px_0_#0B3D2E] overflow-hidden"
          >
            <div className="relative aspect-[3/4] w-full bg-[#041812] flex items-center justify-center p-1">
              <Image
                src={img.src}
                alt={img.alt || `${img.label} - ${img.caption}`}
                width={600}
                height={800}
                className="w-full h-full object-contain"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-2.5 bg-[#FFFDF0] border-t-2 border-[#0B3D2E] flex flex-col justify-between flex-grow">
              <span className="font-pixel text-[9px] text-[#0B3D2E] font-bold block mb-1">
                {img.label}
              </span>
              <p className="m-0 font-mono text-[11px] text-[#0B3D2E]/80 leading-snug">
                {img.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {note && (
        <div className="mt-5 border-2 border-dashed border-[#0B3D2E] bg-[#FFF0B3] p-3 -rotate-[0.5deg]">
          <div className="flex items-start gap-2">
            <span className="font-pixel text-[9px] bg-[#FF5C8A] text-[#0B3D2E] px-1.5 py-0.5 border border-[#0B3D2E] font-bold">
              NOTE
            </span>
            <p className="m-0 font-hand text-lg leading-snug text-[#0B3D2E]">
              {note}
            </p>
          </div>
        </div>
      )}
    </figure>
  );
}

export default PaperGallery;

