import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PaperHero } from "@/components/paper/PaperHero";
import { ProximityProvider } from "@/components/paper/ProximityArticle";
import fs from "fs";
import path from "path";

// Explicit lookup map for Turbopack/Webpack compatibility — mirrors the
// pattern used by app/projects/[slug]/page.tsx.
const postModules = {
  "augmentation-not-obsolescence": () =>
    import("@/content/blog/augmentation-not-obsolescence.mdx"),
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
    title: `${metadata.title} — Bidya Bhushan Nanda`,
    description: metadata.summary,
    authors: [{ name: "Bidya Bhushan Nanda" }],
    openGraph: {
      title: metadata.title,
      description: metadata.summary,
      type: "article",
      publishedTime: metadata.date,
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

  // Use the MDX source file's filesystem mtime so the displayed date
  // reflects the last real edit, not a hardcoded string.
  const mdxPath = path.join(process.cwd(), "content", "blog", `${slug}.mdx`);
  let published: string;
  try {
    const stat = fs.statSync(mdxPath);
    published = stat.mtime.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    // Fallback to metadata.date if the file can't be stat'd
    published = new Date(metadata.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
      <article className="min-h-screen text-bone">
        <div className="mx-auto max-w-[1200px] px-4 py-10 sm:py-16 sm:px-8 lg:px-16">
          <header className="mb-8 sm:mb-12 border-b border-ash/20 pb-8 sm:pb-10">
            <PaperHero
              kicker={metadata.kind}
              title={metadata.title}
              subtitle={metadata.subtitle}
              meta={[published, metadata.readingTime, "Bidya Bhushan Nanda"]}
              pdf={metadata.pdf}
            />
          </header>

          <div className="text-justify">
            <ProximityProvider>
              <MDXContent />
            </ProximityProvider>
          </div>

          <div className="mt-16 sm:mt-24 border-t border-ash/20 pt-6 sm:pt-8">
            <p className="mb-6 font-mono text-[10.5px] leading-relaxed text-ash/70">
              © {new Date().getFullYear()} Bidya Bhushan Nanda. All rights
              reserved.
              <br />
              Figures generated from cited source data. Benchmark values are a
              July 2026 snapshot and will move.
            </p>
            <Link
              href="/blog"
              className="inline-block font-body text-sm text-amber underline-offset-4 hover:underline"
            >
              ← All writing
            </Link>
          </div>
        </div>
      </article>
  );
}
