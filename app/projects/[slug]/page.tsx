import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeavyComponentWrapper } from "@/components/HeavyComponentWrapper";
import { LazyTextPressure as TextPressure } from "@/components/LazyComponents";

// Explicit lookup map for Turbopack/Webpack compatibility (as requested)
const projectModules = {
  "hoshcare-mobile": () => import("@/content/projects/hoshcare-mobile.mdx"),
  "hoshcare-api": () => import("@/content/projects/hoshcare-api.mdx"),
  "hoshcare-web": () => import("@/content/projects/hoshcare-web.mdx"),
  "hoshcare-marketing": () => import("@/content/projects/hoshcare-marketing.mdx"),
};

type ProjectSlug = keyof typeof projectModules;

interface MDXModule {
  default: React.ComponentType;
  metadata: {
    title: string;
    slug: string;
    status: string;
    stack: string[];
  };
}

export function generateStaticParams() {
  return Object.keys(projectModules).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in projectModules)) {
    return { title: "Project Not Found" };
  }

  const { metadata } = (await projectModules[slug as ProjectSlug]()) as unknown as MDXModule;
  return {
    title: `${metadata.title} — Bidyabhushan Nanda`,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  if (!(slug in projectModules)) {
    notFound();
  }

  const { default: MDXContent, metadata } = (await projectModules[slug as ProjectSlug]()) as unknown as MDXModule;

  return (
    <div className="min-h-screen bg-void text-bone">
      <div className="mx-auto max-w-[1200px] px-4 py-16 sm:px-8 lg:px-16">
        <header className="mb-16">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="font-body text-xs font-medium uppercase tracking-[0.05em] text-cyan">
              {metadata.status}
            </span>
            <span className="font-body text-xs text-ash">—</span>
            <div className="flex flex-wrap items-center gap-2">
              {metadata.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] uppercase tracking-wider text-ash border border-ash/30 px-2 py-0.5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="h-[120px] w-full max-w-[800px] -ml-2">
            <HeavyComponentWrapper fallback={<h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[1.1]">{metadata.title}</h1>}>
              <TextPressure 
                text={metadata.title} 
                flex={true} 
                alpha={false} 
                stroke={false} 
                width={true}
                weight={true}
                italic={true}
                textColor="#d6d3cd"
                fontFamily="JetBrains Mono Variable"
              />
            </HeavyComponentWrapper>
          </div>
        </header>

        <div className="max-w-[65ch]">
          <MDXContent />
        </div>

        <div className="mt-16 border-t border-ash/20 pt-10">
          <Link
            href="/projects"
            className="inline-block font-body text-sm text-amber underline-offset-4 hover:underline"
          >
            ← All projects
          </Link>
        </div>
      </div>
    </div>
  );
}
