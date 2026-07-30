interface PaperTableProps {
  number: string;
  caption: string;
  head: string[];
  rows: string[][];
  source?: string;
}

/**
 * Terminal Session data table: rules top and bottom, hairlines between rows,
 * no cell borders, no radius. Scrolls horizontally on narrow viewports rather
 * than crushing the columns.
 *
 * A server component — no interactivity, so no "use client" needed.
 */
export function PaperTable({
  number,
  caption,
  head,
  rows,
  source,
}: PaperTableProps) {
  return (
    <figure className="my-12">
      <figcaption className="mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-cyan">
          {number}
        </span>
        <span className="mt-1.5 block font-display text-[14px] font-semibold leading-snug text-bone">
          {caption}
        </span>
      </figcaption>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[540px] border-collapse border-y border-bone/60 text-left">
          <thead>
            <tr>
              {head.map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="border-b border-ash/25 py-3.5 pr-5 font-mono text-[10px] font-semibold uppercase tracking-[0.11em] text-bone"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`border-b border-ash/15 py-3.5 pr-5 align-top font-body text-[13.5px] leading-relaxed last:pr-0 ${
                      j === 0 ? "text-bone" : "text-ash"
                    }`}
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
        <p className="mt-3 font-mono text-[10.5px] italic text-ash">{source}</p>
      )}
    </figure>
  );
}

export default PaperTable;
