const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.(svg|eot|woff|ttf|svg|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "[path][name].[ext]"
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new SWPrecacheWebpackPlugin({
            cacheId: 'pwa',
            filename: 'service-worker.js',
            staticFileGlobs: [
              'assets/**/*.{ttf,eot,woff,woff2,json}'
            ],
            handleFetch: true,
            mergeStaticsConfig: true,
            staticFileGlobsIgnorePatterns: [/\.map$/],
            runtimeCaching: [
                {
                    urlPattern: new RegExp('https://api.football-data.org/v2/'),
                    handler: 'cacheFirst'
                }
            ],
            importScripts: ['push-listerner.js']
          }),
        new WebpackPwaManifest({
            name: "United Football",
            short_name: "UFootBall",
            theme_color: "#42a5f5",
            background_color: "#42a5f5",
            display: "standalone",
            fingerprints: false,
            inject: true,
            icons: [
                {
                    src: path.resolve('./assets/icons/icon-72x72.png'),
                    sizes: "72x72",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-96x96.png'),
                    sizes: "96x96",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-128x128.png'),
                    sizes: "128x128",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-144x144.png'),
                    sizes: "144x144",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-152x152.png'),
                    sizes: "152x152",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-192x192.png'),
                    sizes: "192x192",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-384x384.png'),
                    sizes: "384x384",
                    destination: path,
                    icon: true
                },
                {
                    src: path.resolve('./assets/icons/icon-512x512.png'),
                    sizes: "512x512",
                    destination: path,
                    icon: true
                }
            ]
        }),
        new FaviconsWebpackPlugin({
            logo: './assets/icons/icon-phone.png',
            cache:true,
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                'push-listerner.js',
                { 
                  from: 'assets', 
                  to: 'assets/' 
                },
                { 
                    from: 'src/pages', 
                    to: 'pages/' 
                },
                { 
                    from: 'src/views', 
                    to: 'views/' 
                },
            ],
          }),
    ]
};