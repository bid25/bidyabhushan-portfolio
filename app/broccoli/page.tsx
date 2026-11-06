"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BROCCOLI_PHONES,
  BROCCOLI_PHONE_STYLES,
  BROCCOLI_TOUR_STEPS,
  BROCCOLI_MORE_ITEMS,
  BROCCOLI_OFFLINE_ITEMS,
  BROCCOLI_MATRIX_COLUMNS,
  BROCCOLI_MATRIX_ROWS,
  BROCCOLI_PRICES,
  BROCCOLI_WEEK,
  BROCCOLI_WEIGHT_SLIDERS
} from "@/data/broccoliData";
import "./broccoli.css";

export default function BroccoliPage() {
  const [sliders, setSliders] = useState<[number, number, number]>([1168, 352, 129]);

  // Quadrature error calculation for tolerance bar demo
  const totalKcal = sliders[0] + sliders[1] + sliders[2];
  const errKcal = Math.sqrt(
    sliders.reduce(
      (acc, k, i) => acc + (BROCCOLI_WEIGHT_SLIDERS[i][2] ** 2 / 10000) * 150 * k,
      0
    )
  );
  const maxRef = Math.max(totalKcal, 2450);
  const width0 = (sliders[0] / maxRef) * 100;
  const width1 = (sliders[1] / maxRef) * 100;
  const width2 = (sliders[2] / maxRef) * 100;
  const errPercent = totalKcal > 0 ? (errKcal / totalKcal * 100).toFixed(1) : "0.0";

  const formatNum = (n: number) => Math.round(n).toLocaleString("en-US");

  useEffect(() => {
    // 1. Enforce background & layout styles for Broccoli on document.body
    const origBg = document.body.style.backgroundColor;
    const origColor = document.body.style.color;
    const origBgImage = document.body.style.backgroundImage;
    const origOverflowX = document.body.style.overflowX;
    const origHtmlOverflowX = document.documentElement.style.overflowX;

    document.body.style.backgroundColor = "var(--bg, #EFEEE2)";
    document.body.style.color = "var(--ink, #1A1F14)";
    document.body.style.backgroundImage = "none";
    document.body.style.overflowX = "visible";
    document.documentElement.style.overflowX = "visible";

    // 2. Setup 3D Tour Ring Shadow DOM phones
    function mk(el: Element, i: number) {
      const sh = el.shadowRoot || el.attachShadow({ mode: "open" });
      sh.innerHTML =
        "<style>" +
        BROCCOLI_PHONE_STYLES +
        '</style><div class="wr">' +
        BROCCOLI_PHONES[i] +
        "</div>";
      sh.querySelectorAll(".body > *").forEach((c, k) =>
        (c as HTMLElement).style.setProperty("--i", String(k))
      );
      return sh.querySelector(".wr") as HTMLElement;
    }

    const replay = (w: HTMLElement | null) => {
      if (!w) return;
      w.classList.remove("live");
      void w.offsetWidth;
      w.classList.add("live");
    };

    const ring = document.getElementById("ring");
    const dots = document.getElementById("dots");
    const cap = document.getElementById("cap");
    const tour = document.getElementById("tour");
    const wr: HTMLElement[] = [];

    if (ring && dots) {
      ring.innerHTML = "";
      dots.innerHTML = "";
      BROCCOLI_PHONES.forEach((_, i) => {
        ring.insertAdjacentHTML(
          "beforeend",
          `<div class="ph" style="--a:${i * 45}deg"><div></div></div>`
        );
        dots.insertAdjacentHTML("beforeend", "<i></i>");
        const lastPh = ring.lastElementChild?.firstElementChild;
        if (lastPh) wr.push(mk(lastPh, i));
      });
    }

    const hph = document.getElementById("hph");
    let hw: HTMLElement | null = null;
    if (hph) {
      hph.innerHTML = "";
      hw = mk(hph, 0);
      replay(hw);
    }

    const ph = ring ? Array.from(ring.children) : [];
    const dd = dots ? Array.from(dots.children) : [];
    let cur = -1;
    let ty = 0;

    function size() {
      const scene = document.getElementById("scene");
      if (scene) {
        const isMobile = window.innerWidth <= 640;
        const maxWScale = isMobile
          ? (window.innerWidth * 0.72) / 372
          : (window.innerWidth * 0.62) / 372;
        const maxHScale = isMobile
          ? (window.innerHeight * 0.44) / 790
          : (window.innerHeight * 0.46) / 790;
        scene.style.setProperty(
          "--s",
          String(Math.max(0.3, Math.min(maxHScale, maxWScale)))
        );
      }
    }

    function tick() {
      if (!tour || !ring || !cap) return;
      const r = tour.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, -r.top / (tour.offsetHeight - window.innerHeight))
      );
      const rot = p * 315;
      ring.style.transform = `rotateX(${ty}deg) rotateY(${-rot}deg)`;
      const i = Math.min(7, Math.max(0, Math.round(rot / 45)));

      if (i !== cur) {
        cur = i;
        ph.forEach((e, k) => e.classList.toggle("on", k === i));
        dd.forEach((e, k) => e.classList.toggle("on", k === i));
        if (cap.firstElementChild && cap.lastElementChild && BROCCOLI_TOUR_STEPS[i]) {
          cap.firstElementChild.textContent = BROCCOLI_TOUR_STEPS[i][0];
          cap.lastElementChild.textContent = BROCCOLI_TOUR_STEPS[i][1];
        }
        replay(wr[i]);
      }

      const pg = document.getElementById("pg");
      if (pg) {
        const scrollTotal = document.body.scrollHeight - window.innerHeight;
        pg.style.width =
          scrollTotal > 0 ? `${(window.scrollY / scrollTotal) * 100}%` : "0%";
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      ty = y * -7;
      const hf = document.getElementById("hf");
      if (hf) {
        hf.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 12}deg)`;
      }
      tick();
    };

    window.addEventListener("scroll", tick, { passive: true });
    window.addEventListener("resize", () => {
      size();
      tick();
    });
    window.addEventListener("pointermove", onPointerMove);

    size();
    tick();

    // 3. Setup IntersectionObserver for reveal & animations
    const RM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const f = (n: number) => Math.round(n).toLocaleString("en-US");

    const cnt = (e: HTMLElement) => {
      const n = +(e.dataset.count || 0);
      if (RM || isNaN(n)) return;
      let s: number | null = null;
      const st = (t: number) => {
        s = s || t;
        const p = Math.min(1, (t - s) / 1400);
        e.textContent = f(n * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(st);
      };
      requestAnimationFrame(st);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const t = entry.target as HTMLElement;
          t.classList.add("in");
          t.querySelectorAll<HTMLElement>("[data-w]").forEach((x) => {
            x.style.width = `${x.dataset.w}%`;
          });
          t.querySelectorAll<HTMLElement>("[data-h]").forEach((x) => {
            x.style.height = `${x.dataset.h}%`;
          });
          if (t.dataset.count) cnt(t);
          io.unobserve(t);
        });
      },
      { threshold: 0.25 }
    );

    document.querySelectorAll(".rv, [data-bar], [data-count]").forEach((e) =>
      io.observe(e)
    );

    // 4. Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", tick);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onPointerMove);
      io.disconnect();

      document.body.style.backgroundColor = origBg;
      document.body.style.color = origColor;
      document.body.style.backgroundImage = origBgImage;
      document.body.style.overflowX = origOverflowX;
      document.documentElement.style.overflowX = origHtmlOverflowX;
    };
  }, []);

  return (
    <div className="broccoli-page">
      <div id="pg"></div>

      {/* Standalone Product Navbar */}
      <nav aria-label="Main">
        <a href="#" title="Broccoli" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
          <picture>
            <source srcSet="/images/broccoli-logo-light-crop.png" media="(prefers-color-scheme: dark)" />
            <img
              src="/images/broccoli-logo-dark-crop.png"
              alt="Broccoli"
              style={{ height: "24px", width: "auto", display: "block" }}
            />
          </picture>
        </a>
        <span className="l">
          <a href="#tour">App</a>
          <a href="#accuracy">Accuracy</a>
          <a href="#coach">Coach</a>
          <a href="#india">India</a>
          <a href="#why">Why</a>
          <a href="#price">Price</a>
        </span>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <Link
            href="/"
            className="btn s broccoli-portfolio-btn"
            title="Return to Developer Portfolio"
            style={{ fontSize: "13px", padding: "0 16px", minHeight: "40px" }}
          >
            ← Portfolio
          </Link>
          <a
            className="btn"
            href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get it
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="w">
          <div className="hp">
            <div className="hf" id="hf">
              <div id="hph"></div>
            </div>
          </div>
          <div className="hl">
            <span className="k">Android · offline first · no ads</span>
            <h1>Grams, not guesses.</h1>
            <p className="mut">
              A calorie tracker that tells you what you ate, and how far to trust
              the number. Then it corrects itself against your real body.
            </p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                className="btn"
                href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Broccoli
              </a>
              <a className="btn s" href="#tour">
                Scroll the app
              </a>
            </div>
          </div>

          <div className="ro">
            <span className="m" data-count="1842">
              1,842
            </span>
            <span className="m mut" style={{ fontSize: "20px" }}>
              ± 96 kcal today
            </span>
          </div>

          <div
            className="tb"
            data-bar="1"
            role="img"
            aria-label="Today's calories: weighed, estimated and typed, with the target notch"
          >
            <i className="a" data-w="63"></i>
            <i className="e" data-w="19"></i>
            <i className="ht" data-w="7"></i>
            <u style={{ left: "84%" }}></u>
          </div>

          <div className="key">
            <span>Weighed 1,168</span>
            <span className="b">Estimated 545</span>
            <span className="c">Typed 129</span>
          </div>

          <div className="facts">
            <div>
              <b className="m" data-count="4694">
                4,694
              </b>
              <span>foods on the phone, searchable with no network</span>
            </div>
            <div>
              <b className="m" data-count="2109">
                2,109
              </b>
              <span>Indian foods and recipes from INDB 2024</span>
            </div>
            <div>
              <b className="m">4</b>
              <span>confidence tiers, one honest ± on every total</span>
            </div>
            <div>
              <b className="m">0</b>
              <span>accounts or signal needed for the daily loop</span>
            </div>
          </div>
        </div>
      </header>

      {/* Running Marquee Strip */}
      <div className="broccoli-mq" aria-hidden="true">
        <div>
          Grams, not guesses · Every calorie with its range · Weighed, estimated,
          typed · The formula guesses, your scale corrects · Dal, roti and sabzi ·
          Works with no signal · No ads, ever · Grams, not guesses · Every
          calorie with its range · Weighed, estimated, typed · The formula
          guesses, your scale corrects · Dal, roti and sabzi · Works with no
          signal · No ads, ever · Grams, not guesses · Every calorie with its
          range · Weighed, estimated, typed · The formula guesses, your scale
          corrects · Dal, roti and sabzi · Works with no signal · No ads, ever ·
        </div>
      </div>

      {/* 3D Phone Tour Section */}
      <section id="tour" aria-label="The app, screen by screen">
        <div className="stick">
          <div className="hint">Keep scrolling</div>
          <div className="scene" id="scene">
            <div className="tour-ring" id="ring"></div>
          </div>
          <div className="dots" id="dots"></div>
          <div className="cap" id="cap">
            <h2></h2>
            <p></p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section id="problem">
        <div className="w">
          <span className="k">The problem</span>
          <h2 className="rv">The number on your screen is fiction.</h2>
          <p className="rv mut" style={{ marginTop: "20px" }}>
            Food diaries checked against doubly-labelled water land on one finding:
            people under-report what they eat by 10 to 20 percent, and they do it
            honestly. It is a measurement problem wearing a discipline problem&apos;s
            clothes.
          </p>

          <div className="two rv">
            <div>
              <span className="mut">What a careful person logs</span>
              <b className="m">1,800</b>
              <span className="mut">kcal</span>
            </div>
            <div className="z">
              <span>What they actually ate</span>
              <b className="m">1,980 to 2,250</b>
              <span>
                The gap: 180 to 450 kcal, every day. 250 a day is 7,500 a month,
                about a kilogram.
              </span>
            </div>
          </div>

          <div className="lab rv">
            <div>
              <h3>One: you guess the portion</h3>
              <div className="br">
                <b>One bowl of rice, 120 g to 265 g</b>
                <span className="m">±38%</span>
              </div>
              <div className="hb am">
                <i data-w="38"></i>
              </div>
              <p className="mut">
                Whose bowl? The biggest error in food logging, and every app
                leaves it to you.
              </p>
            </div>

            <div>
              <h3>Two: the database disagrees with itself</h3>
              <div className="br">
                <b>Same food, four entries: 130, 112, 148, 121</b>
                <span className="m">±20%</span>
              </div>
              <div className="hb am">
                <i data-w="20"></i>
              </div>
              <p className="mut">
                The app then reports your day to the calorie, as if your pick
                never happened.
              </p>
            </div>

            <div>
              <h3>Three: the target was set once</h3>
              <div className="br">
                <b>A formula guessed your metabolism on day one</b>
                <span className="m">Static</span>
              </div>
              <div className="hb am">
                <i data-w="100"></i>
              </div>
              <p className="mut">
                Your body adapted. The number never moved. This is why plans
                stall in week six.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tolerance Bar Interactive Demo */}
      <section id="accuracy" className="dk">
        <div className="w">
          <span className="k">The tolerance bar</span>
          <h2 className="rv">Every number carries its error.</h2>
          <p className="rv" style={{ marginTop: "20px" }}>
            Portion error and database error are independent, so they add in
            quadrature. Summing them would make the app look useless. Dropping
            one would make it a liar. A weighed, labelled food still carries
            ±10.2%, and Broccoli says so. Move the sliders.
          </p>

          <div className="demo rv">
            <div>
              <div className="tb" id="db">
                <i className="a" style={{ width: `${width0}%` }}></i>
                <i className="e" style={{ width: `${width1}%` }}></i>
                <i
                  className="ht"
                  style={{
                    width: `${width2}%`,
                    background:
                      "repeating-linear-gradient(45deg,rgba(239,238,226,.5) 0 2px,transparent 2px 9px)"
                  }}
                ></i>
              </div>

              <div className="ro" style={{ margin: "22px 0 0" }}>
                <span
                  className="m"
                  id="dt"
                  style={{ fontWeight: 800, fontSize: "54px" }}
                >
                  {formatNum(totalKcal)}
                </span>
                <span
                  className="m"
                  id="dp"
                  style={{ color: "#A2AA92", fontSize: "16px" }}
                >
                  ± {formatNum(errKcal)} kcal ({errPercent}%)
                </span>
              </div>
              <p className="mut" style={{ fontSize: "14px", marginTop: "8px" }}>
                Illustration: entries of about 150 kcal each. Weighed ±10%,
                barcode ±18%, AI photo ±28%, typed ±45%.
              </p>
            </div>

            <div id="sl">
              {BROCCOLI_WEIGHT_SLIDERS.map((item, idx) => (
                <div key={idx} className="sl">
                  <label htmlFor={`s${idx}`}>{item[0]}</label>
                  <input
                    id={`s${idx}`}
                    type="range"
                    min="0"
                    max="2000"
                    step="10"
                    value={sliders[idx]}
                    onChange={(e) => {
                      const val = +e.target.value;
                      setSliders((prev) => {
                        const next: [number, number, number] = [...prev];
                        next[idx] = val;
                        return next;
                      });
                    }}
                  />
                  <span className="m" id={`v${idx}`}>
                    {formatNum(sliders[idx])}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Four Ways To Log */}
      <section id="ways">
        <div className="w">
          <span className="k">Four ways to log</span>
          <h2 className="rv">Four ways in. One log.</h2>
          <div className="lines rv">
            <div>
              <h3>Kitchen scale</h3>
              <p className="mut">
                Pick a food, type the grams. A one-tap keypad, tare, and your
                last weight already filled in. Three taps from Today.
              </p>
              <span className="m">Weighed ±10%</span>
            </div>
            <div>
              <h3>Barcode and label</h3>
              <p className="mut">
                2,123 packaged foods bundled for offline scans. On-device OCR
                reads the printed nutrition panel when a pack is new.
              </p>
              <span className="m">Scanned ±18%</span>
            </div>
            <div>
              <h3>Photo</h3>
              <p className="mut">
                Photograph the plate and get an editable draft. Weigh one item
                and the rest re-estimate from it. A failed scan refunds the
                credit.
              </p>
              <span className="m">Estimated ±28%</span>
            </div>
            <div>
              <h3>Typed or spoken</h3>
              <p className="mut">
                Hold plus and say &quot;2 roti, 1 katori dal&quot;. It becomes a
                plate. Restaurant meals still count, drawn hatched so they look
                like the guess they are.
              </p>
              <span className="m">Typed ±45%</span>
            </div>
          </div>
          <p className="rv mut" style={{ marginTop: "30px" }}>
            It learns your habits: your usual breakfast is one tap, portions
            remember themselves, and a saved meal logs in one go. Recipes freeze
            their numbers at the moment you eat, so editing one never rewrites
            history.
          </p>
        </div>
      </section>

      {/* Adaptive Coach Section */}
      <section id="coach" className="dk">
        <div className="w">
          <span className="k">Adaptive coach</span>
          <h2 className="rv">The formula guesses. Your scale corrects it.</h2>
          <p className="rv" style={{ marginTop: "20px" }}>
            A two-state Kalman filter over 120 days of intake, weigh-ins and
            steps solves for what your body actually burns. It proposes, you
            decide, and safety floors run first.
          </p>
          <div className="big rv" data-count="2610">
            2,610
          </div>
          <span className="mut">
            kcal a day observed, ± 90. The formula said 2,739. It needs 10
            counted days first.
          </span>
          <div className="band rv">
            <i></i>
            <u></u>
          </div>
          <div className="lab rv" style={{ marginTop: "50px" }}>
            <h3>How close it gets, by days of data</h3>
            <div>
              <div className="br">
                <b>21 days</b>
                <span className="m">±160 kcal</span>
              </div>
              <div className="hb">
                <i data-w="100"></i>
              </div>
            </div>
            <div>
              <div className="br">
                <b>28 days</b>
                <span className="m">±100 kcal</span>
              </div>
              <div className="hb">
                <i data-w="62"></i>
              </div>
            </div>
            <div>
              <div className="br">
                <b>56 days</b>
                <span className="m">±60 kcal</span>
              </div>
              <div className="hb">
                <i data-w="37"></i>
              </div>
            </div>
            <p className="mut" style={{ fontSize: "14px" }}>
              Mean absolute error over 60 simulated runs with realistic water
              noise. A 4 kg misread moves the estimate by under 60 kcal. Both
              signs are unit-tested.
            </p>
          </div>
          <div className="lines rv">
            <div>
              <h3>It refuses, out loud</h3>
              <p className="mut">
                Plateau, low adherence, suspected under-logging or recomposition
                each get a plain explanation instead of a bad proposal. Rising
                weight on a logged deficit is reported as a logging signal, never
                a metabolism verdict.
              </p>
              <span className="m">Diagnostic</span>
            </div>
            <div>
              <h3>Steps, never eaten back</h3>
              <p className="mut">
                Health Connect steps and weigh-ins sharpen the estimate. A long
                walk never adds food to your day.
              </p>
              <span className="m">Health Connect</span>
            </div>
            <div>
              <h3>Safety floors first</h3>
              <p className="mut">
                Intake floors, a rate ceiling and BMI guards run before any
                target is written. Eating-disorder help is offered, never
                forced.
              </p>
              <span className="m">Always on</span>
            </div>
          </div>
        </div>
      </section>

      {/* India First Section */}
      <section id="india">
        <div className="w">
          <span className="k">India first</span>
          <h2 className="rv">Dal, roti and sabzi, modelled properly.</h2>
          <p className="rv mut" style={{ marginTop: "20px" }}>
            2,109 lab-analysed Indian foods and recipes from INDB 2024 sit beside
            USDA data, with regional aliases, katori and thali portions, and
            cooking oil counted on the plate. Raw-to-cooked yield is reconciled so
            a serving matches the pot you weighed.
          </p>
          <div className="two rv">
            <div>
              <span className="mut">You say</span>
              <b className="m" style={{ fontSize: "26px" }}>
                &quot;2 roti, 1 katori dal&quot;
              </b>
              <span className="mut">Hinglish in, a plate out.</span>
            </div>
            <div className="z">
              <span>It logs</span>
              <b className="m" style={{ fontSize: "26px" }}>
                394 kcal, 2 items
              </b>
              <span>
                Roti 2 pc, 208 kcal. Dal tadka 1 katori, 186 kcal. Both from
                INDB, both editable.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Habit Section */}
      <section id="habit" className="dk">
        <div className="w">
          <span className="k">Built for every day</span>
          <h2 className="rv">Opened daily, never guilt-tripped.</h2>
          <p className="rv" style={{ marginTop: "20px" }}>
            Plan the week with high and low days. Go over and you get a number
            and a sentence, never a red screen. Only logging counts toward a
            streak.
          </p>
          <div className="wk rv" id="wk">
            {BROCCOLI_WEEK.map((item, idx) => (
              <div key={idx} className={item[1] > 0 ? "hi" : ""}>
                <i data-h={Math.round(((2148 + item[1]) / 2448) * 80)}></i>
                <span className="m">
                  {item[1] > 0 ? "+" : "−"}
                  {Math.abs(item[1])}
                </span>
                {item[0]}
              </div>
            ))}
          </div>
          <p className="mut" style={{ fontSize: "14px", marginTop: "16px" }}>
            Weekends higher: Saturday and Sunday +300, the other five give back
            120 each. The week still adds up to the same target, and no day goes
            under your safety floor.
          </p>
          <div className="coins rv">
            <span>
              Peanut<b className="m">3</b>
            </span>
            <span>
              Mirchi<b className="m">7</b>
            </span>
            <span>
              Nimbu<b className="m">14</b>
            </span>
            <span>
              Avocado<b className="m">30</b>
            </span>
            <span>
              Broccoli<b className="m">60</b>
            </span>
            <span>
              Nariyal<b className="m">100</b>
            </span>
            <span>
              Kaddu<b className="m">200</b>
            </span>
            <span>
              Kathal<b className="m">365</b>
            </span>
          </div>
          <p className="mut" style={{ fontSize: "14px", marginTop: "14px" }}>
            Eight struck coins by days logged. Miss a day and you have 48 hours
            to backfill it. Your best streak is kept forever.
          </p>
        </div>
      </section>

      {/* Everything Else Section */}
      <section id="everything">
        <div className="w">
          <span className="k">Everything else</span>
          <h2 className="rv">The rest of the instrument.</h2>
          <div className="lines rv" id="more">
            {BROCCOLI_MORE_ITEMS.map((item, idx) => (
              <div key={idx}>
                <h3>{item[0]}</h3>
                <p className="mut">{item[1]}</p>
                <span className="m">{item[2]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offline by Construction Section */}
      <section id="offline" className="dk">
        <div className="w">
          <span className="k">Offline by construction</span>
          <h2 className="rv">Works on a plane. Not an &quot;offline mode&quot;.</h2>
          <p className="rv" style={{ marginTop: "20px" }}>
            The daily loop is local, so it never stalls in a kitchen, gym,
            canteen or basement. First search results arrive in under 100 ms.
          </p>
          <div className="lines rv" id="off">
            {BROCCOLI_OFFLINE_ITEMS.map((item, idx) => (
              <div
                key={idx}
                style={{ gridTemplateColumns: "1fr auto", padding: "18px 0" }}
              >
                <h3 style={{ fontSize: "20px" }}>{item[0]}</h3>
                <span
                  className="m"
                  style={{
                    color:
                      item[1] === "Always" ? "var(--sprout)" : "var(--mari)"
                  }}
                >
                  {item[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Is Better Section */}
      <section id="why">
        <div className="w">
          <span className="k">Why it is better</span>
          <h2 className="rv">Everyone counts calories. Nobody counts the error.</h2>
          <div className="sc rv">
            <table className="mx" id="mx">
              <thead>
                <tr>
                  <th></th>
                  {BROCCOLI_MATRIX_COLUMNS.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BROCCOLI_MATRIX_ROWS.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row[0]}</td>
                    <td>
                      <span
                        className={`d ${
                          row[1] === 2 ? "" : row[1] === 1 ? "h" : "o"
                        }`}
                      ></span>
                    </td>
                    <td>
                      <span
                        className={`d ${
                          row[2] === 2 ? "" : row[2] === 1 ? "h" : "o"
                        }`}
                      ></span>
                    </td>
                    <td>
                      <span
                        className={`d ${
                          row[3] === 2 ? "" : row[3] === 1 ? "h" : "o"
                        }`}
                      ></span>
                    </td>
                    <td>
                      <span className="d"></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="q">
            <span>Solid: yes</span>
            <span>Half: partly</span>
            <span>Hollow: no</span>
          </div>
          <p className="mut" style={{ marginTop: "14px", fontSize: "14px" }}>
            Columns are categories of app, from public listings. Indicative, not
            a review of any one product.
          </p>

          <div className="lab rv" style={{ marginTop: "60px" }}>
            <h3>Annual price in India</h3>
            <div id="pr">
              {BROCCOLI_PRICES.map((item, idx) => (
                <div key={idx}>
                  <div className="br">
                    <b>{item[0]}</b>
                    <span className="m">{item[1]}</span>
                  </div>
                  <div className={`hb ${item[3]}`}>
                    <i data-w={item[2]}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p
            className="rv"
            style={{ marginTop: "44px", fontSize: "20px", maxWidth: "46ch" }}
          >
            To match this, a tracker with a hundred million users would have to
            print an error band on every number it has ever shown. That is not an
            engineering problem. It is a confession.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="price" className="dk">
        <div className="w">
          <span className="k">Price</span>
          <h2 className="rv">Free for the daily loop. Plus keeps it safe.</h2>
          <div className="plans rv">
            <div>
              <h3>Free, always</h3>
              <ul>
                <li>Logging, search, recipes, charts and the coach</li>
                <li>Works offline with no account</li>
                <li>Full export and account deletion</li>
                <li>No ads, data never sold</li>
              </ul>
            </div>
            <div
              style={{
                background: "var(--sprout)",
                color: "#1A1F14",
                borderColor: "var(--sprout)"
              }}
            >
              <h3>Broccoli Plus</h3>
              <p style={{ marginTop: "8px" }}>
                <b className="m" style={{ fontSize: "32px" }}>
                  ₹149
                </b>{" "}
                a month or{" "}
                <b className="m" style={{ fontSize: "20px" }}>
                  ₹1,099
                </b>{" "}
                a year
              </p>
              <ul style={{ "--line": "rgba(26,31,20,.25)" } as React.CSSProperties}>
                <li>Cloud backup, synced across devices</li>
                <li>100 photo scans a month</li>
                <li>
                  Founding price, locked while you stay subscribed. It becomes
                  ₹199 once Broccoli reaches 1,000 users.
                </li>
                <li>
                  Refer a friend: a free month for both of you when they
                  subscribe
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq">
        <div className="w">
          <span className="k">Questions</span>
          <h2 className="rv">Straight answers.</h2>
          <div className="rv" style={{ marginTop: "40px" }}>
            <details>
              <summary>Do I need an account?</summary>
              <p>
                No. Guest mode is complete. An account adds photo scans, backup
                and sync, and signing up keeps everything you already logged.
              </p>
            </details>
            <details>
              <summary>Does it really work with no signal?</summary>
              <p>
                Search, logging, barcodes already seen, recipes, charts and the
                coach all run on the phone. Only AI photo scans, new-product
                lookups, sign-in and sync need a connection.
              </p>
            </details>
            <details>
              <summary>Where does my data go?</summary>
              <p>
                Signed out, nothing leaves the phone except a barcode string for a
                new product. No analytics, no ad IDs, and health data is scrubbed
                from crash reports. Export everything, or delete your account,
                for free.
              </p>
            </details>
            <details>
              <summary>Is it medical advice?</summary>
              <p>
                No. Broccoli is an instrument, not a medical device. Talk to a
                healthcare professional before big changes to your diet.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="get">
        <div className="w">
          <div>
            <h2>Weigh something.</h2>
            <p className="mut" style={{ marginTop: "14px" }}>
              Built in Delhi by <Link href="/">Bidya Bhushan Nanda</Link>. Android.
            </p>
          </div>
          <a
            className="btn"
            href="https://play.google.com/store/apps/details?id=com.bidyabhushan.mobile&pcampaignid=web_share"
            target="_blank"
            rel="noopener noreferrer"
            id="play"
          >
            Get Broccoli on Google Play
          </a>
        </div>
      </footer>
    </div>
  );
}
