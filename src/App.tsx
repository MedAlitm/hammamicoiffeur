import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

const services = [
  { name: "Classic Haircut", price: "$35" },
  { name: "Skin Fade", price: "$40" },
  { name: "Beard Trim", price: "$25" },
  { name: "Hot Towel Shave", price: "$30" },
  { name: "Hair & Beard Combo", price: "$55" },
  { name: "Kids Cut", price: "$20" },
  { name: "ballouchy", price: "$00" },
  { name: "The Royal Treatment", price: "$90" },
];

/* ── SVG ornament ── */
function GoldOrnament({ className, light }: { className?: string; light?: boolean }) {
  const c1 = light ? "#b8770a" : "#93570b";
  const c2 = light ? "#d4960e" : "#edc450";
  const dot = light ? "#b8770a" : "#d4960e";
  const dotSm = light ? "#93570b" : "#b8770a";
  return (
    <svg viewBox="0 0 60 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 10 Q10 0 20 10 Q30 20 40 10 Q50 0 60 10" stroke={`url(#og${light ? "L" : "D"})`} strokeWidth="1.2" fill="none" />
      <circle cx="30" cy="10" r="2.5" fill={dot} />
      <circle cx="10" cy="10" r="1.5" fill={dotSm} />
      <circle cx="50" cy="10" r="1.5" fill={dotSm} />
      <defs>
        <linearGradient id={`og${light ? "L" : "D"}`} x1="0" y1="0" x2="60" y2="0">
          <stop offset="0%" stopColor={c1} />
          <stop offset="50%" stopColor={c2} />
          <stop offset="100%" stopColor={c1} />
        </linearGradient>
      </defs>
    </svg>
  );
}

function CornerOrnament({ className, light }: { className?: string; light?: boolean }) {
  const main = light ? "#b8770a" : "#d4960e";
  const sub = light ? "#93570b" : "#b8770a";
  const accent = light ? "#d4960e" : "#edc450";
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0 L30 0" stroke={main} strokeWidth="2" />
      <path d="M0 0 L0 30" stroke={main} strokeWidth="2" />
      <circle cx="8" cy="8" r="2" fill={accent} opacity="0.6" />
      <path d="M4 0 Q12 12 0 4" stroke={sub} strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [barberIndex, setBarberIndex] = useState(0);
  const isLight = theme === "light";

  const barberImages = ["/images/barber-portrait.jpg", "/images/barber.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBarberIndex((prev) => (prev === 0 ? 1 : 0));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const current = services[currentIndex];

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* ══════ BACKGROUNDS ══════ */}
      <AnimatePresence mode="wait">
        {isLight ? (
          <motion.div
            key="light-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* White textured background */}
            <img src="/images/white-bg.jpg" alt="" className="w-full h-full object-cover opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-cream-50/90 via-white/80 to-cream-100/90" />
            {/* Soft golden glow */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(212,150,14,0.08) 0%, transparent 55%)" }} />
            {/* Subtle vignette */}
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(248,232,192,0.3) 100%)" }} />
          </motion.div>
        ) : (
          <motion.div
            key="dark-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            <img src="/images/gold-bg.jpg" alt="" className="w-full h-full object-cover opacity-40" />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, transparent 20%, rgba(10,8,4,0.85) 70%, rgba(10,8,4,0.97) 100%)" }} />
            <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 80%, rgba(184,119,10,0.12) 0%, transparent 55%)" }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ PAGE BORDER ══════ */}
      <div className="absolute inset-3 sm:inset-5 pointer-events-none z-30">
        <div className={`absolute inset-0 border ${isLight ? "border-gold-500/25" : "border-gold-600/20"}`} />
        <div className={`absolute inset-[6px] border ${isLight ? "border-gold-400/15" : "border-gold-500/10"}`} />
        <CornerOrnament light={isLight} className="absolute -top-[1px] -left-[1px] w-16 h-16 sm:w-20 sm:h-20" />
        <CornerOrnament light={isLight} className="absolute -top-[1px] -right-[1px] w-16 h-16 sm:w-20 sm:h-20 -scale-x-100" />
        <CornerOrnament light={isLight} className="absolute -bottom-[1px] -left-[1px] w-16 h-16 sm:w-20 sm:h-20 -scale-y-100" />
        <CornerOrnament light={isLight} className="absolute -bottom-[1px] -right-[1px] w-16 h-16 sm:w-20 sm:h-20 -scale-x-100 -scale-y-100" />
      </div>

      {/* ══════ THEME TOGGLE ══════ */}
      <button
        onClick={() => setTheme(isLight ? "dark" : "light")}
        className={`absolute top-5 right-5 sm:top-7 sm:right-7 z-40 p-3 rounded-full border-2 backdrop-blur-sm transition-all duration-500 group cursor-pointer ${
          isLight
            ? "border-gold-500/40 bg-white/60 hover:bg-gold-100/80 hover:border-gold-500"
            : "border-gold-500/30 bg-dark-950/60 hover:bg-dark-900/80 hover:border-gold-400"
        }`}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          {isLight ? (
            <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
              <Moon className="w-5 h-5 text-gold-700" />
            </motion.div>
          ) : (
            <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
              <Sun className="w-5 h-5 text-gold-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* ══════ CONTENT ══════ */}
      <div className="relative z-20 h-full flex flex-col items-center">
        {/* ── LOGO ── */}
        <div className="pt-4 sm:pt-6 pb-1 flex flex-col items-center z-30">
          <div className={`flex flex-col items-center transition-all duration-500 ${
            isLight
              ? "drop-shadow-[0_0_12px_rgba(184,119,10,0.15)]"
              : "drop-shadow-[0_0_18px_rgba(212,150,14,0.2)]"
          }`}>

            {/* Top flourish SVG */}
            <svg viewBox="0 0 200 24" className="w-40 sm:w-52 mb-1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 12 Q85 2 60 8 Q40 12 20 6" stroke={isLight ? "#93570b" : "#d4960e"} strokeWidth="0.8" fill="none" opacity="0.5" />
              <path d="M100 12 Q115 2 140 8 Q160 12 180 6" stroke={isLight ? "#93570b" : "#d4960e"} strokeWidth="0.8" fill="none" opacity="0.5" />
              <path d="M100 12 Q88 20 65 15 Q45 12 30 18" stroke={isLight ? "#b8770a" : "#edc450"} strokeWidth="0.6" fill="none" opacity="0.3" />
              <path d="M100 12 Q112 20 135 15 Q155 12 170 18" stroke={isLight ? "#b8770a" : "#edc450"} strokeWidth="0.6" fill="none" opacity="0.3" />
              <circle cx="100" cy="12" r="2" fill={isLight ? "#93570b" : "#edc450"} opacity="0.6" />
              <circle cx="15" cy="8" r="1.2" fill={isLight ? "#b8770a" : "#d4960e"} opacity="0.3" />
              <circle cx="185" cy="8" r="1.2" fill={isLight ? "#b8770a" : "#d4960e"} opacity="0.3" />
            </svg>

            {/* Main name */}
            <div className="text-center">
              <h1 className={`font-lavishly text-7xl sm:text-8xl md:text-[7rem] tracking-normal leading-[0.9] ${
                isLight ? "text-gold-800" : "text-gold-300"
              }`}>
                Hammami
              </h1>

              {/* Decorative double line with diamond */}
              <div className="flex items-center gap-2 mt-2 justify-center">
                <div className={`h-px flex-1 max-w-[50px] sm:max-w-[70px] bg-gradient-to-r from-transparent ${
                  isLight ? "to-gold-500/50" : "to-gold-400/40"
                }`} />
                <div className={`w-1.5 h-1.5 rotate-45 ${isLight ? "bg-gold-600/50" : "bg-gold-400/40"}`} />
                <div className={`h-px w-4 sm:w-6 ${isLight ? "bg-gold-500/30" : "bg-gold-400/20"}`} />
                <span className={`font-lavishly text-4xl sm:text-5xl md:text-6xl tracking-normal ${
                  isLight ? "text-gold-700/80" : "text-gold-400/70"
                }`}>
                  Coiffeur
                </span>
                <div className={`h-px w-4 sm:w-6 ${isLight ? "bg-gold-500/30" : "bg-gold-400/20"}`} />
                <div className={`w-1.5 h-1.5 rotate-45 ${isLight ? "bg-gold-600/50" : "bg-gold-400/40"}`} />
                <div className={`h-px flex-1 max-w-[50px] sm:max-w-[70px] bg-gradient-to-l from-transparent ${
                  isLight ? "to-gold-500/50" : "to-gold-400/40"
                }`} />
              </div>
            </div>

            {/* Bottom flourish SVG — mirrored */}
            <svg viewBox="0 0 200 24" className="w-40 sm:w-52 mt-1 rotate-180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 12 Q85 2 60 8 Q40 12 20 6" stroke={isLight ? "#93570b" : "#d4960e"} strokeWidth="0.8" fill="none" opacity="0.5" />
              <path d="M100 12 Q115 2 140 8 Q160 12 180 6" stroke={isLight ? "#93570b" : "#d4960e"} strokeWidth="0.8" fill="none" opacity="0.5" />
              <path d="M100 12 Q88 20 65 15 Q45 12 30 18" stroke={isLight ? "#b8770a" : "#edc450"} strokeWidth="0.6" fill="none" opacity="0.3" />
              <path d="M100 12 Q112 20 135 15 Q155 12 170 18" stroke={isLight ? "#b8770a" : "#edc450"} strokeWidth="0.6" fill="none" opacity="0.3" />
              <circle cx="100" cy="12" r="2" fill={isLight ? "#93570b" : "#edc450"} opacity="0.6" />
              <circle cx="15" cy="8" r="1.2" fill={isLight ? "#b8770a" : "#d4960e"} opacity="0.3" />
              <circle cx="185" cy="8" r="1.2" fill={isLight ? "#b8770a" : "#d4960e"} opacity="0.3" />
            </svg>

          </div>
        </div>

        {/* ── MAIN AREA ── */}
        <div className="flex-1 relative w-full flex items-end justify-center overflow-visible">
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${isLight ? "bg-gold-500" : "bg-gold-400"}`}
              style={{
                width: `${2 + i}px`,
                height: `${2 + i}px`,
                left: `${15 + i * 14}%`,
                top: `${20 + (i % 3) * 25}%`,
                opacity: isLight ? 0.1 + (i % 3) * 0.06 : 0.15 + (i % 3) * 0.1,
                animation: `${isLight ? "pulse-gold-light" : "pulse-gold"} ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}

          {/* Golden description text BEHIND the barber */}
          <div className="absolute bottom-[10%] left-[5%] sm:left-[10%] md:left-[14%] lg:left-[17%] z-[5] pointer-events-none select-none">
            <p className={`font-bodoni font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.85] tracking-[0.04em] transition-colors duration-500 ${
              isLight ? "text-gold-400/[0.07]" : "text-gold-400/[0.06]"
            }`}>
              Style
              <br />
              <span className={`${isLight ? "text-gold-500/[0.06]" : "text-gold-500/[0.05]"}`}>& Class</span>
            </p>
          </div>
          {/* Barber PNG — switches between two pictures every 10s */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute bottom-0 left-[-2%] sm:left-[2%] md:left-[4%] lg:left-[7%] w-[88%] sm:w-[58%] md:w-[48%] lg:w-[40%] max-w-[580px] z-30"
          >
            <AnimatePresence mode="wait">
                <motion.img
                key={barberIndex}
                src={barberImages[barberIndex]}
                alt="Master Barber"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={`w-full h-auto object-contain object-bottom transition-[filter] duration-500 ${
                  isLight
                    ? "drop-shadow-[0_10px_40px_rgba(0,0,0,0.15)]"
                    : "drop-shadow-[0_0_40px_rgba(212,150,14,0.15)]"
                }`}
                style={{
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 100%)",
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 14%, black 100%)",
                }}
              />
            </AnimatePresence>
            {/* Floor glow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-20 blur-2xl transition-all duration-500"
              style={{
                background: isLight
                  ? "radial-gradient(ellipse, rgba(184,119,10,0.1) 0%, transparent 70%)"
                  : "radial-gradient(ellipse, rgba(212,150,14,0.2) 0%, transparent 70%)",
              }}
            />
          </motion.div>
          {/* ── PRICE LABEL ── */}
          <div className="absolute right-4 sm:right-[8%] md:right-[10%] top-1/2 -translate-y-1/2 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentIndex}-${theme}`}
                initial={{ opacity: 0, scale: 0.8, x: 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -40 }}
                transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative"
                style={{ animation: "float 6s ease-in-out infinite" }}
              >
                {/* Outer shimmer border */}
                <div
                  className={`${isLight ? "gold-shimmer-border-light" : "gold-shimmer-border"} p-[2px] transition-shadow duration-500`}
                  style={{
                    boxShadow: isLight
                      ? "0 0 30px rgba(184,119,10,0.15), 0 8px 32px rgba(0,0,0,0.08)"
                      : "0 0 30px rgba(212,150,14,0.25)",
                  }}
                >
                  {/* Inner border */}
                  <div className={`border p-[3px] ${
                    isLight ? "border-gold-400/30 bg-white/70" : "border-gold-500/40 bg-dark-950/60"
                  }`}>
                    {/* Card content */}
                    <div className={`backdrop-blur-md px-8 sm:px-12 py-7 sm:py-9 text-center relative overflow-hidden ${
                      isLight
                        ? "bg-gradient-to-br from-white/95 via-cream-50/95 to-white/95"
                        : "bg-gradient-to-br from-dark-950/95 via-dark-900/95 to-dark-950/95"
                    }`}>
                      {/* Inner glow */}
                      <div
                        className="absolute inset-0"
                        style={{
                          opacity: isLight ? 0.15 : 0.2,
                          background: isLight
                            ? "radial-gradient(ellipse at 50% 0%, rgba(212,150,14,0.2) 0%, transparent 60%)"
                            : "radial-gradient(ellipse at 50% 0%, rgba(237,196,80,0.3) 0%, transparent 60%)",
                        }}
                      />

                      <div className="relative z-10">
                        <GoldOrnament light={isLight} className="w-16 mx-auto mb-3 opacity-60" />

                        {/* Service name */}
                        <p className={`font-cormorant text-xs sm:text-sm uppercase tracking-[0.35em] mb-2 ${
                          isLight ? "text-gold-700/80" : "text-gold-200/80"
                        }`}>
                          {current.name}
                        </p>

                        {/* Line */}
                        <div className={`mx-auto mb-3 h-px w-12 bg-gradient-to-r from-transparent to-transparent ${
                          isLight ? "via-gold-500/50" : "via-gold-400/60"
                        }`} />

                        {/* Price */}
                        <p className={`font-playfair text-5xl sm:text-7xl font-bold leading-none ${
                          isLight ? "gold-shimmer-text-light" : "gold-shimmer-text"
                        }`}>
                          {current.price}
                        </p>

                        <GoldOrnament light={isLight} className="w-16 mx-auto mt-3 opacity-60 rotate-180" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner diamonds */}
                {["-top-[5px] -left-[5px]", "-top-[5px] -right-[5px]", "-bottom-[5px] -left-[5px]", "-bottom-[5px] -right-[5px]"].map((pos, i) => (
                  <span
                    key={i}
                    className={`absolute ${pos} w-[10px] h-[10px] rotate-45 ${
                      isLight ? "bg-gold-500" : "bg-gold-400"
                    }`}
                    style={{
                      boxShadow: isLight
                        ? "0 0 8px rgba(184,119,10,0.4)"
                        : "0 0 8px rgba(212,150,14,0.6)",
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="flex items-center justify-center gap-1.5 mt-5">
              {services.map((_, i) => (
                <span
                  key={i}
                  className={`block transition-all duration-500 ${
                    i === currentIndex
                      ? `w-5 h-1.5 ${isLight ? "bg-gold-600 shadow-[0_0_6px_rgba(184,119,10,0.4)]" : "bg-gold-400 shadow-[0_0_6px_rgba(212,150,14,0.5)]"}`
                      : `w-1.5 h-1.5 rounded-full ${isLight ? "bg-gold-400/30" : "bg-gold-700/30"}`
                  }`}
                />
              ))}
            </div>

            {/* Contact & Social — centred under card */}
            <div className="flex flex-col items-center mt-5 gap-3">
              {/* Phone number */}
              <a
                href="tel:+21697120380"
                className={`flex items-center gap-2 group transition-all duration-300 ${
                  isLight ? "hover:drop-shadow-[0_0_8px_rgba(184,119,10,0.3)]" : "hover:drop-shadow-[0_0_8px_rgba(212,150,14,0.4)]"
                }`}
              >
                <svg viewBox="0 0 24 24" fill="none" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                  isLight ? "text-gold-600/70 group-hover:text-gold-700" : "text-gold-500/60 group-hover:text-gold-400"
                }`} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                <span className={`font-cormorant italic text-sm sm:text-base tracking-[0.15em] transition-colors duration-300 ${
                  isLight ? "text-gold-700/80 group-hover:text-gold-800" : "text-gold-400/70 group-hover:text-gold-300"
                }`}>
                  +216 97120380
                </span>
              </a>

              {/* Social links */}
              <div className="flex items-center gap-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/hammami.coiffeur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 group transition-all duration-300 ${
                    isLight ? "hover:drop-shadow-[0_0_8px_rgba(184,119,10,0.3)]" : "hover:drop-shadow-[0_0_8px_rgba(212,150,14,0.4)]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                    isLight ? "text-gold-600/70 group-hover:text-gold-700" : "text-gold-500/60 group-hover:text-gold-400"
                  }`} fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className={`font-cormorant italic text-xs sm:text-sm tracking-[0.1em] transition-colors duration-300 ${
                    isLight ? "text-gold-700/70 group-hover:text-gold-800" : "text-gold-400/60 group-hover:text-gold-300"
                  }`}>
                    Hammami Coiffeur 
                  </span>
                </a>

                {/* Separator */}
                <span className={`text-[8px] ${isLight ? "text-gold-500/30" : "text-gold-600/30"}`}>✦</span>

                {/* Instagram */}
                <a
                  href="https://instagram.com/hammamicoiffeur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 group transition-all duration-300 ${
                    isLight ? "hover:drop-shadow-[0_0_8px_rgba(184,119,10,0.3)]" : "hover:drop-shadow-[0_0_8px_rgba(212,150,14,0.4)]"
                  }`}
                >
                  <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                    isLight ? "text-gold-600/70 group-hover:text-gold-700" : "text-gold-500/60 group-hover:text-gold-400"
                  }`} fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                  <span className={`font-cormorant italic text-xs sm:text-sm tracking-[0.1em] transition-colors duration-300 ${
                    isLight ? "text-gold-700/70 group-hover:text-gold-800" : "text-gold-400/60 group-hover:text-gold-300"
                  }`}>
                    @
hammamicoiffeur

                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM TAGLINE ── */}
        <div className="pb-6 sm:pb-8 text-center z-30">
          <p className={`font-cormorant italic text-xs sm:text-sm tracking-[0.3em] uppercase transition-colors duration-500 ${
            isLight ? "text-gold-600/40" : "text-gold-500/40"
          }`}>
            ✦&nbsp; Craftsmanship &nbsp;·&nbsp; Elegance &nbsp;·&nbsp; Precision &nbsp;✦
          </p>
        </div>
      </div>
    </div>
  );
}
