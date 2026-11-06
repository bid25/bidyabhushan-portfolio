"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PixelZucchini } from "@/components/PixelZucchini";

interface StageInfo {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  code: string;
  invariant: string;
  failureGuard: string;
}

const zucchiniStages: StageInfo[] = [
  {
    id: "stage-1",
    title: "Qualcomm Sahara EDL 9008",
    subtitle: "Hardware Test-Point Force & Partition Dump",
    role: "Hardware test-point short to force Qualcomm Emergency Download (EDL) mode 9008 via USB, bypassing Android OS and Knox hypervisor.",
    code: `$ lsusb -d 05c6:9008\nBus 001 Device 014: ID 05c6:9008 Qualcomm HS-USB QDLoader 9008\n$ python3 edl.py --loader prog_emmc_firehose_8937.mbn --dump-all raw_backup/\n[OK] Read 62,537,728 sectors (30,536 MB) at 19.4 MB/s\n[OK] Partitions verified: aboot, boot, system, vendor, userdata, modem`,
    invariant: "Sector-accurate raw eMMC dump before modifying single byte of flash.",
    failureGuard: "Watchdog USB packet drops isolated via hardware flow control chunks (64KB buffers)."
  },
  {
    id: "stage-2",
    title: "AVB 2.0 & dm-verity Disarm",
    subtitle: "ABL Bootloader Signature Bypass",
    role: "Patches Android Verified Boot (AVB) 2.0 cryptographic hash trees in vbmeta partition, disabling dm-verity kernel integrity checks.",
    code: `$ avbtool make_vbmeta_image --flags 2 --padding_size 4096 vbmeta_disabled.img\n$ fastboot --disable-verity --disable-verification flash vbmeta vbmeta_disabled.img\n[OK] Sending 'vbmeta' (4 KB) ... OKAY [ 0.012s ]\n[OK] Writing 'vbmeta' ... OKAY [ 0.008s ]\n[OK] AVB 2.0 signature verification DISARMED (flags: 0x02)`,
    invariant: "Disarms Knox boot signature verification tree without bricking hardware trust roots.",
    failureGuard: "Prevents recovery bootloops triggered by unsigned ARM64 kernel payloads."
  },
  {
    id: "stage-3",
    title: "Initramfs Dual-Boot Switcher",
    subtitle: "Hardware Volume-Key Interrupt Hook",
    role: "Early-boot shell hook in Linux initramfs that probes physical hardware keys before filesystem pivot, selecting LineageOS or Arch Linux.",
    code: `#!/bin/sh\n# /init early hardware key interrupt\nif evtest --query /dev/input/event0 EV_KEY KEY_VOLUMEUP; then\n  echo "[BOOT] KEY_VOLUMEUP detected -> LineageOS GSI" > /dev/tty0\n  mount -t ext4 /dev/block/mmcblk0p58 /system\n  exec /init.android\nelse\n  echo "[BOOT] Default timeout -> Arch Linux ARM64 rootfs" > /dev/tty0\n  mount -t ext4 /dev/block/mmcblk0p59 /sysroot\n  exec switch_root /sysroot /sbin/init\nfi`,
    invariant: "Zero dependency on Android bootloader logic; executed directly by mainline Linux kernel.",
    failureGuard: "Framebuffer console (fbcon) initialized prior to userland switch to prevent black-screen freeze."
  },
  {
    id: "stage-4",
    title: "Bare-Metal Arch Linux ARM64",
    subtitle: "Direct Mainline Kernel Execution",
    role: "Full Arch Linux ARM64 root filesystem running natively on Qualcomm Snapdragon 429 (MSM8937) hardware without emulation.",
    code: `[root@zucchini ~]# uname -a\nLinux zucchini 6.6.21-qcom-sm-t295 #1 SMP PREEMPT aarch64 GNU/Linux\n[root@zucchini ~]# free -m\n              total        used        free      shared  buff/cache   available\nMem:           1892         214        1426          12         252        1624\nSwap:          2047           0        2047\n[root@zucchini ~]# systemctl is-system-running\nrunning (0 failed units)`,
    invariant: "Maintains <220MB idle RAM usage, reserving 1.6GB+ for user workloads.",
    failureGuard: "Out-of-memory lockups prevented via zram compressed swap and tuned vm.swappiness=100."
  }
];

const zucchiniChecklist = [
  "Qualcomm Sahara EDL dump",
  "initramfs hardware key hook",
  "LineageOS dual-boot fallback",
  "AVB 2.0 signature bypass",
  "Arch Linux ARM64 rootfs",
  "battery gas-gauge calibration",
  "raw eMMC partition table",
  "fbcon framebuffer driver"
];

const zucchiniProblems = [
  {
    tag: "A",
    title: "sahara firehose timeout",
    summary:
      "Qualcomm EDL protocol reset the USB connection before raw partition dumps completed. The emergency programmer timed out on large eMMC sector ranges. Fix: patched edl.py with hardware flow control and chunked 64KB transfer buffers.",
    codeDiff: `- # standard edl read stalls on large partition blocks\n- edl.read_sectors(start=0, count=62537728, timeout=5000)\n+ # chunked transfer with flow-control ping handshake\n+ CHUNK_SIZE = 65536 # 64KB per transfer\n+ for chunk_start in range(0, total_sectors, CHUNK_SIZE):\n+     edl.read_chunk_with_retry(chunk_start, CHUNK_SIZE, max_retries=5)\n+     edl.ack_flow_control()`,
    takeaway: "Hardware emergency programmers require active USB flow control; unbuffered bulk reads drop packets."
  },
  {
    tag: "B",
    title: "avb 2.0 loop on boot",
    summary:
      "Modifying the kernel image tripped Android Verified Boot 2.0 cryptographic tree validation, sending the tablet into recovery. Fix: authored a patched vbmeta.img with flag --flags 2 disabling verification checks entirely.",
    codeDiff: `- fastboot flash boot patched_boot.img\n- # RESULT: Bootloop into Android Recovery (AVB verification failure)\n+ avbtool make_vbmeta_image \\\n+     --flags 2 \\\n+     --padding_size 4096 \\\n+     vbmeta_disabled.img\n+ fastboot --disable-verity --disable-verification flash vbmeta vbmeta_disabled.img`,
    takeaway: "AVB 2.0 must be disarmed at the root hash tree before flashing modified kernel images."
  },
  {
    tag: "C",
    title: "framebuffer black screen",
    summary:
      "The Arch Linux kernel booted, but the Qualcomm display driver kept backlight off without Android SurfaceFlinger. Fix: configured native fbcon framebuffer console redirection directly in the kernel commandline arguments with forced panel power-on sequencing.",
    codeDiff: `- bootargs = "console=ttyMSM0,115200n8 root=/dev/mmcblk0p59"\n- # RESULT: Kernel boots over UART, but LCD backlight never turns on\n+ bootargs = "console=tty0 fbcon=rotate:0 video=DSI-1:800x1280 msm_drm.dsi_panel=1 panel_power=on root=/dev/mmcblk0p59 rw"`,
    takeaway: "OEM DSI display panels remain disabled by default unless explicitly powered in kernel commandline arguments."
  },
  {
    tag: "D",
    title: "touchscreen matrix inverted",
    summary:
      "The FocalTech FT5446 touch driver loaded, but coordinates on the portrait panel were transposed 90 degrees with inverted Y-axis. Fix: authored a custom udev rule and libinput calibration matrix mapped to the physical panel geometry.",
    codeDiff: `- # Raw driver reports unrotated sensor orientation\n- /dev/input/event2: ABS_X=[0..800], ABS_Y=[0..1280]\n+ # /etc/udev/rules.d/99-touchscreen.rules\n+ ENV{ID_INPUT_TOUCHSCREEN}=="1", \\\n+   ENV{LIBINPUT_CALIBRATION_MATRIX}="0 -1 1 1 0 0 0 0 1"`,
    takeaway: "Direct Linux bring-up on Android hardware requires manual matrix calibration for portrait DSI panels."
  }
];

export function ZucchiniLinuxCaseStudy() {
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
            <span>FIG. ZUCCHINI-LNX</span>
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
              ACTIVE // HARDWARE
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Qualcomm MSM8937
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              Arch Linux ARM64
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              AVB 2.0 Bypass
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
              LineageOS GSI Fallback
            </span>
            <span style={{ border: "2px solid #0B3D2E", padding: "3px 10px", background: "#FFF8D6", color: "#0B3D2E" }}>
              EDL Sahara 9008
            </span>
          </div>

          {/* Title with circled ZUCCHINI and pink swoosh */}
          <div className="my-5 flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="m-0 font-hand font-semibold text-3xl sm:text-5xl md:text-6xl leading-[1.15] text-[#0B3D2E] break-words">
                <span className="inline-block border-3 sm:border-4 border-[#FF5C8A] rounded-full px-3 sm:px-5 -rotate-2">
                  ZUCCHINI-LINUX
                </span>{" "}
                - Bare-Metal Bring-Up
              </h1>
              <svg
                viewBox="0 0 480 20"
                fill="none"
                className="w-full max-w-[480px] h-auto block mt-1"
              >
                <path
                  className="dw"
                  pathLength="1"
                  d="M4 12 C130 4, 280 18, 470 10"
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
            OEM tablets are designed as disposable media consumption slabs locked to obsolete Android versions with zero native kernel control. The Samsung Galaxy Tab A (SM-T295) ships with an enforced Knox bootloader and locked Knox partitions. <span style={{ background: "#FF5C8A55", padding: "0 4px" }}>Hardware you can't install Linux on isn't hardware you own: turning locked ARM64 silicon into a daily-driver Arch workstation.</span>
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

            {/* SVG Schematic - Slowed deliberate drawing + Interactive Boxes */}
            <div key={replayKey}>
              <svg
                role="img"
                aria-label="Schematic: Qualcomm Sahara EDL to Bootloader Patch, Initramfs Switcher, and Dual OS Userland"
                viewBox="0 0 940 230"
                style={{ width: "100%", display: "block" }}
              >
                {/* Subtle internal guideline */}


                {/* ── Box 1: edl 9008 dump (x: 24 to 184) ── */}
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
                    style={{ animationDelay: isIntersecting ? "0.2s" : "0.05s" }}
                  />
                  <text
                    className="fi"
                    x="38"
                    y="64"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 0 ? "bold" : "normal"}
                    style={{ animationDelay: isIntersecting ? "0.8s" : "0.2s" }}
                  >
                    edl 9008 dump
                  </text>
                  <text
                    className="fi"
                    x="38"
                    y="94"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "1.0s" : "0.3s" }}
                  >
                    qualcomm sahara
                  </text>
                  <text
                    className="fi"
                    x="38"
                    y="126"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "1.2s" : "0.4s" }}
                  >
                    firehose raw eMMC
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
                    style={{ animationDelay: isIntersecting ? "1.4s" : "0.5s" }}
                  >
                    low-level dump
                  </text>
                </g>

                {/* Arrow 1 (draws slowly from Stage 1 to 2) */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M194 96 C214 88 234 104 256 96 M256 96 L246 88 M256 96 L246 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: isIntersecting ? "1.8s" : "0.7s" }}
                />

                {/* ── Box 2: bootloader disarm (x: 266 to 476) ── */}
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
                    style={{ animationDelay: isIntersecting ? "2.6s" : "1.0s" }}
                  />
                  <text
                    className="fi"
                    x="280"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 1 ? "bold" : "normal"}
                    style={{ animationDelay: isIntersecting ? "3.2s" : "1.2s" }}
                  >
                    bootloader patch
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.4s" : "1.3s" }}
                  >
                    • AVB 2.0 disarmed
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.6s" : "1.4s" }}
                  >
                    • dm-verity disabled
                  </text>
                  <text
                    className="fi"
                    x="280"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "3.8s" : "1.5s" }}
                  >
                    • unlocked execution
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
                    style={{ animationDelay: isIntersecting ? "4.0s" : "1.6s" }}
                  >
                    abl / xbl patched
                  </text>
                </g>

                {/* Arrow 2 (draws slowly from Stage 2 to 3) */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M486 96 C506 88 526 104 548 96 M548 96 L538 88 M548 96 L538 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: isIntersecting ? "4.4s" : "1.8s" }}
                />

                {/* ── Box 3: initramfs dual-boot (x: 558 to 768) ── */}
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
                    style={{ animationDelay: isIntersecting ? "5.1s" : "2.0s" }}
                  />
                  <text
                    className="fi"
                    x="572"
                    y="62"
                    fontFamily="Caveat, cursive"
                    fontSize="22"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 2 ? "bold" : "normal"}
                    style={{ animationDelay: isIntersecting ? "5.6s" : "2.2s" }}
                  >
                    dual-boot menu
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="90"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "5.8s" : "2.3s" }}
                  >
                    volume key interrupt
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="118"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "6.0s" : "2.4s" }}
                  >
                    fbcon visual prompt
                  </text>
                  <text
                    className="fi"
                    x="572"
                    y="146"
                    fontFamily="Caveat, cursive"
                    fontSize="16"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "6.2s" : "2.5s" }}
                  >
                    payload switcher
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
                    style={{ animationDelay: isIntersecting ? "6.4s" : "2.6s" }}
                  >
                    initramfs hook
                  </text>
                </g>

                {/* Arrow 3 (draws slowly from Stage 3 to 4) */}
                <path
                  className="dw"
                  pathLength="1"
                  d="M778 96 C796 88 812 104 828 96 M828 96 L818 88 M828 96 L818 104"
                  fill="none"
                  stroke="#FF5C8A"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animationDelay: isIntersecting ? "6.8s" : "2.8s" }}
                />

                {/* ── Box 4: arch userland (x: 838 to 924) ── */}
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
                    style={{ animationDelay: isIntersecting ? "7.4s" : "3.0s" }}
                  />
                  <text
                    className="fi"
                    x="881"
                    y="72"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="20"
                    fill="#0B3D2E"
                    fontWeight={selectedStage === 3 ? "bold" : "normal"}
                    style={{ animationDelay: isIntersecting ? "7.9s" : "3.2s" }}
                  >
                    ARCH
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="104"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#0B3D2E"
                    style={{ animationDelay: isIntersecting ? "8.1s" : "3.3s" }}
                  >
                    ARM64
                  </text>
                  <text
                    className="fi"
                    x="881"
                    y="136"
                    textAnchor="middle"
                    fontFamily="Caveat, cursive"
                    fontSize="17"
                    fill="#FF5C8A"
                    fontWeight="bold"
                    style={{ animationDelay: isIntersecting ? "8.3s" : "3.4s" }}
                  >
                    Lineage
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
                    style={{ animationDelay: isIntersecting ? "8.5s" : "3.5s" }}
                  >
                    bare-metal
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
                  {zucchiniStages.map((stg, i) => (
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
                  STAGE 0{selectedStage + 1} // {zucchiniStages[selectedStage].title}
                </span>
              </div>

              {/* Stage Description & Live Monospace Code */}
              <div style={{ marginTop: "12px", fontSize: "12px", lineHeight: "1.6" }}>
                <p style={{ margin: "0 0 8px", color: "#FFFDF0" }}>
                  <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>ROLE:</span>{" "}
                  {zucchiniStages[selectedStage].role}
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
                  {zucchiniStages[selectedStage].code}
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
                    {zucchiniStages[selectedStage].invariant}
                  </div>
                  <div>
                    <span style={{ color: "#FF5C8A", fontWeight: "bold" }}>FAILURE GUARD:</span>{" "}
                    {zucchiniStages[selectedStage].failureGuard}
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
            Reverse engineering and bare-metal bring-up on Qualcomm MSM8937 hardware:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3.5 mb-8">
            {zucchiniChecklist.map((item, idx) => (
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
            {zucchiniProblems.map((prob, i) => {
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
            {/* Interactive Sticky note */}
            <div
              className="bg-[#FFF8D6] border-3 border-[#FF5C8A] p-3 sm:p-4 max-w-full sm:max-w-[460px] -rotate-1 sm:-rotate-2 shadow-[4px_4px_0_#0B3D2E] sm:shadow-[6px_6px_0_#0B3D2E] hover:rotate-0 hover:scale-[1.01] transition-transform cursor-pointer"
              title="Click to see open-source hardware notes"
            >
              <p className="m-0 font-hand text-lg sm:text-xl leading-snug text-[#0B3D2E]">
                <strong>OPEN HARDWARE PROJECT.</strong> Full bring-up logs, EDL scripts, and kernel patches documented.
              </p>
            </div>

            {/* Metadata Table */}
            <table className="border-collapse font-mono text-[11px] sm:text-xs border-2 border-[#0B3D2E] bg-[#FFF8D6] self-start sm:self-auto w-full sm:w-auto">
              <tbody>
                <tr>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">PROJECT</td>
                  <td className="border-2 border-[#0B3D2E] p-1.5 sm:p-2 px-2.5 font-bold">
                    ZUCCHINI-LINUX
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
                    ACTIVE // HARDWARE
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
export { ZucchiniLinuxCaseStudy as ZucchiniCaseStudy };
