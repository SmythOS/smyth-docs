import React from 'react';
import clsx from 'clsx';
import {useThemeConfig} from '@docusaurus/theme-common';
import Logo from '../../Navbar/Logo';
import SearchBar from '@theme/SearchBar';     
import NavbarSearch from '../../Navbar/Search';          
import CollapseButton from './CollapseButton';
import Content from './Content';

import styles from './styles.module.css';

function DocSidebarDesktop({path, sidebar, onCollapse, isHidden}: Props) {
  const {
    navbar: {hideOnScroll},
    docs: {
      sidebar: {hideable},
    },
  } = useThemeConfig();

  return (
    <div
      className={clsx(
        styles.sidebar,
        hideOnScroll && styles.sidebarWithHideableNavbar,
        isHidden && styles.sidebarHidden,
      )}>

      {/* Logo (only rendered when hide-on-scroll is enabled) */}
      {hideOnScroll && <Logo tabIndex={-1} className={styles.sidebarLogo} />}

      {/* 🔍 Search input */}
      <div className={styles.sidebarSearch}>
        <SearchBar />
      </div>
        {/* 🔍 Search input */}
        <div className={styles.sidebarSearch}>
        <NavbarSearch />
      </div>

      {/* Sidebar tree */}
      <Content path={path} sidebar={sidebar} />

      {/* Collapse button (if enabled in themeConfig) */}
      {hideable && <CollapseButton onClick={onCollapse} />}
    </div>
  );
}

export default React.memo(DocSidebarDesktop);
