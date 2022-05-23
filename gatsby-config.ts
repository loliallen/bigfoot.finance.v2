import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  pathPrefix: "test",
  siteMetadata: {},
  plugins: [
    "gatsby-plugin-react-helmet",
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    "gatsby-plugin-sass",
    {
      resolve: `gatsby-plugin-less`,
      options: {
        loaderOptions: {
          appendData: `@env: ${process.env.NODE_ENV};`,
        },
        lessOptions: {
          math: "always",
          javascriptEnabled: true,
          modifyVars: {
            "@font-size-base": "18px",
            "@primary-color": "#9DC8E4",
          },
        },
      },
    },
  ],
};

export default config;
