import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaperHero } from "@/components/paper/PaperHero";
import { ProximityProvider } from "@/components/paper/ProximityArticle";
import fs from "fs";
import path from "path";

const postModules = {
  "augmentation-not-obsolescence": () =>
    import("@/content/blog/augmentation-not-obsolescence.mdx"),
  "sm-t295-linux-bringup": () =>
    import("@/content/blog/sm-t295-linux-bringup.mdx"),
};

type PostSlug = keyof typeof postModules;

interface PostMeta {
  title: string;
  subtitle: string;
  slug: string;
  kind: string;
  date: string;
  readingTime: string;
  pdf?: string;
  summary: string;
  topics: string[];
  quote?: string;
  series?: string;
  badge?: string;
  docRef?: string;
  citation?: string;
}

interface MDXModule {
  default: React.ComponentType<{
    components?: Record<string, React.ComponentType<Record<string, unknown>>>;
  }>;
  metadata: PostMeta;
}

export function generateStaticParams() {
  return Object.keys(postModules).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in postModules)) {
    return { title: "Post Not Found" };
  }

  const { metadata } = (await postModules[slug as PostSlug]()) as unknown as MDXModule;
  return {
    title: metadata.title,
    description: metadata.summary,
    authors: [{ name: "Bidya Bhushan Nanda" }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${metadata.title} | Bidya Bhushan Nanda`,
      description: metadata.summary,
      url: `https://www.bidyabhushan.in/blog/${slug}`,
      type: "article",
      publishedTime: metadata.date,
      images: [
        {
          url:
            slug === "sm-t295-linux-bringup"
              ? "/images/zucchini-paper/img-001.png"
              : "/opengraph-image.jpg",
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.summary,
      images: [
        slug === "sm-t295-linux-bringup"
          ? "/images/zucchini-paper/img-001.png"
          : "/twitter-image.jpg",
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in postModules)) {
    notFound();
  }

  const { default: MDXContent, metadata } = (await postModules[
    slug as PostSlug
  ]()) as unknown as MDXModule;

  const mdxPath = path.join(process.cwd(), "src", "content", "blog", `${slug}.mdx`);
  let published: string;
  try {
    const stat = fs.statSync(mdxPath);
    published = stat.mtime.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    published = new Date(metadata.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: metadata.title,
    description: metadata.summary,
    author: {
      "@type": "Person",
      name: "Bidya Bhushan Nanda",
      alternateName: [
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
      ],
      url: "https://www.bidyabhushan.in",
    },
    datePublished: metadata.date,
    url: `https://www.bidyabhushan.in/blog/${slug}`,
    keywords: metadata.topics,
  };

  return (
    <article className="w-full max-w-[1100px] mx-auto px-3 sm:px-6 md:px-8 py-8 sm:py-16 text-[#0B3D2E] font-mono">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Top back navigation */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="btn inline-flex items-center gap-2 font-pixel text-xs px-3.5 py-2 bg-[#FFF6C2] text-[#0B3D2E] border-3 border-[#0B3D2E] shadow-[4px_4px_0_#0B3D2E]"
        >
          ← ALL PAPERS &amp; DISPATCHES
        </Link>
      </div>

      {/* Main Archival Research Dossier Card */}
      <div className="un border-3 sm:border-4 border-[#0B3D2E] bg-[#FFFDF0] shadow-[5px_5px_0_#0B3D2E] sm:shadow-[12px_12px_0_#0B3D2E] p-3.5 sm:p-8 md:p-12 relative overflow-x-clip max-w-full">
        {/* Archival Manuscript Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-[#0B3D2E] pb-4 mb-8">
          <div className="font-pixel text-[10px] text-[#0B3D2E] flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-[#0B3D2E]"></span>
            <span>{metadata.series || "MONOGRAPH SERIES // WORKING PAPER"}</span>
          </div>

          <div className="font-pixel text-[10px] bg-[#FF5C8A] text-[#0B3D2E] border-2 border-[#0B3D2E] px-2.5 py-1 font-bold -rotate-2">
            {metadata.badge || "PREPRINT DRAFT // FOR REVIEW"}
          </div>
        </div>

        {/* Hero Header */}
        <header className="mb-10 border-b-4 border-dashed border-[#0B3D2E] pb-8">
          <PaperHero
            kicker={metadata.kind}
            title={metadata.title}
            subtitle={metadata.subtitle}
            meta={[published, "Bidya Bhushan Nanda", metadata.readingTime]}
            pdf={metadata.pdf}
            docRef={metadata.docRef || (slug === "sm-t295-linux-bringup" ? "DOC. REF: SYS-2026-11 // HARDWARE MONOGRAPH" : undefined)}
          />
        </header>

        {/* Archival Reading Note */}
        <div className="mb-10 border-2 border-dashed border-[#0B3D2E] bg-[#FFF8D6] p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 -rotate-[0.5deg]">
          <div className="flex items-center gap-3">
            <span className="font-pixel text-[10px] bg-[#0B3D2E] text-[#FFD93B] px-2 py-1 font-bold">
              ABSTRACT NOTE
            </span>
            <span className="font-hand text-xl text-[#0B3D2E]">
              &ldquo;{metadata.quote || "The durable human advantage is architectural intent, not implementation volume."}&rdquo;
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {metadata.topics.map((t) => (
              <span
                key={t}
                className="border border-[#0B3D2E] bg-[#FFFDF0] px-2 py-0.5 text-[#0B3D2E] font-bold"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        {/* Paper Body */}
        <div className="prose prose-stone max-w-none text-[#0B3D2E] font-mono leading-relaxed">
          <ProximityProvider>
            <MDXContent />
          </ProximityProvider>
        </div>

        {/* Citation & Conclusion Box */}
        <div className="mt-16 border-t-3 border-[#0B3D2E] pt-8">
          <div className="border-3 border-[#0B3D2E] bg-[#FFF8D6] p-5 shadow-[4px_4px_0_#0B3D2E]">
            <div className="font-pixel text-[10px] text-[#0B3D2E] mb-2 font-bold">
              SUGGESTED CITATION:
            </div>
            <div className="font-mono text-xs sm:text-sm text-[#0B3D2E] leading-relaxed bg-[#FFFDF0] p-3 border-2 border-[#0B3D2E]">
              {metadata.citation || (
                <>
                  Nanda, B. B. ({new Date(metadata.date).getFullYear()}). &ldquo;{metadata.title}: {metadata.subtitle}.&rdquo; <i>Antigravity Systems Monograph WP-2026-07</i>. New Delhi: Maharaja Agrasen Institute of Technology.
                </>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div>
              © {new Date().getFullYear()} Bidya Bhushan Nanda. Licensed under CC BY-NC-ND 4.0.
            </div>
            <Link
              href="/blog"
              className="btn btn-dark inline-flex items-center justify-center font-pixel text-xs px-5 py-3"
            >
              ← BACK TO BLOG DOSSIERS
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
