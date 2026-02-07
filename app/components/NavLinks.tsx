"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  name: string;
  href: string;
  activeClass: string;
  inactiveClass: string;
  hoverClass: string;
};

const navItems: NavItem[] = [
  {
    name: "Florida",
    href: "/florida",
    activeClass: "text-white",
    inactiveClass: "text-gray-400",
    hoverClass: "hover:text-white",
  },
  {
    name: "Illinois",
    href: "/illinois",
    activeClass: "text-white",
    inactiveClass: "text-gray-400",
    hoverClass: "hover:text-white",
  },
  {
    name: "Compare",
    href: "/compare",
    activeClass: "text-white",
    inactiveClass: "text-gray-400",
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
    activeClass: "text-amber-400 font-semibold",
    inactiveClass: "text-amber-300",
    hoverClass: "hover:text-amber-400",
  },
  {
    name: "Act Now",
    href: "/act",
    activeClass: "text-emerald-300",
    inactiveClass: "text-emerald-400",
    hoverClass: "hover:text-emerald-300",
  },
];

function getClassName(item: NavItem, pathname: string) {
  const isActive = pathname === item.href;
  return `${isActive ? item.activeClass : item.inactiveClass} ${item.hoverClass} transition whitespace-nowrap`;
}

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <div className="hidden md:flex gap-6 text-sm">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={getClassName(item, pathname)}>
            {item.name}
          </Link>
        ))}
      </div>
      <div className="md:hidden flex items-center gap-4 text-xs overflow-x-auto max-w-[58vw]">
        {navItems.map((item) => (
          <Link key={`${item.href}-mobile`} href={item.href} className={getClassName(item, pathname)}>
            {item.name}
          </Link>
        ))}
      </div>
    </>
  );
}
