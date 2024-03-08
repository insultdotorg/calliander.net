require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  flags: {
    PARTIAL_HYDRATION: true,
  },
  siteMetadata: {
    title: 'calliander.net',
    siteUrl: 'https://calliander.net'
  },
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'pages',
        'path': './src/pages/'
      },
      __key: "pages"
    },
    {
      resolve: 'gatsby-source-storyblok',
      options: {
        accessToken: process.env.GATSBY_PREVIEW_STORYBLOK,
        version: process.env.GATSBY_VERSION_STORYBLOK,
        localAssets: true,
      },
    },
  ],
}
