import Link from "next/link";
import { LazyProfileCard } from "@/components/LazyComponents";
import { InteractiveName } from "@/components/InteractiveName";
import { StackMarquee } from "@/components/StackMarquee";
import { FeaturedProjectsInteractive } from "@/components/FeaturedProjectsInteractive";
import { TrajectoryTimeline } from "@/components/TrajectoryTimeline";
import { LensTeaser } from "@/components/LensTeaser";

const rootStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.bidyabhushan.in/#person",
      name: "Bidya Bhushan Nanda",
      alternateName: [
        // Core B/V First Name Variants
        "Bidya",
        "Vidya",
        "Bidhya",
        "Vidhya",

        // B-Prefix Variants (Bhushan / Bhusan / Bushan / Bhooshan)
        "Bidya Bhushan",
        "Bidya Bhushan Nanda",
        "Bidya Bhusan",
        "Bidya Bhusan Nanda",
        "Bidya Bushan",
        "Bidya Bushan Nanda",
        "Bidya Bhooshan",
        "Bidya Bhooshan Nanda",
        "Bidya Booshan",
        "Bidya Booshan Nanda",

        // V-Prefix Variants (Bhushan / Bhusan / Bushan / Bhooshan)
        "Vidya Bhushan",
        "Vidya Bhushan Nanda",
        "Vidya Bhusan",
        "Vidya Bhusan Nanda",
        "Vidya Bushan",
        "Vidya Bushan Nanda",
        "Vidya Bhooshan",
        "Vidya Bhooshan Nanda",
        "Vidya Booshan",
        "Vidya Booshan Nanda",

        // Bidhya / Vidhya Variants
        "Bidhya Bhushan",
        "Bidhya Bhushan Nanda",
        "Vidhya Bhushan",
        "Vidhya Bhushan Nanda",
        "Bidhya Bhusan",
        "Bidhya Bhusan Nanda",
        "Vidhya Bhusan",
        "Vidhya Bhusan Nanda",

        // Compound Single-Word Variants
        "Bidyabhushan",
        "Bidyabhushan Nanda",
        "Bidyabhusan",
        "Bidyabhusan Nanda",
        "Bidyabushan",
        "Bidyabushan Nanda",
        "Bidyabhooshan",
        "Bidyabhooshan Nanda",
        "Vidyabhushan",
        "Vidyabhushan Nanda",
        "Vidyabhusan",
        "Vidyabhusan Nanda",
        "Vidyabushan",
        "Vidyabushan Nanda",
        "Vidyabhooshan",
        "Vidyabhooshan Nanda",
        "Bidhyabhushan",
        "Bidhyabhushan Nanda",
        "Vidhyabhushan",
        "Vidhyabhushan Nanda",

        // Fully Compressed (No spaces)
        "Bidyabhushannanda",
        "Vidyabhushannanda",
        "Bidyabhusannanda",
        "Vidyabhusannanda",
        "Bidyabushannanda",
        "Vidyabushannanda",

        // First + Last (Skipping middle name)
        "Bidya Nanda",
        "Vidya Nanda",
        "Bidhya Nanda",
        "Vidhya Nanda",

        // Online Monikers, Slugs & Handles
        "bid25",
        "bid 25",
        "bid_25",
        "bidyabhushan25",
        "unfocused.nerd",
        "unfocused nerd",
        "unfocusednerd",
        "unfocused_nerd",
        "bid_notfound",
        "bidnotfound",
      ],
      url: "https://www.bidyabhushan.in",
      image: "https://www.bidyabhushan.in/opengraph-image.jpg",
      jobTitle: [
        "Full-Stack & BSP Engineer",
        "Board Support Package Engineer",
        "Director & Cinematographer",
        "Creator of Broccoli",
      ],
      description:
        "Full-Stack & BSP Engineer with an electronics foundation (MAIT '29). First globally to develop bare-metal Linux bringup for Samsung SM-T295 on Qualcomm ARM64. Director & Cinematographer (unfocused.nerd). Creator of Broccoli (nutrition instrument on Google Play).",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "Maharaja Agrasen Institute of Technology",
      },
      knowsAbout: [
        "Board Support Package (BSP)",
        "Bare-Metal Bringup",
        "ARM64 Linux Kernel",
        "Qualcomm SDM429",
        "S-Boot Reverse Engineering",
        "LK2ND Bootloader",
        "Rust",
        "Tokio",
        "MAVLink v2",
        "PX4 Autopilot",
        "ArduPilot",
        "UAV Ground Control Station",
        "React Native",
        "Expo SDK",
        "TypeScript",
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "SQLite FTS5",
        "Local LLMs",
        "Compound AI",
        "Cinematography",
        "Film Directing",
        "Visual Storytelling",
      ],
      sameAs: [
        "https://github.com/bid25",
        "https://linkedin.com/in/bidya-bhushan-nanda",
        "https://www.instagram.com/unfocused.nerd/",
        "https://www.instagram.com/bid_notfound/",
        "https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.bidyabhushan.in/#website",
      url: "https://www.bidyabhushan.in",
      name: "Bidya Bhushan Nanda | Engineering & Systems Portfolio",
      description:
        "Full-Stack & BSP Engineer. Bare-metal ARM64 bringup, Creator of Broccoli on Google Play, Kestrel UAV Ground Control Station, and Habanero AI.",
      publisher: {
        "@id": "https://www.bidyabhushan.in/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.bidyabhushan.in/#broccoli",
      name: "Broccoli",
      operatingSystem: "Android",
      applicationCategory: "HealthApplication",
      description:
        "Precision caloric and body composition tracker for Android. Shows the margin of error on every calorie, learns what your body really burns, and works with no signal.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        ratingCount: "20",
        bestRating: "5",
        worstRating: "1",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      author: {
        "@id": "https://www.bidyabhushan.in/#person",
      },
      creator: {
        "@id": "https://www.bidyabhushan.in/#person",
      },
      installUrl:
        "https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share",
      url: "https://www.bidyabhushan.in/broccoli",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://www.bidyabhushan.in/#zucchini-linux",
      name: "Zucchini Linux",
      description:
        "Near-mainline Linux 7.1.3 and LineageOS 21 dual-boot bring-up on Qualcomm Snapdragon 429 (Samsung Galaxy Tab A 8.0 SM-T295) with S-Boot bypass.",
      programmingLanguage: "C",
      operatingSystem: "Linux",
      author: {
        "@id": "https://www.bidyabhushan.in/#person",
      },
      url: "https://www.bidyabhushan.in/projects/zucchini-linux",
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": "https://www.bidyabhushan.in/#kestrel",
      name: "Kestrel Ground Control Station",
      description:
        "High-reliability UAV ground control station in Rust and Tauri v2. 50 Hz lock-free telemetry, MAVLink v2 ingestion, and offline PMTiles vector maps.",
      programmingLanguage: "Rust",
      author: {
        "@id": "https://www.bidyabhushan.in/#person",
      },
      url: "https://www.bidyabhushan.in/projects/kestrel",
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.bidyabhushan.in/#habanero",
      name: "Habanero Engine",
      description:
        "100% offline compound AI engine on Apple Silicon Metal with topological DAG scheduler and 8-stage deterministic verification gauntlet.",
      operatingSystem: "macOS",
      applicationCategory: "DeveloperApplication",
      author: {
        "@id": "https://www.bidyabhushan.in/#person",
      },
      url: "https://www.bidyabhushan.in/projects/habanero",
    },
  ],
};

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(rootStructuredData) }}
      />
      {/* ── HERO CONTAINER ──────────────────────────────── */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border">
        <section className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-10 items-center pt-24 sm:pt-32 lg:pt-36 pb-8 sm:pb-14">
          {/* Decorative Zigzag */}
          <svg
            aria-hidden="true"
            width="120"
            height="40"
            viewBox="0 0 120 40"
            className="absolute left-[35%] top-5 sm:top-6 pointer-events-none hidden sm:block"
          >
            <path
              d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
              fill="none"
              stroke="#FF5C8A"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Left Column: Hero Copy (order-2 on mobile so Profile Card sits on top) */}
          <div className="flex flex-col items-start z-10 order-2 lg:order-1">
            <div className="font-hand text-3xl sm:text-4xl text-[#0B3D2E] -rotate-3 inline-block border-b-3 border-dashed border-[#0B3D2E] mb-5">
              hello, world - it's me!
            </div>

            <h1 className="m-0">
              <InteractiveName />
            </h1>

            {/* ── DESKTOP / PC PARAGRAPH (md:block hidden) ────────── */}
            <p className="hidden md:block mt-6 mb-8 text-base lg:text-lg max-w-[640px] border-l-8 border-[#0B3D2E] pl-4 font-mono text-[#0B3D2E] font-medium leading-relaxed">
              Full-Stack &amp; BSP Engineer with an electronics foundation<br />
              (MAIT &apos;29). I build from production apps down to bare<br />
              silicon: creator of Broccoli (calorie tracker available<br />
              on Google Play), developer on HOSHCARE (care coordination<br />
              platform at AB Connectz), and exploring AI/ML engineering.<br />
              First globally to develop bare-metal bringup for the<br />
              SM-T295 tablet series, creating a dual-boot setup<br />
              with Arch Linux and LineageOS on Qualcomm ARM64.
            </p>

            {/* ── MOBILE PARAGRAPH (block md:hidden) ────────────────── */}
            <p className="block md:hidden mt-5 mb-6 text-sm font-mono text-[#0B3D2E] font-medium border-l-4 border-[#0B3D2E] pl-3.5 leading-[1.6] tracking-[-0.015em] w-full text-justify [text-justify:inter-word]">
              Full-Stack &amp; BSP Engineer with an electronics foundation{" "}
              <span className="inline-block">(MAIT&nbsp;&apos;29).</span> I build from production apps down to bare silicon: creator of Broccoli (calorie tracker available on Google Play), developer on HOSHCARE (care coordination platform at AB Connectz), and exploring AI/ML engineering. First globally to develop bare-metal bringup for the <span className="inline-block">SM-T295</span> tablet series, creating a dual-boot setup with Arch Linux and LineageOS on Qualcomm ARM64.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-3.5 w-full">
              <Link
                href="/projects"
                style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
                className="btn inline-flex items-center justify-center min-h-[48px] px-6 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[5px_5px_0_#FF5C8A] sm:shadow-[6px_6px_0_#FF5C8A] w-full sm:w-auto text-center"
              >
                VIEW PROJECTS →
              </Link>
              <div className="grid grid-cols-2 gap-3 w-full sm:flex sm:w-auto sm:gap-3.5">
                <Link
                  href="/contact"
                  style={{ backgroundColor: "#FFF6C2", color: "#0B3D2E" }}
                  className="btn inline-flex items-center justify-center min-h-[48px] px-3 sm:px-6 py-3 font-bold font-mono border-4 border-[#0B3D2E] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] text-center text-xs sm:text-base"
                >
                  GET IN TOUCH
                </Link>
                <a
                  href="/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ backgroundColor: "transparent", color: "#0B3D2E" }}
                  className="btn inline-flex items-center justify-center min-h-[48px] px-3 sm:px-5 py-3 font-bold font-mono border-4 border-[#FF5C8A] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] text-center text-xs sm:text-base hover:bg-[#FFF6C2] transition-colors"
                >
                  RESUME.PDF
                </a>
              </div>
            </div>

            {/* Subtle 1-page ATS role tracks for specialized recruiters */}
            <div className="mt-3 font-mono text-[11px] text-[#0B3D2E]/80 flex items-center gap-2 flex-wrap">
              <span>1-page role tracks:</span>
              <a
                href="/resumes/Bidya_Bhushan_Nanda_BSP_Embedded_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#FF5C8A] font-bold"
              >
                BSP &amp; Embedded (1P)
              </a>
              <span>·</span>
              <a
                href="/resumes/Bidya_Bhushan_Nanda_FullStack_AI_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-[#FF5C8A] font-bold"
              >
                Full-Stack &amp; AI (1P)
              </a>
            </div>
          </div>

          {/* Right Column: Hero Window with Profile Card (order-1 on mobile to sit on top) */}
          <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto mt-4 lg:mt-0 order-1 lg:order-2">
            {/* Sticker */}
            <div className="absolute right-2 sm:right-4 -top-12 sm:-top-13 font-hand text-2xl sm:text-3xl rotate-2 bg-[#FF5C8A] text-[#0B3D2E] border-3 border-[#0B3D2E] px-4 py-1 z-20 shadow-[4px_4px_0_#0B3D2E] pointer-events-none">
              open to opportunities!
            </div>

            {/* Window Container */}
            <div className="border-4 border-[#0B3D2E] bg-[#0B3D2E] shadow-[12px_12px_0_#0B3D2E] relative z-10 overflow-hidden mt-6">
              {/* Header Bar */}
              <div className="flex justify-between items-center bg-[#0B3D2E] text-[#FFD93B] px-3.5 py-2 font-pixel text-[10px] border-b-4 border-[#0B3D2E]">
                <span>PLAYER_01.EXE</span>
                <span>[ _ ][ X ]</span>
              </div>

              {/* Window Body with Profile Card - Edge to Edge */}
              <div className="w-full aspect-square relative overflow-hidden bg-[#07241A]">
                <LazyProfileCard
                  name="Bidya Bhushan Nanda"
                  showDetails={false}
                  handle="bidyabhushannanda"
                  status="Available for work"
                  contactText="Contact Me"
                  avatarUrl="/avatar.webp"
                  iconUrl="/code-pattern.svg"
                  showUserInfo={true}
                  enableTilt={true}
                  enableMobileTilt={false}
                  behindGlowEnabled={false}
                  innerGradient="linear-gradient(145deg, rgba(11, 61, 46, 0.35) 0%, rgba(7, 36, 26, 0.95) 100%)"
                />
              </div>
            </div>

            {/* Floating Triangle */}
            <svg
              aria-hidden="true"
              width="64"
              height="64"
              viewBox="0 0 64 64"
              className="absolute -left-7 -bottom-6 pointer-events-none z-20"
            >
              <polygon
                points="32,4 60,58 4,58"
                fill="#FFF6C2"
                stroke="#0B3D2E"
                strokeWidth="5"
              />
            </svg>
          </div>
        </section>
      </div>

      {/* ── STACK STRIP ─────────────────────────────────── */}
      <StackMarquee />

      {/* ── FEATURED PROJECTS (INTERACTIVE CONSOLE) ────────── */}
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 box-border">
        <FeaturedProjectsInteractive />

        {/* ── TRAJECTORY SECTION ──────────────────────────── */}
        <section className="pt-8 sm:pt-10 pb-12 sm:pb-16">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 mb-6 sm:mb-8">
            <h2 className="m-0 font-pixel text-lg sm:text-2xl bg-[#0B3D2E] text-[#FFD93B] px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-[4px_4px_0_#FF5C8A] sm:shadow-[6px_6px_0_#FF5C8A]">
              TRAJECTORY
            </h2>
            <span className="font-pixel text-[9px] sm:text-[10px] border-2 sm:border-3 border-[#0B3D2E] bg-[#FFF6C2] px-2 sm:px-2.5 py-1.5 sm:py-2 text-[#0B3D2E]">
              SIGNAL PATH
            </span>
            <span className="font-hand text-xl sm:text-3xl -rotate-2 text-[#0B3D2E]">
              interactive sketch box · drag &amp; zoom to explore →
            </span>
          </div>

          <div className="relative">
            {/* Corner Decorative Zigzag */}
            <svg
              aria-hidden="true"
              width="90"
              height="34"
              viewBox="0 0 120 40"
              className="absolute right-6 -top-6 pointer-events-none z-10"
            >
              <path
                d="M4 30 L20 8 L36 30 L52 8 L68 30 L84 8 L100 30 L116 8"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="6"
              />
            </svg>

            {/* Trajectory Interactive Sketch Box */}
            <TrajectoryTimeline />
          </div>
        </section>

        {/* ── LENS SECTION (CODE TO CAMERA) ──────────────── */}
        <LensTeaser />
      </div>
    </div>
  );
}
