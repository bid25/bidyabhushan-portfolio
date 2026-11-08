"use client";

import { useState } from "react";

const CHANNELS = [
  {
    id: "email",
    label: "EMAIL → bidyabhushannanda@gmail.com",
    href: "mailto:bidyabhushannanda@gmail.com",
    channelClass: "contact-email",
    color: "#EA4335",
    external: false,
  },
  {
    id: "github",
    label: "GITHUB → github.com/bid25",
    href: "https://github.com/bid25",
    channelClass: "contact-github",
    color: "#181717",
    external: true,
  },
  {
    id: "linkedin",
    label: "LINKEDIN → bidya-bhushan-nanda",
    href: "https://linkedin.com/in/bidya-bhushan-nanda",
    channelClass: "contact-linkedin",
    color: "#0A66C2",
    external: true,
  },
  {
    id: "instagram",
    label: "INSTAGRAM → @bid_notfound",
    href: "https://www.instagram.com/bid_notfound/",
    channelClass: "contact-instagram",
    color: "#E1306C",
    external: true,
  },
  {
    id: "resume",
    label: "RESUME → View / Download PDF",
    href: "/Resume.pdf",
    channelClass: "contact-resume",
    color: "#E5252A",
    external: true,
  },
];

export default function ContactPage() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      alert("Please fill in all fields.");
      return;
    }
    // Create mailto link with encoded parameters
    const subject = encodeURIComponent(
      `Portfolio Inquiry from ${formState.name}`
    );
    const body = encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\nMessage:\n${formState.message}`
    );
    window.location.href = `mailto:bidyabhushannanda@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border pb-20 font-mono text-[#0B3D2E]">
      {/* Header */}
      <div className="relative pt-16 pb-6">
        {/* Decorative Zigzag */}
        <svg
          aria-hidden="true"
          width="120"
          height="40"
          viewBox="0 0 120 40"
          className="absolute right-[10%] top-14 pointer-events-none hidden sm:block"
        >
          <path
            d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
            fill="none"
            stroke="#FF5C8A"
            strokeWidth="6"
          />
        </svg>

        {/* Decorative Dot Matrix */}
        <svg
          aria-hidden="true"
          width="80"
          height="80"
          viewBox="0 0 80 80"
          className="absolute right-[2%] top-24 pointer-events-none hidden sm:block"
        >
          <g fill="#0B3D2E">
            <circle cx="10" cy="10" r="6" />
            <circle cx="40" cy="10" r="6" />
            <circle cx="70" cy="10" r="6" />
            <circle cx="10" cy="40" r="6" />
            <circle cx="40" cy="40" r="6" />
            <circle cx="70" cy="40" r="6" />
          </g>
        </svg>

        <h1 className="gl m-0 font-pixel text-2xl sm:text-3xl leading-snug bg-[#FFF6C2] border-4 border-[#0B3D2E] px-4 py-3 shadow-[6px_6px_0_#0B3D2E] inline-block text-[#0B3D2E]">
          CONTACT
        </h1>
        <p className="mt-6 mb-0 text-base sm:text-lg max-w-[620px] border-l-8 border-[#0B3D2E] pl-4 text-[#0B3D2E] font-medium leading-relaxed">
          Got a project, an internship, or want to collaborate? Drop a line.
        </p>
      </div>

      {/* Grid: Form & Channels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-9 pt-10 items-start">
        {/* Left Column: Contact Form */}
        <div className="pop border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF6C2] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[10px_10px_0_#0B3D2E] p-4 sm:p-7 flex flex-col gap-5">
          {sent ? (
            <div className="bg-[#0B3D2E] text-[#FFD93B] p-6 border-3 border-[#0B3D2E] text-center font-mono">
              <div className="font-pixel text-sm text-[#FF5C8A] mb-2">
                TRANSMISSION READY [OK]
              </div>
              <p className="text-sm">
                Your email client was opened. If it didn't open automatically, write directly to:
              </p>
              <a
                href="mailto:bidyabhushannanda@gmail.com"
                className="underline font-bold text-base text-[#FFD93B] block mt-2"
              >
                bidyabhushannanda@gmail.com
              </a>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="btn mt-4 inline-block font-pixel text-xs bg-[#FFD93B] text-[#0B3D2E] px-4 py-2 border-2 border-[#0B3D2E]"
              >
                SEND ANOTHER
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="font-pixel text-[11px] block mb-2 text-[#0B3D2E]"
                >
                  NAME
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full min-h-[48px] px-3.5 py-2.5 border-4 border-[#0B3D2E] bg-[#FFF6C2] text-[#0B3D2E] placeholder:text-[#0B3D2E]/50 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="font-pixel text-[11px] block mb-2 text-[#0B3D2E]"
                >
                  EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="your.email@domain.com"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full min-h-[48px] px-3.5 py-2.5 border-4 border-[#0B3D2E] bg-[#FFF6C2] text-[#0B3D2E] placeholder:text-[#0B3D2E]/50 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="font-pixel text-[11px] block mb-2 text-[#0B3D2E]"
                >
                  MESSAGE
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  placeholder="What are we building?"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 border-4 border-[#0B3D2E] bg-[#FFF6C2] text-[#0B3D2E] placeholder:text-[#0B3D2E]/50 font-bold focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="btn min-h-[48px] px-5 py-3 bg-[#0B3D2E] text-[#FFD93B] font-mono font-bold text-base border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A] cursor-pointer mt-2 text-center"
              >
                SEND MESSAGE →
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Status & Direct Channels */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0B3D2E] text-[#FFD93B] border-4 border-[#0B3D2E] shadow-[6px_6px_0_#FF5C8A] p-4 font-pixel text-xs leading-loose flex items-center gap-2">
            <span className="bl text-[#FF5C8A]">●</span> OPEN TO OPPORTUNITIES
          </div>

          <span className="font-hand text-3xl -rotate-3 text-[#0B3D2E]">
            say hi, i reply fast!
          </span>

          <div className="flex flex-col gap-3 font-bold font-mono">
            {CHANNELS.map((ch) => {
              const isSelected = selectedChannel === ch.id;
              return (
                <a
                  key={ch.id}
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  onClick={() => setSelectedChannel(ch.id)}
                  data-selected={isSelected ? "true" : undefined}
                  className={`contact-channel ${ch.channelClass} group flex items-center justify-between gap-2 border-3 sm:border-4 border-[#0B3D2E] bg-[#FFF6C2] px-3.5 sm:px-4 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[48px] text-[#0B3D2E] shadow-[3px_3px_0_#0B3D2E] sm:shadow-[4px_4px_0_#0B3D2E] cursor-pointer outline-none text-xs sm:text-sm`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: ch.color,
                          color: "#FFF6C2",
                        }
                      : undefined
                  }
                >
                  <span
                    style={isSelected ? { color: "#FFF6C2" } : undefined}
                    className="transition-colors truncate"
                  >
                    {ch.label}
                  </span>
                  <span
                    style={isSelected ? { color: "#FFF6C2" } : undefined}
                    className="font-pixel text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0"
                  >
                    ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
