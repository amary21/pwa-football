const path = require("path");
const workboxPlugin = require('workbox-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
            ios: true,
            gcm_sender_id: "170137032190",
            icons: [
                {
                    src: path.resolve('./assets/icons/icon-72x72.png'),
                    sizes: "72x72",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-96x96.png'),
                    sizes: "96x96",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-128x128.png'),
                    sizes: "128x128",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-144x144.png'),
                    sizes: "144x144",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-152x152.png'),
                    sizes: "152x152",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-192x192.png'),
                    sizes: "192x192",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-384x384.png'),
                    sizes: "384x384",
                    destination: path.join('assets/icons'),
                    ios: true
                },
                {
                    src: path.resolve('./assets/icons/icon-512x512.png'),
                    sizes: "512x512",
                    destination: path.join('assets/icons'),
                    ios: true
                }
            ]
        }),
        new FaviconsWebpackPlugin({
            logo: './assets/icons/icon-512x512.png',
            cache:true,
            inject: true
        }),
        new CopyWebpackPlugin({
            patterns: [
                'push-listerner.js',
                { 
                  from: 'assets/fonts', 
                  to: 'assets/fonts/' 
                },
                { 
                    from: 'assets/animations', 
                    to: 'assets/animations/' 
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