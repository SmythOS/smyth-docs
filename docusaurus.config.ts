require('dotenv').config();
import type { Config } from '@docusaurus/types';

const isProd = process.env.NODE_ENV === 'production';
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

['ALGOLIA_APP_ID', 'ALGOLIA_API_KEY', 'ALGOLIA_INDEX_NAME'].forEach(v => {
  if (isProd && !process.env[v]) {
    throw new Error(`Missing env var: ${v}`);
  }
});

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
    supportEmail: 'support@smythos.com',
    supportDiscordUrl: 'https://discord.gg/smythos',
  },

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',

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
    // sidebar: {},
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
        { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',},
        { name: 'keywords', content: 'smythos, ai agents, open source ai, documentation, agent runtime, sre, studio, agent templates, agemt deployment, agent OS' },
        { property: 'og:image', content: 'https://smythos.com/wp-content/uploads/2025/07/smythos-documentation.png' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'SmythOS' },
        { property: 'og:url', content: 'https://smythos.com/docs/' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@SmythOS' },
      ],
    },
      headTags: [
        {
          tagName: 'link',
          attributes: {
            rel: 'preconnect',
            href: 'https://smythos.com',
          },
        },
        {
          tagName: 'script',
          attributes: { type: 'application/ld+json' },
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'SmythOS',
            url: 'https://smythos.com',
            logo: 'https://smythos.com/wp-content/themes/generatepress_child/img/smythos-logo.svg',
            "sameAs": [
              "https://www.linkedin.com/company/smythos/",
              "https://github.com/SmythOS",
            ]
          }),
        },
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Why do I get a 401 Unauthorized error?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Check if your AgentLLM key is valid and correctly passed in the Authorization header. You can regenerate the key under Test → LLM → Keys."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Why is the wrong version of my agent responding?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Check the 'model' string in your request. Make sure you're using the correct version tag like @dev, @prod, or @1.0."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What do I do if my request returns no output?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Confirm that your agent is correctly configured and LLM is toggled on. Then inspect logs under Deployments → Logs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I find the correct baseURL and model string?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Go to Test → LLM → Code. Always copy the baseURL and model directly from there to avoid typos or environment mismatches."
                  }
                }
              ]
            })
          }
        ]

  
  
};

export default config;