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
  stylesheets: [
        { href: '/css/header.css', type: 'text/css' },
  ],

  // scripts: [
  //   {
  //     src: '/js/header.js',
  //     defer: true, 
  //   },
  // ],

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
    onBrokenLinks: 'warn',
    onBrokenAnchors: 'ignore',
    redirects: [
      // Agent Studio redirects
      {
        from: '/docs/agent-studio/agent-settings/logs',
        to: '/docs/agent-studio/build-agents/debugging',
      },
      {
        from: '/docs/agent-studio/agent-settings/authentication',
        to: '/docs/agent-studio/key-concepts/vault',
      },
      {
        from: '/docs/agent-studio/agent-settings/tasks',
        to: '/docs/agent-studio/build-agents/building-workflows',
      },
      {
        from: '/docs/agent-studio/agent-settings/overview',
        to: '/docs/agent-studio/overview',
      },
      {
        from: '/docs/agent-studio/building-agents/overview',
        to: '/docs/agent-studio/build-agents/overview',
      },
      {
        from: '/docs/agent-studio/building-agents/building-workflows',
        to: '/docs/agent-studio/build-agents/building-workflows',
      },
      // Agent Collaboration redirects
      {
        from: '/docs/agent-collaboration/working-with-agents/vault',
        to: '/docs/agent-studio/key-concepts/vault',
      },
      {
        from: '/docs/agent-collaboration/agent-work-schedule',
        to: '/docs/agent-studio/build-agents/building-workflows',
      },
      // Integration redirects
      {
        from: '/docs/integrations/email',
        to: '/docs/agent-studio/integrations/email-integration',
      },
      {
        from: '/docs/integrations/microsoft-teams',
        to: '/docs/agent-studio/integrations/microsoft-teams-integration',
      },
      {
        from: '/docs/integrations/discord',
        to: '/docs/agent-studio/integrations/discord-integration',
      },
      {
        from: '/docs/integrations/slack',
        to: '/docs/agent-studio/integrations/slack-integration',
      },
      {
        from: '/docs/integrations/notion',
        to: '/docs/agent-studio/integrations/notion-integration',
      },
      {
        from: '/docs/integrations/google-calendar',
        to: '/docs/agent-studio/integrations/google-calendar-integration',
      },
      {
        from: '/docs/integrations/microsoft-calendar',
        to: '/docs/agent-studio/integrations/microsoft-calendar-integration',
      },
      {
        from: '/docs/integrations/stripe',
        to: '/docs/agent-studio/integrations/stripe-integration',
      },
      {
        from: '/docs/integrations/shopify',
        to: '/docs/agent-studio/integrations/shopify-integration',
      },
      {
        from: '/docs/integrations/hubspot',
        to: '/docs/agent-studio/integrations/hubspot-integration',
      },
      {
        from: '/docs/integrations/mailchimp',
        to: '/docs/agent-studio/integrations/mailchimp-integration',
      },
      {
        from: '/docs/integrations/klaviyo',
        to: '/docs/agent-studio/integrations/klaviyo-integration',
      },
      {
        from: '/docs/integrations/twilio',
        to: '/docs/agent-studio/integrations/twilio-integration',
      },
      {
        from: '/docs/integrations/sendgrid',
        to: '/docs/agent-studio/integrations/sendgrid-integration',
      },
      {
        from: '/docs/integrations/webflow',
        to: '/docs/agent-studio/integrations/webflow-integration',
      },
      {
        from: '/docs/integrations/wordpress-org',
        to: '/docs/agent-studio/integrations/wordpress-org-integration',
      },
      {
        from: '/docs/integrations/wordpress-com',
        to: '/docs/agent-studio/integrations/wordpress-com-integration',
      },
      {
        from: '/docs/integrations/squarespace',
        to: '/docs/agent-studio/integrations/squarespace-integration',
      },
      {
        from: '/docs/integrations/devto',
        to: '/docs/agent-studio/integrations/devto-integration',
      },
      {
        from: '/docs/integrations/youtube',
        to: '/docs/agent-studio/integrations/youtube-integration',
      },
      {
        from: '/docs/integrations/fal-ai',
        to: '/docs/agent-studio/integrations/falai-integration',
      },
      {
        from: '/docs/integrations/dataforseo',
        to: '/docs/agent-studio/integrations/dataforseo-integration',
      },
      {
        from: '/docs/integrations/tavily',
        to: '/docs/agent-studio/integrations/tavily-integration',
      },
      {
        from: '/docs/integrations/perplexity-ai',
        to: '/docs/agent-studio/integrations/perplexity-ai-integration',
      },
      {
        from: '/docs/integrations/playht',
        to: '/docs/agent-studio/integrations/playht-integration',
      },
      {
        from: '/docs/integrations/stability-ai',
        to: '/docs/agent-studio/integrations/stability-ai-integration',
      },
      {
        from: '/docs/integrations/google-translate',
        to: '/docs/agent-studio/integrations/google-translate-integration',
      },
      {
        from: '/docs/integrations/newsapi',
        to: '/docs/agent-studio/integrations/newsapi-integration',
      },
      {
        from: '/docs/integrations/openapi',
        to: '/docs/agent-studio/integrations/openapi-integration',
      },
      {
        from: '/docs/integrations/google-analytics',
        to: '/docs/agent-studio/integrations/google-analytics-integration',
      },
      {
        from: '/docs/integrations/pdfcrowd',
        to: '/docs/agent-studio/integrations/pdfcrowd-integration',
      },
      {
        from: '/docs/integrations/signnow',
        to: '/docs/agent-studio/integrations/signnow-integration',
      },
      {
        from: '/docs/integrations/tldv',
        to: '/docs/agent-studio/integrations/tldv-integration',
      },
      {
        from: '/docs/integrations/trello',
        to: '/docs/agent-studio/integrations/trello-integration',
      },
      {
        from: '/docs/agent-studio/integrations/elevenlabs-integrationns/elevenlabs-integration',
        to: '/docs/agent-studio/integrations/elevenlabs-integration',
      },
      {
        from: '/docs/agent-studio/integrations/elevenlabs-integrationns/elevenlabs-integration-integration',
        to: '/docs/agent-studio/integrations/elevenlabs-integration',
      },
      // Account management redirects
      {
        from: '/docs/account-management/prganization-management',
        to: '/docs/account-management/organization-management',
      },
      // Agent deployment redirects
      {
        from: '/docs/deployments',
        to: '/docs/agent-deployments/overview',
      },
      {
        from: '/docs/agent-deployment/subdomains',
        to: '/docs/agent-deployments/deployments/subdomains',
      },
      {
        from: '/docs/agent-deployment/quickstart',
        to: '/docs/agent-deployments/quickstart',
      },
      // Agent runtime redirects
      {
        from: '/docs/agent-runtime//quickstart',
        to: '/docs/agent-runtime/quickstart',
      },
    ],
  },
};

export default config;

