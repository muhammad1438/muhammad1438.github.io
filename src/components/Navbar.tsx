"use client";

import React, { useEffect, useSyncExternalStore, useState } from "react";
import { useTheme } from "next-themes";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Zap, Sun, Moon } from "lucide-react";

interface NavLink {
  label: string;
  href: string;
}

const LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Software", href: "#projects" },
  { label: "Publications", href: "#publications" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 150;
      let active = "";
      for (const link of LINKS) {
        const id = link.href.substring(1);
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          active = link.href;
        }
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
    setOpen(false);
  };

  const isDark = theme === "dark";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-350 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-border py-3.5"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="max-w-[1180px] mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "#hero")}
          className="flex items-center gap-3 group"
        >
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 border border-accent-primary/35 shadow-[inset_0_0_12px_color-mix(in_srgb,var(--accent-primary)_25%,transparent)] text-accent-primary group-hover:scale-105 transition-all">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="font-heading font-semibold text-sm leading-tight tracking-tight">
              M. F. Arshad
            </div>
            <div className="text-[10px] text-muted-foreground font-light font-mono leading-none mt-0.5 tracking-wider uppercase">
              PhD · Catalyst Dynamics
            </div>
          </div>
        </a>

        {/* Desktop links + theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <ul className="flex items-center gap-1.5 bg-foreground/[0.02] border border-border rounded-full p-1 backdrop-blur-sm">
            {LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={`relative block px-4 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all ${
                      isActive
                        ? "text-accent-primary bg-foreground/[0.04]"
                        : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-accent-primary rounded-full shadow-[0_0_6px_var(--accent-primary)]" />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/[0.04] transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          )}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-foreground/80 hover:text-foreground hover:bg-foreground/[0.04] transition-all cursor-pointer">
              <Menu className="w-4 h-4" />
            </SheetTrigger>
            <SheetContent
              side="top"
              className="w-full bg-background/95 border-b border-border backdrop-blur-xl pt-16 pb-8 px-6 text-center shadow-2xl"
            >
              <ul className="flex flex-col gap-5">
                {LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block py-2 text-sm font-heading font-medium tracking-wide text-foreground/80 hover:text-accent-primary transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
