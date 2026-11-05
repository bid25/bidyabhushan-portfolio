"use client";

import React from "react";
import Link from "next/link";

export function HoshcareMarketingCaseStudy() {
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
            <span>SHEET 04 / INTERACTION DRAFT</span>
            <span>FIG. HOSHCARE-MKTG</span>
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
              ARCHIVED
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              Next.js 14
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              Three.js
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              GLSL Shaders
            </span>
            <span style={{ border: "3px solid #0B3D2E", padding: "2px 9px", background: "#FFF8D6" }}>
              Lenis Smooth Scroll
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
              HOSHCARE MARKETING
            </span>{" "}
            — 3D WebGL Pipeline
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
            An eight-page responsive promotional site featuring an interactive 3D hero experience: custom GLSL vertex deformation shaders driven by smooth-scroll inertia with zero main-thread layout thrashing.
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
              aria-label="Schematic: Scroll Gesture to Lenis Engine, Three.js Shader Pipeline, and WebGL Canvas"
              viewBox="0 0 980 210"
              style={{ width: "100%", display: "block" }}
            >
              {/* Box 1: Scroll Gesture (x: 16 to 170, width: 154) */}
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
                scroll gesture
              </text>
              <text
                x="28"
                y="96"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                wheel &amp; touch delta
              </text>
              <text
                x="28"
                y="126"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#FF5C8A"
              >
                passive listeners
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

              {/* Box 2: Lenis Engine (x: 220 to 440, width: 220) */}
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
                lenis engine
              </text>
              <text
                x="234"
                y="94"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                inertia &amp; dampening
              </text>
              <text
                x="234"
                y="120"
                fontFamily="Caveat,cursive"
                fontSize="16"
                fill="#0B3D2E"
              >
                progress in [0..1]
              </text>
              <text
                x="234"
                y="146"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                reduced-motion branch
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

              {/* Box 3: Three.js Pipeline (x: 488 to 764, width: 276) */}
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
                three.js pipeline
              </text>
              <text
                x="502"
                y="94"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                uniform float uProgress;
              </text>
              <text
                x="502"
                y="120"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                vertex displacement math
              </text>
              <text
                x="502"
                y="148"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#FF5C8A"
              >
                zero layout reflows
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

              {/* Box 4: WebGL Canvas (x: 810 to 968, width: 158) */}
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
                webgl canvas
              </text>
              <text
                x="822"
                y="94"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                • 60 FPS locked
              </text>
              <text
                x="822"
                y="120"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#0B3D2E"
              >
                • RAF throttling
              </text>
              <text
                x="822"
                y="148"
                fontFamily="Caveat,cursive"
                fontSize="15"
                fill="#FF5C8A"
              >
                morph complete!
              </text>
            </svg>
          </div>

          {/* ── SECTION I: DECOUPLING RENDER FROM SCROLL ───────── */}
          <h2
            className="hw wr"
            style={{ margin: "40px 0 10px", fontSize: "38px" }}
          >
            I. decoupling render loops from scroll listeners
          </h2>
          <p className="hw wr" style={{ margin: "0 0 14px", fontSize: "19px", lineHeight: "1.5" }}>
            The classic performance bug in WebGL scroll experiences is calling <code>renderer.render()</code> inside a DOM <code>window.addEventListener('scroll')</code> handler. Touch events fire erratically and cause severe GPU stutter. We architected a decoupled loop:
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
              INTERPOLATED FRAME CONSUMPTION PIPELINE:
            </div>
            <div>[01] Passive scroll listener updates single target float: `targetProgress`.</div>
            <div>[02] Dedicated RAF loop dampens towards target: `current += (target - current) * 0.08`.</div>
            <div>[03] Pass smoothed float directly into shader uniform: `material.uniforms.uProgress.value = current`.</div>
            <div>[04] Main thread performs zero layout recalculations during continuous user scroll.</div>
          </div>

          {/* ── SECTION II: GLSL VERTEX SHADER MATH ───────────── */}
          <h2
            className="hw wr"
            style={{ margin: "36px 0 10px", fontSize: "38px" }}
          >
            II. gpu vertex displacement vs cpu geometry
          </h2>
          <p className="hw wr" style={{ margin: "0 0 16px", fontSize: "19px", lineHeight: "1.5" }}>
            Deforming 12,000 mesh vertices on the CPU in JavaScript produces unacceptable frame drops on mobile devices. All morphing was offloaded into a custom GLSL vertex shader:
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
                01 // SIMD HARDWARE MATH
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: "1.6" }}>
                GLSL calculates sinusoidal vertex offsets in parallel on GPU execution units, dropping CPU frame execution to under 0.8ms per tick.
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
                02 // VRAM CLEANUP
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: "1.6" }}>
                Next.js client-side navigation preserves memory unless explicitly released. Implemented strict teardown hooks calling <code>geometry.dispose()</code>, <code>material.dispose()</code>, and <code>renderer.dispose()</code>.
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
                03 // REDUCED MOTION
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "13px", lineHeight: "1.6" }}>
                Queries <code>prefers-reduced-motion</code> on mount. When detected, the canvas bypasses the animated loop and renders a static, high-resolution keyframe immediately.
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
              <b>CONFIDENTIAL // COMPANY WORK.</b> Promotional design system and shader codebase. Walkthrough available during technical interview.
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
                    HOSHCARE MARKETING (WEBGL)
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
