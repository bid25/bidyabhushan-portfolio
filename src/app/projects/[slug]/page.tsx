import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HoshcareClientCaseStudy } from "@/components/case-studies/HoshcareClientCaseStudy";
import { HoshcareApiCaseStudy } from "@/components/case-studies/HoshcareApiCaseStudy";
import { BroccoliCaseStudy } from "@/components/case-studies/BroccoliCaseStudy";
import { ZucchiniLinuxCaseStudy } from "@/components/case-studies/ZucchiniLinuxCaseStudy";
import { DroneGcsCaseStudy } from "@/components/case-studies/DroneGcsCaseStudy";
import { HabaneroCaseStudy } from "@/components/case-studies/HabaneroCaseStudy";

// Project metadata catalog (6 active/featured projects + backward-compatible aliases)
const projectCatalog: Record<
  string,
  {
    title: string;
    status: string;
    stack: string[];
    description: string;
    prev?: { slug: string; title: string };
    next?: { slug: string; title: string };
  }
> = {
  broccoli: {
    title: "Broccoli - Caloric & Composition Instrument",
    status: "Live on Play Store",
    stack: ["React Native", "Reanimated 3", "SQLite", "Expo EAS"],
    description:
      "Precision caloric and body composition tracker. Built, shipped and live on Google Play worldwide.",
    prev: { slug: "habanero", title: "HABANERO" },
    next: { slug: "zucchini-linux", title: "ZUCCHINI-LINUX" },
  },
  "zucchini-linux": {
    title: "Zucchini-Linux - Bare Metal SM-T295 Bring-Up",
    status: "Active, hardware",
    stack: ["ARM64", "Arch Linux", "LineageOS", "Qualcomm EDL"],
    description:
      "Samsung Galaxy Tab A 8.0 reverse engineered for bare metal dual-booting of Arch Linux and LineageOS.",
    prev: { slug: "broccoli", title: "BROCCOLI" },
    next: { slug: "kestrel", title: "KESTREL" },
  },
  kestrel: {
    title: "Kestrel - UAV Flight Control",
    status: "Under development, flight systems",
    stack: ["Rust", "Tokio", "Tauri v2", "MAVLink v2", "Svelte 5", "WebRTC"],
    description:
      "Cross-platform Ground Control Station in Rust and Tauri v2. 50 Hz lock-free telemetry, 4-tier process topology, <220 MB RAM footprint, and offline vector maps.",
    prev: { slug: "zucchini-linux", title: "ZUCCHINI-LINUX" },
    next: { slug: "habanero", title: "HABANERO" },
  },
  "custom-drone-gcs": {
    title: "Kestrel - UAV Flight Control",
    status: "Under development, flight systems",
    stack: ["Rust", "Tokio", "Tauri v2", "MAVLink v2", "Svelte 5", "WebRTC"],
    description:
      "Cross-platform Ground Control Station in Rust and Tauri v2. 50 Hz lock-free telemetry, 4-tier process topology, <220 MB RAM footprint, and offline vector maps.",
    prev: { slug: "zucchini-linux", title: "ZUCCHINI-LINUX" },
    next: { slug: "habanero", title: "HABANERO" },
  },
  habanero: {
    title: "Habanero - Sovereign AI Engine",
    status: "Under development, sovereign AI",
    stack: ["TypeScript", "C11 Atomics", "Local LLMs", "Metal GPU", "Playwright"],
    description:
      "100% offline, airgapped compound AI work-engineer running locally on Apple Silicon Metal with topological DAG scheduler and G0-G7 hardware verification gauntlet.",
    prev: { slug: "kestrel", title: "KESTREL" },
    next: { slug: "hoshcare-client", title: "HOSHCARE CLIENT" },
  },
  "hoshcare-client": {
    title: "HOSHCARE CLIENT (FRONTEND) - Medical Vault Client",
    status: "Active, pre-pilot",
    stack: ["React Native", "Expo SDK 56", "TypeScript", "React Navigation v7"],
    description:
      "React Native app for medical records: document upload, AI-assisted field extraction, review-before-save. Merged browser prototype & design foundations.",
    prev: { slug: "habanero", title: "HABANERO" },
    next: { slug: "hoshcare-api", title: "HOSHCARE API" },
  },
  "hoshcare-api": {
    title: "HOSHCARE API (BACKEND) - Extraction Pipeline",
    status: "Migrated to NestJS",
    stack: ["Node.js", "Express", "Prisma", "PostgreSQL", "NestJS"],
    description:
      "Node/Express/Prisma backend: auth, uploads, an extraction pipeline with retry and record locking. Superseded by NestJS in July 2026.",
    prev: { slug: "hoshcare-client", title: "HOSHCARE CLIENT" },
    next: { slug: "broccoli", title: "BROCCOLI" },
  },
  // Aliases for historical / merged routes
  "hoshcare-mobile": {
    title: "HOSHCARE CLIENT (FRONTEND) - Medical Vault Client",
    status: "Active, pre-pilot",
    stack: ["React Native", "Expo SDK 56", "TypeScript", "React Navigation v7"],
    description:
      "React Native app for medical records: document upload, AI-assisted field extraction, review-before-save.",
    prev: { slug: "zucchini-linux", title: "ZUCCHINI-LINUX" },
    next: { slug: "hoshcare-api", title: "HOSHCARE API" },
  },
  "hoshcare-web": {
    title: "HOSHCARE CLIENT (FRONTEND) - Web Predecessor Merged",
    status: "Merged into Client",
    stack: ["React Native", "Supabase RLS", "PostgreSQL"],
    description:
      "The initial web MVP was merged into the HOSHCARE client case study.",
    prev: { slug: "hoshcare-api", title: "HOSHCARE API" },
    next: { slug: "hoshcare-client", title: "HOSHCARE CLIENT" },
  },
  "hoshcare-marketing": {
    title: "HOSHCARE CLIENT (FRONTEND) - Design Foundations Merged",
    status: "Merged into Client",
    stack: ["Three.js", "WebGL", "Design System"],
    description:
      "The marketing design foundations were merged into the HOSHCARE client case study.",
    prev: { slug: "hoshcare-client", title: "HOSHCARE CLIENT" },
    next: { slug: "broccoli", title: "BROCCOLI" },
  },
};

export function generateStaticParams() {
  return Object.keys(projectCatalog).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectCatalog[slug];
  if (!project) {
    return { title: "Project Not Found" };
  }

  const projectKeywords: Record<string, string[]> = {
    broccoli: [
      "Broccoli",
      "Broccoli App",
      "Brocoli",
      "Brocolli",
      "Broccoli Calorie Tracker",
      "Broccoli Nutrition Tracker",
      "Broccoli Android",
      "Broccoli Google Play",
      "Grams Not Guesses",
      "Margin of Error Nutrition",
      "Bidya Bhushan Broccoli",
      "Vidya Bhushan Broccoli",
      "Bidya Bhusan Broccoli",
      "Vidya Bushan Broccoli",
      "Bidyabhushan Broccoli",
      "Vidyabhushan Broccoli",
      "Bidya Broccoli",
      "Vidya Broccoli",
      "com.bidyabhushan.mobile",
    ],
    "zucchini-linux": [
      "Zucchini-Linux",
      "SM-T295",
      "SM-T295 Bare-Metal Bringup",
      "Qualcomm EDL",
      "Qualcomm ARM64",
      "Arch Linux ARM64",
      "LineageOS Dual Boot",
      "Bidya Bhushan",
      "Vidya Bhushan",
      "Bidya Bhusan",
      "Vidya Bushan",
      "Bidyabhushan",
      "Vidyabhushan",
      "BSP Engineer Delhi",
    ],
    kestrel: [
      "Kestrel",
      "Kestrel GCS",
      "Drone Ground Control Station",
      "Rust UAV Ground Station",
      "MAVLink v2 Rust",
      "Tauri v2 GCS",
      "PX4 Ground Control",
      "ArduPilot GCS",
      "MediaMTX WebRTC",
      "PMTiles Offline Map",
      "Deck.gl Drone",
      "Bidya Bhushan Nanda",
      "Systems Engineer Delhi",
    ],
    "custom-drone-gcs": [
      "Kestrel",
      "Custom Drone GCS",
      "Drone Ground Control Station",
      "Rust UAV Ground Station",
      "MAVLink v2 Rust",
      "Tauri v2 GCS",
      "PX4 Ground Control",
      "ArduPilot GCS",
      "MediaMTX WebRTC",
      "PMTiles Offline Map",
      "Deck.gl Drone",
      "Bidya Bhushan Nanda",
      "Systems Engineer Delhi",
    ],
    habanero: [
      "Habanero AI",
      "Habanero Sovereign Engine",
      "Local Compound AI",
      "Apple Silicon Metal LLM",
      "C11 Atomics Lock-Free",
      "Multi-Agent DAG Scheduler",
      "Playwright Headless CI",
      "G0-G7 Verification Gauntlet",
      "Zero Cloud Latency AI",
      "Bidya Bhushan Nanda",
      "AI Systems Architect",
    ],
  };

  return {
    title: project.title,
    description: project.description,
    keywords: projectKeywords[slug] || [
      "Bidya Bhushan Nanda",
      "Vidya Bhushan Nanda",
      project.title,
    ],
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Bidya Bhushan Nanda`,
      description: project.description,
      url: `https://www.bidyabhushan.in/projects/${slug}`,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectCatalog[slug];

  if (!project) {
    notFound();
  }

  // Render the dedicated case study component
  let caseStudyComponent = null;
  if (
    slug === "hoshcare-client" ||
    slug === "hoshcare-mobile" ||
    slug === "hoshcare-web" ||
    slug === "hoshcare-marketing"
  ) {
    caseStudyComponent = <HoshcareClientCaseStudy />;
  } else if (slug === "broccoli") {
    caseStudyComponent = <BroccoliCaseStudy />;
  } else if (slug === "zucchini-linux") {
    caseStudyComponent = <ZucchiniLinuxCaseStudy />;
  } else if (slug === "kestrel" || slug === "custom-drone-gcs") {
    caseStudyComponent = <DroneGcsCaseStudy />;
  } else if (slug === "habanero") {
    caseStudyComponent = <HabaneroCaseStudy />;
  } else if (slug === "hoshcare-api") {
    caseStudyComponent = <HoshcareApiCaseStudy />;
  } else {
    notFound();
  }

  const authorAlternateNames = [
    "Bidya",
    "Bidya Bhushan",
    "Vidya",
    "Vidya Bhushan",
    "Vidya Bushan",
    "Bidya Bhusan",
    "Bidyabhushan",
    "Bidyabhushan Nanda",
    "Vidyabhushan",
    "Vidyabhushan Nanda",
    "Bidyabhusan",
    "Vidyabhusan",
    "Bidya Nanda",
    "Vidya Nanda",
    "bid25",
  ];

  const projectSchema =
    slug === "broccoli"
      ? {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Broccoli",
          alternateName: [
            "Broccoli App",
            "Broccoli Calorie Tracker",
            "Brocoli",
            "Brocolli",
            "Broccoli: grams, not guesses",
            "Broccoli Nutrition Tracker",
            "Broccoli Body Composition Instrument",
          ],
          operatingSystem: "Android",
          applicationCategory: "HealthApplication",
          description: project.description,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            ratingCount: "1",
            bestRating: "5",
            worstRating: "1",
          },
          author: {
            "@type": "Person",
            name: "Bidya Bhushan Nanda",
            alternateName: authorAlternateNames,
            url: "https://www.bidyabhushan.in",
          },
          installUrl:
            "https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share",
          url: "https://www.bidyabhushan.in/broccoli",
        }
      : {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: project.title,
          description: project.description,
          author: {
            "@type": "Person",
            name: "Bidya Bhushan Nanda",
            alternateName: authorAlternateNames,
            url: "https://www.bidyabhushan.in",
          },
          url: `https://www.bidyabhushan.in/projects/${slug}`,
        };

  return (
    <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-8 py-10 font-mono text-[#0B3D2E]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      {/* Top back navigation */}
      <div className="mb-8">
        <Link
          href="/projects"
          className="btn inline-flex items-center gap-2 font-pixel text-xs px-4 py-2.5 bg-[#FFF6C2] text-[#0B3D2E] border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E]"
        >
          ← ALL PROJECTS
        </Link>
      </div>

      {/* Case study view */}
      {caseStudyComponent}

      {/* Bottom Prev / Next pager */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-14 pt-8 border-t-3 border-dashed border-[#0B3D2E]/30">
        <div>
          {project.prev ? (
            <Link
              href={`/projects/${project.prev.slug}`}
              style={{ backgroundColor: "#FFF6C2", color: "#0B3D2E" }}
              className="btn inline-flex items-center gap-2 font-pixel text-[11px] px-4 py-3 border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E]"
            >
              ← {project.prev.title}
            </Link>
          ) : (
            <span />
          )}
        </div>

        <div>
          {project.next && (
            <Link
              href={`/projects/${project.next.slug}`}
              style={{ backgroundColor: "#0B3D2E", color: "#FFD93B" }}
              className="btn inline-flex items-center gap-2 font-pixel text-[11px] px-5 py-3 border-3 border-[#0B3D2E] shadow-[5px_5px_0_#FF5C8A]"
            >
              NEXT: {project.next.title} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
