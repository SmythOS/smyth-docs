import React, { useEffect, useRef } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';
import HeaderSubmenu from '../../components/HeaderSubmenu';
import '@site/static/css/header.css';

export default function Navbar(): React.ReactElement {
  const { pathname } = useLocation();
  const history = useHistory();
  const headerRef = useRef<HTMLDivElement>(null);

  const isDocs = pathname.startsWith('/docs');

  // Main nav items
  const primary = [
    { label: 'Why SmythOS', to: '/why-smythos/' },
    { label: 'Product', to: '/product/agent-studio/' },
    { label: 'Pricing', to: '/pricing/' },
    { label: 'Docs', to: '/docs/' },
    { label: 'Community', to: '/updates/' },
    { label: 'Company', to: '/about-us/' },
  ];

  // Navigation helper
  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    history.push(to);
  };

 
  useEffect(() => {
    function updateHeaderHeight() {
      const el =
        headerRef.current ||
        document.getElementById('masthead') ||
        document.querySelector('.site-header') ||
        document.querySelector('header[role="banner"]') ||
        null;

      if (!el) return;
      document.documentElement.style.setProperty('--header-height', `${el.clientHeight}px`);
    }

    // Update on mount and on resize
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <header
      id="masthead"
      className="site-header sticky-header"
      role="banner"
      ref={headerRef}
    >
      <div className="header">
        <div className="header-container">
          {/* Logo */}
          <div className="header-left active">
            <a href="/" className="logo" onClick={go('/')}>
              <img
                src="https://smythos.com/wp-content/themes/generatepress_child/img/smythos-dark.svg"
                alt="SmythOS Logo"
                width={108}
                height={24}
              />
            </a>
          </div>
          {/* Main nav */}
          <div className="header-center">
            <nav
              id="main-nav"
              role="navigation"
              aria-label="Main Navigation"
              className="main-nav-start"
            >
              <ul>
                {primary.map(({ label, to }) => (
                  <li key={to} className={pathname.startsWith(to) ? 'active' : undefined}>
                    <a href={to} onClick={go(to)}>
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          {/* CTA + icons */}
          <div className="header-right">
            <nav aria-labelledby="main-nav" className="main-nav-end">
              <ul>
                <li>
                  <a
                    href="https://app.smythos.com/?_auth=sign-up&source=marketingSite&from=docs"
                    className="sign-up-btn"
                  >
                    Try It Free
                  </a>
                </li>
                <li>
                  <button className="user-menu-trigger icon" aria-label="Account">
                  <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M10 1.538a8.462 8.462 0 1 0 0 16.923 8.462 8.462 0 0 0 0-16.923zM0 10C0 4.477 4.477 0 10 0s10 4.477 10 10c0 5.522-4.477 10-10 10S0 15.522 0 10Z" fill="currentColor" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.55 15.843c-.67.523-.987 1.195-1.067 1.819a.77.77 0 1 1-1.526-.197c.129-1.002.64-2.047 1.645-2.834 1.003-.785 2.443-1.27 4.367-1.27 1.943 0 3.391.487 4.397 1.28 1.009.793 1.513 1.848 1.635 2.86a.77.77 0 1 1-1.527.185c-.077-.635-.391-1.311-1.06-1.837-.67-.528-1.756-.95-3.445-.95-1.669 0-2.749.419-3.42.944zM9.971 5.673a2.611 2.611 0 1 0 0 5.222 2.611 2.611 0 0 0 0-5.222zm-4.15 2.61a4.15 4.15 0 1 1 8.3.001 4.15 4.15 0 0 1-8.3 0z" fill="currentColor" />
                  </svg>
                </button>
                </li>
                <li>
                  <button className="mobile-menu-trigger icon" id="menuIcon">
                    <span /><span /><span />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        {/* Docs submenu */}
        {isDocs && (
          <div className="header-submenu">
            <div className="header-submenu-container">
              <HeaderSubmenu />
            </div>
          </div>
        )}
      </div>
      <div className="navbar" style={{ display: 'none' }}></div>
    </header>
  );
}