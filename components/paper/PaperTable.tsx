interface PaperTableProps {
  number: string;
  caption: string;
  head: string[];
  rows: string[][];
  source?: string;
}

/**
 * Neo-Brutalist Research Ledger Table Artifact.
 */
export function PaperTable({
  number,
  caption,
  head,
  rows,
  source,
}: PaperTableProps) {
  return (
    <figure className="my-10 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-5 sm:p-7 shadow-[8px_8px_0_#0B3D2E]">
      <figcaption className="mb-4 border-b-2 border-dashed border-[#0B3D2E]/40 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-3 py-1 font-bold">
            {number.toUpperCase()}
          </span>
          <span className="font-pixel text-[9px] text-[#0B3D2E]/60">
            [ DATA MATRIX ]
          </span>
        </div>
        <span className="block font-mono text-base font-bold text-[#0B3D2E]">
          {caption}
        </span>
      </figcaption>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[540px] border-collapse border-3 border-[#0B3D2E] text-left font-mono">
          <thead>
            <tr className="bg-[#0B3D2E] text-[#FFD93B]">
              {head.map((h, idx) => (
                <th
                  key={h}
                  scope="col"
                  className={`py-3 px-4 font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-[#FFD93B] ${
                    idx < head.length - 1 ? "border-r-2 border-[#FFD93B]/30" : ""
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={i % 2 === 0 ? "bg-[#FFFDF0]" : "bg-[#FFF6C2]"}
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`border-t-2 border-[#0B3D2E]/20 py-3.5 px-4 align-top text-xs sm:text-[13px] leading-relaxed text-[#0B3D2E] ${
                      j === 0 ? "font-bold bg-[#0B3D2E]/5" : ""
                    } ${j < row.length - 1 ? "border-r-2 border-[#0B3D2E]/20" : ""}`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {source && (
        <p className="mt-4 mb-0 font-hand text-lg text-[#0B3D2E]/80">
          * {source}
        </p>
      )}
    </figure>
  );
}

export default PaperTable;
