export interface FeaturedInstagramPost {
  id: string;
  url: string;
  imgIndex: number;
  src: string;
  tag: string;
  location: string;
  title: string;
  caption: string;
  gear: string;
  account: string;
}

export const FEATURED_INSTAGRAM_POSTS: FeaturedInstagramPost[] = [
  {
    id: "ig-net-cast",
    url: "https://www.instagram.com/p/DTmtOKgk8_K/?img_index=1",
    imgIndex: 1,
    src: "/images/lens/ig/ig_net_cast.jpg",
    tag: "DOCUMENTARY // SLIDE 01",
    location: "ODISHA, INDIA",
    title: "CAMERA MERE HATH...",
    caption: "Casting the circular net at dawn across still river waters.",
    gear: "CANON EOS 1500D · EF-S 18-55MM",
    account: "@unfocused.nerd",
  },
  {
    id: "ig-delhi-pillars",
    url: "https://www.instagram.com/p/DVyBI3dE2yA/?img_index=1",
    imgIndex: 1,
    src: "/images/lens/ig/ig_delhi_pillars.jpg",
    tag: "ARCHITECTURE // SLIDE 01",
    location: "DELHI, INDIA",
    title: "DIL SE DILLI",
    caption: "Low-angle perspective looking up at classical colonial colonnades under dramatic clouds.",
    gear: "NOTHING PHONE (3A) PRO",
    account: "@unfocused.nerd",
  },
  {
    id: "ig-concert-guitar",
    url: "https://www.instagram.com/p/DfY1NNSEy3d/?img_index=1",
    imgIndex: 1,
    src: "/images/lens/ig/ig_concert_guitar.jpg",
    tag: "LIVE STAGE // SLIDE 01",
    location: "BITS PILANI",
    title: "MUKT // ROCKTAVES",
    caption: "High-contrast monochrome solo captured live at Oasis '26 music festival.",
    gear: "SONY ALPHA A6700 · 18-135MM",
    account: "@unfocused.nerd",
  },
  {
    id: "ig-monkey-portrait",
    url: "https://www.instagram.com/p/DeM_O2kk2Xm/?img_index=2",
    imgIndex: 2,
    src: "/images/lens/ig/ig_monkey_portrait.jpg",
    tag: "WILDLIFE // SLIDE 02",
    location: "CANOPY STUDY",
    title: "OKAY! YEH DUNIYA.",
    caption: "Intimate telephoto portrait of a contemplative primate nestled within tree branches.",
    gear: "NIKON D3500 · 70-300MM",
    account: "@unfocused.nerd",
  },
];

