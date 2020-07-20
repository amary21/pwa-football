const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

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
        new HtmlWebpackPlugin({
            template: "./src/views/nav.html",
            filename: "nav.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/detail.html",
            filename: "detail.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/favorite.html",
            filename: "favorite.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/home.html",
            filename: "home.html"
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/standings.html",
            filename: "standings.html"
        }),
        new workboxPlugin.GenerateSW({
            cacheId: 'ufootball',
            swDest: 'sw.js',
            clientsClaim: true,
            skipWaiting: true,
            runtimeCaching:[
                {
                    urlPattern: new RegExp('https://api.football-data.org/v2/'),
                    handler: 'StaleWhileRevalidate',
                    options:{
                        cacheName: 'ufootball-api'
                    }
                },
                {
                    urlPattern: /\.(?:css|js|html|ttf|eot|woff|woff2|png|json|png|jpg|jpeg|svg)$/,
                    handler: 'CacheFirst',
                    options:{
                        cacheName: 'ufootball-assets'
                    }
                }
            ],
            importScripts: ['/src/scripts/push-listerner.js']
        }),
        new WebpackPwaManifest({
            name: "United Football",
            short_name: "UFootBall",
            theme_color: "#42a5f5",
            background_color: "#42a5f5",
            display: "standalone",
            icons: [
                {
                    src: path.resolve('./assets/icons/icon-72x72.png'),
                    sizes: "72x72"
                },
                {
                    src: path.resolve('./assets/icons/icon-96x96.png'),
                    sizes: "96x96"
                },
                {
                    src: path.resolve('./assets/icons/icon-128x128.png'),
                    sizes: "128x128"
                },
                {
                    src: path.resolve('./assets/icons/icon-144x144.png'),
                    sizes: "144x144"
                },
                {
                    src: path.resolve('./assets/icons/icon-152x152.png'),
                    sizes: "152x152"
                },
                {
                    src: path.resolve('./assets/icons/icon-192x192.png'),
                    sizes: "192x192"
                },
                {
                    src: path.resolve('./assets/icons/icon-384x384.png'),
                    sizes: "384x384"
                },
                {
                    src: path.resolve('./assets/icons/icon-512x512.png'),
                    sizes: "512x512"
                }
            ]
        }),
        new FaviconsWebpackPlugin({
            logo: './assets/icons/icon-192x192.png',
            cache:true,
            inject: true
        })
    ]
};