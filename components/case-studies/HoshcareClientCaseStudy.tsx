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

const clientStages: StageInfo[] = [
  {
    id: "stage-1",
    title: "Document Scan Capture",
    subtitle: "High-Resolution Image Processing",
    role: "Camera capture pipeline with native auto-cropping, uncompressed memory buffer allocation, and secure sandboxed disk cache.",
    code: `const photo = await cameraRef.current.takePictureAsync({\n  quality: 0.88,\n  skipProcessing: false,\n  base64: false\n});\n// Resolution: 1080x1920 raw JPEG · Buffer: 1.14MB\n// Sandbox path: file:///data/user/0/host.exp.exponent/cache/scan_09a.jpg`,
    invariant: "Photos never write to unencrypted public camera roll; sandboxed directly to app memory.",
    failureGuard: "Eliminates memory heap fragmentation by recycling native bitmap allocations."
  },
  {
    id: "stage-2",
    title: "Structured Field Extraction",
    subtitle: "Normalized Medical Entity Models",
    role: "Maps AI extraction payloads into typed prescription and diagnosis forms: doctor name, dates, medications, dosages, and review flags.",
    code: `interface MedicalRecordDraft {\n  documentId: "doc_9918";\n  doctor: "Dr. Vikram Sethi (Cardiology)";\n  rxDate: "2026-10-14";\n  diagnosis: "Post-op prophylactic course";\n  medications: [\n    { name: "Amoxicillin", dose: "500mg", frequency: "TID", days: 7 }\n  ];\n  status: "STAGING_UNCOMMITTED";\n}`,
    invariant: "Strict TypeScript runtime validation guards every extracted field before form display.",
    failureGuard: "Malformed schema fields or missing properties trapped before user presentation."
  },
  {
    id: "stage-3",
    title: "Human-In-The-Loop Review Gate",
    subtitle: "Mandatory User Verification Workflow",
    role: "Zero records are written to production database automatically. The user explicitly audits and edits each field before sign-off.",
    code: `function handleCommitRecord(draft: MedicalRecordDraft) {\n  if (!draft.userConfirmed) {\n    throw new Error("CANNOT_COMMIT: Human review required before lock.");\n  }\n  return apiUpload("/api/records/commit", draft);\n}\n// Invariant: unconfirmed drafts are strictly read-only ephemeral states`,
    invariant: "No AI output is ever committed to health history without explicit user verification.",
    failureGuard: "Prevents LLM hallucinations or misread dosages from entering permanent medical records."
  },
  {
    id: "stage-4",
    title: "Permanent Record Lock",
    subtitle: "Cryptographic Immutability in PostgreSQL",
    role: "Once confirmed, the record status transitions to LOCKED. PostgreSQL row-level security and trigger constraints permanently prevent mutation.",
    code: `COMMIT;\n-- Postgres Row-Level Security Verification:\nSELECT id, status, is_immutable FROM "MedicalRecords" WHERE id = 'rec_9918';\n-- [ROW] id: "rec_9918" | status: "LOCKED" | is_immutable: true\n-- UPDATE ATTEMPTS REJECTED: 403 Forbidden (Record locked permanently)`,
    invariant: "Medical records cannot be silently rewritten or retroactively altered after save.",
    failureGuard: "Eliminates legal liability and accidental data loss by locking historic clinical snapshots."
  }
];

const clientChecklist = [
  "onboarding",
  "phone + Google auth",
  "family member profiles",
  "document capture",
  "extraction review flow",
  "records timeline",
  "detail views",
  "settings"
];

const clientProblems = [
  {
    tag: "A",
    title: "google sign-in went silent",
    summary:
      "After a dependency update, sign-in failed with no error. The library had moved idToken one level deeper, to response.data.idToken. The old path returned undefined, the auth call accepted it, and the server rejected it. Found by logging the raw response instead of the field I expected.",
    codeDiff: `- const { idToken } = await GoogleSignin.signIn();\n- // Evaluates to undefined in v13; server rejects auth silently\n+ const response = await GoogleSignin.signIn();\n+ const idToken = response.data?.idToken ?? response.idToken;\n+ if (!idToken) throw new Error("ID_TOKEN_MISSING_IN_PAYLOAD");`,
    takeaway: "Always inspect the raw wire response when a library upgrade causes silent failure."
  },
  {
    tag: "B",
    title: "uploads sent empty bodies",
    summary:
      "After an Expo upgrade, uploads failed silently. Expo 52+ ships a WinterCG-compliant fetch polyfill that handles React Native FormData differently, so requests left with an empty body. Fix: a dedicated apiUpload() on XMLHttpRequest, which skips the polyfill and reports real upload progress as a bonus.",
    codeDiff: `- await fetch(UPLOAD_ENDPOINT, { method: "POST", body: formData });\n- // WinterCG polyfill silently dropped multi-part form stream\n+ const xhr = new XMLHttpRequest();\n+ xhr.open("POST", UPLOAD_ENDPOINT);\n+ xhr.upload.onprogress = (e) => setUploadProgress(e.loaded / e.total);\n+ xhr.send(formData);`,
    takeaway: "WinterCG fetch implementations in React Native can drop FormData streams; use XMLHttpRequest for uploads."
  },
  {
    tag: "C",
    title: "build died with no stack trace",
    summary:
      "A local dev build failed with nothing to read. npx expo config --json showed expo-secure-store declared as a config plugin but never installed. Plugin resolution failed before it could print a useful error.",
    codeDiff: `- // app.json plugin declaration without npm package\n- "plugins": [["expo-secure-store", {}]]\n+ // Shell diagnosis:\n+ $ npx expo config --json | jq .plugins\n+ $ npm install expo-secure-store\n+ # Plugin resolution succeeded with valid podspec mapping`,
    takeaway: "Config plugin crashes mask error logs; validate plugins via npx expo config --json."
  },
  {
    tag: "D",
    title: "tab bar kept overlapping",
    summary:
      "The overlap kept coming back because each screen was patched on its own. Fix: audit every screen with useSafeAreaInsets() at once instead of patching one at a time.",
    codeDiff: `- // Hardcoded bottom padding across fragmented screens\n- style={{ paddingBottom: 64 }}\n+ // Unified global layout consumer\n+ const insets = useSafeAreaInsets();\n+ style={{ paddingBottom: insets.bottom + 16 }}`,
    takeaway: "Patch layout bugs globally across all screen containers, not one-by-one."
  }
];

export function HoshcareClientCaseStudy() {
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
            <span>FIG. HOSHCARE-CLT</span>
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
                background: "#0B3D2E",
                color: "#FFD93B",
                border: "2px solid #0B3D2E",
                padding: "3px 10px",
              }}
            >
              ACTIVE, PRE-PILOT
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              React Native
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Expo SDK 56
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              TypeScript
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
              React Navigation v7
            </span>
          </div>

          {/* Title with circled HOSHCARE CLIENT and pink swoosh */}
          <div className="my-5 flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="m-0 font-hand font-semibold text-3xl sm:text-5xl md:text-6xl leading-[1.15] text-[#0B3D2E] break-words">
                <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-5 -rotate-2">
                  HOSHCARE CLIENT
                </span>{" "}
                — Frontend Vault
              </h1>
              <svg
                viewBox="0 0 460 20"
                fill="none"
                className="w-full max-w-[460px] h-auto block mt-1"
              >
                <path
                  className="dw"
                  pathLength="1"
                  d="M4 12 C120 4, 260 18, 450 10"
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
            HOSHCARE stores medical documents — prescriptions, lab reports, discharge summaries — and turns them into structured, searchable records. A photo of a prescription becomes doctor, date, diagnosis and medications: fields a user reviews before anything saves. Once saved, a record locks permanently. <span style={{ background: "#FF5C8A55", padding: "0 4px" }}>Health records that can be silently edited after the fact aren't records.</span>
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
            <div key={replayKey}>
              <svg
                role="img"
                aria-label="Schematic: Photo Capture to Structured Extraction, Human Review, and Permanent Lock"
                viewBox="0 0 940 230"
                style={{ width: "100%", display: "block" }}
              >


                {/* ── Box 1: photo document ── */}
                <g
                  onClick={() => setSelectedStage(0)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 0 && (
                    <rect
                      x="28"
                      y="16"
                      width="88"
                      height="158"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M32 20 L112 20 L112 170 L32 170 Z"
                    fill={selectedStage === 0 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 0 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 0 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "0.2s" : "0.05s" }}
                  />
                  <path
                    className="dw"
                    pathLength="1"
                    d="M46 38 L98 38 L98 104 L46 104 Z"
                    fill="none"
                    stroke="#0B3D2E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "0.8s" : "0.15s" }}
                  />
                  <path
                    className="dw"
                    pathLength="1"
                    d="M46 122 L98 122 M46 138 L84 138"
                    fill="none"
                    stroke="#0B3D2E"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "1.2s" : "0.25s" }}
                  />
                  <text
                    className="fi"
                    x="72"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill={selectedStage === 0 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "1.4s" : "0.3s" }}
                  >
                    photo
                  </text>
                </g>

                {/* Arrow 1 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M124 96 C155 88 185 104 226 96 M226 96 L214 88 M226 96 L214 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: isIntersecting ? "1.8s" : "0.5s" }}
                />

                {/* ── Box 2: structured fields ── */}
                <g
                  onClick={() => setSelectedStage(1)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 1 && (
                    <rect
                      x="232"
                      y="32"
                      width="240"
                      height="146"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M236 36 L468 36 L468 174 L236 174 Z"
                    fill={selectedStage === 1 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 1 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 1 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "2.6s" : "0.7s" }}
                  />
                  <text
                    className="fi"
                    x="252"
                    y="68"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.2s" : "0.9s" }}
                  >
                    doctor ------
                  </text>
                  <text
                    className="fi"
                    x="252"
                    y="98"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.4s" : "1.0s" }}
                  >
                    date ------
                  </text>
                  <text
                    className="fi"
                    x="252"
                    y="128"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.6s" : "1.1s" }}
                  >
                    diagnosis ------
                  </text>
                  <text
                    className="fi"
                    x="252"
                    y="158"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.8s" : "1.2s" }}
                  >
                    medications ------
                  </text>
                  <text
                    className="fi"
                    x="352"
                    y="200"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill={selectedStage === 1 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "4.0s" : "1.3s" }}
                  >
                    structured fields
                  </text>
                </g>

                {/* Arrow 2 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M480 96 C515 88 545 104 590 96 M590 96 L578 88 M590 96 L578 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: isIntersecting ? "4.4s" : "1.5s" }}
                />

                {/* ── Box 3: you review it ── */}
                <g
                  onClick={() => setSelectedStage(2)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 2 && (
                    <rect
                      x="596"
                      y="40"
                      width="116"
                      height="114"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M600 44 L708 44 L708 150 L600 150 Z"
                    fill={selectedStage === 2 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 2 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "5.1s" : "1.7s" }}
                  />
                  {/* Pink checkmark */}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M624 96 L648 122 L688 74"
                    fill="none"
                    stroke={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "5.8s" : "2.0s" }}
                  />
                  <text
                    className="fi"
                    x="654"
                    y="180"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="18"
                    fill={selectedStage === 2 ? "#FF5C8A" : "#0B3D2E"}
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "6.2s" : "2.2s" }}
                  >
                    you review it
                  </text>
                  <text
                    className="fi"
                    x="654"
                    y="198"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="15"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "6.4s" : "2.3s" }}
                  >
                    (nothing saves yet)
                  </text>
                </g>

                {/* Arrow 3 */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M720 96 C740 88 755 104 776 96 M776 96 L766 88 M776 96 L766 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: isIntersecting ? "6.8s" : "2.5s" }}
                />

                {/* ── Box 4: Padlock ── */}
                <g
                  onClick={() => setSelectedStage(3)}
                  style={{ cursor: "pointer" }}
                  className="transition-transform hover:scale-[1.01]"
                >
                  {selectedStage === 3 && (
                    <rect
                      x="788"
                      y="40"
                      width="80"
                      height="124"
                      fill="#FF5C8A18"
                      stroke="#FF5C8A"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  )}
                  {/* Lock body */}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M796 86 L860 86 L860 144 L796 144 Z"
                    fill={selectedStage === 3 ? "#FFF0B3" : "none"}
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth={selectedStage === 3 ? "3.5" : "2.5"}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "7.4s" : "2.7s" }}
                  />
                  {/* Shackle */}
                  <path
                    className="dw"
                    pathLength="1"
                    d="M810 86 L810 60 C810 44 846 44 846 60 L846 86"
                    fill="none"
                    stroke={selectedStage === 3 ? "#FF5C8A" : "#0B3D2E"}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ animationDelay: isIntersecting ? "7.9s" : "2.9s" }}
                  />
                  <text
                    className="fi"
                    x="828"
                    y="178"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "8.3s" : "3.1s" }}
                  >
                    locked.
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
                  {clientStages.map((stg, i) => (
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
                  STAGE 0{selectedStage + 1} // {clientStages[selectedStage].title}
                </span>
              </div>

              <div style={{ marginTop: "12px", fontSize: "12px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 8px", color: "#FFFDF0" }}>
                  <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>ROLE:</span>{" "}
                  {clientStages[selectedStage].role}
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
                  {clientStages[selectedStage].code}
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
                    {clientStages[selectedStage].invariant}
                  </div>
                  <div>
                    <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>FAILURE GUARD:</span>{" "}
                    {clientStages[selectedStage].failureGuard}
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
            Roughly 19 screens, plus full dark mode and a shared design system carried over from the marketing site:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 mb-8">
            {clientChecklist.map((item, idx) => (
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
            {clientProblems.map((prob, i) => {
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
                        FIX DIFF & ROOT CAUSE:
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
                    HOSHCARE CLIENT (FRONTEND)
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
                    ACTIVE, PRE-PILOT
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

// Re-export for compatibility
export { HoshcareClientCaseStudy as HoshcareMobileCaseStudy };
