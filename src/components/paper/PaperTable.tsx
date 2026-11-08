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
    <figure className="my-8 sm:my-14 border-3 border-[#0B3D2E] bg-[#FFF8D6] p-3.5 sm:p-7 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[8px_8px_0_#0B3D2E] max-w-full overflow-hidden">
      <figcaption className="mb-4 border-b-2 border-dashed border-[#0B3D2E]/40 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2.5 sm:px-3 py-1 font-bold">
            {number.toUpperCase()}
          </span>
          <span className="font-pixel text-[8px] sm:text-[9px] text-[#0B3D2E]/60">
            [ DATA MATRIX ]
          </span>
        </div>
        <span className="block font-mono text-sm sm:text-base font-bold text-[#0B3D2E] break-words">
          {caption}
        </span>
      </figcaption>

      <div className="w-full overflow-x-auto max-w-full pb-1">
        <table className="w-full min-w-[460px] sm:min-w-[540px] border-collapse border-3 border-[#0B3D2E] text-left font-mono text-xs sm:text-sm">
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
