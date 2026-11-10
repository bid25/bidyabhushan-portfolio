"use client";

import React, { useState, useEffect, useRef } from "react";

interface StageInfo {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  code: string;
  invariant: string;
  failureGuard: string;
}

const gcsStages: StageInfo[] = [
  {
    id: "stage-1",
    title: "Physical Transport Ingestion",
    subtitle: "Tokio Non-Blocking Multi-Transport",
    role: "Non-blocking serial (FTDI/CP210x), UDP (14550), and TCP (5760) asynchronous workers running on dedicated Tokio runtime threads.",
    code: `// Non-blocking asynchronous serial transport loop\nlet mut port = tokio_serial::new(&port_path, baud_rate).open_native_async()?;\nlet mut buf = vec![0u8; 4096];\nloop {\n    let n = port.read(&mut buf).await?;\n    if n > 0 {\n        framing_tx.send(Bytes::copy_from_slice(&buf[..n])).await?;\n    }\n}`,
    invariant: "Zero serial baud rate stalls: Transport I/O decoupled from parser queue.",
    failureGuard: "Watchdog supervisor triggers auto-reconnect with exponential backoff on USB drop."
  },
  {
    id: "stage-2",
    title: "Rust Systems Core & State Cache",
    subtitle: "CRC-16 Validation & ArcSwap Pointer Swap",
    role: "Authoritative flight supervisor validating CRC-16-MCRF4XX checksums, tracking vehicle heartbeats, and committing state via lock-free atomic pointer swaps.",
    code: `// CRC-16 validation & lock-free atomic pointer swap\nlet frame = mavlink::read_v2_raw_frame(&mut cursor)?;\nif frame.crc_valid() {\n    let mut next = (**state_cache.load()).clone();\n    next.update_telemetry(&frame.message);\n    // Atomic pointer swap: wait-free reads for UI publisher\n    state_cache.store(Arc::new(next));\n}`,
    invariant: "Backend is authoritative: UI never authorizes or evaluates safety gates alone.",
    failureGuard: "Arming blocked if sensor telemetry (GPS fix, EKF health, battery) is stale or missing."
  },
  {
    id: "stage-3",
    title: "Lock-Free Binary IPC Ring Buffer",
    subtitle: "Zero-Copy 50 Hz Float Buffer Stream",
    role: "Bypasses JSON serialization by packing 50 Hz attitude, position, and power floats into a binary ring buffer streamed directly into native webview memory.",
    code: `// Flat binary telemetry encoding (bypasses JSON parse overhead)\n#[repr(C, packed)]\npub struct PackedTelemetry {\n    pub roll: f32, pub pitch: f32, pub yaw: f32,\n    pub alt_rel_m: f32, pub groundspeed_ms: f32,\n    pub battery_volts: f32, pub gps_hdop: f32,\n}\n// Streamed at 50 Hz direct to Webview SharedArrayBuffer`,
    invariant: "Zero JSON serialization overhead on 50 Hz vehicle telemetry stream.",
    failureGuard: "Commands pending execution are never silently replayed on link reconnection."
  },
  {
    id: "stage-4",
    title: "Tauri v2 Webview Cockpit & Sidecars",
    subtitle: "60-120 FPS rAF Loop + MediaMTX / PMTiles",
    role: "Hardware-accelerated MapLibre GL and Deck.gl spatial vectors running on display refresh rate, with isolated MediaMTX WebRTC video (<267ms) and offline PMTiles.",
    code: `// Decoupled spatial animation loop\nfunction onFrame(timestamp: number) {\n  const raw = telemetryRingBuffer.peekLatest();\n  vehicleLayer.setOrientation([raw.roll, raw.pitch, raw.yaw]);\n  vehicleLayer.setCoordinates([raw.lon, raw.lat]);\n  map.triggerRepaint();\n  requestAnimationFrame(onFrame);\n}`,
    invariant: "Spatial vectors render at 60-120 Hz with sub-220 MB active RAM footprint.",
    failureGuard: "Process isolation: Video pipeline crash cannot interrupt flight controls or telemetry."
  }
];

const gcsChecklist = [
  "Rust + Tokio async transport loop",
  "MAVLink v2 CRC-16 validator",
  "ArcSwap lock-free state cache",
  "50 Hz packed binary ring buffer",
  "Tauri v2 native webview shell",
  "MediaMTX WebRTC video sidecar",
  "PMTiles 60 FPS offline vector map",
  "PX4 & ArduPilot mode normalizer",
  "Backend-enforced arming safety gates",
  "2.5s command ack watchdog timeout",
  "Dockerized SITL simulation tests",
  "Sub-220 MB RAM active footprint"
];

const gcsProblems = [
  {
    tag: "A",
    title: "50 hz json bridge saturation",
    summary:
      "Legacy Electron and Qt GCS architectures serialize full JSON trees across IPC at 50 Hz, triggering severe garbage-collection pauses (60-120 ms) and UI micro-stutters during landing. Fix: Replaced JSON IPC with a packed flat-binary float buffer streamed into a lock-free ring buffer.",
    codeDiff: `- // Legacy approach: 50 Hz JSON serialization over IPC bridge\n- window.ipcRenderer.send('telemetry', JSON.stringify(telemetryObject));\n- // RESULT: Heavy GC thrashing, 80ms UI freeze during rapid orientation updates\n+ // Kestrel: Packed binary float buffer\n+ const buffer = new Float32Array(rawBytes.buffer);\n+ telemetryStore.setFastVector(buffer[0], buffer[1], buffer[2]); // Roll, Pitch, Yaw`,
    takeaway: "High-frequency numerical telemetry must bypass string-serialization bridges."
  },
  {
    tag: "B",
    title: "video decode telemetry starvation",
    summary:
      "In monolithic GCS apps, 1080p H.264 video decoding stalls the main process thread, delaying safety-critical heartbeat processing and triggering false Failsafe RTL triggers. Fix: Isolated video into an independent MediaMTX sidecar communicating via local WHEP/WebRTC.",
    codeDiff: `- // Monolithic: GStreamer pipeline running inside core GCS process\n- gst_element_set_state(pipeline, GST_STATE_PLAYING);\n- // RESULT: Video keyframe stall blocks MAVLink heartbeat parser thread\n+ // Isolated Sidecar: MediaMTX subprocess managed by supervisor\n+ let sidecar = Command::new_sidecar("mediamtx")?.spawn()?;\n+ // Rust core telemetry loop operates on independent thread with pinned CPU affinity`,
    takeaway: "High-bandwidth media pipelines must never share thread schedulers with flight communications."
  },
  {
    tag: "C",
    title: "px4 vs ardupilot mode divergence",
    summary:
      "PX4 and ArduPilot encode flight modes into conflicting custom mode bits inside MAVLink heartbeat packets, causing erratic mode switches when switching drones. Fix: Built a normalized Rust abstraction layer mapping raw bitmasks into canonical FlightMode states.",
    codeDiff: `- // Fragile raw bitmask checks\n- if (msg.custom_mode == 3) { mode = "HOLD"; } // Breaks between PX4 and ArduPilot!\n+ // Unified translation layer in Rust Systems Core\n+ match autopilot_dialect {\n+     Autopilot::PX4 => PX4Mode::from_bits(custom_mode).to_canonical(),\n+     Autopilot::ArduPilot => ArduCopterMode::from_bits(custom_mode).to_canonical(),\n+ }`,
    takeaway: "Multi-vehicle ground systems must enforce canonical protocol normalization at the core boundary."
  },
  {
    tag: "D",
    title: "command replay on link recovery",
    summary:
      "When RF or USB telemetry drops mid-flight, naive command queues buffer takeoff or arm commands and replay them upon reconnection, causing hazardous unexpected vehicle reactions. Fix: Implemented a 2-phase verification engine with 2.5s watchdog timeouts and zero command replay.",
    codeDiff: `- // Danger: Naive queue buffers unacknowledged command and drains upon reconnect\n- offlineQueue.push(armCommand); // Replays upon reconnect!\n+ // Safety invariant: Command enters pending state with 2.5s watchdog\n+ let ack = wait_for_ack(command_id, Duration::from_millis(2500)).await;\n+ if ack.is_err() { abort_command(command_id); /* Never replayed */ }`,
    takeaway: "Flight commands must be strictly correlated to acknowledgements and discarded upon link timeout."
  }
];

export function DroneGcsCaseStudy() {
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
            <span>FIG. DRONE-GCS-01</span>
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
                background: "#FFD93B",
                color: "#0B3D2E",
                border: "2px solid #0B3D2E",
                padding: "3px 10px",
              }}
            >
              UNDER DEVELOPMENT
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Rust + Tokio
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Tauri v2 Desktop
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              MAVLink v2
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              ArcSwap Lock-Free
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
              WebRTC MediaMTX (&lt;300ms)
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              PMTiles Offline Map (60 FPS)
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              &lt;220 MB RAM
            </span>
          </div>

          {/* Title with circled KESTREL and pink swoosh */}
          <div className="my-5 min-w-0">
            <h1 className="m-0 font-hand font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] text-[#0B3D2E] break-words">
              <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-5 -rotate-2">
                KESTREL
              </span>{" "}
              - UAV Flight Control
            </h1>
            <svg
              viewBox="0 0 460 20"
              fill="none"
              className="w-full max-w-[460px] h-auto block mt-1"
            >
              <path
                className="dw"
                pathLength="1"
                d="M4 12 C120 4, 270 18, 450 10"
                stroke="#FF5C8A"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
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
            Legacy ground control stations (such as QGroundControl and Mission Planner) run monolithic Qt/C++ or 1.2 GB Electron runtimes where 1080p video decoding, high-rate telemetry, and vector maps share process threads. <span style={{ background: "#FF5C8A55", padding: "0 4px" }}>A video stall or garbage-collection pause during landing can freeze vehicle telemetry: decoupling flight-critical MAVLink communications from presentation via a 4-tier process topology in Rust and Tauri v2.</span>
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
            {/* Top Toolbar: Interactive Controls */}
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
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="flex-wrap">
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
                <span className="sm:hidden font-pixel text-[8px] bg-[#0B3D2E] text-[#FFD93B] px-1.5 py-0.5">
                  SWIPE ⇄
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#0B3D2E",
                  }}
                  className="hidden sm:inline"
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

            {/* SVG Schematic: 4-Tier Topology with Mobile Responsive Horizontal Pan */}
            <div key={replayKey} className={`w-full overflow-x-auto pb-2 ${!isIntersecting ? "pipeline-paused" : ""}`}>
              <svg
                role="img"
                aria-label="Schematic: Physical Transport to Rust Core, Lock-Free IPC, and Cockpit Presentation"
                viewBox="0 0 940 230"
                className="w-full min-w-[620px] sm:min-w-0"
                style={{ display: "block" }}
              >
                {/* ── Box 1: physical transport (x: 24 to 184) ── */}
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
                    async transport
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
                    serial / ftdi
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
                    udp 14550 / tcp
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
                    tier 1: transport
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

                {/* ── Box 2: rust core (x: 266 to 476) ── */}
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
                    style={{ animationDelay: "2.2s" }}
                  />
                  <text
                    className="fi"
                    x="280"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 1 ? "bold" : "normal"}
                    style={{ animationDelay: "2.8s" }}
                  >
                    rust systems core
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.0s" }}
                  >
                    crc-16 verification
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: "3.2s" }}
                  >
                    heartbeat supervisor
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "3.4s" }}
                  >
                    arc-swap state cache
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
                    tier 2: rust core
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

                {/* ── Box 3: lock-free ipc (x: 558 to 768) ── */}
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
                    50 hz binary ipc
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
                    flat binary ring buffer
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
                    zero-copy float array
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
                    tauri-specta typed rpc
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
                    tier 3: ipc bridge
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

                {/* ── Box 4: presentation cockpit (x: 838 to 924) ── */}
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
                  <text
                    className="fi"
                    x="881"
                    y="64"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="19"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 3 ? "bold" : "normal"}
                    style={{ animationDelay: "7.9s" }}
                  >
                    TAURI
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="94"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#0B3D2E"
                    style={{ animationDelay: "8.1s" }}
                  >
                    Deck.gl
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="124"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="15"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: "8.3s" }}
                  >
                    WebRTC
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
                    tier 4: ui
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
              {/* Quick Jump Stage Tabs */}
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
                  {gcsStages.map((stg, i) => (
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
                  STAGE 0{selectedStage + 1} // {gcsStages[selectedStage].title}
                </span>
              </div>

              {/* Stage Description & Live Monospace Code */}
              <div style={{ marginTop: "12px", fontSize: "12px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 8px", color: "#FFFDF0" }}>
                  <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>ROLE:</span>{" "}
                  {gcsStages[selectedStage].role}
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
                  {gcsStages[selectedStage].code}
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
                    {gcsStages[selectedStage].invariant}
                  </div>
                  <div>
                    <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>FAILURE GUARD:</span>{" "}
                    {gcsStages[selectedStage].failureGuard}
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
            High-reliability UAV ground control systems architecture in Rust, Tokio, and Tauri v2:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 mb-8">
            {gcsChecklist.map((item, idx) => (
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
            {gcsProblems.map((prob, i) => {
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
                        FIX DIFF & TERMINAL LOGS:
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
            <div
              className="bg-[#FFF8D6] border-3 border-[#FF5C8A] p-3 sm:p-4 max-w-full sm:max-w-[460px] -rotate-1 sm:-rotate-2 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] hover:rotate-0 hover:scale-[1.01] transition-transform cursor-pointer"
              title="Click to see flight software notes"
            >
              <p className="m-0 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                <strong>FLIGHT SYSTEMS ARCHITECTURE.</strong> Verified via Dockerized PX4 & ArduPilot SITL simulation environments.
              </p>
            </div>

            <table className="border-collapse font-mono text-[11px] sm:text-xs border-2 border-[#0B3D2E] bg-[#FFF8D6] self-start sm:self-auto w-full sm:w-auto">
              <tbody>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">PROJECT</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    KESTREL // GCS
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
                    UNDER DEVELOPMENT // FLIGHT SYSTEMS
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
