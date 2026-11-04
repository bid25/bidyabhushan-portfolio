"use client";

import React, { useEffect, useRef } from "react";

interface CodeToCameraStoryProps {
  onEnterLens?: () => void;
}

const CSS_STYLE = `body{margin:0;background:#FFD93B}
.story{position:relative;height:var(--len,8000px);background:#0F1517}
.stg{position:sticky;top:0;height:min(760px,100svh);overflow:hidden;background:#FFD93B}
.cg{position:absolute;left:50%;top:52%;translate:-50% -50%;width:min(860px,92%);display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:64px;gap:14px}
.cl{display:flex;align-items:center;justify-content:center;padding:0 2px}.cl>.a{width:100%}
.afh{position:absolute;left:50%;top:50%}
.afl{position:absolute;left:-4px;top:-30px;font-family:'IBM Plex Mono',monospace;;font-weight:600;font-size:12px;letter-spacing:2px;white-space:nowrap}
.cp{font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(12px,1.8vw,19px);letter-spacing:3px;background:#0F1517;color:#EDE6D8;border:3px solid #EDE6D8;padding:10px 16px;display:inline-block;box-shadow:6px 6px 0 #C99A55}
.cta{display:inline-flex;align-items:center;min-height:52px;padding:0 28px;background:#C99A55;color:#0F1517;font-family:'IBM Plex Mono',monospace;font-weight:600;letter-spacing:2px;text-decoration:none;border:5px solid #EDE6D8;box-shadow:7px 7px 0 #070B0C}
.cd{transition:transform .1s}.cd:hover{transform:translate(-3px,-3px)}
.skip{position:absolute;right:18px;top:18px;z-index:9;background:#EDE6D8;color:#0B3D2E;font-family:'Space Mono',monospace;font-weight:700;font-size:14px;border:4px solid #0B3D2E;box-shadow:5px 5px 0 #0B3D2E;min-height:44px;padding:0 16px;display:inline-flex;align-items:center;text-decoration:none}
@keyframes fik{from{opacity:0}to{opacity:1}}
@keyframes fok{from{opacity:1}to{opacity:0}}
@keyframes dmk{from{opacity:1}to{opacity:var(--o1,.4)}}
@keyframes vik{from{opacity:0;visibility:hidden}to{opacity:1;visibility:visible}}
@keyframes wrk{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}
@keyframes blk{from{filter:blur(var(--b0,0px)) brightness(var(--br0,1))}to{filter:blur(var(--b1,0px)) brightness(var(--br1,1))}}
@keyframes mvk{from{translate:var(--x0,0px) var(--y0,0px);scale:var(--s0,1);rotate:var(--rt0,0deg)}to{translate:var(--x1,0px) var(--y1,0px);scale:var(--s1,1);rotate:var(--rt1,0deg)}}
@keyframes ppk{from{scale:2.4;opacity:0}to{scale:1;opacity:1}}
@keyframes sxk{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes wpk{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0 0 0 0)}}
@keyframes edk{from{left:100%}to{left:0%}}
@keyframes flk{0%{opacity:0}50%{opacity:.9}100%{opacity:0}}
@keyframes unk{from{max-width:2.2em;opacity:1}to{max-width:0;opacity:0}}
@keyframes afk{0%{left:16%;top:15%}16%{left:84%;top:50%}32%{left:16%;top:85%}48%{left:84%;top:15%}64%{left:50%;top:85%}80%{left:16%;top:50%}100%{left:50%;top:50%}}
@keyframes afck{from{scale:1.15;opacity:.8}to{scale:.94;opacity:1}}
@keyframes bln{50%{opacity:0}}.bl2{animation:bln 1s steps(1) infinite}
@keyframes gln{0%,90%,100%{text-shadow:8px 8px 0 #FF5C8A}93%{text-shadow:-6px 0 #FF5C8A,6px 0 #0B3D2E}96%{text-shadow:6px 0 #FF5C8A,-6px 0 #0B3D2E}}.gl{animation:gln 3.4s infinite}
@supports (animation-timeline:view()){
.story{view-timeline:--all block}
.a{animation-fill-mode:both;animation-timing-function:linear;animation-timeline:--all;animation-range:var(--r,contain 0% contain 100%)}
.fi{animation-name:fik}.fo{animation-name:fok}.dim{animation-name:dmk}.vi{animation-name:vik}.wr{animation-name:wrk}.bl{animation-name:blk}.mv{animation-name:mvk}.pp{animation-name:ppk}.sx{animation-name:sxk}.wp{animation-name:wpk}.ed{animation-name:edk}.fl{animation-name:flk}.afc{animation-name:afck}.unc{animation-name:unk}
.afh{animation-name:fik,afk;animation-range:contain 47% contain 48%,contain 48% contain 58%;animation-timing-function:linear,steps(1,end)}
}
@media (max-width:720px){.note{display:none}.cg{gap:10px;grid-auto-rows:60px}.afh{height:70px!important}.skip{top:14px;right:14px}}
@media (prefers-reduced-motion:reduce){.a{animation:none!important}}

/* ── Hardware Compositing & Antighosting Rules ── */
.stg {
  contain: paint layout size;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.a, #act-1-stage, #act-2-stage, #act-2-hud, #act-3-stage, #stage-404, .cp {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  will-change: transform, opacity;
}
/* Ensure elements that animate in default to hidden so dropped frames never reveal them */
.pp, .fi, .vi {
  opacity: 0;
}
.vi {
  visibility: hidden;
}
.wr {
  clip-path: inset(0 100% 0 0);
}
#stage-404 {
  opacity: 0;
  transition: opacity 0.15s ease-out;
}
#stage-404.stage-active {
  opacity: 1;
}
#act-3-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* ── DEV HOME & SKIP Navigation Buttons ── */
.home-btn {
  position: absolute;
  left: 18px;
  top: 18px;
  z-index: 99;
  background: #EDE6D8;
  color: #0B3D2E;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  border: 4px solid #0B3D2E;
  box-shadow: 5px 5px 0 #0B3D2E;
  min-height: 44px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.1s, box-shadow 0.1s, background-color 0.1s;
  cursor: pointer;
}
.home-btn:hover {
  background: #FFD93B;
  color: #0B3D2E;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #0B3D2E;
}
.skip {
  position: absolute;
  right: 18px;
  top: 18px;
  z-index: 99;
  background: #EDE6D8;
  color: #0B3D2E;
  font-family: 'Space Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  border: 4px solid #0B3D2E;
  box-shadow: 5px 5px 0 #0B3D2E;
  min-height: 44px;
  padding: 0 16px;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  transition: transform 0.1s, box-shadow 0.1s, background-color 0.1s;
  cursor: pointer;
}
.skip:hover {
  background: #FF5C8A;
  color: #0B3D2E;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #0B3D2E;
}

@media (max-width: 720px) {
  .home-btn {
    top: 14px;
    left: 14px;
    padding: 0 10px;
    font-size: 12px;
    min-height: 40px;
  }
}

/* ── JS Fallback for browsers without animation-timeline: view() ── */
.story-fallback .a {
  animation-fill-mode: both;
  animation-timing-function: linear;
  animation-duration: 1s;
  animation-play-state: paused;
}
.story-fallback .fi { animation-name: fik; }
.story-fallback .fo { animation-name: fok; }
.story-fallback .dim { animation-name: dmk; }
.story-fallback .vi { animation-name: vik; }
.story-fallback .wr { animation-name: wrk; }
.story-fallback .bl { animation-name: blk; }
.story-fallback .mv { animation-name: mvk; }
.story-fallback .pp { animation-name: ppk; }
.story-fallback .sx { animation-name: sxk; }
.story-fallback .wp { animation-name: wpk; }
.story-fallback .ed { animation-name: edk; }
.story-fallback .fl { animation-name: flk; }
.story-fallback .afc { animation-name: afck; }
.story-fallback .unc { animation-name: unk; }
.story-fallback .afh {
  animation-name: fik, afk;
  animation-timing-function: linear, steps(1, end);
}
`;

const MARKUP_HTML = "<div class=\"story\"><div class=\"stg\"><div id=\"act-1-stage\" style=\"position:absolute;inset:0;background:#FFD93B;background-image:radial-gradient(#0B3D2E29 1.6px,transparent 1.6px);background-size:24px 24px\"><div class=\"a fo \" style=\"--r:contain 33% contain 38%;position:absolute;inset:0\"><div class=\"a bl \" style=\"--r:contain 29% contain 36%;position:absolute;inset:0;--b0:0px;--b1:3px\"><div style=\"position:absolute;left:50%;top:9%;translate:-50% 0;width:min(660px,90%);background:#0B3D2E;border:5px solid #0B3D2E;box-shadow:10px 10px 0 #FF5C8A\">\n<div style=\"background:#FFD93B;color:#0B3D2E;font-family:'Press Start 2P',monospace;font-size:10px;padding:10px 14px;display:flex;justify-content:space-between\"><span>BN.TERMINAL</span><span>[ _ ][ X ]</span></div>\n<div style=\"font-family:'Space Mono',monospace;font-size:clamp(12px,1.55vw,17px);line-height:1.9;padding:14px 18px 16px;color:#FFF6C2\"><div style=\"color:#FFD93B\">~/bn $ whoami</div><div class=\"a wr \" style=\"--r:contain 1% contain 5%;color:#FFF6C2\">&gt; bid. full-stack, ai/ml, embedded.</div><div class=\"a wr \" style=\"--r:contain 6% contain 10%;color:#FFD93B\">~/bn $ find . -name \"the-other-half\"</div><div class=\"a wr \" style=\"--r:contain 11% contain 15%;color:#FF5C8A\">&gt; 404: bid_notfound</div></div></div><div id=\"stage-404\" style=\"position:absolute;left:50%;top:46%;translate:-50% 0;text-align:center;width:92%\"><div class=\"a pp \" style=\"--r:contain 17% contain 20%;\"><div class=\"gl\" style=\"font-family:'Press Start 2P',monospace;font-size:clamp(64px,17vw,190px);line-height:1;color:#0B3D2E;text-shadow:8px 8px 0 #FF5C8A\">404</div></div>\n<div class=\"a wr \" style=\"--r:contain 20% contain 23%;\"><div style=\"font-family:'Press Start 2P',monospace;font-size:clamp(11px,1.9vw,20px);color:#0B3D2E;margin-top:18px;letter-spacing:2px\">BID NOT FOUND</div></div></div>\n<div class=\"a fi \" style=\"--r:contain 23% contain 26%;position:absolute;right:6%;bottom:10%\"><div style=\"font-family:'Caveat',cursive;font-size:clamp(22px,3vw,34px);color:#0B3D2E;rotate:-4deg;border-bottom:3px dashed #0B3D2E\">(yes, that\u2019s also my handle.)</div></div></div></div></div><div class=\"a wp \" style=\"--r:contain 31% contain 38%;position:absolute;inset:0;overflow:hidden\"><div style=\"position:absolute;inset:0;background:#0F1517;background-image:linear-gradient(#EDE6D80f 2px,transparent 2px),linear-gradient(90deg,#EDE6D80f 2px,transparent 2px);background-size:80px 80px\"></div><div id=\"act-2-stage\" style=\"position:absolute;inset:0\"><div class=\"a fi \" style=\"--r:contain 39% contain 42%;position:absolute;left:0;right:0;top:8%\"><div class=\"a fo \" style=\"--r:contain 66% contain 70%;text-align:center\"><div style=\"font-family:'Archivo Black',sans-serif;font-size:clamp(34px,7vw,84px);line-height:1;color:#EDE6D8;letter-spacing:-1px;white-space:nowrap\"><div class=\"a unc \" style=\"--r:contain 59% contain 63%;display:inline-block;overflow:hidden;vertical-align:bottom;color:#C99A55\">UN</div>FOCUSED.</div></div></div><div class=\"a fo \" style=\"--r:contain 66% contain 70%;position:absolute;inset:0\"><div class=\"cg\"><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 40.0% contain 43.0%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">FULL-STACK</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 40.6% contain 43.6%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">AI/ML</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 41.2% contain 44.2%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">EMBEDDED</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 41.8% contain 44.8%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">DRONES</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 42.4% contain 45.4%;\"><div class=\"a mv \" style=\"--r:contain 58% contain 60%;--s0:1;--s1:1.1\"><span style=\"display:block;font-family:'Archivo Black',sans-serif;font-size:clamp(14px,2vw,24px);text-align:center;background:#C99A55;color:#0F1517;border:4px solid #EDE6D8;padding:10px 12px;box-shadow:6px 6px 0 #070B0C\">PHOTO + VIDEO</span></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 43.0% contain 46.0%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">LINUX</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 43.6% contain 46.6%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">APPS</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 44.2% contain 47.2%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">REVERSE ENG.</span></div></div></div></div><div class=\"cl\"><div class=\"a fi \" style=\"--r:contain 44.8% contain 47.8%;\"><div class=\"a dim \" style=\"--r:contain 52% contain 60%;--o1:.4\"><div class=\"a bl \" style=\"--r:contain 47% contain 53%;--b0:0px;--b1:2px\"><span style=\"display:block;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.45vw,16px);letter-spacing:1px;text-align:center;line-height:1.25;background:#1F4A4F;color:#EDE6D8;border:3px solid #EDE6D8;padding:8px 10px;box-shadow:5px 5px 0 #070B0C\">HARDWARE</span></div></div></div></div><div class=\"a fi afh\" style=\"--r:contain 47% contain 48%;width:31%;height:76px;translate:-50% -50%;z-index:3\"><div class=\"a afc \" style=\"--r:contain 56% contain 60%;position:absolute;inset:0\"><i style=\"position:absolute;inset:0;border:4px solid #EDE6D8\"></i><i style=\"position:absolute;inset:46% 46%;background:#EDE6D8\"></i><div class=\"a fo \" style=\"--r:contain 58% contain 59%;\"><b class=\"afl\" style=\"color:#EDE6D8\">AF-C</b></div><div class=\"a fi \" style=\"--r:contain 59% contain 60%;\"><b class=\"afl\" style=\"color:#C99A55;background:#0F1517\">AF-S \u25cf LOCK</b></div></div></div></div></div><div class=\"a fi \" style=\"--r:contain 44% contain 48%;position:absolute;left:5%;bottom:18%\"><div class=\"a fo \" style=\"--r:contain 52% contain 55%;\"><div class=\"note\" style=\"font-family:'Caveat',cursive;font-size:clamp(22px,3vw,32px);color:#C99A55;rotate:-5deg\">me, mid-thought</div></div></div><div class=\"a fl\" style=\"--r:contain 59% contain 63%;position:absolute;inset:0;background:#EDE6D8;pointer-events:none\"></div><div class=\"a fo \" style=\"--r:contain 90% contain 94%;position:absolute;inset:0\"><div class=\"a fi \" style=\"--r:contain 68% contain 70%;position:absolute;inset:0\"><div style=\"position:absolute;left:50%;top:7%;translate:-50% 0;font-family:'Archivo Black',sans-serif;font-size:clamp(14px,2vw,24px);background:#C99A55;color:#0F1517;border:4px solid #EDE6D8;padding:8px 18px;box-shadow:6px 6px 0 #070B0C;white-space:nowrap\">PHOTO + VIDEO</div></div><div class=\"a fi \" style=\"--r:contain 69% contain 71%;position:absolute;inset:0\"><div class=\"a bl \" style=\"--r:contain 69% contain 76%;position:absolute;inset:0;--b0:8px;--b1:0px;--br0:.5;--br1:1\"><div style=\"position:absolute;left:50%;top:44%;translate:-50% -50%;width:min(620px,84%);aspect-ratio:3/2;border:6px solid #EDE6D8;box-shadow:12px 12px 0 #C99A55;background:#0F1517;position:relative;overflow:hidden\"><img src=\"/images/lens/storyboard/hero.png\" alt=\"Featured sharp frame\" style=\"width:100%;height:100%;object-fit:cover;object-position:center;display:block\" /><div style=\"position:absolute;left:-6px;bottom:-6px;background:#C99A55;color:#0F1517;padding:6px 14px;font-size:12px;font-family:'IBM Plex Mono',monospace;font-weight:600;box-shadow:3px 3px 0 #070B0C;z-index:2\">FIG. 01</div></div></div></div><div class=\"a fi \" style=\"--r:contain 74% contain 76%;position:absolute;inset:0\"><div style=\"position:absolute;left:5%;top:14%;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(12px,1.5vw,16px);background:#0F1517;color:#EDE6D8;border:3px solid #EDE6D8;padding:7px 12px;display:flex;gap:10px;align-items:center\"><span style=\"position:relative;opacity:.8\">bid_notfound<div class=\"a sx \" style=\"--r:contain 76% contain 79%;position:absolute;left:0;right:0;top:50%;height:3px;background:#FF5C8A;transform-origin:left\"></div></span><span style=\"color:#C99A55\">\u2192 found.</span></div></div><div class=\"a fi \" style=\"--r:contain 77% contain 78%;position:absolute;right:5%;top:13%\"><div class=\"a pp \" style=\"--r:contain 77% contain 79%;\"><div style=\"font-family:'Archivo Black',sans-serif;font-size:clamp(18px,3vw,34px);color:#0F1517;background:#C99A55;border:5px solid #0F1517;padding:6px 16px;rotate:6deg;box-shadow:6px 6px 0 #070B0C\">FOUND.</div></div></div><div class=\"a fi \" style=\"--r:contain 78% contain 81%;position:absolute;inset:0;pointer-events:none\"><div style=\"position:absolute;left:0;right:0;top:74%;overflow:hidden;background:#070B0C;border-top:3px solid #EDE6D8;border-bottom:3px solid #EDE6D8\"><div style=\"height:10px;background-image:linear-gradient(90deg,#EDE6D8 0 14px,transparent 14px 28px);background-size:28px 10px\"></div><div class=\"a mv \" style=\"--r:contain 78% contain 92%;--x0:20%;--x1:-70%\"><div style=\"display:flex;width:max-content;padding:6px 0\"><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-01.jpg\" alt=\"Frame 01\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 65%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[01]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-02.jpg\" alt=\"Frame 02\" style=\"width:100%;height:100%;object-fit:cover;object-position:22% center;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[02]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-03.jpg\" alt=\"Frame 03\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 28%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[03]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-04.jpg\" alt=\"Frame 04\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 22%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[04]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-05.jpg\" alt=\"Frame 05\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 20%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[05]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-06.jpg\" alt=\"Frame 06\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 55%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[06]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-07.jpg\" alt=\"Frame 07\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 38%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[07]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-08.jpg\" alt=\"Frame 08\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 55%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[08]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-09.jpg\" alt=\"Frame 09\" style=\"width:100%;height:100%;object-fit:cover;object-position:center 35%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[09]</span></div><div style=\"flex:0 0 clamp(96px,13vw,150px);height:clamp(52px,7vw,76px);margin:0 8px;border:3px solid #EDE6D8;display:flex;align-items:center;justify-content:center;background:#0F1517;position:relative;overflow:hidden;box-sizing:border-box\"><img src=\"/images/lens/storyboard/frame-10.jpg\" alt=\"Frame 10\" style=\"width:100%;height:100%;object-fit:cover;object-position:30% 15%;display:block\" /><span style=\"position:absolute;right:3px;bottom:3px;background:rgba(15,21,23,0.85);color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;padding:1px 4px;border:1px solid #EDE6D8;line-height:1\">[10]</span></div></div></div><div style=\"height:10px;background-image:linear-gradient(90deg,#EDE6D8 0 14px,transparent 14px 28px);background-size:28px 10px\"></div></div></div></div><div id=\"caption-1\" style=\"position:absolute;left:0;right:0;bottom:4%;text-align:center;padding:0 12px\"><div class=\"a fo \" style=\"--r:contain 52% contain 55%;\"><div class=\"a wr \" style=\"--r:contain 41% contain 47%;\"><div class=\"cp\">TOO MANY THINGS IN FRAME.</div></div></div></div><div id=\"caption-2\" style=\"position:absolute;left:0;right:0;bottom:4%;text-align:center;padding:0 12px\"><div class=\"a fo \" style=\"--r:contain 69% contain 72%;\"><div class=\"a wr \" style=\"--r:contain 60% contain 66%;\"><div class=\"cp\">ONE OF THEM WAS ALWAYS SHARP.</div></div></div></div><div id=\"caption-3\" style=\"position:absolute;left:0;right:0;bottom:4%;text-align:center;padding:0 12px\"><div class=\"a fo \" style=\"--r:contain 90% contain 93%;\"><div class=\"a wr \" style=\"--r:contain 76% contain 82%;\"><div class=\"cp\">FOUND IT. THROUGH A LENS.</div></div></div></div></div><div id=\"act-3-stage\" class=\"a vi\" style=\"--r:contain 92% contain 95%;position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:20px;text-align:center\">\n<svg aria-hidden=\"true\" width=\"72\" height=\"54\" viewBox=\"0 0 16 12\" style=\"shape-rendering:crispEdges\"><rect x=\"1\" y=\"3\" width=\"14\" height=\"8\" fill=\"#C99A55\"></rect><rect x=\"5\" y=\"1\" width=\"6\" height=\"2\" fill=\"#C99A55\"></rect><rect x=\"6\" y=\"5\" width=\"4\" height=\"4\" fill=\"#C99A55\"></rect><rect x=\"2\" y=\"4\" width=\"1\" height=\"1\" fill=\"#C99A55\"></rect></svg>\n<div class=\"a pp \" style=\"--r:contain 93% contain 96%;\"><div style=\"font-family:'Archivo Black',sans-serif;font-size:clamp(72px,17vw,190px);line-height:.9;color:#EDE6D8;letter-spacing:-3px\">LENS</div></div>\n<div class=\"a wr \" style=\"--r:contain 95% contain 98%;\"><div style=\"font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:clamp(11px,1.6vw,16px);letter-spacing:3px;color:#C99A55\">SHOT &amp; EDITED BY BIDYA BHUSHAN NANDA</div></div>\n<div style=\"display:flex;flex-wrap:wrap;gap:22px;justify-content:center;width:min(780px,100%)\"><div class=\"a fi \" style=\"--r:contain 96% contain 99%;\"><a class=\"cd\" href=\"https://instagram.com/unfocused.nerd\" target=\"_blank\" rel=\"noopener\" style=\"display:block;text-decoration:none;background:#EDE6D8;color:#0F1517;border:5px solid #0F1517;box-shadow:9px 9px 0 #C99A55;padding:16px 20px;min-width:min(260px,80%);text-align:left\"><span style=\"display:inline-block;background:#1F4A4F;color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:2px;padding:3px 8px\">PHOTO + VIDEO</span><div style=\"font-family:'Archivo Black',sans-serif;font-size:clamp(20px,2.4vw,28px);margin-top:8px;overflow-wrap:anywhere\">@unfocused.nerd</div></a></div><div class=\"a fi \" style=\"--r:contain 97% contain 100%;\"><a class=\"cd\" href=\"https://instagram.com/bid_notfound\" target=\"_blank\" rel=\"noopener\" style=\"display:block;text-decoration:none;background:#EDE6D8;color:#0F1517;border:5px solid #0F1517;box-shadow:9px 9px 0 #C99A55;padding:16px 20px;min-width:min(260px,80%);text-align:left\"><span style=\"display:inline-block;background:#1F4A4F;color:#EDE6D8;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:2px;padding:3px 8px\">ENQUIRIES + BLOG</span><div style=\"font-family:'Archivo Black',sans-serif;font-size:clamp(20px,2.4vw,28px);margin-top:8px;overflow-wrap:anywhere\">@bid_notfound</div></a></div></div>\n<div class=\"a fi \" style=\"--r:contain 98% contain 100%;\"><a class=\"cta\" href=\"#\">ENTER THE LENS \u2192</a></div></div><div id=\"act-2-hud\" style=\"position:absolute;inset:0;pointer-events:none\"><div class=\"a fo \" style=\"--r:contain 90% contain 94%;position:absolute;inset:0;pointer-events:none\"><div class=\"a fi \" style=\"--r:contain 39% contain 42%;position:absolute;inset:0;pointer-events:none\"><i style=\"position:absolute;left:18px;top:18px;width:40px;height:40px;border-top:6px solid #EDE6D8;border-left:6px solid #EDE6D8\"></i><i style=\"position:absolute;right:18px;top:18px;width:40px;height:40px;border-top:6px solid #EDE6D8;border-right:6px solid #EDE6D8\"></i><i style=\"position:absolute;left:18px;bottom:18px;width:40px;height:40px;border-bottom:6px solid #EDE6D8;border-left:6px solid #EDE6D8\"></i><i style=\"position:absolute;right:18px;bottom:18px;width:40px;height:40px;border-bottom:6px solid #EDE6D8;border-right:6px solid #EDE6D8\"></i><div style=\"position:absolute;left:72px;top:26px;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:13px;letter-spacing:2px;color:#EDE6D8\"><span class=\"bl2\" style=\"color:#FF5C8A\">\u25cf</span> REC</div></div></div><div class=\"a fo \" style=\"--r:contain 40% contain 44%;position:absolute;inset:0;pointer-events:none\"><div class=\"a ed \" style=\"--r:contain 31% contain 38%;position:absolute;top:0;bottom:0;width:38px;background-color:#070B0C;background-image:linear-gradient(to bottom,#EDE6D8 0 22px,transparent 22px 44px);background-size:14px 44px;background-repeat:repeat-y;background-position:center\"></div></div></div></div><a class=\"home-btn\" href=\"/\" title=\"Return to Software Engineering Home\">\u2190 DEV HOME</a><a class=\"skip\" href=\"#\">SKIP \u2192</a></div></div>";

export function CodeToCameraStory({ onEnterLens }: CodeToCameraStoryProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Handle clicks for CTA and SKIP buttons
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      if (
        target.classList.contains("cta") ||
        target.id === "enter-btn" ||
        target.textContent?.includes("ENTER THE LENS")
      ) {
        e.preventDefault();
        onEnterLens?.();
      } else if (
        target.classList.contains("skip") ||
        target.id === "skip-btn" ||
        target.textContent?.includes("SKIP")
      ) {
        e.preventDefault();
        onEnterLens?.();
      } else if (
        target.classList.contains("home-btn") ||
        target.textContent?.includes("DEV HOME")
      ) {
        window.location.href = "/";
      }
    };

    container.addEventListener("click", handleLinkClick);

    // Elements for Stage Guard
    const storyEl = container.querySelector(".story") as HTMLElement;
    const act1 = container.querySelector("#act-1-stage") as HTMLElement;
    const act2 = container.querySelector("#act-2-stage") as HTMLElement;
    const act2Hud = container.querySelector("#act-2-hud") as HTMLElement;
    const act3 = container.querySelector("#act-3-stage") as HTMLElement;
    const el404 = container.querySelector("#stage-404") as HTMLElement;
    const cap1 = container.querySelector("#caption-1") as HTMLElement;
    const cap2 = container.querySelector("#caption-2") as HTMLElement;
    const cap3 = container.querySelector("#caption-3") as HTMLElement;

    // High-performance synchronous stage synchronization
    // Eliminates ghosting & overlapping text during fast rough scrolling
    const syncStages = () => {
      if (!storyEl) return;
      const rect = storyEl.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));

      // Act 1 Stage: 0% to 38%
      if (act1) {
        act1.style.display = progress > 0.38 ? "none" : "";
      }

      // 404 inside Act 1: strictly 16% to 38%
      if (el404) {
        if (progress >= 0.16 && progress <= 0.38) {
          el404.style.display = "";
          el404.classList.add("stage-active");
        } else {
          el404.style.display = "none";
          el404.classList.remove("stage-active");
        }
      }

      // Act 2 Stage (Hero, Filmstrip, Overlays): strictly 31% to 94%
      if (act2) {
        act2.style.display = progress < 0.31 || progress > 0.94 ? "none" : "";
      }
      if (act2Hud) {
        act2Hud.style.display = progress < 0.31 || progress > 0.94 ? "none" : "";
      }

      // Captions: strictly mutually exclusive windows
      if (cap1) {
        cap1.style.display = progress < 0.39 || progress > 0.56 ? "none" : "";
      }
      if (cap2) {
        cap2.style.display = progress < 0.58 || progress > 0.73 ? "none" : "";
      }
      if (cap3) {
        cap3.style.display = progress < 0.75 || progress > 0.93 ? "none" : "";
      }

      // Act 3 Stage: strictly 91% to 100%
      if (act3) {
        act3.style.display = progress < 0.91 ? "none" : "flex";
      }
    };

    // Browser feature check for CSS view-timeline
    const supportsViewTimeline =
      typeof CSS !== "undefined" &&
      CSS.supports &&
      CSS.supports("animation-timeline: view()");

    fetch(`/api/debug-timeline?supports=${supportsViewTimeline}&ua=${encodeURIComponent(navigator.userAgent)}`).catch(() => {});

    let cleanupScroll: (() => void) | undefined;

    if (!supportsViewTimeline) {
      if (storyEl) {
        storyEl.classList.add("story-fallback");

        const animatedElements = Array.from(container.querySelectorAll(".a")).map((el) => {
          const htmlEl = el as HTMLElement;
          const style = htmlEl.getAttribute("style") || "";
          const classList = htmlEl.className.split(/\s+/);

          const rMatch = style.match(/--r:\s*contain\s*([\d.]+)%\s*contain\s*([\d.]+)%/);
          const start = rMatch ? parseFloat(rMatch[1]) / 100 : 0;
          const end = rMatch ? parseFloat(rMatch[2]) / 100 : 1;
          const isAfh = classList.includes("afh");

          return { el: htmlEl, start, end, isAfh };
        });

        let ticking = false;
        const updateScroll = () => {
          syncStages();
          const rect = storyEl.getBoundingClientRect();
          const total = rect.height - window.innerHeight;
          const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, total)));

          for (const item of animatedElements) {
            if (item.isAfh) {
              const pFi = Math.min(1, Math.max(0, (progress - 0.47) / 0.01));
              const pAf = Math.min(1, Math.max(0, (progress - 0.48) / 0.10));
              item.el.style.animationDelay = `-${pFi.toFixed(4)}s, -${pAf.toFixed(4)}s`;
            } else {
              const span = item.end - item.start;
              const p =
                span > 0
                  ? Math.min(1, Math.max(0, (progress - item.start) / span))
                  : progress >= item.start
                  ? 1
                  : 0;
              item.el.style.animationDelay = `-${p.toFixed(4)}s`;
            }
          }

          ticking = false;
        };

        const onScroll = () => {
          syncStages();
          if (!ticking) {
            window.requestAnimationFrame(updateScroll);
            ticking = true;
          }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        updateScroll();
        cleanupScroll = () => window.removeEventListener("scroll", onScroll);
      }
    } else {
      // In native view-timeline browsers, run synchronous stage sync on scroll/resize
      window.addEventListener("scroll", syncStages, { passive: true });
      window.addEventListener("resize", syncStages, { passive: true });
      syncStages();
      cleanupScroll = () => {
        window.removeEventListener("scroll", syncStages);
        window.removeEventListener("resize", syncStages);
      };
    }

    return () => {
      container.removeEventListener("click", handleLinkClick);
      if (cleanupScroll) cleanupScroll();
    };
  }, [onEnterLens]);

  return (
    <div ref={containerRef} className="w-full relative">
      <style dangerouslySetInnerHTML={{ __html: CSS_STYLE }} />
      <div dangerouslySetInnerHTML={{ __html: MARKUP_HTML }} />
    </div>
  );
}
