/* eslint-disable filenames/match-regex, import/no-commonjs */

const path = require('path');
const context = path.resolve(__dirname, './app');

module.exports = {
    context,
    entry: './client.js',
    module: {
        loaders: [
            {
                include: path.resolve(__dirname, './app'),
                loaders: [
                    'style-loader',
                    'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
                ],
                test: /\.css$/
            },
            {
                include: path.resolve(__dirname, './app'),
                loaders: [
                    'style-loader',
                    'css-loader?importLoader=1&modules&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                    'sass-loader'
                ],
                test: /\.scss$/
            },
            {
                include: path.resolve(__dirname, './app'),
                loader: 'babel-loader',
                query: {
                    plugins: [
                        'transform-react-jsx',
                        'transform-object-rest-spread'
                    ]
                },
                test: /\.js$/
            }
        ]
    },
    output: {
        filename: './dist/[name].js'
    },
    stats: 'minimal'
};