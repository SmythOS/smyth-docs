import React from 'react';
import {useHistory, useLocation} from '@docusaurus/router';
import SvgStudio from './icons/SvgStudio';
import SvgWeaver from './icons/SvgWeaver';
import SvgRuntime from './icons/SvgRuntime';
import SvgDeployments from './icons/SvgDeployments';
import SvgCollaboration from './icons/SvgCollaboration';
import SvgTemplates from './icons/SvgTemplates';
import '@site/src/css/headerSubmenu.css';

const MENU_ITEMS = [
  {label: 'Studio',       href: '/docs/agent-studio/overview/',     Icon: SvgStudio},
  {label: 'Weaver',       href: '/docs/agent-weaver/overview/',     Icon: SvgWeaver},
  {label: 'Runtime',      href: '/docs/agent-runtime/overview/',    Icon: SvgRuntime},
  {label: 'Deployments',  href: '/docs/agent-deployments/overview/',Icon: SvgDeployments},
  {label: 'Collaboration',href: '/docs/agent-collaboration/overview/',Icon: SvgCollaboration},
  {label: 'Templates',    href: '/docs/agent-templates/overview/',   Icon: SvgTemplates},
];

export default function HeaderSubmenu() {
  const history = useHistory();
  const {pathname} = useLocation();
  const handleClick = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    history.push(href);
  };

  return (
    <nav role="navigation" aria-label="Docs Submenu">
      <ul>
        {MENU_ITEMS.map(({label, href, Icon}) => {
          const active = pathname.startsWith(href);
          return (
            <li key={href} className={active ? 'active' : undefined}>
              <a
                href={href}
                onClick={handleClick(href)}
                aria-current={active ? 'page' : undefined}
              >
                <Icon width={16} height={16} />
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
