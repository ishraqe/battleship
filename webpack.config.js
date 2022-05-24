const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: ['./src/index.jsx'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [path.join(__dirname, 'src')],
                loader: 'babel-loader',
                options: { configFile: path.resolve(__dirname, './.babelrc') }
            },
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.js$/, loader: 'source-map-loader', enforce: 'pre' },
            { test: /\.svg$/, type: 'asset/inline' }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [], 
        mode: 'development',
    devServer: {
        historyApiFallback: true,
        host: '0.0.0.0', //for public access
        port: 8080,
        static: [
            {
                directory: './src',
                staticOptions: {},
                watch: true
            }
        ],
        allowedHosts: 'all',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
        }
    },
    devtool: 'source-map'
};
