import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import SvgStudio from "./icons/SvgStudio";
import SvgWeaver from "./icons/SvgWeaver";
import SvgRuntime from "./icons/SvgRuntime";
import SvgDeployments from "./icons/SvgDeployments";
import SvgCollaboration from "./icons/SvgCollaboration";
import SvgTemplates from "./icons/SvgTemplates";
import "../css/headerSubmenu.css";
import SearchBar from "@theme/SearchBar";

interface MenuItem {
  label: string;
  href: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Studio", href: "/docs/agent-studio/overview/", Icon: SvgStudio },
  { label: "Weaver", href: "/docs/agent-weaver/overview/", Icon: SvgWeaver },
  { label: "SRE", href: "/docs/agent-runtime/overview/", Icon: SvgRuntime },
  {
    label: "Deployments",
    href: "/docs/agent-deployments/overview/",
    Icon: SvgDeployments,
  },
  {
    label: "Collaboration",
    href: "/docs/agent-collaboration/overview/",
    Icon: SvgCollaboration,
  },
  { label: "Templates", href: "/docs/agent-templates/overview/", Icon: SvgTemplates },
];

const HeaderSubmenu: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    history.push(href);
  };
  
  

  return (
    <>
      {/* Dummy .navbar so any code querying document.querySelector('.navbar') doesn't break */}
      <div className="navbar" style={{ height: 0, visibility: "hidden" }} />

      <div className="header-submenu">
        <div className="header-submenu-container">
          <nav className="menu-bar" role="navigation" aria-label="Sub Navigation">
            <ul>
              {MENU_ITEMS.map(({ label, href, Icon }) => {
                const isActive = currentPath.startsWith(href);
                return (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={handleClick(href)}
                      className={isActive ? "active" : ""}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon width={16} height={16} />
                      <span>{label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          {/* right: local search bar */}
          <div className="header-submenu-search">
            <SearchBar />
            </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(HeaderSubmenu);
