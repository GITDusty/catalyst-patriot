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
  activeClass: string;
  inactiveClass: string;
  hoverClass: string;
};

const stateItems: StateItem[] = [
  { name: "Florida", href: "/florida", icon: "🌴" },
  { name: "Illinois", href: "/illinois", icon: "🏛️" },
];

const primaryNavItems: PrimaryNavItem[] = [
  {
    name: "Compare",
    href: "/compare",
    activeClass: "text-white",
    inactiveClass: "text-gray-300",
    hoverClass: "hover:text-white",
  },
  {
    name: "Social Security",
    href: "/social-security",
    activeClass: "text-amber-300",
    inactiveClass: "text-amber-400",
    hoverClass: "hover:text-amber-300",
  },
  {
    name: "Housing",
    href: "/housing",
    activeClass: "text-amber-300 font-semibold",
    inactiveClass: "text-amber-300",
    hoverClass: "hover:text-amber-200",
  },
  {
    name: "About",
    href: "/about",
    activeClass: "text-cyan-400 font-semibold",
    inactiveClass: "text-white/80",
    hoverClass: "hover:text-cyan-400",
  },
  {
    name: "Act Now",
    href: "/act",
    activeClass: "text-emerald-300",
    inactiveClass: "text-emerald-400",
    hoverClass: "hover:text-emerald-300",
  },
];

function getNavClass(item: PrimaryNavItem, pathname: string) {
  const isActive = pathname === item.href;
  return `${isActive ? item.activeClass : item.inactiveClass} ${item.hoverClass} transition whitespace-nowrap`;
}

export default function NavLinks() {
  const pathname = usePathname();
  const [isDesktopOpen, setIsDesktopOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);
  const menuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const isStateActive = useMemo(
    () => stateItems.some((item) => pathname === item.href),
    [pathname]
  );

  const totalMenuItems = stateItems.length + 1;
  const closeMenus = () => {
    setIsDesktopOpen(false);
    setIsMobileOpen(false);
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
                ? "text-amber-300 font-semibold"
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
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenus}
            className={getNavClass(item, pathname)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <div className="flex max-w-[62vw] flex-col items-end gap-1 text-xs md:hidden">
        <div className="flex items-center gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-states"
            className={`inline-flex items-center gap-1 whitespace-nowrap transition ${
              isStateActive
                ? "text-amber-300 font-semibold"
                : "text-white/80 hover:text-amber-400"
            }`}
          >
            States
            <span
              aria-hidden="true"
              className={`text-[10px] transition-transform ${
                isMobileOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>

          {primaryNavItems.map((item) => (
            <Link
              key={`${item.href}-mobile`}
              href={item.href}
              onClick={closeMenus}
              className={getNavClass(item, pathname)}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {isMobileOpen ? (
          <div
            id="mobile-states"
            className="w-full rounded-lg border border-white/10 bg-slate-900/90 p-2 backdrop-blur-md"
          >
            {stateItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={`${item.href}-mobile-state`}
                  href={item.href}
                  onClick={closeMenus}
                  className={`flex items-center justify-between rounded px-3 py-2 transition ${
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
              onClick={closeMenus}
              className="flex items-center gap-2 rounded px-3 py-2 text-cyan-300 transition hover:bg-white/5 hover:text-cyan-400"
            >
              <span aria-hidden="true">+</span>
              <span>Request Your State</span>
            </Link>
          </div>
        ) : null}
      </div>
    </>
  );
}
