const path = require('path');
const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: 'server.ts',
    target: 'node',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    mode: 'production',
    devtool: 'source-map',
    resolve: {
        extends: ['.ts', '.tsx', '.js', '.json'],
    },
    stats: 'errors-warnings',
    module: {
        rule: [
            {
                test: /\.(js|ts|tsx)$/,
                include: path.resolve(__dirname, 'build', 'index.html'),
                loader: 'babel-loader',
            },
            {
                test: /\.(js)$/,
                exclude: /@babel(?:\/|\\{1,2})runtime/,
                loader: 'babel-loader',
                options: {
                    presets: [['babel-preset-react-app/dependencies', { helpers: true }]],
                },
            },
        ]
    },
    externals: [nodeExternals()]
};
