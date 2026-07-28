// Data model + seed content for <Trajectory />, rendered at components/Trajectory.tsx.
//
// EXTENSION PROTOCOL — read this before touching this file
// Adding a new role/milestone is a single append to `nodes`, inserted
// immediately BEFORE the node with `kind: 'future'`. Nothing else in this
// project should need to change: no coordinate, no layout constant, no CSS,
// no edit to Trajectory.tsx itself. The component derives trunk spacing,
// branch parity (even index = fan below, odd index = fan above), and SVG
// path geometry entirely from `nodes.length` and each node's index. If you
// ever find yourself editing a pixel value to make a new node "fit," the
// layout math has regressed — fix the formula, don't hand-tune the result.
//
// Exactly one node must carry `kind: 'future'`, and it must stay last. The
// component asserts this in dev and warns loudly if it's ever zero or more
// than one.

export type NodeKind = "origin" | "milestone" | "role" | "future";
export type NodeStatus = "complete" | "active" | "open";

export interface SkillLeaf {
  id: string;
  label: string;
}

export interface CareerNode {
  id: string;
  kind: NodeKind;
  status: NodeStatus;
  label: string;
  org?: string;
  detail?: string; // role title or qualifier
  start: string; // 'YYYY' or 'YYYY-MM' — ignored for kind: 'future'
  end?: string | null; // null = ongoing; omit = point event
  summary?: string;
  branches?: SkillLeaf[];
  href?: string;
}

export interface CareerGraph {
  nodes: CareerNode[]; // array order IS trunk order
}

function leaves(labels: string[], prefix: string): SkillLeaf[] {
  return labels.map((label, i) => ({ id: `${prefix}-${i}`, label }));
}

export const careerGraph: CareerGraph = {
  nodes: [
    {
      id: "mait",
      kind: "origin",
      status: "complete",
      label: "Joined MAIT",
      org: "Maharaja Agrasen Institute of Technology, Delhi",
      detail: "B.Tech Electronics Engineering",
      start: "2025-08",
      summary:
        "Started B.Tech in Electronics Engineering — the hardware and signals background everything after this is built on.",
    },
    {
      id: "aerostars",
      kind: "milestone",
      status: "active",
      label: "Aerostars",
      org: "UAV Society, MAIT",
      detail: "Member → Core Technical & Creative Team (Mar 2026)",
      start: "2025-09",
      end: null,
      summary:
        "Joined as a member in September 2025; moved into the core technical and creative team in March 2026. Ongoing.",
      branches: leaves(
        ["AI/ML scope", "ML training", "IoT development", "Drone development", "Embedded engineering", "Hardware assembly"],
        "aerostars"
      ),
    },
    {
      id: "abconnectz-intern",
      kind: "role",
      status: "complete",
      label: "AB Connectz — Intern",
      detail: "Full-Stack Engineering Intern",
      start: "2026-06",
      end: "2026-07",
      summary: "Full-stack engineering internship across the Node/NestJS backend and the React Native app.",
      branches: leaves(
        ["Node.js", "NestJS", "REST APIs", "React Native", "Version control", "Redis", "PostgreSQL", "Prisma"],
        "abc-intern"
      ),
    },
    {
      id: "abconnectz-fulltime",
      kind: "role",
      status: "active",
      label: "AB Connectz — Full-Time",
      detail: "Full-Stack Engineer, Remote",
      start: "2026-07",
      end: null,
      summary: "Converted to full-time, remote. Current focus: LLM-integrated features and mobile release infrastructure.",
      branches: leaves(
        ["Gemini API integration", "Structured output prompting", "Supabase RLS", "Expo / EAS Build", "Three.js"],
        "abc-ft"
      ),
    },
    {
      id: "next",
      kind: "future",
      status: "open",
      label: "NEXT",
      detail: "unwritten",
      start: "",
    },
  ],
};

if (process.env.NODE_ENV !== "production") {
  const futureCount = careerGraph.nodes.filter((n) => n.kind === "future").length;
  if (futureCount !== 1) {
    console.warn(
      `[Trajectory] careerGraph must contain exactly one node with kind: "future" (found ${futureCount}). ` +
        `The terminal "unwritten" node is the point of the component — fix data/trajectory.ts.`
    );
  }
}
