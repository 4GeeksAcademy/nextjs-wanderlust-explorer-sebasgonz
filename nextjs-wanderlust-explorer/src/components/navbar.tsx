"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { href: "/", label: "Inicio" },
  { href: "/experiences", label: "Explorar" },
  { href: "/favorites", label: "Favoritos" },
  { href: "/profile", label: "Perfil" },
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Wanderlust Explorer, inicio">
        <span className="brand-mark" aria-hidden="true">w</span>
        <span>Wanderlust<span className="brand-light"> Explorer</span></span>
      </Link>
      <nav className="main-nav" aria-label="Navegación principal">
        {navigation.map((item) => {
          const isActive = item.href === "/experiences"
            ? pathname.startsWith(item.href)
            : pathname === item.href;

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "nav-link nav-link-active" : "nav-link"}
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}