"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CodeToCameraStory } from "@/components/lens/CodeToCameraStory";
import { PhotoStackCard } from "@/components/lens/PhotoStackCard";
import { PhotoStackModal } from "@/components/lens/PhotoStackModal";
import { HERO_PHOTO, LENS_STACKS, LensStack } from "@/data/lensPhotos";
import { FEATURED_INSTAGRAM_POSTS } from "@/data/lensInstagram";
import { AdaptiveVideoPlayer } from "@/components/lens/AdaptiveVideoPlayer";
import { Menu, X, Play, Camera, RotateCcw } from "lucide-react";

export default function LensPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [selectedStack, setSelectedStack] = useState<LensStack | null>(null);

  // Enforce the off-white background (#EDE6D8) for the Lens section
  useEffect(() => {
    const origBg = document.body.style.backgroundColor;
    const origColor = document.body.style.color;
    const origOverflowX = document.body.style.overflowX;
    const origOverflowY = document.body.style.overflowY;

    document.body.style.backgroundColor = "#EDE6D8";
    document.body.style.color = "#0F1517";
    document.body.style.overflowX = "clip";
    document.body.style.overflowY = "visible";

    return () => {
      document.body.style.backgroundColor = origBg;
      document.body.style.color = origColor;
      document.body.style.overflowX = origOverflowX;
      document.body.style.overflowY = origOverflowY;
    };
  }, []);

  return (
    <div
      className="w-full min-h-screen text-[#0F1517] overflow-x-clip selection:bg-[#FF5C8A] selection:text-[#0F1517]"
      style={{
        backgroundColor: "#EDE6D8",
      }}
    >
      <style jsx global>{`
        @keyframes mq {
          to {
            transform: translateX(-50%);
          }
        }
        .mq {
          display: flex;
          width: max-content;
          animation: mq 26s linear infinite;
        }
        @keyframes ld {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .ld {
          animation: ld 6s steps(24) infinite;
        }
        @keyframes gl {
          0%,
          90%,
          100% {
            text-shadow: none;
          }
          93% {
            text-shadow: -6px 0 #070B0c, 6px 0 #EDE6D8;
          }
          96% {
            text-shadow: 6px 0 #070B0c, -6px 0 #EDE6D8;
          }
        }
        .gl {
          animation: gl 4s infinite;
        }
        .bt {
          transition: transform 0.1s, box-shadow 0.1s;
        }
        .bt:hover {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 #070B0C !important;
        }
        .cd {
          transition: transform 0.15s ease-out, box-shadow 0.15s ease-out;
        }
        .cd:hover {
          transform: translate(-4px, -4px);
          box-shadow: 12px 12px 0 #0F1517 !important;
        }
      `}</style>

      {/* ========================================================
          1. CODE TO CAMERA ENTRY SEQUENCE
          The user goes through this scroll-driven transition
          from code windows (yellow) into the camera lens & HUD.
          Strictly locked: user cannot scroll into showcase without
          clicking ENTER THE LENS (instant unlock, zero loading screen).
          ======================================================== */}
      {!isUnlocked && (
        <CodeToCameraStory
          onEnterLens={() => {
            setIsUnlocked(true);
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          }}
        />
      )}

      {/* ========================================================
          2. DEDICATED LENS SHOWCASE (OFF-WHITE BACKGROUND: #EDE6D8)
          Directly unveiled when the user clicks ENTER THE LENS.
          ======================================================== */}
      {isUnlocked && (
        <section
          id="showcase"
          className="w-full relative z-20 animate-in fade-in duration-300"
          style={{
            backgroundColor: "#EDE6D8",
            backgroundImage: "radial-gradient(#0F15170d 1px, transparent 1px)",
            backgroundSize: "4px 4px",
          }}
        >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-20 box-border">
          {/* Custom Neo-Brutalist Navigation matching redesign.html */}
          <nav className="w-full pt-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-5 border-[#0F1517] bg-[#EDE6D8] p-3 sm:px-4 shadow-[8px_8px_0_#0F1517]">
              {/* Brand Logo Switcher (LENS -> switches back to DEV /) */}
              <Link
                href="/"
                title="Switch to Software Engineering Portfolio (/)"
                className="group inline-flex items-center text-decoration-none"
              >
                <span
                  className="glitch-mark lens-glitch font-pixel text-base bg-[#0F1517] !text-[#C99A55] px-3.5 py-1.5 border-3 border-[#0F1517] shadow-[3px_3px_0_#C99A55] group-hover:scale-105 group-hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all inline-block select-none cursor-pointer"
                  style={{ color: "#C99A55", backgroundColor: "#0F1517" }}
                >
                  <span className="glitch-text" data-text="LENS">
                    LENS
                  </span>
                </span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 border-3 border-[#0F1517] bg-[#EDE6D8] text-[#0F1517]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Desktop Links */}
              <div className="hidden md:flex flex-wrap items-center gap-2 font-mono font-bold text-sm">
                <Link
                  href="/"
                  className="btn nav-link-lens px-3.5 py-2 min-h-[44px] flex items-center justify-center"
                >
                  HOME
                </Link>
                <Link
                  href="/projects"
                  className="btn nav-link-lens px-3.5 py-2 min-h-[44px] flex items-center justify-center"
                >
                  PROJECTS
                </Link>
                <Link
                  href="/about"
                  className="btn nav-link-lens px-3.5 py-2 min-h-[44px] flex items-center justify-center"
                >
                  ABOUT
                </Link>
                <Link
                  href="/blog"
                  className="btn nav-link-lens px-3.5 py-2 min-h-[44px] flex items-center justify-center"
                >
                  BLOG
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsUnlocked(false);
                    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                  }}
                  title="Replay Storyboard Animation"
                  className="btn nav-link-lens px-3.5 py-2 min-h-[44px] flex items-center justify-center gap-1.5"
                >
                  <RotateCcw size={14} />
                  <span>INTRO</span>
                </button>
                <Link
                  href="/contact"
                  className="btn nav-link-lens contact px-3.5 py-2 min-h-[44px] flex items-center justify-center"
                >
                  CONTACT
                </Link>
              </div>
            </div>

            {/* Mobile Nav Drawer */}
            {mobileMenuOpen && (
              <div className="md:hidden mt-3 p-4 bg-[#EDE6D8] border-4 border-[#0F1517] shadow-[6px_6px_0_#0F1517] flex flex-col gap-2 font-mono font-bold text-sm">
                <Link
                  href="/"
                  className="nav-link-lens p-3 border-2 flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>HOME</span>
                  <span className="font-pixel text-xs">→</span>
                </Link>
                <Link
                  href="/projects"
                  className="nav-link-lens p-3 border-2 flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>PROJECTS</span>
                  <span className="font-pixel text-xs">→</span>
                </Link>
                <Link
                  href="/about"
                  className="nav-link-lens p-3 border-2 flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>ABOUT</span>
                  <span className="font-pixel text-xs">→</span>
                </Link>
                <Link
                  href="/blog"
                  className="nav-link-lens p-3 border-2 flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>BLOG</span>
                  <span className="font-pixel text-xs">→</span>
                </Link>
                <Link
                  href="/contact"
                  className="nav-link-lens contact p-3 border-2 flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>CONTACT</span>
                  <span className="font-pixel text-xs">→</span>
                </Link>
              </div>
            )}
          </nav>

          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mt-10">
            {/* Left Column: Hero Card */}
            <div className="bg-[#0F1517] text-[#EDE6D8] border-6 border-[#0F1517] shadow-[12px_12px_0_#C99A55] p-8 sm:p-10 flex flex-col justify-between gap-6">
              <div className="font-mono font-bold text-xs sm:text-sm tracking-widest border-3 border-[#EDE6D8] self-start py-1.5 px-3">
                NIGHT SHIFT // BID.LENS
              </div>

              <div>
                <h1
                  className="gl font-pixel text-6xl sm:text-8xl md:text-9xl !text-[#EDE6D8] leading-none m-0 tracking-tight"
                  style={{ color: "#EDE6D8" }}
                >
                  LENS
                </h1>
                <p
                  className="font-mono mt-4 mb-0 text-base sm:text-lg leading-relaxed !text-[#EDE6D8] text-[#EDE6D8]/90 max-w-lg"
                  style={{ color: "#EDE6D8" }}
                >
                  Photographer and videographer by passion, with the editing skills to finish what I shoot. The other half of the engineer.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.instagram.com/unfocused.nerd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bt inline-flex items-center min-h-[52px] px-6 bg-[#C99A55] text-[#0F1517] font-mono font-bold tracking-widest text-sm border-5 border-[#EDE6D8] shadow-[7px_7px_0_#070B0C] text-decoration-none cursor-pointer"
                >
                  FOLLOW @unfocused.nerd ↗
                </a>
                <a
                  href="#work"
                  className="bt inline-flex items-center min-h-[52px] px-6 bg-[#0F1517] !text-[#EDE6D8] font-mono font-bold tracking-widest text-sm border-5 border-[#EDE6D8] shadow-[7px_7px_0_#070B0C] text-decoration-none cursor-pointer"
                  style={{ color: "#EDE6D8" }}
                >
                  SEE THE WORK ↓
                </a>
              </div>
            </div>

            {/* Right Column: Hero Photo Frame (FIG. 01) */}
            <div className="relative border-6 border-[#0F1517] shadow-[12px_12px_0_#C99A55] bg-[#070B0C] p-3 sm:p-4 overflow-hidden group">
              <div className="relative w-full aspect-[4/3] border-4 border-[#0F1517] overflow-hidden bg-[#070B0C]">
                <Image
                  src={HERO_PHOTO.src}
                  alt={HERO_PHOTO.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div
                  className="absolute top-3 left-3 bg-[#0F1517] !text-[#C99A55] font-mono text-[10px] sm:text-xs font-bold px-3 py-1 border-2 border-[#C99A55] shadow-[2px_2px_0_#070B0C]"
                  style={{ color: "#C99A55" }}
                >
                  FIG. 01 // HERO FRAME
                </div>
              </div>

              <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 !text-[#EDE6D8] px-1 pb-1">
                <div>
                  <div
                    className="font-pixel text-sm sm:text-base !text-[#EDE6D8] uppercase tracking-tight"
                    style={{ color: "#EDE6D8" }}
                  >
                    {HERO_PHOTO.title}
                  </div>
                  <div
                    className="font-mono text-[11px] !text-[#C99A55] mt-0.5 tracking-wider"
                    style={{ color: "#C99A55" }}
                  >
                    {HERO_PHOTO.gear}
                  </div>
                </div>
                <a
                  href={HERO_PHOTO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bt inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FF5C8A] hover:bg-[#C99A55] text-[#0F1517] font-mono font-bold text-xs tracking-wider border-2 border-[#EDE6D8] shadow-[3px_3px_0_#070B0C]"
                >
                  <span>@unfocused.nerd ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── FULL VIEWPORT EDGE-TO-EDGE MARQUEE STRIP (MATCHING TECH PAGE STRIP) ── */}
        <div
          className="w-full bg-[#1F4A4F] !text-[#EDE6D8] border-t-4 border-b-4 border-[#0F1517] py-2.5 sm:py-3 overflow-hidden whitespace-nowrap select-none my-12"
          style={{ color: "#EDE6D8", backgroundColor: "#1F4A4F" }}
        >
          <div className="mq flex font-pixel text-xs sm:text-sm tracking-wider">
            <span className="pr-12">PHOTO ✱ VIDEO ✱ EDIT ✱ COLOUR GRADE ✱ STORY ✱ FRAME ✱</span>
            <span className="pr-12">PHOTO ✱ VIDEO ✱ EDIT ✱ COLOUR GRADE ✱ STORY ✱ FRAME ✱</span>
            <span className="pr-12">PHOTO ✱ VIDEO ✱ EDIT ✱ COLOUR GRADE ✱ STORY ✱ FRAME ✱</span>
            <span className="pr-12">PHOTO ✱ VIDEO ✱ EDIT ✱ COLOUR GRADE ✱ STORY ✱ FRAME ✱</span>
            <span className="pr-12">PHOTO ✱ VIDEO ✱ EDIT ✱ COLOUR GRADE ✱ STORY ✱ FRAME ✱</span>
            <span className="pr-12">PHOTO ✱ VIDEO ✱ EDIT ✱ COLOUR GRADE ✱ STORY ✱ FRAME ✱</span>
          </div>
        </div>

        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 pb-20 box-border">
          {/* Instagram Channels Section */}
          <div id="ig" className="pt-20">
            <h2
              className="font-pixel text-2xl sm:text-3xl m-0 inline-block bg-[#1F4A4F] !text-[#EDE6D8] py-3 px-5 border-5 border-[#0F1517] shadow-[8px_8px_0_#070B0C] uppercase select-none"
              style={{ color: "#EDE6D8", backgroundColor: "#1F4A4F" }}
            >
              Instagram
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              {/* Photo & Video Handle Card — @unfocused.nerd */}
              <div className="cd bg-[#EDE6D8] border-5 border-[#0F1517] shadow-[8px_8px_0_#0F1517] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="font-pixel text-xs bg-[#0F1517] !text-[#EDE6D8] px-2.5 py-1.5 uppercase"
                      style={{ color: "#EDE6D8" }}
                    >
                      Photography & Film
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0F1517]">
                      @unfocused.nerd
                    </span>
                  </div>
                  <h3 className="font-pixel text-2xl text-[#0F1517] m-0">
                    @unfocused.nerd
                  </h3>
                  <p className="font-mono text-sm sm:text-base text-[#0F1517]/85 mt-3 leading-relaxed">
                    Stills, live concerts, celestial captures, wildlife portraits, and cinematic color grading in DaVinci Resolve.
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/unfocused.nerd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bt inline-flex items-center justify-center gap-2 min-h-[46px] px-5 bg-[#C99A55] text-[#0F1517] font-mono font-bold text-xs tracking-wider border-4 border-[#0F1517] shadow-[5px_5px_0_#070B0C] self-start text-decoration-none cursor-pointer"
                >
                  <Camera size={16} /> VISIT @unfocused.nerd ↗
                </a>
              </div>

              {/* Personal Blog & Enquiry Handle Card — @bid_notfound */}
              <div className="cd bg-[#EDE6D8] border-5 border-[#0F1517] shadow-[8px_8px_0_#0F1517] p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-pixel text-xs bg-[#C99A55] text-[#0F1517] px-2.5 py-1.5 uppercase">
                      Personal Blog & Enquiries
                    </span>
                    <span className="font-mono text-xs font-bold text-[#0F1517]">
                      @bid_notfound
                    </span>
                  </div>
                  <h3 className="font-pixel text-2xl text-[#0F1517] m-0">
                    @bid_notfound
                  </h3>
                  <p className="font-mono text-sm sm:text-base text-[#0F1517]/85 mt-3 leading-relaxed">
                    Engineering thoughts, behind-the-scenes project logs, tech discourse, and direct personal enquiries.
                  </p>
                </div>
                <a
                  href="https://www.instagram.com/bid_notfound/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bt inline-flex items-center justify-center gap-2 min-h-[46px] px-5 bg-[#1F4A4F] !text-[#EDE6D8] font-mono font-bold text-xs tracking-wider border-4 border-[#0F1517] shadow-[5px_5px_0_#070B0C] self-start text-decoration-none cursor-pointer"
                  style={{ color: "#EDE6D8" }}
                >
                  <Camera size={16} /> VISIT @bid_notfound ↗
                </a>
              </div>
            </div>

            {/* Featured Instagram Posts — Exact Dispatches */}
            <div className="mt-12 border-5 border-[#0F1517] bg-[#EDE6D8] p-5 sm:p-7 shadow-[10px_10px_0_#0F1517]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b-4 border-[#0F1517]">
                <div>
                  <div className="font-mono text-xs font-bold text-[#0F1517]/70 tracking-widest uppercase">
                    FEED SYNC // VERIFIED DISPATCHES
                  </div>
                  <h3 className="font-pixel text-xl sm:text-2xl text-[#0F1517] m-0 mt-1 uppercase">
                    Featured Instagram Posts
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-[#C99A55] text-[#0F1517] px-3 py-1.5 border-2 border-[#0F1517] shadow-[2px_2px_0_#0F1517]">
                    4 FEATURED CLICKS
                  </span>
                  <a
                    href="https://www.instagram.com/unfocused.nerd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono font-bold text-xs bg-[#0F1517] !text-[#EDE6D8] px-3 py-1.5 border-2 border-[#0F1517] hover:bg-[#FF5C8A] hover:text-[#0F1517] transition-colors"
                  >
                    @unfocused.nerd ↗
                  </a>
                </div>
              </div>

              {/* 4 Featured Posts Responsive Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {FEATURED_INSTAGRAM_POSTS.map((post, idx) => (
                  <a
                    key={post.id}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between bg-[#EDE6D8] border-4 border-[#0F1517] shadow-[6px_6px_0_#0F1517] hover:shadow-[9px_9px_0_#C99A55] hover:-translate-y-1 transition-all overflow-hidden text-decoration-none"
                  >
                    {/* Top Exact Thumbnail Container */}
                    <div className="relative w-full aspect-[4/5] bg-[#070B0C] border-b-4 border-[#0F1517] overflow-hidden">
                      <Image
                        src={post.src}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-[#0F1517] !text-[#EDE6D8] font-mono text-[10px] font-bold px-2 py-0.5 border border-[#EDE6D8]">
                        POST #{idx + 1}
                      </div>
                      <div className="absolute top-2.5 right-2.5 bg-[#C99A55] text-[#0F1517] font-mono text-[10px] font-bold px-2 py-0.5 border border-[#0F1517]">
                        SLIDE 0{post.imgIndex}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 flex flex-col justify-between flex-1 gap-3 bg-[#EDE6D8]">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#0F1517]/70">
                          <span>{post.location}</span>
                          <span className="text-[#C99A55] font-pixel text-[10px]">IG POST</span>
                        </div>
                        <h4 className="font-pixel text-sm text-[#0F1517] mt-1 mb-1 leading-snug uppercase">
                          {post.title}
                        </h4>
                        <p className="font-mono text-xs text-[#0F1517]/85 m-0 line-clamp-2 leading-relaxed">
                          {post.caption}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t-2 border-[#0F1517]/20 flex items-center justify-between font-mono text-[11px] font-bold">
                        <span className="text-[#0F1517]/60 truncate max-w-[130px]">{post.gear}</span>
                        <span className="text-[#0F1517] group-hover:text-[#FF5C8A] inline-flex items-center gap-1 transition-colors">
                          VIEW ON IG ↗
                        </span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Work / Photo Gallery — 8 Featured Stacks */}
          <div id="work" className="pt-24">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2
                  className="font-pixel text-2xl sm:text-3xl m-0 inline-block bg-[#0F1517] !text-[#EDE6D8] py-3 px-5 border-5 border-[#0F1517] shadow-[8px_8px_0_#C99A55] uppercase select-none"
                  style={{ color: "#EDE6D8", backgroundColor: "#0F1517" }}
                >
                  Work / Stills
                </h2>
                <div className="font-mono text-xs text-[#0F1517]/70 mt-2">
                  CLICK ANY STACK TO EXPAND ALL FRAMES & REDIRECT TO INSTAGRAM
                </div>
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold bg-[#EDE6D8] border-3 border-[#0F1517] px-3 py-1.5 text-[#0F1517] flex items-center gap-1.5">
                <span>[ 8 STACKS · 25 FRAMES ]</span>
              </span>
            </div>

            {/* 8 Featured Photo Stacks Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {LENS_STACKS.map((stack) => (
                <PhotoStackCard
                  key={stack.id}
                  stack={stack}
                  onSelect={(s) => setSelectedStack(s)}
                />
              ))}
            </div>

            <div className="mt-10 text-center sm:text-left flex flex-wrap items-center gap-4">
              <a
                href="https://www.instagram.com/unfocused.nerd/"
                target="_blank"
                rel="noopener noreferrer"
                className="bt inline-flex items-center min-h-[48px] px-6 bg-[#0F1517] !text-[#EDE6D8] font-mono font-bold text-xs tracking-widest border-4 border-[#0F1517] shadow-[6px_6px_0_#C99A55] text-decoration-none cursor-pointer"
                style={{ color: "#EDE6D8" }}
              >
                FOLLOW @unfocused.nerd ON INSTAGRAM ↗
              </a>
            </div>
          </div>

          {/* Videography & Motion Reel Section */}
          <div id="video" className="pt-24">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h2
                  className="font-pixel text-2xl sm:text-3xl m-0 inline-block bg-[#0F1517] !text-[#EDE6D8] py-3 px-5 border-5 border-[#0F1517] shadow-[8px_8px_0_#C99A55] uppercase select-none"
                  style={{ color: "#EDE6D8", backgroundColor: "#0F1517" }}
                >
                  Video / Motion
                </h2>
                <div className="font-mono text-xs text-[#0F1517]/70 mt-2">
                  DYNAMIC AUTO-RESCALING THEATER // 24FPS CINE CUTS, VERTICAL REELS & SILENT MASTERS
                </div>
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold bg-[#EDE6D8] border-3 border-[#0F1517] px-3 py-1.5 text-[#0F1517] flex items-center gap-1.5">
                <span>[ 8 CUTS · HERO: DARK NOCTURNE ]</span>
              </span>
            </div>

            {/* Interactive Adaptive Rescaling Video Player */}
            <AdaptiveVideoPlayer />
          </div>

          {/* Disciplines & Gear Matrices */}
          <div className="pt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What I Shoot */}
            <div className="cd bg-[#EDE6D8] border-5 border-[#0F1517] shadow-[10px_10px_0_#0F1517] p-6 sm:p-7">
              <div className="font-pixel text-xl sm:text-2xl text-[#0F1517] mb-4 uppercase">
                What I shoot
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "PORTRAITS",
                  "STREET & DOCUMENTARY",
                  "CONCERTS & LIVE STAGE",
                  "ASTROPHOTOGRAPHY",
                  "HERITAGE & ARCHITECTURE",
                  "WILDLIFE",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono font-bold text-xs sm:text-sm border-3 border-[#0F1517] text-[#0F1517] px-3 py-1.5 bg-[#EDE6D8]"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>

            {/* Gear + Editing */}
            <div className="cd bg-[#EDE6D8] border-5 border-[#0F1517] shadow-[10px_10px_0_#0F1517] p-6 sm:p-7">
              <div className="font-pixel text-xl sm:text-2xl text-[#0F1517] mb-4 uppercase">
                Gear + editing
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "SONY ALPHA A6700 + 18-135MM",
                  "NOTHING 3A PRO 3X PERISCOPE",
                  "DAVINCI RESOLVE",
                  "LIGHTROOM",
                  "PHOTOSHOP",
                  "CANVA",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="font-mono font-bold text-xs sm:text-sm border-3 border-[#0F1517] text-[#0F1517] px-3 py-1.5 bg-[#C99A55] text-[#0F1517]"
                    style={{ color: "#0F1517", backgroundColor: "#C99A55" }}
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Closing Call to Action Banner */}
          <div
            className="mt-24 bg-[#0F1517] !text-[#EDE6D8] border-6 border-[#0F1517] shadow-[12px_12px_0_#C99A55] p-8 sm:p-14 text-center"
            style={{ color: "#EDE6D8", backgroundColor: "#0F1517" }}
          >
            <div
              className="font-pixel text-4xl sm:text-6xl md:text-7xl uppercase mb-6 leading-tight !text-[#EDE6D8]"
              style={{ color: "#EDE6D8" }}
            >
              Let’s shoot something.
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="bt inline-flex items-center min-h-[52px] px-7 bg-[#C99A55] text-[#0F1517] font-mono font-bold tracking-widest text-sm border-5 border-[#EDE6D8] shadow-[7px_7px_0_#070B0C]"
              >
                CONTACT →
              </Link>
              <Link
                href="/"
                className="bt inline-flex items-center min-h-[52px] px-7 bg-[#0F1517] !text-[#EDE6D8] font-mono font-bold tracking-widest text-sm border-5 border-[#EDE6D8] shadow-[7px_7px_0_#070B0C]"
                style={{ color: "#EDE6D8" }}
              >
                ← BACK TO THE CODE
              </Link>
            </div>
            <div
              className="font-mono text-xs sm:text-sm mt-8 tracking-wider !text-[#EDE6D8] opacity-80"
              style={{ color: "#EDE6D8" }}
            >
              © 2026 BIDYA BHUSHAN NANDA · NEW DELHI, INDIA
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Interactive Photo Stack Expanded Lightbox Modal */}
      <PhotoStackModal
        stack={selectedStack}
        onClose={() => setSelectedStack(null)}
      />
    </div>
  );
}
