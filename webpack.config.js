const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/canvas.js',
    output: {
        path: __dirname + '/docs/js',
        filename: 'canvas.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['docs'] },
            files: ['./docs/*']
        }),
    ],
    watch: true,
    devtool: 'source-map'
};