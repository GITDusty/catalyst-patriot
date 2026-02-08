"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type StateItem = {
  name: string;
  href: string;
  icon: string;
};

type PrimaryNavItem = {
  name: string;
  href: string;
  isAction?: boolean;
};

const stateItems: StateItem[] = [
  { name: "Florida", href: "/florida", icon: "🌴" },
  { name: "Illinois", href: "/illinois", icon: "🏛️" },
  { name: "Arizona", href: "/arizona", icon: "🌵" },
  { name: "Texas", href: "/texas", icon: "🤠" },
];

const primaryNavItems: PrimaryNavItem[] = [
  {
    name: "Compare",
    href: "/compare",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Social Security",
    href: "/social-security",
  },
  {
    name: "Housing",
    href: "/housing",
  },
  {
    name: "Act Now",
    href: "/act",
    isAction: true,
  },
];

function getNavClass(item: PrimaryNavItem, pathname: string) {
  const isActive = pathname === item.href;

  if (item.isAction) {
    return [
      "whitespace-nowrap rounded-lg border px-4 py-2 font-semibold transition-all duration-200",
      isActive
        ? "border-amber-500/50 bg-amber-500/20 text-amber-400 font-bold"
        : "border-amber-500/30 bg-amber-500/10 text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/20",
    ].join(" ");
  }

  return [
    "whitespace-nowrap transition-colors",
    isActive ? "text-amber-400 font-bold" : "text-white/80 hover:text-white",
  ].join(" ");
}

export default function NavLinks() {
  const pathname = usePathname();
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileStatesOpen, setIsMobileStatesOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const isStateActive = useMemo(
    () => stateItems.some((item) => pathname.startsWith(item.href)),
    [pathname]
  );

  const totalMenuItems = stateItems.length + 1;
  const closeMenus = () => {
    setIsDesktopOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileStatesOpen(false);
  };

  useEffect(() => {
    if (!isDesktopOpen) {
      return;
    }

    const handlePointerOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (!desktopDropdownRef.current?.contains(target)) {
        setIsDesktopOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDesktopOpen(false);
        desktopTriggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointerOutside);
    document.addEventListener("touchstart", handlePointerOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerOutside);
      document.removeEventListener("touchstart", handlePointerOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isDesktopOpen]);

  useEffect(() => {
    if (!isDesktopOpen) {
      return;
    }

    const activeItem = menuItemRefs.current[focusedIndex];
    activeItem?.focus();
  }, [focusedIndex, isDesktopOpen]);

  const openDesktopMenu = (startIndex: number) => {
    setIsDesktopOpen(true);
    setFocusedIndex(startIndex);
  };

  const handleTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openDesktopMenu(0);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      openDesktopMenu(totalMenuItems - 1);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isDesktopOpen) {
        setIsDesktopOpen(false);
      } else {
        openDesktopMenu(0);
      }
    }
  };

  const handleMenuKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!isDesktopOpen) {
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev + 1) % totalMenuItems);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setFocusedIndex((prev) => (prev - 1 + totalMenuItems) % totalMenuItems);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      setFocusedIndex(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      setFocusedIndex(totalMenuItems - 1);
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      if (event.shiftKey) {
        setFocusedIndex((prev) => (prev - 1 + totalMenuItems) % totalMenuItems);
      } else {
        setFocusedIndex((prev) => (prev + 1) % totalMenuItems);
      }
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setIsDesktopOpen(false);
      desktopTriggerRef.current?.focus();
    }
  };

  return (
    <>
      <div className="hidden items-center gap-6 text-sm md:flex">
        <div className="relative" ref={desktopDropdownRef}>
          <button
            ref={desktopTriggerRef}
            type="button"
            onClick={() => {
              if (isDesktopOpen) {
                setIsDesktopOpen(false);
              } else {
                openDesktopMenu(0);
              }
            }}
            onKeyDown={handleTriggerKeyDown}
            aria-haspopup="true"
            aria-expanded={isDesktopOpen}
            aria-controls="states-dropdown-menu"
            className={`inline-flex items-center gap-1 transition ${
              isStateActive
                ? "text-amber-400 font-bold"
                : "text-white/80 hover:text-amber-400"
            }`}
          >
            <span>States</span>
            <span
              aria-hidden="true"
              className={`text-xs transition-transform ${
                isDesktopOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>

          {isDesktopOpen ? (
            <div
              id="states-dropdown-menu"
              role="menu"
              aria-label="States navigation"
              onKeyDown={handleMenuKeyDown}
              className="absolute left-0 top-full z-40 mt-2 min-w-48 rounded-lg border border-white/10 bg-slate-900/95 py-2 shadow-2xl backdrop-blur-md"
            >
              {stateItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="menuitem"
                    onClick={closeMenus}
                    ref={(node) => {
                      menuItemRefs.current[index] = node;
                    }}
                    className={`flex items-center justify-between gap-3 px-4 py-2 transition ${
                      isActive
                        ? "bg-white/5 text-amber-300"
                        : "text-white/90 hover:bg-white/5 hover:text-amber-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    {isActive ? (
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
                    ) : null}
                  </Link>
                );
              })}

              <div className="my-2 border-t border-white/10" />
              <Link
                href="/act#waitlist"
                role="menuitem"
                onClick={closeMenus}
                ref={(node) => {
                  menuItemRefs.current[stateItems.length] = node;
                }}
                className="flex items-center gap-2 px-4 py-2 text-cyan-300 transition hover:bg-white/5 hover:text-cyan-400"
              >
                <span aria-hidden="true" className="text-base leading-none">+
                </span>
                <span>Request Your State</span>
              </Link>
            </div>
          ) : null}
        </div>

        {primaryNavItems.map((item) => (
          <div key={item.href} className="flex items-center">
            {item.href === "/social-security" ? (
              <div className="mr-6 hidden h-4 w-px bg-white/20 md:block" />
            ) : null}
            <Link href={item.href} onClick={closeMenus} className={getNavClass(item, pathname)}>
              {item.name}
            </Link>
          </div>
        ))}
      </div>

      <div className="relative md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-nav-menu"
          className="inline-flex min-h-10 min-w-10 items-center justify-center rounded-md border border-white/20 px-3 text-sm text-white/90 transition hover:border-white/40 hover:text-white"
        >
          Menu
        </button>

        {isMobileMenuOpen ? (
          <div
            id="mobile-nav-menu"
            className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-white/10 bg-slate-900/95 p-2 shadow-2xl backdrop-blur-md"
          >
          <button
            type="button"
            onClick={() => setIsMobileStatesOpen((prev) => !prev)}
            aria-expanded={isMobileStatesOpen}
            aria-controls="mobile-states"
            className={`flex min-h-11 w-full items-center justify-between rounded px-3 py-2 text-left transition ${
              isStateActive
                ? "text-amber-400 font-bold"
                : "text-white/80 hover:text-amber-400"
            }`}
          >
            <span>States</span>
            <span
              aria-hidden="true"
              className={`text-[10px] transition-transform ${
                isMobileStatesOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>

          {isMobileStatesOpen ? (
            <div
              id="mobile-states"
              className="mt-1 w-full rounded-lg border border-white/10 bg-slate-900/90 p-2 backdrop-blur-md"
            >
              {stateItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={`${item.href}-mobile-state`}
                    href={item.href}
                    onClick={closeMenus}
                    className={`flex min-h-11 items-center justify-between rounded px-3 py-2 transition ${
                      isActive
                        ? "bg-white/5 text-amber-400 font-bold"
                        : "text-white/90 hover:bg-white/5 hover:text-amber-400"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span aria-hidden="true">{item.icon}</span>
                      <span>{item.name}</span>
                    </span>
                    {isActive ? (
                      <span aria-hidden="true" className="h-2 w-2 rounded-full bg-amber-400" />
                    ) : null}
                  </Link>
                );
              })}
              <div className="my-2 border-t border-white/10" />
              <Link
                href="/act#waitlist"
                onClick={closeMenus}
                className="flex min-h-11 items-center gap-2 rounded px-3 py-2 text-cyan-300 transition hover:bg-white/5 hover:text-cyan-400"
              >
                <span aria-hidden="true">+</span>
                <span>Request Your State</span>
              </Link>
            </div>
          ) : null}

          <div className="mt-1 flex flex-col gap-1 text-sm">
            {primaryNavItems.map((item) => (
              <Link
                key={`${item.href}-mobile`}
                href={item.href}
                onClick={closeMenus}
                className={`flex min-h-11 items-center rounded px-3 py-2 ${getNavClass(item, pathname)}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
