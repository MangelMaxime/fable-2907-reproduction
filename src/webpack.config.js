import {fileURLToPath} from 'node:url';
import path from 'node:path';
import Visualizer from 'webpack-visualizer-plugin2'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

//...

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function resolve(filePath) {
    return path.join(__dirname, filePath)
}

export default (_env, options) => {

    var isDevelopment = options.mode === "development";

    return {
        // In development, bundle styles together with the code so they can also
        // trigger hot reloads. In production, put them in a separate CSS file.
        entry:
        {
            app: "./Main.fs.js"
        },
        // Add a hash to the output file name in production
        // to prevent browser caching if code changes
        output: {
            path: resolve("./webpack-dist"),
            filename: "[name].js"
        },
        optimization: {
            splitChunks: {
              cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                },
              },
            },
          },
        mode: isDevelopment ? "development" : "production",
        devtool: isDevelopment ? 'eval-source-map' : false,
        watchOptions: {
            ignored: /node_modules/,
        },
        plugins:
            [
                new BundleAnalyzerPlugin()
                // new Visualizer()
            ].filter(Boolean),
        // Configuration for webpack-dev-server
        devServer: {
            hot: true
        }
    }
}
