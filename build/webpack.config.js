const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CheckerPlugin } = require('awesome-typescript-loader')

module.exports = {
    context: path.join(__dirname, '../'),
    entry: {
        './debug/index.js': './lib/debug/index.ts'
    },
    output: {
        filename: '[name]',
        path: path.join(__dirname, '../dest/entry/')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    devtool: 'source-map',
    module: {
       rules: [{
           test: /\.scss$/,
           use: [{
               loader: "style-loader"
           }, {
               loader: "css-loader"
           }, {
               loader: "sass-loader"
           }]
       }, {
           test: /\.css$/,
           use: [{
               loader: "style-loader"
           }, {
               loader: "css-loader"
           }]
       }, {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
               loader: 'babel-loader',
               options: {
                   presets: ['react']
               }
           }
       }, {
           test: /\.tsx?$/,
           loader: 'awesome-typescript-loader'
       }]
   },
   plugins: [
       new CheckerPlugin(),
       new CopyWebpackPlugin([
           { from: 'lib/**/*.html',  to: '.'},
       ])
   ]
}
