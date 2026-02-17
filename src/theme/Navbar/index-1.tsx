import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import HeaderSubmenu from '../../components/HeaderSubmenu';
// import "@site/static/css/header.css"

// function useExternalResources() {
//   useEffect(() => {
//     // CSS
//     if (!document.querySelector('link[href="https://smythos.com/wp-content/themes/generatepress_child/css/header.css"]')) {
//       const link = document.createElement('link');
//       link.rel = 'stylesheet';
//       link.href = 'https://smythos.com/wp-content/themes/generatepress_child/css/header.css';
//       document.head.appendChild(link);
//     }
//     // JS
//     if (!document.querySelector('script[src="https://smythos.com/wp-content/themes/generatepress_child/js/menu.js"]')) {
//       const script = document.createElement('script');
//       script.src = 'https://smythos.com/wp-content/themes/generatepress_child/js/menu.js';
//       script.async = true;
//       document.body.appendChild(script);
//     }
//   }, []);
// }


const MAIN_NAV = [
  { label: 'Why SmythOS', href: 'https://smythos.com/why-smythos' },
  { label: 'Pricing', href: 'https://smythos.com/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Community', href: 'https://smythos.com/updates' },
  { label: 'Company', href: 'https://smythos.com/about-us' },
];

const DOCS_SUBMENU = [
  { label: 'Studio', href: '/docs/agent-studio/overview' },
  { label: 'Weaver', href: '/docs/agent-weaver/overview' },
  { label: 'Runtime', href: '/docs/agent-runtime/overview' },
  { label: 'Deployments', href: '/docs/agent-deployments/overview' },
  { label: 'Collaboration', href: '/docs/agent-collaboration/overview' },
  { label: 'Templates', href: '/docs/agent-templates/overview' },
];

export default function Navbar() {
  // useExternalResources();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement;
      if (!target.closest('.user-menu') && !target.closest('.user-menu-trigger')) {
        setUserMenuOpen(false);
      }
      if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-trigger')) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debug logs
  useEffect(() => {
    console.log('MAIN_NAV', MAIN_NAV);
    console.log('pathname', pathname);
  }, [pathname]);

  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    // Only internal SPA navigation for Docs routes
    if (to.startsWith('/docs')) {
      // Handle root docs path
      if (to === '/docs/' || to === '/docs' || to === '/') {
        history.push('/docs/agent-studio/overview');
      } else {
        history.push(to);
      }
      setUserMenuOpen(false);
      setMobileMenuOpen(false);
    } else {
      // For all other links, full page reload
      window.location.href = to;
    }
  };

  function handleOverlayClick() {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
  }

  function isActive(href: string) {
    // Remove trailing slash for comparison
    const cleanHref = href.replace(/\/$/, '');
    const cleanPathname = pathname.replace(/\/$/, '');
    
    // Special handling for docs link
    if (href === '/docs/' || href === '/docs') {
      return cleanPathname.startsWith('/docs');
    }
    
    return cleanPathname === cleanHref || cleanPathname.startsWith(cleanHref);
  }

  return (
    <>
      <header id="masthead" className="site-header sticky-header" role="banner">
        <div className="header">
          <div className="header-container">
            <div className="header-left active">
              <a href="https://smythos.com/" className="logo" aria-label="SmythOS Home">
                <img src="https://smythos.com/wp-content/themes/generatepress_child/docs/img/smythos-logo.svg" alt="SmythOS Logo" width={108} height={24} />
              </a>
            </div>
            <div className="header-center">
              <nav role="navigation" aria-label="Main Navigation" id="main-nav" className="main-nav-start">
                <ul>
                  {MAIN_NAV.map((item, idx) => (
                    <li key={item.label + '-' + idx} className={isActive(item.href) ? 'active' : undefined}>
                      <a href={item.href} onClick={go(item.href)}>{item.label}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="header-right">
              <nav aria-labelledby="main-nav" className="main-nav-end">
                <ul>
                  <li>
                    <a
                      href="https://app.smythos.com/?_auth=sign-up&source=marketingSite&from=docs"
                      className="sign-up-btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Try It Free
                    </a>
                  </li>
                  <li>
                    <button
                      className={`user-menu-trigger icon${userMenuOpen ? ' active' : ''}`}
                      aria-label="Account"
                      onClick={() => setUserMenuOpen((v) => !v)}
                      aria-expanded={userMenuOpen}
                    >
                      <svg width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 1.538a8.462 8.462 0 1 0 0 16.923 8.462 8.462 0 0 0 0-16.923zM0 10C0 4.477 4.477 0 10 0s10 4.477 10 10c0 5.522-4.477 10-10 10S0 15.522 0 10Z" fill="currentColor"></path>
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.55 15.843c-.67.523-.987 1.195-1.067 1.819a.77.77 0 1 1-1.526-.197c.129-1.002.64-2.047 1.645-2.834 1.003-.785 2.443-1.27 4.367-1.27 1.943 0 3.391.487 4.397 1.28 1.009.793 1.513 1.848 1.635 2.86a.77.77 0 1 1-1.527.185c-.077-.635-.391-1.311-1.06-1.837-.67-.528-1.756-.95-3.445-.95-1.669 0-2.749.419-3.42.944zM9.971 5.673a2.611 2.611 0 1 0 0 5.222 2.611 2.611 0 0 0 0-5.222zm-4.15 2.61a4.15 4.15 0 1 1 8.3.001 4.15 4.15 0 0 1-8.3 0z" fill="currentColor"></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button
                      className={`mobile-menu-trigger icon${mobileMenuOpen ? ' active' : ''}`}
                      id="menuIcon"
                      aria-label="Open Menu"
                      onClick={() => setMobileMenuOpen((v) => !v)}
                      aria-expanded={mobileMenuOpen}
                    >
                      <span /><span /><span />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          {/* Docs submenu */}
          {pathname.startsWith('/docs') && (
            <div className="header-submenu">
              <div className="header-submenu-container">
                <HeaderSubmenu />
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Overlay */}
      {(userMenuOpen || mobileMenuOpen) && (
        <div
          id="overlay"
          aria-hidden="false"
          tabIndex={-1}
          onClick={handleOverlayClick}
          className="overlay"
        />
      )}
      <div className="navbar" style={{ display: 'none' }}></div>
      {/* User menu */}
      {userMenuOpen && (
      <div
        className="user-menu"
        aria-hidden={!userMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="User Menu"
      >
          <nav id="userMenu" role="navigation" aria-label="User Navigation">
            <ul role="menu">
              <li className="menu-label" role="none">Go to...</li>
              <li role="none">
                <a
                  href="https://app.smythos.com/"
                  role="menuitem"
                  className="log-in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SmythOS app
                </a>
              </li>
              <li className="menu-label" role="none">Community</li>
            </ul>
          </nav>
        </div>
      )}
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
        className="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Menu"
      >
          <nav id="mobileMenu" role="navigation" aria-label="Mobile Navigation">
            <ul role="menu">
              <li className="menu-label always-open" role="none">
                <div className="menu-label-content">Go to...</div>
                <ul className="submenu" role="menu">
                  <li role="none">
                    <a
                      href="https://app.smythos.com/"
                      role="menuitem"
                      className="log-in"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      SmythOS app
                    </a>
                  </li>
                  <li role="none">
                    <a href="/why-smythos" role="menuitem" onClick={go('/why-smythos')}>Why SmythOS</a>
                  </li>
                  <li role="none">
                    <a href="/pricing" role="menuitem" onClick={go('/pricing')}>Pricing</a>
                  </li>
                </ul>
              </li>
              <li className="menu-label has-submenu-m" role="none">
                <div className="menu-label-content">Docs</div>
                <ul className="submenu" role="menu">
                <ul>
  {MAIN_NAV.map((item, idx) => (
    <li key={`mainnav-${item.label}-${item.href}-${idx}`} className={isActive(item.href) ? 'active' : undefined}>
      <a href={item.href} onClick={go(item.href)}>{item.label}</a>
    </li>
  ))}
</ul>
                </ul>
              </li>
              <li className="menu-label has-submenu-m" role="none">
                <div className="menu-label-content">Community</div>
                <ul className="submenu" role="menu">
                  <li role="none">
                    <a href="/updates" role="menuitem" onClick={go('/updates')}>Updates</a>
                  </li>
                  <li role="none">
                    <a href="/blog" role="menuitem" onClick={go('/blog')}>Posts</a>
                  </li>
                  <li role="none">
                    <a href="/ai-trends" role="menuitem" onClick={go('/ai-trends')}>Trending</a>
                  </li>
                </ul>
              </li>
              <li className="menu-label has-submenu-m" role="none">
                <div className="menu-label-content">Company</div>
                <ul className="submenu" role="menu">
                  <li role="none">
                    <a href="/about-us" role="menuitem" onClick={go('/about-us')}>About us</a>
                  </li>
                  <li role="none">
                    <a href="/updates/press" role="menuitem" onClick={go('/updates/press')}>Press</a>
                  </li>
                  <li role="none">
                    <a href="/updates/changelog" role="menuitem" onClick={go('/updates/changelog')}>Changelog</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
