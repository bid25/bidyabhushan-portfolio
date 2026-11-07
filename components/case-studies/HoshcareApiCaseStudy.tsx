"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

interface StageInfo {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  code: string;
  invariant: string;
  failureGuard: string;
}

const apiStages: StageInfo[] = [
  {
    id: "stage-1",
    title: "Header-Only Authenticated Stream",
    subtitle: "Zero URL-Token Multipart Ingestion",
    role: "Streaming HTTP upload handler enforcing strict RFC 6750 Bearer token headers. Query string tokens are rejected at the edge to prevent URL logging in upstream reverse proxies.",
    code: `POST /api/documents/ingest HTTP/1.1\nHost: api.hoshcare.internal\nAuthorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...\nContent-Type: multipart/form-data; boundary=---------------------------9747672998\nContent-Length: 1489120\n[EDGE_AUTH] JWT Signature verified · User: usr_90b21a · Role: PATIENT_WRITE`,
    invariant: "Zero tokens allowed in GET/POST query parameters; all authorization resides in HTTP headers.",
    failureGuard: "Eliminates credential leaks in Nginx access logs, CDN telemetry, and browser history."
  },
  {
    id: "stage-2",
    title: "Express Gateway & Disk Staging",
    subtitle: "Ephemeral Disk Spooling & Job Dispatch",
    role: "Buffers multi-megabyte document payloads to an encrypted ephemeral disk buffer (/tmp), computes SHA-256 integrity checksums, and dispatches extraction jobs to BullMQ.",
    code: `const busboy = Busboy({ headers: req.headers, limits: { fileSize: 15 * 1024 * 1024 } });\nbusboy.on('file', (fieldname, fileStream, { filename }) => {\n  const diskBuffer = createWriteStream(\`/tmp/\${docId}.staging\`);\n  fileStream.pipe(hashStream).pipe(diskBuffer);\n});\n// Buffer allocated: 1.42MB · Checksum: 8f4b23... · Queue: extract-pipeline`,
    invariant: "Prevents Node.js V8 heap out-of-memory crashes by streaming directly to disk buffers instead of in-memory byte arrays.",
    failureGuard: "Isolates slow mobile upload connections from blocking async event loop workers."
  },
  {
    id: "stage-3",
    title: "Gemini 1.5 Flash Extraction Pipeline",
    subtitle: "Schema-Enforced JSON Structured Extraction",
    role: "Dispatches scanned medical documents to Gemini 1.5 Flash with strict JSON Schema constraints. Extracted clinical fields are buffered in staging tables, awaiting user review.",
    code: `const response = await ai.models.generateContent({\n  model: 'gemini-1.5-flash',\n  contents: [{ role: 'user', parts: [documentPart, promptPart] }],\n  config: {\n    responseMimeType: 'application/json',\n    responseSchema: PrescriptionExtractionSchema,\n  }\n});\n// Extraction latency: 1,180ms · Fields extracted: 9 · Retry queue: idle`,
    invariant: "Output strictly adheres to validated JSON schema; uncommitted staging state prevents premature DB writes.",
    failureGuard: "Empty object {} responses automatically trapped and rejected before touching persistence layer."
  },
  {
    id: "stage-4",
    title: "Staging to Locked Postgres Commit",
    subtitle: "Prisma Atomic Transaction & Write Lock",
    role: "When the client issues the review confirmation, Prisma commits staging entities inside a serializable SQL transaction and triggers immutable row locks.",
    code: `await prisma.$transaction(async (tx) => {\n  const record = await tx.documentRecord.create({\n    data: { patientId, doctor, diagnosis, status: 'LOCKED', confirmedAt: new Date() }\n  });\n  await tx.stagingBuffer.delete({ where: { docId } });\n});\n-- Row lock acquired: IMMUTABLE (Subsequent UPDATE queries rejected by trigger)`,
    invariant: "Guarantees zero orphaned staging records and ensures locked medical records cannot be overwritten.",
    failureGuard: "Prevents race conditions during concurrent client confirmations via atomic serializable isolation."
  }
];

const apiChecklist = [
  "header-only token auth",
  "structured JSON schema",
  "4 relational Prisma models",
  "ephemeral disk buffer",
  "uncommitted staging buffer",
  "immutable write lock",
  "multipart streaming",
  "retry queue with backoff"
];

const apiProblems = [
  {
    tag: "A",
    title: "schema drift broke production queries",
    summary:
      "A column existed in the Prisma schema and in application code but not in the running database. Requests failed on a field that looked present everywhere it was read. Fixed by enforcing that db push and generate run strictly together in CI, never separately.",
    codeDiff: `- # CI pipeline ran push and generate in separate async jobs\n- npm run db:generate\n- npm run db:push # Failed silently or ran out of order\n+ # Unified synchronous CI check\n+ npx prisma migrate deploy && npx prisma generate --no-engine\n+ # Zero schema drift: migration versions strictly match generated client types`,
    takeaway: "Prisma schema generation and database migration must execute synchronously as an atomic step in CI."
  },
  {
    tag: "B",
    title: "gemini returned empty object {}",
    summary:
      "Gemini was returning {} with a 200 status on some documents. The responseSchema was under-specified - fields not explicitly declared were silently dropped rather than rejected. Fixed by declaring every field explicitly and adding an empty-payload retry guard.",
    codeDiff: `- // Vague response schema allowed {} as valid JSON\n- responseSchema: { type: Type.OBJECT }\n+ // Explicit schema validation + empty payload assertion\n+ responseSchema: MedicalRecordSchema,\n+ if (!data || Object.keys(data).length < 2) {\n+   throw new RetryablePipelineError("GEMINI_EMPTY_PAYLOAD");\n+ }`,
    takeaway: "Under-specified response schemas allow empty objects to pass as successful extractions; validate key count."
  },
  {
    tag: "C",
    title: "downloads leaked auth tokens",
    summary:
      "The browser's native download cannot attach an Authorization header, tempting query string tokens. Query strings land in server logs and browser history - unacceptable for medical records. Kept header-only auth and handled downloads client-side via memory Blobs.",
    codeDiff: `- // Insecure query string token in download anchor tag\n- <a href={\`/api/documents/\${id}/download?token=\${jwt}\`}>Download</a>\n+ // Header-authenticated client-side Blob streamer\n+ const res = await fetch(\`/api/documents/\${id}/download\`, {\n+   headers: { Authorization: \`Bearer \${jwt}\` }\n+ });\n+ const blob = await res.blob(); saveAs(blob, \`record_\${id}.pdf\`);`,
    takeaway: "Medical documents must never expose auth tokens in query strings; stream via client-side Blobs."
  },
  {
    tag: "D",
    title: "surviving the nestjs cutover",
    summary:
      "Running two backends against one app caused auth sync bugs. Migrated the app to the shared NestJS backend in a day - used migrate deploy rather than db push to avoid corrupting nine already-committed database migrations.",
    codeDiff: `- // Dangerous db push would override established production migrations\n- RUN npx prisma db push --accept-data-loss\n+ // Safe incremental migration deployment\n+ RUN npx prisma migrate deploy\n+ # Kept all 9 historic migration rollbacks intact during cutover`,
    takeaway: "During backend cutovers, never use db push; strict migration files prevent catastrophic data loss."
  }
];

export function HoshcareApiCaseStudy() {
  const [replayKey, setReplayKey] = useState<number>(1);
  const [selectedStage, setSelectedStage] = useState<number>(0);
  const [expandedProblem, setExpandedProblem] = useState<number | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const schematicRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsIntersecting(true);
        }
      },
      { threshold: 0.15 }
    );
    if (schematicRef.current) {
      observer.observe(schematicRef.current);
    }
    return () => observer.disconnect();
  }, []);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  return (
    <div className="w-full">
      <div className="un w-full max-w-[1000px] mx-auto">
        <div
          className="relative bg-[#FFF0B3] border-3 sm:border-4 border-[#0B3D2E] p-4 sm:p-8 md:p-12 shadow-[6px_6px_0_#0B3D2E] sm:shadow-[12px_12px_0_#0B3D2E] overflow-hidden"
          style={{
            backgroundImage:
              "linear-gradient(#0B3D2E14 1.5px,transparent 1.5px),linear-gradient(90deg,#0B3D2E14 1.5px,transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        >


          {/* Sheet Header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "12px",
              fontFamily: "'Press Start 2P', monospace",
              fontSize: "11px",
              lineHeight: "1.8",
              color: "#0B3D2E",
            }}
          >
            <span>DRAFT</span>
            <span>FIG. HOSHCARE-API</span>
          </div>

          {/* Badges */}
          <div
            style={{
              marginTop: "16px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            <span
              style={{
                background: "#FF5C8A",
                color: "#0B3D2E",
                border: "2px solid #0B3D2E",
                padding: "3px 10px",
              }}
            >
              SUPERSEDED JUL 2026
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Node.js
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Express
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Prisma 6
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              PostgreSQL 15
            </span>
          </div>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              fontFamily: "'Space Mono', monospace",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              NestJS Consolidation
            </span>
          </div>

          {/* Title with circled HOSHCARE API and pink swoosh */}
          <div className="my-5 flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="m-0 font-hand font-semibold text-3xl sm:text-5xl md:text-6xl leading-[1.15] text-[#0B3D2E] break-words">
                <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-5 -rotate-2">
                  HOSHCARE API
                </span>{" "}
                - Backend Data Pipeline
              </h1>
              <svg
                viewBox="0 0 440 20"
                fill="none"
                className="w-full max-w-[440px] h-auto block mt-1"
              >
                <path
                  className="dw"
                  pathLength="1"
                  d="M4 12 C110 4, 250 18, 430 10"
                  stroke="#FF5C8A"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* 1. the problem */}
          <h2
            style={{
              margin: "24px 0 8px",
              fontFamily: "'Caveat', cursive",
              fontSize: "38px",
              fontWeight: "700",
              color: "#0B3D2E",
            }}
          >
            1. the problem
          </h2>
          <p
            style={{
              margin: "0 0 20px",
              fontFamily: "'Caveat', cursive",
              fontSize: "22px",
              lineHeight: "1.45",
              color: "#0B3D2E",
            }}
          >
            The original backend for HOSHCARE: token verification on every request, four relational data models, encrypted document streaming, and an extraction pipeline that dispatched medical scans to Gemini Vision and returned structured fields for review. Extraction never wrote directly to primary storage - output was buffered in staging, awaiting human review. <span style={{ background: "#FF5C8A55", padding: "0 4px" }}>Query strings in download endpoints leak tokens into server logs and browser history - header-only auth is non-negotiable for medical documents.</span>
          </p>

          {/* ── 4 BOXES SCHEMATIC CONTAINER WITH INTERACTIVE INSPECTOR ── */}
          <div
            ref={schematicRef}
            style={{
              margin: "20px 0 36px",
              border: "3px solid #0B3D2E",
              background: "#FFF8D6",
              padding: "16px 20px 20px",
              boxShadow: "4px 4px 0 #0B3D2E",
            }}
          >
            {/* Top Toolbar */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                marginBottom: "12px",
                paddingBottom: "8px",
                borderBottom: "2px dashed #0B3D2E33",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "9px",
                    background: "#0B3D2E",
                    color: "#FFD93B",
                    padding: "3px 6px",
                  }}
                >
                  INTERACTIVE PIPELINE
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#0B3D2E",
                  }}
                >
                  Click any box to inspect architecture
                </span>
              </div>
              <button
                type="button"
                onClick={handleReplay}
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  fontSize: "9px",
                  background: "#FF5C8A",
                  color: "#0B3D2E",
                  border: "2px solid #0B3D2E",
                  padding: "4px 10px",
                  cursor: "pointer",
                  boxShadow: "2px 2px 0 #0B3D2E",
                }}
                className="hover:translate-x-[1px] hover:translate-y-[1px]"
              >
                ↺ REPLAY DRAWING
              </button>
            </div>

            {/* SVG Schematic */}
            <div key={replayKey} className={!isIntersecting ? "pipeline-paused" : ""}>
              <svg
                role="img"
                aria-label="Schematic: Client Upload to Express Gateway, Gemini Extraction, and PostgreSQL Locking"
                viewBox="0 0 940 230"
                style={{ width: "100%", display: "block" }}
              >
                {/* Subtle internal guideline */}


                {/* ── Box 1: client upload (x: 24 to 184) ── */}
                <g
                  onClick={() => setSelectedStage(0)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 0 && (
                    <rect
                      x="20"
                      y="20"
                      width="168"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M24 24 L184 24 L184 170 L24 170 Z"
                    fill={selectedStage === 0 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 0 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 0 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "0.2s" }}
                  />
                  <text
                    className="fi"
                    x="38"
                    y="64"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 0 ? "bold" : "normal"}
                    style={{ animationDelay: "0.8s" }}
                  >
                    client upload
                  </text>
                  <text
                    className="fi"
                    x="38"
                    y="94"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "1.0s" }}
                  >
                    multipart/form
                  </text>
                  <text
                    className="fi"
                    x="38"
                    y="126"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "1.2s" }}
                  >
                    [bearer auth]
                  </text>
                  <text
                    className="fi"
                    x="104"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 0 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "1.4s" }}
                  >
                    upload stream
                  </text>
                </g>

                {/* Arrow 1 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M194 96 C214 88 234 104 256 96 M256 96 L246 88 M256 96 L246 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: "1.8s" }}
                />

                {/* ── Box 2: express gateway (x: 266 to 476) ── */}
                <g
                  onClick={() => setSelectedStage(1)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 1 && (
                    <rect
                      x="262"
                      y="20"
                      width="218"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M266 24 L476 24 L476 170 L266 170 Z"
                    fill={selectedStage === 1 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 1 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 1 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "2.6s" }}
                  />
                  <text
                    className="fi"
                    x="280"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 1 ? "bold" : "normal"}
                    style={{ animationDelay: "3.2s" }}
                  >
                    express gateway
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.4s" }}
                  >
                    • token validation
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.6s" }}
                  >
                    • disk buffer write
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.8s" }}
                  >
                    • worker dispatch
                  </text>
                  <text
                    className="fi"
                    x="371"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 1 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "4.0s" }}
                  >
                    ingestion gateway
                  </text>
                </g>

                {/* Arrow 2 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M486 96 C506 88 526 104 548 96 M548 96 L538 88 M548 96 L538 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: "4.4s" }}
                />

                {/* ── Box 3: gemini 1.5 flash (x: 558 to 768) ── */}
                <g
                  onClick={() => setSelectedStage(2)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 2 && (
                    <rect
                      x="554"
                      y="20"
                      width="218"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M558 24 L768 24 L768 170 L558 170 Z"
                    fill={selectedStage === 2 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 2 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "5.1s" }}
                  />
                  <text
                    className="fi"
                    x="572"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 2 ? "bold" : "normal"}
                    style={{ animationDelay: "5.6s" }}
                  >
                    gemini 1.5 flash
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "5.8s" }}
                  >
                    structured schema
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "6.0s" }}
                  >
                    rx date / doc / doses
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "6.2s" }}
                  >
                    staging buffer (uncommitted)
                  </text>
                  <text
                    className="fi"
                    x="663"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "6.4s" }}
                  >
                    ai extraction
                  </text>
                </g>

                {/* Arrow 3 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M778 96 C796 88 812 104 828 96 M828 96 L818 88 M828 96 L818 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: "6.8s" }}
                />

                {/* ── Box 4: postgres / lock (x: 838 to 924) ── */}
                <g
                  onClick={() => setSelectedStage(3)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 3 && (
                    <rect
                      x="834"
                      y="20"
                      width="94"
                      height="154"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M838 24 L924 24 L924 170 L838 170 Z"
                    fill={selectedStage === 3 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 3 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "7.4s" }}
                  />
                  <path
                    className="dw"
                    pathLength="1"
                    d="M856 94 L896 94 L896 142 L856 142 Z"
                    fill="none"
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "7.8s" }}
                  />
                  <path
                    className="dw"
                    pathLength="1"
                    d="M864 94 L864 72 C864 60 888 60 888 72 L888 94"
                    fill="none"
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: "8.1s" }}
                  />
                  <text
                    className="fi"
                    x="876"
                    y="164"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "8.3s" }}
                  >
                    locked!
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="18"
                    fill={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: "8.5s" }}
                  >
                    postgres
                  </text>
                </g>
              </svg>
            </div>

            {/* ── INTERACTIVE BLUEPRINT INSPECTOR ── */}
            <div
              style={{
                marginTop: "16px",
                padding: "16px",
                background: "#06231A",
                color: "#FFD93B",
                border: "2px solid #0B3D2E",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "8px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #FFD93B33",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {apiStages.map((stg, i) => (
                    <button
                      key={stg.id}
                      type="button"
                      onClick={() => setSelectedStage(i)}
                      style={{
                        padding: "3px 8px",
                        fontSize: "11px",
                        fontFamily: "'Press Start 2P', monospace",
                        background: selectedStage === i ? "#FF5C8A" : "#0B3D2E",
                        color: selectedStage === i ? "#0B3D2E" : "#FFD93B",
                        border: "1px solid #FFD93B",
                        cursor: "pointer",
                      }}
                    >
                      0{i + 1}
                    </button>
                  ))}
                </div>
                <span style={{ fontSize: "11px", color: "#FF5C8A", fontWeight: "bold" }}>
                  STAGE 0{selectedStage + 1} // {apiStages[selectedStage].title}
                </span>
              </div>

              <div style={{ marginTop: "12px", fontSize: "12px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 8px", color: "#FFFDF0" }}>
                  <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>ROLE:</span>{" "}
                  {apiStages[selectedStage].role}
                </p>

                <div
                  style={{
                    background: "#03140F",
                    border: "1px solid #0B3D2E",
                    padding: "10px 12px",
                    margin: "8px 0",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    color: "#A7F3D0",
                    overflowX: "auto",
                    whiteSpace: "pre",
                  }}
                >
                  {apiStages[selectedStage].code}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "8px",
                    marginTop: "8px",
                    fontSize: "11px",
                    color: "#FFFDF0",
                  }}
                >
                  <div>
                    <span style={{ color: "#FFD93B", fontWeight: "bold" }}>INVARIANT:</span>{" "}
                    {apiStages[selectedStage].invariant}
                  </div>
                  <div>
                    <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>FAILURE GUARD:</span>{" "}
                    {apiStages[selectedStage].failureGuard}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SECTION 2: WHAT I BUILT ── */}
          <div className="flex flex-wrap items-baseline justify-between mt-8 sm:mt-10 mb-2">
            <h2 className="m-0 font-hand text-3xl sm:text-4xl font-bold text-[#0B3D2E]">
              2. what i built
            </h2>
          </div>
          <p className="m-0 mb-4 font-hand text-lg sm:text-xl text-[#0B3D2E]">
            The ingestion backend pipeline and verification architecture before the NestJS cutover:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 mb-8">
            {apiChecklist.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 font-hand text-lg sm:text-xl text-[#0B3D2E] py-1"
              >
                <span className="inline-flex items-center justify-center w-5 h-5 border-2 border-[#0B3D2E] bg-[#FFF8D6] shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 12 L9 18 L20 6"
                      stroke="#FF5C8A"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="break-words">{item}</span>
              </div>
            ))}
          </div>

          {/* ── SECTION 3: PROBLEMS I HAD TO CRACK ── */}
          <div className="flex flex-wrap items-baseline justify-between gap-2 mt-8 sm:mt-10 mb-3">
            <h2 className="m-0 font-hand text-3xl sm:text-4xl font-bold text-[#0B3D2E]">
              3. problems i had to crack
            </h2>
            <span className="font-mono text-[10px] sm:text-[11px] text-[#0B3D2E] font-bold">
              Click card to view root cause & code diff
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
            {apiProblems.map((prob, i) => {
              const isExpanded = expandedProblem === i;
              return (
                <div
                  key={prob.tag}
                  onClick={() => setExpandedProblem(isExpanded ? null : i)}
                  className={`p-4 sm:p-5 cursor-pointer transition-all ${
                    isExpanded
                      ? "border-3 border-[#FF5C8A] bg-[#FFFDF0] shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] -translate-x-0.5 -translate-y-0.5"
                      : "border-2 border-dashed border-[#0B3D2E] bg-[#FFF8D6] shadow-[2px_2px_0_#0B3D2E22]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="inline-flex items-center justify-center w-7 h-7 bg-[#FF5C8A] text-[#0B3D2E] font-mono font-bold text-base border-2 border-[#0B3D2E] shrink-0">
                        {prob.tag}
                      </span>
                      <span className="font-hand text-xl sm:text-2xl font-bold text-[#0B3D2E] truncate">
                        {prob.title}
                      </span>
                    </div>
                    <span
                      className={`font-pixel text-[8px] px-1.5 py-1 shrink-0 ${
                        isExpanded ? "bg-[#FF5C8A] text-[#0B3D2E]" : "bg-[#0B3D2E] text-[#FFD93B]"
                      }`}
                    >
                      {isExpanded ? "▲ HIDE" : "▼ DIFF"}
                    </span>
                  </div>

                  <p className="m-0 mb-2.5 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                    {prob.summary}
                  </p>

                  {/* Expandable Engineering Code Diff Drawer */}
                  {isExpanded && (
                    <div className="mt-3 pt-3 border-t-2 border-dashed border-[#0B3D2E44]">
                      <span className="block font-mono text-[10px] font-bold text-[#0B3D2E] mb-1">
                        FIX DIFF & DEPLOYMENT INVARIANT:
                      </span>
                      <pre className="m-0 p-2.5 sm:p-3 bg-[#06231A] text-[#A7F3D0] font-mono text-[10px] sm:text-[11px] leading-relaxed border border-[#0B3D2E] overflow-x-auto max-w-full whitespace-pre-wrap break-words">
                        {prob.codeDiff}
                      </pre>
                      <p className="mt-2 mb-0 font-mono text-[10px] text-[#0B3D2E] font-bold">
                        <span className="text-[#FF5C8A]">TAKEAWAY:</span> {prob.takeaway}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── FOOTER: TILTED STICKY NOTE & METADATA TABLE ── */}
          <div className="mt-8 sm:mt-11 pt-5 sm:pt-6 border-t-3 border-[#0B3D2E] flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-6">
            {/* Interactive Sticky note */}
            <div
              className="bg-[#FFF8D6] border-3 border-[#FF5C8A] p-3 sm:p-4 max-w-full sm:max-w-[460px] -rotate-1 sm:-rotate-2 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] hover:rotate-0 hover:scale-[1.01] transition-transform cursor-pointer"
              title="Click to view confidentiality note"
            >
              <p className="m-0 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                <strong>PRIVATE REPO.</strong> Happy to walk through the code and architecture in an interview.
              </p>
            </div>

            {/* Metadata Table */}
            <table className="border-collapse font-mono text-[11px] sm:text-xs border-2 border-[#0B3D2E] bg-[#FFF8D6] self-start sm:self-auto w-full sm:w-auto">
              <tbody>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">PROJECT</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    HOSHCARE API (BACKEND)
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">DRAWN BY</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    BIDYA B. NANDA
                  </td>
                </tr>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">STATUS</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    SUPERSEDED JUL 2026
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
