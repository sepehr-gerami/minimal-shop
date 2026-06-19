"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "../public/logos/logo.png";
import GradientText from './GradientText'
import LoginAccount from "../Account/page";
import CartModalButton from "./CartModalButton";

type SubItem = { title: string; desc: string; href?: string };
type NavGroup = { label: string; key: string; items: SubItem[] };

const navItems: NavGroup[] = [
  {
    label: "Categories",
    key: "categories",
    items: [
      { title: "All Products", desc: "Browse everything", href: "/products" },
      { title: "New Arrivals", desc: "Latest additions" },
      { title: "Sale", desc: "Best deals" },
    ],
  },
  {
    label: "About",
    key: "about",
    items: [
      { title: "Our Story", desc: "How it all started" },
      { title: "Team", desc: "Meet the people" },
      { title: "Careers", desc: "Join us" },
    ],
  },
  {
    label: "Docs",
    key: "docs",
    items: [
      { title: "Getting Started", desc: "Set up in minutes" },
      { title: "API Reference", desc: "Endpoints & params" },
      { title: "Guides", desc: "Step by step" },
    ],
  },
  {
    label: "Support",
    key: "support",
    items: [
      { title: "Help Center", desc: "Find answers fast" },
      { title: "Community", desc: "Talk with users" },
      { title: "Contact", desc: "Reach our team" },
    ],
  },
];

export default function Navbar() {
 
  const [active, setActive] = useState<string | null>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0 });
  const navRef = useRef<HTMLElement>(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileGroupKey, setMobileGroupKey] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const activeGroup = navItems.find((g) => g.key === active);
  const mobileGroup = navItems.find((g) => g.key === mobileGroupKey);

  const closeDrawer = () => {
    setDrawerOpen(false);
    setMobileGroupKey(null);
  };

  return (
    <div className="fixed z-50 w-full px-2 sm:px-4">
      <motion.nav
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setActive(null)}
        className="relative flex items-center justify-between w-full gap-1 px-2.5 sm:px-4 py-2 border border-gray-300 mt-2 rounded-2xl overflow-hidden"
        style={{
          background:
            "color-mix(in oklch, rgb(255 255 255 / 8%) 72%, transparent)",
          backdropFilter: "blur(16px) saturate(1.2)",
          boxShadow:
            "inset 0 1px 0 color-mix(in oklch, rgb(255 255 255 / 12%) 65%, transparent), inset 0 0 0 1px color-mix(in oklch, rgb(255 255 255 / 6%) 55%, transparent)",
        }}
      >
        {/* Spotlight — desktop only, this is a mouse-position effect, meaningless on touch */}
        <motion.div
          className="pointer-events-none absolute inset-0 hidden lg:block"
          animate={{ opacity: active ? 1 : 0 }}
          style={{
            background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.08), transparent 70%)`,
          }}
        />

        {/* Logo + brand name. Brand name drops off below ~400px so the row never gets cramped. */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 shrink-0">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
            className="w-8 h-8 min-[400px]:w-9 min-[400px]:h-9 sm:w-12.5 sm:h-12.5 shrink-0"
          />
          <GradientText
            colors={["#e78139", "#fbba8e"]}
            animationSpeed={3}
            className="hidden min-[400px]:block text-sm sm:text-xl font-bold whitespace-nowrap"
          >
            Minimal <span className="text-fuchsia-500">Shop</span>ping
          </GradientText>
        </div>

        {/* Nav Items — desktop only, hover-driven dropdown trigger */}
        <div className="absolute left-1/2 font-medium -translate-x-1/2 hidden lg:flex items-center gap-4">
          {navItems.map((group) => (
            <div key={group.key} className="relative">
              <button
                onMouseEnter={() => setActive(group.key)}
                className="relative px-3 py-1.5 text-sm"
              >
                {active === group.key && (
                  <motion.div
                    layoutId="pill"
                    className="absolute inset-0 rounded-full bg-black/10"
                  />
                )}
                <span className="relative z-10">{group.label}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-0.5 min-[400px]:gap-1 sm:gap-2 ml-auto shrink-0">
          {/* Always visible, scaled down at the smallest sizes via each component's own responsive classes */}
          <LoginAccount />
          <CartModalButton />

          {/* Hamburger — mobile/tablet only */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="lg:hidden relative w-8 h-8 sm:w-9 sm:h-9 flex flex-col items-center justify-center gap-1 sm:gap-1.5 shrink-0"
          >
            <span className="block w-4 sm:w-5 h-0.5 bg-gray-900 rounded-full" />
            <span className="block w-4 sm:w-5 h-0.5 bg-gray-900 rounded-full" />
            <span className="block w-4 sm:w-5 h-0.5 bg-gray-900 rounded-full" />
          </button>
        </div>
      </motion.nav>

      {/* Desktop dropdown — hover-driven, unchanged logic, desktop only */}
      <AnimatePresence>
        {active && activeGroup && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onMouseEnter={() => setActive(active)}
            onMouseLeave={() => setActive(null)}
            className="hidden lg:block absolute top-25 left-150 -translate-x-1/3 rounded-2xl p-4 min-w-100"
            style={{
              background:
                "color-mix(in oklch, rgb(255 255 255 / 12%) 72%, transparent)",
              backdropFilter: "blur(16px) saturate(1.2)",
              boxShadow:
                "inset 0 1px 0 color-mix(in oklch, rgb(255 255 255 / 15%) 65%, transparent), inset 0 0 0 1px color-mix(in oklch, rgb(255 255 255 / 6%) 55%, transparent)",
            }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-900 mb-3">
              {activeGroup.label}
            </p>
            <ul className="grid gap-3">
              {activeGroup.items.map((item) => (
                <li key={item.title}>
                  <Link
                    href={"/product/"}
                    className="block text-sm font-medium text-gray-900 hover:text-gray-900/60 transition-colors duration-300"
                  >
                    {item.title}
                    <span className="block text-xs text-gray-900 font-normal mt-0.5">
                      {item.desc}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile drawer — tap-driven, no hover logic at all */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeDrawer}
              className="lg:hidden fixed inset-0 z-40 bg-black/40"
            />

          
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="lg:hidden fixed top-0 right-0 z-50 h-full w-[min(320px,85%)] bg-white shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 shrink-0">
                {mobileGroup ? (
                  <button
                    onClick={() => setMobileGroupKey(null)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-700"
                  >
                    <span aria-hidden>←</span> Back
                  </button>
                ) : (
                  <span className="text-sm font-semibold text-gray-900">Menu</span>
                )}
                <button
                  onClick={closeDrawer}
                  aria-label="Close menu"
                  className="text-gray-500 text-xl leading-none px-1"
                >
                  ×
                </button>
              </div>

    
              <div className="flex-1 min-h-0 overflow-y-auto px-2 py-2">
                <AnimatePresence mode="wait">
                  {!mobileGroup ? (
                    // Top-level groups list
                    <motion.div
                      key="groups"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.18 }}
                    >
                      <ul className="flex flex-col">
                        {navItems.map((group) => (
                          <li key={group.key}>
                            <button
                              onClick={() => setMobileGroupKey(group.key)}
                              className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium text-gray-900 rounded-lg active:bg-gray-100"
                            >
                              {group.label}
                              <span aria-hidden className="text-gray-400">→</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : (
               
                    <motion.div
                      key="subview"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.18 }}
                    >
                      <p className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-widest text-gray-500">
                        {mobileGroup.label}
                      </p>
                      <ul className="grid gap-1">
                        {mobileGroup.items.map((item) => (
                          <li key={item.title}>
                            <Link
                              href={"/product/"}
                              onClick={closeDrawer}
                              className="block px-3 py-2.5 rounded-lg active:bg-gray-100"
                            >
                              <span className="block text-sm font-medium text-gray-900">
                                {item.title}
                              </span>
                              <span className="block text-xs text-gray-500 mt-0.5">
                                {item.desc}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}