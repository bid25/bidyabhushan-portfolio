"use client";

import React from "react";
import Link from "next/link";

export function HoshcareWebCaseStudy() {
  return (
    <div className="w-full">
      <div className="un" style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            position: "relative",
            background: "#FFF0B3",
            border: "4px solid #0B3D2E",
            padding: "44px 48px 28px",
            backgroundImage:
              "linear-gradient(#0B3D2E14 1.5px,transparent 1.5px),linear-gradient(90deg,#0B3D2E14 1.5px,transparent 1.5px)",
            backgroundSize: "28px 28px",
            boxShadow: "inset 0 0 70px #E2B93B, 12px 12px 0 #0B3D2E",
          }}
        >


          {/* Sheet Header */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: "12px",
              fontFamily: "'Press Start 2P',monospace",
              fontSize: "10px",
              lineHeight: "1.8",
            }}
          >
            <span>SHEET 03 / SECURITY ARCHITECTURE</span>
            <span>FIG. HOSHCARE-WEB</span>
          </div>

          {/* Badges */}
          <div
            className="wr"
            style={{
              marginTop: "18px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              fontFamily: "'Space Mono',monospace",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            <span
              style={{
                background: "#0B3D2E",
                color: "#FFD93B",
                border: "3px solid #0B3D2E",
                padding: "2px 10px",
              }}
            >
              ARCHIVED POSTMORTEM
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              React 18
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              Supabase Auth
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              PostgreSQL RLS
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              Signed S3 URLs
            </span>
          </div>

          {/* Title */}
          <h1
            className="wr"
            style={{
              margin: "22px 0 4px",
              fontFamily: "'Caveat',cursive",
              fontWeight: "600",
              fontSize: "64px",
              lineHeight: "1.1",
              animationDelay: ".6s",
            }}
          >
            <span
              style={{
                border: "4px solid #FF5C8A",
                borderRadius: "50%",
                padding: "0 20px",
                display: "inline-block",
                transform: "rotate(-2deg)",
              }}
            >
              HOSHCARE WEB
            </span>{" "}
            — Security Architecture
          </h1>

          <p
            className="hw wr"
            style={{
              margin: "20px 0 0",
              fontSize: "20px",
              lineHeight: "1.5",
              animationDelay: "1.2s",
            }}
          >
            The browser sandbox prototype for HOSHCARE: architected with a strict zero-trust frontend thesis where client code possesses zero privileged service keys and all cross-tenant access control is enforced at the database engine level via PostgreSQL Row-Level Security.
          </p>

          {/* ── ARCHITECTURAL BLUEPRINT SVG (OPTIMIZED: NO OVERFLOW) ── */}
          <div
            style={{
              margin: "26px 0 0",
              border: "3px solid #0B3D2E",
              background: "#FFF8D6",
              padding: "16px",
            }}
          >
            <svg
              role="img"
              aria-label="Schematic: Web Client to Supabase Auth, Postgres RLS Engine, and Isolated Storage"
              viewBox="0 0 980 210"
              style={{ width: "100%", display: "block" }}
            >
              {/* Box 1: Web Client (x: 16 to 170, width: 154) */}
              <path
                d="M16 26 L170 24 L172 182 L14 184 Z"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="28"
                y="66"
                fontFamily="Caveat,cursive"
                fontSize="22"
                fill="#0B3D2E"
              >
                web client
              </text>
              <text
                x="28"
                y="96"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                zero service keys
              </text>
              <text
                x="28"
                y="126"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#FF5C8A"
              >
                anon public key only
              </text>

              {/* Arrow 1: 172 -> 216 */}
              <path
                d="M174 104 C188 96 202 112 216 104 M216 104 L206 96 M216 104 L206 112"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Box 2: Supabase Auth (x: 220 to 440, width: 220) */}
              <path
                d="M220 26 L440 24 L442 182 L218 184 Z"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="234"
                y="64"
                fontFamily="Caveat,cursive"
                fontSize="22"
                fill="#0B3D2E"
              >
                supabase auth
              </text>
              <text
                x="234"
                y="94"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                claims: auth.uid()
              </text>
              <text
                x="234"
                y="120"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                short-lived sessions
              </text>
              <text
                x="234"
                y="146"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                refresh token rotation
              </text>

              {/* Arrow 2: 442 -> 484 */}
              <path
                d="M444 104 C458 96 470 112 484 104 M484 104 L474 96 M484 104 L474 112"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Box 3: Postgres RLS Engine (x: 488 to 764, width: 276) */}
              <path
                d="M488 26 L764 24 L766 182 L486 184 Z"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="502"
                y="64"
                fontFamily="Caveat,cursive"
                fontSize="22"
                fill="#0B3D2E"
              >
                postgres rls engine
              </text>
              <text
                x="502"
                y="94"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                USING (user_id = auth.uid())
              </text>
              <text
                x="502"
                y="120"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                WITH CHECK (user = auth.uid())
              </text>
              <text
                x="502"
                y="148"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#FF5C8A"
              >
                rowsecurity = true verified!
              </text>

              {/* Arrow 3: 766 -> 806 */}
              <path
                d="M768 104 C780 96 792 112 806 104 M806 104 L796 96 M806 104 L796 112"
                fill="none"
                stroke="#FF5C8A"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Box 4: Isolated Storage (x: 810 to 968, width: 158) */}
              <path
                d="M810 26 L968 24 L970 182 L808 184 Z"
                fill="none"
                stroke="#0B3D2E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <text
                x="822"
                y="64"
                fontFamily="Caveat,cursive"
                fontSize="22"
                fill="#0B3D2E"
              >
                isolated storage
              </text>
              <text
                x="822"
                y="94"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                • private s3 bucket
              </text>
              <text
                x="822"
                y="120"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                • signed 60s URLs
              </text>
              <text
                x="822"
                y="148"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#FF5C8A"
              >
                zero cross-reads!
              </text>
            </svg>
          </div>

          {/* ── SECTION I: THE ZERO-TRUST CLIENT THESIS ───────── */}
          <h2
            className="hw wr"
            style={{ margin: "40px 0 10px", fontSize: "38px" }}
          >
            I. the zero-trust client thesis
          </h2>
          <p className="hw wr" style={{ margin: "0 0 14px", fontSize: "19px", lineHeight: "1.5" }}>
            In traditional Web applications, access control is handled in API route handlers (`if (doc.userId !== req.user.id)`). A single missed check in one handler causes a catastrophic data leak. In HOSHCARE Web, we inverted the security perimeter:
          </p>

          <div
            style={{
              background: "#FFF8D6",
              border: "3px solid #0B3D2E",
              padding: "20px 24px",
              fontFamily: "'Space Mono',monospace",
              fontSize: "13px",
              lineHeight: "1.7",
              margin: "18px 0 30px",
            }}
          >
            <div style={{ color: "#0B3D2E", fontWeight: "700", marginBottom: "8px" }}>
              POSTGRESQL ROW SECURITY POLICY:
            </div>
            <pre style={{ margin: 0, overflowX: "auto" }}>
{`CREATE POLICY "patient_records_isolation"
ON medical_records
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());`}
            </pre>
          </div>

          {/* ── SECTION II: VERIFYING != CONFIGURING ─────────── */}
          <h2
            className="hw wr"
            style={{ margin: "36px 0 10px", fontSize: "38px" }}
          >
            II. automated assertions: auditing pg_tables
          </h2>
          <p className="hw wr" style={{ margin: "0 0 16px", fontSize: "19px", lineHeight: "1.5" }}>
            It is dangerously easy to write an RLS policy in a migration script and forget to enable row security on the table itself (`ALTER TABLE records ENABLE ROW LEVEL SECURITY`). We added a strict CI regression assertion query:
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: "18px",
              margin: "20px 0 32px",
            }}
          >
            <div
              style={{
                border: "3px dashed #0B3D2E",
                background: "#FFF8D6",
                padding: "16px 18px",
              }}
            >
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "11px", color: "#FF5C8A", marginBottom: "8px" }}>
                01 // ASSERTION SUITE
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: "1.6" }}>
                Every database migration ran a verification script asserting <code>rowsecurity = true</code> in <code>pg_tables</code> across all patient-linked relations.
              </div>
            </div>

            <div
              style={{
                border: "3px dashed #0B3D2E",
                background: "#FFF8D6",
                padding: "16px 18px",
              }}
            >
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "11px", color: "#FF5C8A", marginBottom: "8px" }}>
                02 // CROSS-TENANT FUZZING
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: "1.6" }}>
                Automated tests authenticated User A and issued raw queries attempting to select User B's record IDs. The database returned 0 rows, verifying filter execution.
              </div>
            </div>

            <div
              style={{
                border: "3px dashed #0B3D2E",
                background: "#FFF8D6",
                padding: "16px 18px",
              }}
            >
              <div style={{ fontFamily: "'Press Start 2P',monospace", fontSize: "11px", color: "#FF5C8A", marginBottom: "8px" }}>
                03 // EPHEMERAL SIGNED URLS
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: "1.6" }}>
                Storage buckets remained 100% private. Image viewing generated pre-signed URLs valid for exactly 60 seconds, preventing permanent URL leakage.
              </div>
            </div>
          </div>

          {/* Footer disclosure */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "24px",
              marginTop: "44px",
              borderTop: "3px dashed #0B3D2E",
              paddingTop: "24px",
            }}
          >
            <div
              className="st hw"
              style={{
                border: "4px solid #FF5C8A",
                color: "#0B3D2E",
                padding: "10px 18px",
                transform: "rotate(-2deg)",
                maxWidth: "440px",
                background: "#FFF8D6",
              }}
            >
              <b>CONFIDENTIAL // COMPANY WORK.</b> Architecture diagrams and sanitized schemas only. Walkthrough available during technical interview.
            </div>
            <table
              style={{
                borderCollapse: "collapse",
                fontFamily: "'Space Mono',monospace",
                fontSize: "12px",
                border: "3px solid #0B3D2E",
                background: "#FFF8D6",
              }}
            >
              <tbody>
                <tr>
                  <td style={{ border: "2px solid #0B3D2E", padding: "6px 10px" }}>PROJECT</td>
                  <td style={{ border: "2px solid #0B3D2E", padding: "6px 10px", fontWeight: "700" }}>
                    HOSHCARE WEB (SECURITY DRAFT)
                  </td>
                </tr>
                <tr>
                  <td style={{ border: "2px solid #0B3D2E", padding: "6px 10px" }}>STATUS</td>
                  <td style={{ border: "2px solid #0B3D2E", padding: "6px 10px", fontWeight: "700" }}>
                    ARCHIVED
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
