require('dotenv').config();
import type { Config } from '@docusaurus/types';

const isProd = process.env.NODE_ENV === 'production';
const tailwindPostcss = require('@tailwindcss/postcss');
// const timestamp = Math.floor(Date.now() / 1000);
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
  tagline: 'Build, deploy, and scale open-source AI agents',
  favicon: 'https://smythos.com/favicon.ico',

  // Base configuration
  url: 'https://smythos.com',
  baseUrl: '/docs/',

  organizationName: 'SmythOS',
  projectName: 'smythos-docs',

  trailingSlash: true,

  customFields: {
    // Make env vars available in components
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    supportFormUrl: 'https://smythos.com/talk-to-us/',
    supportEmail: 'support@smythos.com',
    supportDiscordUrl: 'https://discord.gg/smythos',
  },

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
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: ({ versionDocsDirPath, docPath }) =>
            `https://github.com/SmythOS/smyth-docs/edit/main/${versionDocsDirPath}/${docPath}`,
          includeCurrentVersion: true,
        },
        blog: false,
        pages: {
          path: 'src/pages',
          routeBasePath: '/',
          include: ['**/*.{js,jsx,ts,tsx,md,mdx}'],
          exclude: [
            '**/_*.{js,jsx,ts,tsx,md,mdx}',
            '**/_*/**',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__tests__/**',
            '**/index.{js,jsx,ts,tsx,md,mdx}',
          ],
          mdxPageComponent: '@theme/MDXPage',
        },
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

  themes: [
    // [
    //   require.resolve("@easyops-cn/docusaurus-search-local"),
    //   /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
    //   ({
        
    //     hashed: false,
    //     language: ["en"],
    //     indexBlog: false,
    //     indexDocs: true,
    //     docsRouteBasePath: "/",
    //   }),
    // ],
  ],

  plugins: [
    tailwindPlugin,
      isProd &&
      process.env.GTM_CONTAINER_ID && [
        '@docusaurus/plugin-google-tag-manager',
        {
          containerId: process.env.GTM_CONTAINER_ID,
        },
      ],
  ].filter(Boolean),

  clientModules: [require.resolve('./src/css/tailwind.css'),
    require.resolve('./src/components/DocsHelpPopup.tsx'),
  ],

  // stylesheets: [
  //   { 
  //     href: `https://smythos.com/wp-content/themes/generatepress_child/css/docs.css?ver=${timestamp}`, 
  //     type: 'text/css' 
  //   },
  // ],
  
  // scripts: [
  //   { 
  //     src: `https://smythos.com/wp-content/themes/generatepress_child/js/docs.js?ver=${timestamp}`, 
  //     async: false 
  //   },
  // ],
  
  stylesheets: [
    {
      href: 'https://smythos.com/wp-content/themes/generatepress_child/css/docs.css',
      type: 'text/css',
    },
  ],
  scripts: [
    {
      src: 'https://smythos.com/wp-content/themes/generatepress_child/js/docs.js',
      async: false,
    },
  ],
  

  themeConfig: {
    sidebar: {},
      algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        contextualSearch: true, 
        // searchPagePath: 'search',
        searchParameters: {
          clickAnalytics: true,
          hitsPerPage: 12,
          analyticsTags: ['docs-prod']
        },
        insights: true     
      },
      metadata: [
        {
          name: 'robots',
          content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
        },
      ],
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
    // prism: {
    //   theme: prismThemes.github,
    //   darkTheme: prismThemes.dracula,
    // },
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'throw',
    onBrokenAnchors: 'ignore',  
  },
};

export default config;

