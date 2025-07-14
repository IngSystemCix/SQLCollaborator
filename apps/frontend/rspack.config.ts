import { defineConfig } from "@rspack/cli";
import { DefinePlugin, rspack } from "@rspack/core";
import { ReactRefreshRspackPlugin } from "@rspack/plugin-react-refresh";
import * as path from "path";
import dotenv from 'dotenv';

dotenv.config();

const mode = process.env.NODE_ENV === "development" ? "development" : "production";

dotenv.config({ path: path.resolve(__dirname, `.env.${mode}`) });

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["last 2 versions", "> 0.2%", "not dead", "Firefox ESR"];

export default defineConfig({
  entry: {
    main: "./src/main.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@backend": path.resolve(__dirname, "../backend/src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: mode === "development",
                    refresh: mode === "development",
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    mode === "development" ? new ReactRefreshRspackPlugin() : null,
    new DefinePlugin({
      'process.env.TRPC_API_URL': JSON.stringify(process.env.TRPC_API_URL),
    }),
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
  experiments: {
    css: true,
  },
});
