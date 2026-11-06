"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  Film,
  ExternalLink,
  Sliders,
} from "lucide-react";
import { LensVideo, LENS_VIDEOS, HERO_VIDEO } from "@/data/lensVideos";

export function AdaptiveVideoPlayer() {
  const [activeVideo, setActiveVideo] = useState<LensVideo>(HERO_VIDEO);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(HERO_VIDEO.duration || 0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // When activeVideo changes:
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      setCurrentTime(0);
      setDuration(activeVideo.duration || 0);

      // Enforce muted if video has no audio
      if (!activeVideo.hasAudio) {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = isMuted;
      }

      // If user had already clicked or played, auto-play next video smoothly
      if (hasUserInteracted) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        }
      } else {
        setIsPlaying(false);
      }
    }
  }, [activeVideo, hasUserInteracted, isMuted]);

  // Sync video time updates
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      if (videoRef.current.duration && !isNaN(videoRef.current.duration)) {
        setDuration(videoRef.current.duration);
      }
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    setHasUserInteracted(true);
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  // Toggle Mute (only available for videos with audio)
  const toggleMute = () => {
    if (!activeVideo.hasAudio || !videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Replay
  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Seek on timeline click
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = pos * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${mins}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-full">
      {/* Outer Theater Stage */}
      <div
        ref={playerContainerRef}
        className="relative bg-[#070B0C] border-3 sm:border-6 border-[#0F1517] shadow-[5px_5px_0_#1F4A4F] sm:shadow-[12px_12px_0_#1F4A4F] p-2.5 sm:p-6 overflow-hidden flex flex-col justify-between"
      >
        {/* Top Telemetry Bar */}
        <div className="w-full flex flex-wrap items-center justify-between gap-2 pb-2.5 sm:pb-4 border-b-2 sm:border-b-3 border-[#EDE6D8]/20 select-none">
          <div className="flex items-center gap-2">
            <span
              className="font-pixel text-[10px] sm:text-xs bg-[#FF5C8A] !text-[#0F1517] px-2 sm:px-2.5 py-0.5 sm:py-1 uppercase font-bold"
              style={{ color: "#0F1517" }}
            >
              CINE PLAYER
            </span>
            <span
              className="font-mono text-[11px] sm:text-sm font-bold tracking-wider !text-[#EDE6D8] truncate max-w-[170px] sm:max-w-md"
              style={{ color: "#EDE6D8" }}
            >
              {activeVideo.title}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 font-mono text-[10px] sm:text-xs">
            {/* Dynamic Aspect Ratio Telemetry Badge */}
            <span
              className="px-2 py-0.5 border border-[#C99A55] sm:border-2 bg-[#0F1517] !text-[#C99A55] font-bold tracking-widest uppercase text-[9px] sm:text-[11px]"
              style={{ color: "#C99A55" }}
            >
              {activeVideo.aspectLabel} {activeVideo.isVertical ? "VERTICAL" : "LANDSCAPE"}
            </span>

            {/* Audio Capability Status */}
            {activeVideo.hasAudio ? (
              <span
                className="hidden sm:inline-block px-2 py-0.5 border border-[#EDE6D8]/30 bg-[#0F1517] !text-[#EDE6D8] font-bold text-[10px]"
                style={{ color: "#EDE6D8" }}
              >
                STEREO AUDIO
              </span>
            ) : (
              <span
                className="hidden sm:inline-block px-2 py-0.5 border border-[#FF5C8A]/40 bg-[#1F4A4F] !text-[#FF5C8A] font-bold text-[10px]"
                style={{ color: "#FF5C8A" }}
              >
                SILENT MASTER
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Centered Adaptive Video Chamber */}
        <div className="relative w-full my-4 flex items-center justify-center min-h-[340px] sm:min-h-[460px] max-h-[72vh] overflow-hidden">
          {/* Subtle Ambient Studio Background Grid */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#EDE6D8 1px, transparent 1px), linear-gradient(90deg, #EDE6D8 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Adaptive Auto-Rescaling Video Container */}
          <div
            className={`relative mx-auto border-4 border-[#EDE6D8] bg-[#000] shadow-[8px_8px_0_#070B0C] overflow-hidden transition-all duration-500 ease-out flex items-center justify-center ${
              activeVideo.isVertical
                ? "w-full max-w-[340px] sm:max-w-[380px] aspect-[9/16] max-h-[68vh]"
                : activeVideo.aspectLabel === "4:3"
                ? "w-full max-w-[720px] aspect-[4/3] max-h-[66vh]"
                : "w-full max-w-4xl aspect-video max-h-[64vh]"
            }`}
          >
            <video
              ref={videoRef}
              src={activeVideo.src}
              poster={activeVideo.poster}
              playsInline
              loop
              muted={!activeVideo.hasAudio || isMuted}
              onTimeUpdate={handleTimeUpdate}
              onEnded={() => setIsPlaying(false)}
              onClick={togglePlay}
              className="w-full h-full object-contain cursor-pointer"
            />

            {/* Click-to-Play Centered Neo-Brutalist Play Overlay */}
            {!isPlaying && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 bg-[#070B0C]/40 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer select-none group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#C99A55] group-hover:bg-[#FF5C8A] !text-[#0F1517] border-4 border-[#0F1517] shadow-[6px_6px_0_#070B0C] flex items-center justify-center group-hover:scale-105 active:scale-95 transition-all">
                  <Play fill="#0F1517" size={32} className="ml-1" />
                </div>
                <div
                  className="mt-3 font-mono font-bold text-xs sm:text-sm tracking-widest bg-[#0F1517] !text-[#EDE6D8] px-3 py-1 border-2 border-[#EDE6D8] shadow-[3px_3px_0_#070B0C]"
                  style={{ color: "#EDE6D8" }}
                >
                  PLAY {activeVideo.aspectLabel} CUT
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Video Technical Telemetry & Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-mono select-none">
          <div className="text-[#C99A55] font-bold tracking-wider">
            {activeVideo.gear}
          </div>
          <div
            className="text-[#EDE6D8]/80 text-[11px] truncate max-w-sm hidden md:inline-block"
            style={{ color: "#EDE6D8" }}
          >
            {activeVideo.subtitle}
          </div>
        </div>

        {/* Interactive Scrubber & Timeline Bar */}
        <div className="mt-3 flex items-center gap-3 font-mono font-bold text-xs select-none">
          <span
            className="w-12 text-right !text-[#EDE6D8] tabular-nums"
            style={{ color: "#EDE6D8" }}
          >
            {formatTime(currentTime)}
          </span>

          <div
            ref={progressBarRef}
            onClick={handleSeek}
            className="relative flex-1 h-5 sm:h-6 border-3 border-[#EDE6D8] bg-[#000] cursor-pointer p-0.5 overflow-hidden group"
          >
            {/* Progress Fill */}
            <div
              className="h-full bg-[#C99A55] group-hover:bg-[#FF5C8A] transition-colors"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <span
            className="w-12 !text-[#EDE6D8] tabular-nums"
            style={{ color: "#EDE6D8" }}
          >
            {formatTime(duration)}
          </span>
        </div>

        {/* Interactive Bottom Control Toolbar */}
        <div className="mt-4 pt-3 border-t-3 border-[#EDE6D8]/20 flex flex-wrap items-center justify-between gap-3 select-none">
          {/* Left Controls: Play / Pause & Replay */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              className="bt px-3.5 py-1.5 bg-[#C99A55] hover:bg-[#FF5C8A] text-[#0F1517] font-mono font-bold text-xs tracking-wider border-2 border-[#0F1517] shadow-[3px_3px_0_#070B0C] flex items-center gap-1.5 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause size={14} fill="#0F1517" />
                  <span>PAUSE</span>
                </>
              ) : (
                <>
                  <Play size={14} fill="#0F1517" />
                  <span>PLAY</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleReplay}
              className="bt px-2.5 py-1.5 bg-[#0F1517] hover:bg-[#1F4A4F] !text-[#EDE6D8] font-mono font-bold text-xs border-2 border-[#EDE6D8] shadow-[3px_3px_0_#070B0C] flex items-center gap-1 cursor-pointer"
              style={{ color: "#EDE6D8" }}
              title="Replay from start"
            >
              <RotateCcw size={14} />
            </button>

            {/* Audio Toggle: ONLY rendered when video has audio */}
            {activeVideo.hasAudio ? (
              <button
                type="button"
                onClick={toggleMute}
                className={`bt px-3 py-1.5 font-mono font-bold text-xs tracking-wider border-2 border-[#0F1517] shadow-[3px_3px_0_#070B0C] flex items-center gap-1.5 cursor-pointer transition-colors ${
                  !isMuted
                    ? "bg-[#C99A55] text-[#0F1517]"
                    : "bg-[#0F1517] hover:bg-[#1F4A4F] !text-[#EDE6D8] border-[#EDE6D8]"
                }`}
                style={isMuted ? { color: "#EDE6D8" } : undefined}
                aria-label={isMuted ? "Unmute audio" : "Mute audio"}
              >
                {!isMuted ? (
                  <>
                    <Volume2 size={14} />
                    <span>AUDIO ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX size={14} />
                    <span>UNMUTE [AUDIO OFF]</span>
                  </>
                )}
              </button>
            ) : (
              /* Specific No-Audio Indicator: NO audio toggle provided */
              <div
                className="px-3 py-1.5 bg-[#1F4A4F] !text-[#EDE6D8] border-2 border-[#0F1517] font-mono font-bold text-xs tracking-wider flex items-center gap-1.5 opacity-90 select-none"
                style={{ color: "#EDE6D8" }}
              >
                <VolumeX size={14} className="text-[#FF5C8A]" />
                <span>SILENT MASTER // NO AUDIO TRACK</span>
              </div>
            )}
          </div>

          {/* Right Controls: Instagram Post Link & Fullscreen */}
          <div className="flex items-center gap-2">
            <a
              href={activeVideo.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bt px-3 py-1.5 bg-[#FF5C8A] hover:bg-[#0F1517] text-[#0F1517] hover:!text-[#EDE6D8] font-mono font-bold text-xs tracking-wider border-2 border-[#0F1517] shadow-[3px_3px_0_#070B0C] flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span>WATCH ON @unfocused.nerd</span>
              <ExternalLink size={13} />
            </a>

            <button
              type="button"
              onClick={toggleFullscreen}
              className="bt px-2.5 py-1.5 bg-[#0F1517] hover:bg-[#1F4A4F] !text-[#EDE6D8] font-mono font-bold text-xs border-2 border-[#EDE6D8] shadow-[3px_3px_0_#070B0C] flex items-center gap-1 cursor-pointer"
              style={{ color: "#EDE6D8" }}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Filmstrip Carousel: Select between all 8 Videography Works */}
      <div className="mt-8">
        <div className="flex items-center justify-between gap-3 mb-3 select-none">
          <div className="flex items-center gap-2">
            <Film size={16} className="text-[#0F1517]" />
            <span className="font-pixel text-xs sm:text-sm text-[#0F1517] uppercase tracking-wide">
              Videography Reel Archive
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-[#0F1517]/70">
            [ {LENS_VIDEOS.length} CINE CUTS · SELECT TO PLAY ]
          </span>
        </div>

        {/* Sprocket-punched Filmstrip Horizontal Tray */}
        <div className="relative border-3 sm:border-4 border-[#0F1517] bg-[#070B0C] p-2.5 sm:p-4 shadow-[4px_4px_0_#C99A55] sm:shadow-[8px_8px_0_#C99A55] overflow-x-auto">
          {/* Upper Sprocket Holes */}
          <div
            className="h-2.5 mb-3 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #EDE6D8 0 14px, transparent 14px 28px)",
              backgroundSize: "28px 10px",
            }}
          />

          {/* Video Cards Grid / Carousel */}
          <div className="flex items-stretch gap-4 pb-1">
            {LENS_VIDEOS.map((vid, idx) => {
              const isSelected = vid.id === activeVideo.id;
              return (
                <div
                  key={vid.id}
                  onClick={() => {
                    setActiveVideo(vid);
                    setHasUserInteracted(true);
                  }}
                  className={`group relative flex-shrink-0 w-48 sm:w-56 border-3 cursor-pointer p-2.5 flex flex-col justify-between transition-all select-none ${
                    isSelected
                      ? "border-[#FF5C8A] bg-[#0F1517] shadow-[5px_5px_0_#FF5C8A] -translate-y-1"
                      : "border-[#EDE6D8]/60 bg-[#0A1012] hover:border-[#C99A55] hover:bg-[#0F1517]"
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveVideo(vid);
                      setHasUserInteracted(true);
                    }
                  }}
                >
                  {/* Poster Box */}
                  <div className="relative w-full aspect-[4/3] border-2 border-[#EDE6D8]/40 overflow-hidden bg-[#000]">
                    <Image
                      src={vid.poster}
                      alt={vid.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="220px"
                    />

                    {/* Format Pill Overlay */}
                    <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[#0F1517]/90 text-[#C99A55] font-mono text-[9px] font-bold border border-[#C99A55]/40 uppercase">
                      {vid.aspectLabel} {vid.isVertical ? "REEL" : "CINE"}
                    </div>

                    {/* Audio Status Pill */}
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 bg-[#0F1517]/90 font-mono text-[9px] border border-[#EDE6D8]/30">
                      {vid.hasAudio ? (
                        <span className="text-[#EDE6D8]">AUDIO</span>
                      ) : (
                        <span className="text-[#FF5C8A]">SILENT</span>
                      )}
                    </div>

                    {/* Duration Watermark */}
                    <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 bg-[#0F1517]/90 !text-[#EDE6D8] font-mono text-[9px] font-bold tabular-nums">
                      {formatTime(vid.duration)}
                    </div>

                    {/* Currently Playing Indicator */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#FF5C8A]/20 flex items-center justify-center">
                        <span className="font-pixel text-[10px] bg-[#FF5C8A] !text-[#0F1517] px-2 py-1 font-bold shadow-[2px_2px_0_#070B0C]">
                          PLAYING
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Meta Content */}
                  <div className="mt-2.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#C99A55] font-bold mb-1">
                      <span>CUT #{String(idx + 1).padStart(2, "0")}</span>
                      {vid.isHero && <span className="text-[#FF5C8A]">HERO</span>}
                    </div>
                    <div
                      className={`font-pixel text-[11px] sm:text-xs uppercase tracking-tight line-clamp-2 min-h-[2rem] leading-snug ${
                        isSelected
                          ? "!text-[#FF5C8A]"
                          : "!text-[#EDE6D8] group-hover:text-[#C99A55]"
                      }`}
                      style={{ color: isSelected ? "#FF5C8A" : "#EDE6D8" }}
                    >
                      {vid.title}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Lower Sprocket Holes */}
          <div
            className="h-2.5 mt-3 opacity-60"
            style={{
              backgroundImage:
                "linear-gradient(90deg, #EDE6D8 0 14px, transparent 14px 28px)",
              backgroundSize: "28px 10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}
