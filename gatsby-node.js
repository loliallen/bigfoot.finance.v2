// @ts-check
const webpack = require("webpack");

/**
 * @type {import('gatsby').GatsbyNode['onCreateWebpackConfig']}
 */

exports.onCreateWebpackConfig = ({ actions, stage, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        assert: require.resolve("assert"),
        buffer: require.resolve("buffer"),
        constants: require.resolve("constants-browserify"),
        crypto: require.resolve("crypto-browserify"),
        domain: require.resolve("domain-browser"),
        events: require.resolve("events"),
        http: require.resolve("stream-http"),
        https: require.resolve("https-browserify"),
        os: require.resolve("os-browserify/browser"),
        path: require.resolve("path-browserify"),
        punycode: require.resolve("punycode"),
        process: require.resolve("process/browser"),
        querystring: require.resolve("querystring-es3"),
        stream: require.resolve("stream-browserify"),
        string_decoder: require.resolve("string_decoder"),
        sys: require.resolve("util"),
        timers: require.resolve("timers-browserify"),
        tty: require.resolve("tty-browserify"),
        url: require.resolve("url"),
        util: require.resolve("util"),
        vm: require.resolve("vm-browserify"),
        zlib: require.resolve("browserify-zlib"),
        browser: false,
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  });
  if (stage === "build-javascript" || stage === "develop") {
    actions.setWebpackConfig({
      plugins: [plugins.provide({ process: "process/browser" })],
    });
  }
};

/**
 * @type {import('gatsby').GatsbyNode['onCreatePage']}
 *
 */

exports.onCreatePage = ({ actions }) => {
  const { createRedirect } = actions;

  const old_paths = [
    "/dapp/dashboard",
    "/dapp/purchase",
    "/dapp/nodes",
    "/dapp/staking",
    "/dapp/rewards",
  ];
  old_paths.forEach((e) =>
    createRedirect({
      fromPath: `/dapp/dashboard`,
      toPath: `/dapp`,
    })
  );
};
