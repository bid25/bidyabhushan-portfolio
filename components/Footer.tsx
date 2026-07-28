export function Footer() {
  return (
    <footer className="w-full border-t border-ash/10 py-6 px-4 sm:px-8 lg:px-16 text-[10px] sm:text-xs font-mono text-ash/60 flex flex-col sm:flex-row justify-between items-center gap-4 z-10 relative">
      <div className="text-center sm:text-left tracking-wider">
        © {new Date().getFullYear()} BIDYA BHUSHAN NANDA. Built with Next.js, Tailwind, & Three.js.
      </div>
      <div className="text-center sm:text-right tracking-wider">
        New Delhi, India · Open to opportunities
      </div>
    </footer>
  );
}
