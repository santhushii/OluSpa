import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useBodyScrollLock } from "../hooks/useBodyScrollLock";
import type { SiteContent } from "../types/content";
import { SocialIcon } from "./icons/SocialIcon";
import { sanitizeTelHref } from "../utils/format";
import { handleSmoothScroll } from "../utils/scroll";

type Props = {
  branding: SiteContent["branding"];
  navigation: SiteContent["navigation"];
  onCtaClick?: () => void;
};

const isInternalLink = (href: string) => href.startsWith("/");

export default function Navbar({ branding, navigation, onCtaClick }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  useBodyScrollLock(menuOpen);

  const handleNavigate = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-[#050706] text-white">
      <nav className="mx-auto flex max-w-container items-center justify-between px-4 py-3 md:py-4">
        <Link
          to="/"
          className="flex items-center gap-3 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          aria-label="OLU Ayurveda Beach Villa home"
          onClick={handleNavigate}
        >
          <div className="rounded-2xl bg-white px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 shadow-[0_8px_18px_rgba(0,0,0,0.35)]">
            <img
              src={branding.primaryLogo}
              alt="OLU Ayurveda Beach logo"
              className="h-10 w-auto sm:h-12 md:h-14 lg:h-18 xl:h-20 transition-transform duration-200 hover:scale-105"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </Link>

        <div className="flex items-center gap-3 md:gap-4">
          {onCtaClick ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full bg-olu-green px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-[11px] md:px-7 md:py-[11px] md:text-[10px] font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white shadow-[0_8px_18px_rgba(46,139,87,0.35)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olu-green hover:bg-olu-seafoam hover:translate-y-[-1px]"
              onClick={() => {
                handleNavigate();
                onCtaClick();
              }}
            >
              {navigation.cta.label}
            </button>
          ) : (
            <a
              href={navigation.cta.href}
              className="inline-flex items-center justify-center rounded-full bg-olu-green px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-[11px] md:px-7 md:py-[11px] md:text-[10px] font-semibold uppercase tracking-[0.3em] sm:tracking-[0.4em] text-white shadow-[0_8px_18px_rgba(46,139,87,0.35)] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olu-green hover:bg-olu-seafoam hover:translate-y-[-1px]"
              onClick={(e) => {
                handleNavigate();
                handleSmoothScroll(e);
              }}
            >
              {navigation.cta.label}
            </a>
          )}
          <button
            type="button"
            className="flex flex-col items-center gap-1 text-[10px] uppercase tracking-[0.35em] text-white/80 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white hover:text-white md:text-[11px]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span>Menu</span>
            <span className="flex flex-col gap-1">
              <motion.span
                className="block h-[2px] w-6 bg-white md:w-7"
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-white md:w-7"
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[2px] w-6 bg-white md:w-7"
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50"
          >
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url(/img/menu-overlay.svg)" }} />
            <div className="absolute inset-0 bg-[#050706]/85" />

            <div className="relative flex h-full flex-col justify-between px-4 py-6 text-white sm:px-6 sm:py-8 md:px-16">
            <div className="flex items-center justify-between">
              <img src={branding.primaryLogo} alt="OLU Ayurveda Beach logo" className="h-16 w-auto sm:h-20 md:h-24" />
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-12 w-12 items-center justify-center text-3xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:text-4xl"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="grid gap-8 sm:gap-10 md:gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center">
              <ul className="space-y-3 sm:space-y-4 md:space-y-5 text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-serifDisplay uppercase tracking-[0.3em] sm:tracking-[0.35em] md:leading-snug">
                {navigation.links.map((item) => (
                  <li key={`overlay-${item.label}`}>
                    {isInternalLink(item.href) ? (
                      <Link
                        to={item.href}
                        className="transition-colors hover:text-white/70"
                        onClick={handleNavigate}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        className="transition-colors duration-200 hover:text-white/90"
                        onClick={(e) => {
                          handleNavigate();
                          handleSmoothScroll(e);
                        }}
                      >
                        {item.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>

              <div className="space-y-4 sm:space-y-6 text-xs sm:text-sm text-white/80 md:justify-self-end">
                {onCtaClick ? (
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.45em] text-[#050706] shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95"
                    onClick={() => {
                      handleNavigate();
                      onCtaClick();
                    }}
                  >
                    {navigation.cta.label}
                  </button>
                ) : (
                  <a
                    href={navigation.cta.href}
                    className="inline-flex items-center justify-center rounded-md border border-white/25 bg-white/90 px-8 py-3 text-xs font-semibold uppercase tracking-[0.45em] text-[#050706] shadow-lg transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95"
                    onClick={(e) => {
                      handleNavigate();
                      handleSmoothScroll(e);
                    }}
                  >
                    {navigation.cta.label}
                  </a>
                )}

                <div className="space-y-2 text-xs uppercase tracking-[0.35em]">
                  <p className="text-white/60">Follow Us On</p>
                  <div className="flex gap-3">
                    {navigation.overlay.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:text-white"
                      >
                        <SocialIcon name={social.icon} className="h-4 w-4 fill-current" title={social.label} />
                      </a>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-[10px] sm:text-[11px] leading-relaxed uppercase tracking-[0.28em] sm:tracking-[0.32em] text-white/60">
                  <p>
                    Phone :
                    {" "}
                    <a href={`tel:${sanitizeTelHref(navigation.overlay.contact.phone)}`} className="underline-offset-2 hover:underline">
                      {navigation.overlay.contact.phone}
                    </a>
                  </p>
                  <p>
                    Email :
                    {" "}
                    <a href={`mailto:${navigation.overlay.contact.email}`} className="underline-offset-2 hover:underline">
                      {navigation.overlay.contact.email}
                    </a>
                  </p>
                  <p>Address : {navigation.overlay.contact.address}</p>
                </div>
              </div>
            </div>

            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/50">{navigation.overlay.copyright}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

