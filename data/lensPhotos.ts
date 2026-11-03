export interface LensPhoto {
  id: string;
  src: string;
  title: string;
  caption: string;
  gear: string;
  aspect: string;
  instagramUrl: string;
}

export interface LensStack {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  photos: LensPhoto[];
}

export const HERO_PHOTO: LensPhoto = {
  id: "hero",
  src: "/images/lens/hero-blood-moon.jpg",
  title: "BLOOD MOON // LUNAR ECLIPSE",
  caption: "Total lunar eclipse capturing the crimson Rayleigh scattering across the lunar surface.",
  gear: "NOTHING PHONE (3A) PRO · 5.6MM F1.9 · 20.0S · ISO 100",
  aspect: "aspect-[4/3]",
  instagramUrl: "https://www.instagram.com/unfocused.nerd/",
};

export const LENS_STACKS: LensStack[] = [
  {
    id: "01",
    tag: "CONCERT & LIVE STAGE // SONY A6700 & NOTHING 3A PRO",
    title: "LIVE STAGE // STRINGS & BRASS",
    subtitle: "High-energy stage performances bathed in neon washes, dynamic stage lights, and raw musical expression.",
    photos: [
      {
        id: "p01-1",
        src: "/images/lens/concert-guitarist-01.jpg",
        title: "ELECTRIC PULSE",
        caption: "Lead guitarist under dual magenta and emerald stage wash.",
        gear: "SONY ALPHA A6700 · E 18-135MM F3.5-5.6 · 135MM F5.6 · 1/200S · ISO 6400",
        aspect: "aspect-[4/5]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p01-2",
        src: "/images/lens/concert-guitarist-02.jpg",
        title: "WARM HEADSTOCK",
        caption: "Intense fretboard close-up with warm amber key light.",
        gear: "SONY ALPHA A6700 · E 18-135MM F3.5-5.6 · 91MM F5.6 · 1/200S · ISO 6400",
        aspect: "aspect-[4/5]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p01-3",
        src: "/images/lens/concert-guitarist-mono.jpg",
        title: "MONOCHROME SOLO",
        caption: "High-contrast black & white isolation of fingerpicking technique.",
        gear: "SONY ALPHA A6700 · E 18-135MM F3.5-5.6 · 84MM F5.6 · 1/200S · ISO 2000",
        aspect: "aspect-[4/5]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p01-4",
        src: "/images/lens/concert-saxophonist.jpg",
        title: "MIDNIGHT SAXOPHONE",
        caption: "Brass player soloing under deep crimson wash during live festival set.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/35S · ISO 414",
        aspect: "aspect-[9/16]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "02",
    tag: "FESTIVAL & EVENT // NOTHING 3A PRO PERISCOPE",
    title: "ARENA & FESTIVAL CROWDS",
    subtitle: "Atmospheric arena beams, silhouette hands, and synchronized LED visual displays.",
    photos: [
      {
        id: "p02-1",
        src: "/images/lens/concert-crowd-lasers.jpg",
        title: "LASER HAZE",
        caption: "Wide festival stage engulfed in violet lasers and smoke haze.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/35S · ISO 650",
        aspect: "aspect-[16/9]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p02-2",
        src: "/images/lens/concert-crowd-silhouette.jpg",
        title: "BEAM & SILHOUETTE",
        caption: "Audience silhouette raised into golden spotlight beams.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/50S · ISO 144",
        aspect: "aspect-[16/9]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p02-3",
        src: "/images/lens/concert-stage-screens.jpg",
        title: "VISUAL IMMERSION",
        caption: "Massive LED backdrop projecting digital artwork over the performer silhouettes.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/105S · ISO 71",
        aspect: "aspect-[9/16]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "03",
    tag: "WILDLIFE & BIRDS // TELEPHOTO & CANON EOS",
    title: "AVIAN & WILDLIFE PORTRAITS",
    subtitle: "Fine plumage textures, expressive primates, and wild creatures captured in their natural canopy.",
    photos: [
      {
        id: "p03-1",
        src: "/images/lens/wildlife-peacock.jpg",
        title: "TURQUOISE PLUMAGE",
        caption: "Indian peacock displaying shimmering neck feathers amidst vibrant foliage.",
        gear: "NIKON D3500 · 70-300MM F4.5-6.3 · 300MM F6.3 · 1/125S · ISO 400",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p03-2",
        src: "/images/lens/wildlife-macaque.jpg",
        title: "CONTEMPLATION",
        caption: "Intimate portrait of an Indian rhesus macaque with soulful eye detail.",
        gear: "NIKON D3500 · 70-300MM F4.5-6.3 · 300MM F6.3 · 1/125S · ISO 400",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p03-3",
        src: "/images/lens/wildlife-woodpecker.jpg",
        title: "FLAMEBACK CREST",
        caption: "Lesser goldenback woodpecker clinging to bark with fiery red crest.",
        gear: "CANON EOS 1500D · EF-S 18-55MM F3.5-5.6 · 55MM F5.6 · 1/100S · ISO 400",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p03-4",
        src: "/images/lens/wildlife-jungle-civet.jpg",
        title: "CANOPY SHADOWS",
        caption: "Wild animal camouflaged amongst dense rainforest branches.",
        gear: "NIKON D3500 · 70-300MM F4.5-6.3 · 280MM F6.3 · 1/125S · ISO 400",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "04",
    tag: "HERITAGE & MONUMENTS // SONY A6700 18-135MM",
    title: "HERITAGE & MONUMENTS",
    subtitle: "Timeless Mughal, Hindu, and colonial architectural monuments framed through historic stonework.",
    photos: [
      {
        id: "p04-1",
        src: "/images/lens/heritage-qutub-minar.jpg",
        title: "SANDSTONE SPIRE",
        caption: "Qutub Minar framed through the ruined sandstone arches of the Qutb Complex.",
        gear: "SONY ALPHA A6700 · E 18-135MM F3.5-5.6 · 57MM F8.0 · 1/500S · ISO 320",
        aspect: "aspect-[9/16]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p04-2",
        src: "/images/lens/heritage-clock-tower.jpg",
        title: "ARCHWAY FRAMED",
        caption: "University clock tower centered through a bright ochre doorway.",
        gear: "SONY ALPHA A6700 · E 18-135MM F3.5-5.6 · 50MM F5.6 · 1/500S · ISO 160",
        aspect: "aspect-[9/16]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p04-3",
        src: "/images/lens/heritage-temple-spire.jpg",
        title: "STONE SHIKHARA",
        caption: "Intricately carved Hindu temple spire rising into clear teal sky.",
        gear: "SONY ALPHA A6700 · E 18-135MM F3.5-5.6 · 20MM F4.5 · 1/200S · ISO 64",
        aspect: "aspect-[9/16]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p04-4",
        src: "/images/lens/heritage-tomb-sunset.jpg",
        title: "DUSK OVER GOLCONDA",
        caption: "Ancient stone tomb monument under pastel pink and purple dusk sky.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/710S · ISO 71",
        aspect: "aspect-[3/4]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "05",
    tag: "RURAL DOCUMENTARY // CANON EOS 1500D",
    title: "RIVERINE & WATERWAYS LIFE",
    subtitle: "The quiet rhythm of river life, wooden boats, and traditional cast-net fishing.",
    photos: [
      {
        id: "p05-1",
        src: "/images/lens/rural-fisherman-net.jpg",
        title: "CASTING THE NET",
        caption: "Fisherman throwing an open circular cast-net from a wooden canoe.",
        gear: "CANON EOS 1500D · EF-S 18-55MM F3.5-5.6 · 46MM F10.0 · 1/250S · ISO 100",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p05-2",
        src: "/images/lens/rural-boatman-river.jpg",
        title: "SOLITARY DRIFT",
        caption: "Lone boatman guiding his craft across calm blue river waters.",
        gear: "CANON EOS 1500D · EF-S 18-55MM F3.5-5.6 · 18MM F8.0 · 1/400S · ISO 100",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "06",
    tag: "WILDLIFE STUDY // NOTHING 3A PRO PERISCOPE",
    title: "CANINE // THE ENCLOSURE",
    subtitle: "The piercing gaze and solitary pacing of the endangered Indian wolf.",
    photos: [
      {
        id: "p06-1",
        src: "/images/lens/wildlife-wolf-stare.jpg",
        title: "THE DIRECT GAZE",
        caption: "Indian wolf pausing to stare directly down the lens through the perimeter wire.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/180S · ISO 71",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p06-2",
        src: "/images/lens/wildlife-wolf-pacing.jpg",
        title: "PERIMETER PATROL",
        caption: "Wolf pacing silently across sunlit sand enclosure.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/220S · ISO 71",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "07",
    tag: "URBAN NOCTURNE // CANON EOS & NOTHING 3A PRO",
    title: "NOCTURNAL & URBAN VISTAS",
    subtitle: "Night rituals, dark garage machinery, and city monuments framed against flight paths.",
    photos: [
      {
        id: "p07-1",
        src: "/images/lens/night-puri-chariot.jpg",
        title: "ILLUMINATED RATH",
        caption: "The majestic Jagannath chariot illuminated against deep night sky during festival rituals.",
        gear: "CANON EOS 1500D · EF-S 18-55MM F3.5-5.6 · 23MM F4.0 · 1/60S · ISO 800",
        aspect: "aspect-[4/5]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p07-2",
        src: "/images/lens/automotive-night-car.jpg",
        title: "SHADOW MACHINE",
        caption: "Black performance car resting silently in moody garage low-light.",
        gear: "CANON EOS 1500D · EF-S 18-55MM F3.5-5.6 · 55MM F5.6 · 1/40S · ISO 3200",
        aspect: "aspect-[3/2]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p07-3",
        src: "/images/lens/urban-dome-plane.jpg",
        title: "THE FLYOVER",
        caption: "A commercial jet banking over an ancient city dome and vintage streetlamp.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/800S · ISO 71",
        aspect: "aspect-[3/4]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
  {
    id: "08",
    tag: "ASTROPHOTOGRAPHY // NOTHING 3A PRO 20S EXPOSURE",
    title: "CELESTIAL & LUNAR PHASES",
    subtitle: "High-magnification telescopic captures of lunar maria, craters, and celestial phases.",
    photos: [
      {
        id: "p08-1",
        src: "/images/lens/hero-blood-moon.jpg",
        title: "BLOOD MOON ECLIPSE",
        caption: "Super blood moon lunar eclipse in deep space.",
        gear: "NOTHING PHONE (3A) PRO · 5.6MM F1.9 · 20.0S · ISO 100",
        aspect: "aspect-[4/3]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p08-2",
        src: "/images/lens/moon-craters.jpg",
        title: "CRATER TOPOGRAPHY",
        caption: "Full moon capture revealing Tycho and Copernicus impact craters.",
        gear: "NOTHING PHONE (3A) PRO · 5.6MM F1.9 · 20.0S · ISO 400",
        aspect: "aspect-[4/3]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
      {
        id: "p08-3",
        src: "/images/lens/moon-crescent.jpg",
        title: "CRESCENT NIGHT",
        caption: "Delicate crescent sliver glowing against twilight rooftop canopy.",
        gear: "NOTHING PHONE (3A) PRO (3X PERISCOPE) · 13.3MM F2.6 · 1/25S · ISO 1466",
        aspect: "aspect-[9/16]",
        instagramUrl: "https://www.instagram.com/unfocused.nerd/",
      },
    ],
  },
];
