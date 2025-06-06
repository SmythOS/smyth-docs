import React from "react";
import clsx from "clsx";
import { useThemeConfig } from "@docusaurus/theme-common";
import NavbarColorModeToggle from "../ColorModeToggle";

export default function NavbarLayout({ children }: { children: React.ReactNode }) {
  const {
    navbar: { style },
  } = useThemeConfig();

  return (
    <nav
      aria-label="Main navigation"
      className={clsx(
        "navbar",
        "navbar--fixed-top",
        {
          "navbar--dark": style === "dark",
          "navbar--primary": style === "primary",
        }
      )}
    >
      {/* Render whatever <NavbarContent> (i.e. your HeaderSubmenu) is passed in */}
      {children}

      {/* Dark / Light mode toggle */}
      <div className="navbar__inner">
        <NavbarColorModeToggle />
      </div>
    </nav>
  );
}
