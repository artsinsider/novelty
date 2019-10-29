// Аня (N), [1 окт. 2019 г., 14:43:18]:
// const fs = require('fs');
// const path = require('path');
// const webpack = require('webpack');
// const merge = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');
// const miniCssExtractPlugin = require("mini-css-extract-plugin");
// const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyPlugin = require('copy-webpack-plugin');
// const development = require('./webpack/dev.config.js');
// const production = require('./webpack/prod.config.js');
// const generateTags = require('./webpack/generateTemplateTags');
// const mainLoader = fs.readFileSync(path.resolve('./src/media/LogoAnimated.svg'));
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');
//
// require('@babel/polyfill');
// process.env.BABEL_ENV = process.env.npm_lifecycle_event;
//
// let NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'development';
// let METHODS = process.env.METHODS || "{}";
// const mode = ({production: 1, pre: 2})[NODE_ENV] * 1 || 0; // отличие сборок в конфиге: URL, заголовок. в pre включен анализ сборки
// const IS_PROD = mode > 0; // для продовской сборки (в том числе локально, для теста)
// if (mode === 2) {
//     NODE_ENV = 'production';
//     process.env.NODE_ENV = NODE_ENV; // для актуального состояния сборки
// }
//
// const urlConfig = mode === 1 ? process.env : require('./webpack/config-local.js');
// const fileBaseName = 1 ? '[id]' : '[name][id]'; // для отладки в условие 0
// if (mode !== 1) {
//     METHODS = urlConfig.METHODS;
// }
// // --- тут переменные для особой обработки ------------------------------------------------------------------------------------------------------------------
// const chunkInStyleTag = 'inTag_CSS'; /* стили, которые должны быть HTML для правильного отображения до подгрузки link'ов */
// const styleTagFilePath = `css/${chunkInStyleTag}.css`;
// const checkInTagChunk = new RegExp(chunkInStyleTag);
//
// /**
//  * генерация имен (+путь) файлов
//  * @param chunk
//  * @param contentHashType - ключ, под которым лежит contentHash (читай: какой лодер вызвал метод)
//  * @return {string} - имя файла
//  */
// const getChunkName = ({chunk, contentHashType}) => {
//     const basicPart = `${chunk.contentHash[contentHashType]}__${fileBaseName}`;
//     switch (contentHashType) {
//         case'javascript':
//             return `js/${basicPart}.bundle.js`;
//         case 'css/mini-extract':
//             return checkInTagChunk.test(chunk.name) ? styleTagFilePath : `css/${basicPart}.css`;
//         default:
//             return `unknown/${contentHashType}-${basicPart}`;
//     }
// };
//
// // === LOADERS =========================================================================================================
// // ... style .........................................................................................................
//
// const putToHead = 'styleTag';
// const getCssLoader = (isModule = false) => {
//     const options = {importLoaders: 1, sourceMap: IS_PROD, modules: isModule};
//     if (isModule) options.localIdentName = "[local]___[hash:base64:5]";
//     return {loader: 'css-loader', options};
// };
//
// // const getCssLoader1 = (info) => {
// //     const isModule = /.jsx?$/.test(info.issuer);
// //     const options = {importLoaders: info.compiler ? 0 : 1, sourceMap: IS_PROD, modules: isModule};
// //     if (isModule) options.localIdentName = "[local]___[hash]";
// //     return {loader: 'css-loader', options};
// // };
//
// const getStyleLoader = (info) => {
//     const isSpecialTag = new RegExp(putToHead).test(info.resourceQuery);
//     const options = {hmr: !IS_PROD, sourceMap: !IS_PROD};
//     if (IS_PROD)
//         return {loader: miniCssExtractPlugin.loader, options};
//
//     return {loader: "style-loader", options: Object.assign({}, options, {insertAt: isSpecialTag ? 'top' : 'bottom'})};
// };
//
// const sassLoader = {loader: 'sass-loader', options: {minimize: IS_PROD}}; // для sass конфиг везде одинн
//
// const getFileLoader = (outputPath) => ({loader: 'file-loader', options: {name: `[hash][name].[ext]`, outputPath}});
//
// // =====================================================================================================================
// // === PLUGINS =========================================================================================================
// // тут плагины, специфичные для сборки
//
// const specificPlugins = IS_PROD ? [
//     new StyleExtHtmlWebpackPlugin({file: styleTagFilePath, enabled: true, position: 'head-top', minify: true}), /* вставка стиля в HTML (тегом style) */
//     new miniCssExtractPlugin({filename: getChunkName, chunkFilename: getChunkName}), /* делает линки на файлы со стилями */
//     new HtmlWebpackExcludeAssetsPlugin(), /* чтобы не вставлять ссылку на стиль, встраеваемый в HTML */
// ] : [];
//
// if (mode !== 1) specificPlugins.push(new BundleAnalyzerPlugin({analyzerHost: 'localhost', openAnalyzer: false})); /* анализ сборки - в прод не надо */
//
// // =====================================================================================================================
// // === ПУТИ и АЛИАСЫ ===================================================================================================
// // упрощает импорты в коде
// const srcPath = path.join(__dirname, './src/');
// const jsPath = srcPath + 'js/';
//
// const alias = ['style', 'media'].reduce((r, a) => (r[a] = ${srcPath}${a}/, r), {});
//     ['actions', 'reducers', 'containers', 'components', 'core'].reduce((r, a) => (r[a] = ${jsPath}${a}/, r), alias);
// // =====================================================================================================================
// ...
// const common = {
//     entry: {
//         fonts_CSS: ${alias.style}fonts/fonts.scss,
//         common_CSS: ${alias.style}_main.scss,
//         [chunkInStyleTag]: ${alias.style}_atFirst.css?${putToHead},
//         app_main: ['@babel/polyfill', jsPath + 'index.jsx']
//     },
//     output: {
//         path: path.join(__dirname, './build'),
//         filename: getChunkName,
//         hashDigestLength: 10,
//         chunkFilename: js/${fileBaseName}_[name]_[contenthash].bundle.js,
//         publicPath: '/'
//     },
//     module: {
//         rules: [
//             /* JS(x)*/{
//                 test: /\.jsx?$/,
//                 exclude: /node_modules/,
//                 use: {
//                     loader: 'babel-loader',
//                     options: {presets: ['@babel/preset-env', '@babel/preset-react']}
//                 }
//             },
//             /* FONTS */{test: /\.(eot|ttf|woff|woff2)$/, use: getFileLoader('font')},
//             /* IMAGES */{test: /\.(png|jpe?g|gif)$/, use: getFileLoader('img')},
//             /* SVG handling */{
//                 test: /\.(svg)$/,
//                 oneOf: [
//                     /* RAW CODE */ {resourceQuery: /raw/, use: 'raw-loader'},
//                     /* FONT */{resourceQuery: /font/, use: getFileLoader('font')},
//                     /* IMAGE */{use: getFileLoader('img')}
//                 ]
//             },
//             /* STYLES */{
//                 test: /src.(.+)\.s?css$/,
//                 oneOf: [
//                     /* module */{test: /src.js./, use: [getStyleLoader, getCssLoader(true), sassLoader]},
//                     /* simple */{use: [getStyleLoader, getCssLoader(), sassLoader]}
//                 ],
//                 // use: [getStyleLoader, getCssLoader, sassLoader] // TODO: отладить. ну должно же оно заработать!
//             },
//         ]
//     },
//     resolve: {
//         extensions: ['.jsx', '.js', '.json', '.scss'],
//         modules:
//             ['node_modules', path.join(__dirname, '../node_modules')],
//         alias
//     },
//     optimization: {
//         splitChunks: {
//             cacheGroups: {
//                 vendors: {
//                     chunks: 'all',
//                     name: 'vendors',
//                     test: /[\\/]node_modules[\\/]/,
//                     enforce: true,
//                     minChunks: 1,
//                     reuseExistingChunk: true,
//                     priority: 10,
//                     maxSize: (1024 * 1024),
//                     minSize: 1024 * 512
//                 },
//
//                 app_main: {
//                     enforce: true,
//                     test: /app_main/,
//                     minChunks: 500,
//                     priority: 2,
//                     reuseExistingChunk: true,
//                     maxSize: (1024 * 1024)
//                 },
//                 default: {
//                     chunks: (ch) => (!checkInTagChunk.test(ch.name)),
//                     minChunks: 2, priority: 1, reuseExistingChunk: false, maxSize: (1024 * 1024)
//                 }
//             },
//             chunks: 'initial',
//             maxSize: 1024 * 244,
//             minSize: 512, minChunks: 2, name: false
//         }
//     },
//     plugins: [
//         new webpack.ProvidePlugin({
//             React: 'react',
//             ReactDOM: 'react-dom',
//             connect: ['react-redux', 'connect'],
//             Provider: ['react-redux', 'Provider'],
//             combineReducers: ['redux', 'combineReducers'],
//             compose: ['redux', 'compose'],
//             applyMiddleware: ['redux', 'applyMiddleware'],
//             createStore: ['redux', 'createStore'],
//             classNames: 'classnames',
//             moment: 'moment',
//             debounce: ['lodash', 'debounce']
//         }),
//         new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify(NODE_ENV)}}),
//         new CleanWebpackPlugin(),
//         new HtmlWebpackPlugin({
//             template: 'index.ejs',
//             inject: 'head',
//             excludeAssets: checkInTagChunk, /* чтобы не вставлять ссылку на стиль, встраеваемый в HTML */
//             meta: [
//                 {charset: "UTF-8"},
//                 {'http-equiv': "x-ua-compatible", content: "IE=edge"},
//                 {'http-equiv': "Cache-control", content: "public"},
//                 {name: 'format-detection', content: 'telephone=no'},
//                 {name: 'format-detection', content: 'date=no'},
//                 {name: 'format-detection', content: 'address=no'},
//                 {name: 'format-detection', content: 'email=no'},
//                 {name: 'cleartype', content: 'on'}
//             ],
//             title: ['MOBIREP', 'Ассистент', 'PROD'][mode],
//             minify: IS_PROD,
//             loader: mainLoader,
//             appUrls: generateTags.getUrlInitScript({
//                 tass_mr_api_mock: urlConfig.API_MOCK_URL,
//                 tass_mr_api: urlConfig.API_URL,
//                 tass_mr_socket: urlConfig.SOCKET_URL,
//                 tass_mr_sentry: urlConfig.SENTRY_UR,
//             }),
//             revision: urlConfig.REVISION || 'no revision specified',
//             methods_whitelist: METHODS
//         }),
//         new ScriptExtHtmlWebpackPlugin({
//             defer: /\.js$/,
//             custom: {test: /./, attribute: 'onload', value: 'removeSelf(event)'} /* <- onload = убрать мусор из разметки */
//         }),
//         new FaviconsWebpackPlugin({
//             prefix: 'fav/[hash]-',
//             persistentCache: true,
//             logo: alias.media + 'Logo.svg',
//             background: 'rgba(0,0,0,0)',
//             icons: {
//                 favicons: true,
//                 appleIcon: false,
//                 android: false,
//                 appleStartup: false,
//                 coast: false,
//                 firefox: false,
//                 opengraph: false,
//                 twitter: false,
//                 yandex: false,
//                 windows: false
//             }
//         }),
//         new CopyPlugin([{from: 'static', to: './'}]),
//         new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru/),  // удаление лишних локализаций момента (будет только ru)
//         // new webpack.optimize.LimitChunkCountPlugin({maxChunks: 13})
//     ].concat(specificPlugins)
// };
//
// // const spcConfig = process.env.OPTIMIZE || IS_PROD ? production : development; //
// const spcConfig = IS_PROD ? production : development; // отличающиеся настройки
//
// module.exports = merge(spcConfig, common);
//
// const webpack = require('webpack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//
// module.exports = {
//     mode: "production",
//     devtool: false,
//     optimization: {
//         minimize: true,
//         concatenateModules: true,
//         nodeEnv: 'production',
//         mergeDuplicateChunks: true,
//         flagIncludedChunks: true,
//         occurrenceOrder: true,
//         providedExports: true,
//         runtimeChunk: 'single',
//         moduleIds: 'hashed',
//         minimizer: [
//             new UglifyJsPlugin({
//                 test: /\.js(x)?$/i,
//                 parallel: 4,
//                 uglifyOptions: {
//                     warnings: false,
//                     compress: {drop_console: true, warnings: false, dead_code: true,},
//                     mangle: {reserved: ['$super', '$', 'exports', 'require']},
//                     output: {}
//                 }
//             }),
//         ]
//     },
//     plugins:
//         [
//             new OptimizeCssAssetsPlugin({
//                 assetNameRegExp: /\.css$/g,
//                 cssProcessor: require('cssnano'),
//                 cssProcessorPluginOptions: {preset: ['default', {discardComments: {removeAll: true}}]},
//                 canPrint: true
//             })
//         ]
// };