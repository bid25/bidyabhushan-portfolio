// Lens Videography Catalog
export interface LensVideo {
  id: string;
  title: string;
  subtitle: string;
  gear: string;
  src: string;
  poster: string;
  width: number;
  height: number;
  aspectRatio: string;
  aspectLabel: string;
  isVertical: boolean;
  hasAudio: boolean;
  isHero: boolean;
  duration: number;
  instagramUrl: string;
}

export const LENS_VIDEOS: LensVideo[] = [
  {
    id: "hero-dark",
    title: "DARK NOCTURNE",
    subtitle: "Low-light cinema study, 24fps high-latitude tone mapping in DaVinci Resolve.",
    gear: "DAVINCI RESOLVE · 4:3 CINE · 24FPS",
    src: "/videos/lens/hero-dark.mp4",
    poster: "/images/lens/video-posters/hero-dark.jpg",
    width: 1920,
    height: 1440,
    aspectRatio: "1920/1440",
    aspectLabel: "4:3",
    isVertical: false,
    hasAudio: true,
    isHero: true,
    duration: 34.6,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "bidi-2",
    title: "STREET RHYTHM // BIDI 02",
    subtitle: "Dynamic handheld street movement, textured neon grading, rhythm sync.",
    gear: "NOTHING PHONE (3A) PRO · 9:16 VERTICAL · 24FPS",
    src: "/videos/lens/bidi-2.mp4",
    poster: "/images/lens/video-posters/bidi-2.jpg",
    width: 608,
    height: 1080,
    aspectRatio: "608/1080",
    aspectLabel: "9:16",
    isVertical: true,
    hasAudio: true,
    isHero: false,
    duration: 27.4,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "reel-1",
    title: "CINEMATIC SHOWREEL 01",
    subtitle: "Montage of narrative cuts, ambient sound design, and color grading highlights.",
    gear: "DAVINCI RESOLVE · 9:16 VERTICAL · 30FPS",
    src: "/videos/lens/reel-1.mp4",
    poster: "/images/lens/video-posters/reel-1.jpg",
    width: 608,
    height: 1080,
    aspectRatio: "608/1080",
    aspectLabel: "9:16",
    isVertical: true,
    hasAudio: true,
    isHero: false,
    duration: 40.3,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "nss-collab",
    title: "COMMUNITY & COLLAB",
    subtitle: "Event documentary coverage, high-energy festival atmosphere, live audio capture.",
    gear: "DAVINCI RESOLVE · 9:16 VERTICAL · 24FPS",
    src: "/videos/lens/nss-collab.mp4",
    poster: "/images/lens/video-posters/nss-collab.jpg",
    width: 608,
    height: 1080,
    aspectRatio: "608/1080",
    aspectLabel: "9:16",
    isVertical: true,
    hasAudio: true,
    isHero: false,
    duration: 20.0,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "no-audio-study",
    title: "URBAN TRANSIENCE // SILENT",
    subtitle: "Atmospheric city frames, architectural pacing, zero diegetic sound.",
    gear: "NOTHING PHONE (3A) PRO · 16:9 LANDSCAPE · SILENT",
    src: "/videos/lens/no-audio-study.mp4",
    poster: "/images/lens/video-posters/no-audio-study.jpg",
    width: 1920,
    height: 1080,
    aspectRatio: "1920/1080",
    aspectLabel: "16:9",
    isVertical: false,
    hasAudio: false,
    isHero: false,
    duration: 10.5,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "no-audio-1-monochrome",
    title: "VERTICAL PERSPECTIVE // SILENT",
    subtitle: "Structural geometry and moving shadows in clean vertical composition.",
    gear: "NOTHING PHONE (3A) PRO · 9:16 VERTICAL · SILENT",
    src: "/videos/lens/no-audio-1-monochrome.mp4",
    poster: "/images/lens/video-posters/no-audio-1-monochrome.jpg",
    width: 608,
    height: 1080,
    aspectRatio: "608/1080",
    aspectLabel: "9:16",
    isVertical: true,
    hasAudio: false,
    isHero: false,
    duration: 14.7,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "vid-stage-pulse",
    title: "STAGE DYNAMICS // CROWD",
    subtitle: "Concert floor lighting, stage laser refraction, and fast motion tracking.",
    gear: "NOTHING PHONE (3A) PRO · 9:16 VERTICAL",
    src: "/videos/lens/vid-stage-pulse.mp4",
    poster: "/images/lens/video-posters/vid-stage-pulse.jpg",
    width: 608,
    height: 1080,
    aspectRatio: "608/1080",
    aspectLabel: "9:16",
    isVertical: true,
    hasAudio: false,
    isHero: false,
    duration: 36.8,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
  {
    id: "vid-night-glow",
    title: "NIGHT GLOW // AMBIENCE",
    subtitle: "Golden hour into dusk, subtle camera push, warm acoustic mood.",
    gear: "NOTHING PHONE (3A) PRO · 9:16 VERTICAL · AUDIO",
    src: "/videos/lens/vid-night-glow.mp4",
    poster: "/images/lens/video-posters/vid-night-glow.jpg",
    width: 608,
    height: 1080,
    aspectRatio: "608/1080",
    aspectLabel: "9:16",
    isVertical: true,
    hasAudio: true,
    isHero: false,
    duration: 14.6,
    instagramUrl: "https://www.instagram.com/unfocused.nerd/",
  },
];

export const HERO_VIDEO: LensVideo = LENS_VIDEOS.find((v) => v.isHero) || LENS_VIDEOS[0];
