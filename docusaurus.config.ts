require('dotenv').config();
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';

const tailwindPostcss = require('@tailwindcss/postcss');

async function tailwindPlugin() {
  return {
    name: 'tailwindcss-loader',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins.push(
        tailwindPostcss({
          config: './tailwind.config.js',
        })
      );
      postcssOptions.plugins.push(require('autoprefixer'));
      return postcssOptions;
    },
  };
}

const config: Config = {

  title: 'SmythOS Documentation',
  tagline: 'Build, deploy, and scale intelligent agents',
  favicon: 'img/favicon.ico',

  url: 'https://docs.smythos.com',
  baseUrl: '/',

  organizationName: 'Smyth-ai',
  projectName: 'smythos-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',                        
          routeBasePath: 'docs',             
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: ({ versionDocsDirPath, docPath }) =>
            `https://github.com/Smyth-ai/smyth-docs/edit/dev/${versionDocsDirPath}/${docPath}`,
           includeCurrentVersion: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          filename: 'sitemap.xml',
        },
      },
    ],
  ],

  plugins: [
    // local Docusaurus search
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        indexBlog: false,
      },
    ],
    tailwindPlugin,
    // async function tailwindPlugin() {
    //   return {
    //     name: 'tailwindcss-loader',
    //     configurePostCss(postcssOptions) {
    //       postcssOptions.plugins.push(require('tailwindcss'));
    //       postcssOptions.plugins.push(require('autoprefixer'));
    //       return postcssOptions;
    //     },
    //   };
    // },
  ],
  clientModules: [require.resolve('./src/css/tailwind.css'),
  ],

  themeConfig: {
    sidebar: {},
    // navbar: {
    //   title: 'SmythOS',
    //   logo: {
    //     alt: 'SmythOS Logo',
    //     src: 'img/smythos-500px.png',
    //   },
    //   items: [
    //     // { to: '/docs', label: 'Docs Home', position: 'left' },
    //     { to: '/docs/agent-studio/overview', label: 'Studio', position: 'left' },
    //     { to: '/docs/agent-weaver/overview', label: 'Weaver', position: 'left' },
    //     { to: '/docs/agent-runtime/overview', label: 'Runtime', position: 'left' },
    //     { to: '/docs/agent-deployments/overview', label: 'Deployments', position: 'left' },
    //     { to: '/docs/agent-collaboration/overview', label: 'Collaboration', position: 'left' },
    //     { to: '/docs/agent-templates/overview', label: 'Templates', position: 'left' },
    //     { href: 'https://github.com/Smyth-ai', label: 'GitHub', position: 'right' },
    //   ],
    // },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
