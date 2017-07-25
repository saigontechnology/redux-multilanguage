module.exports = {
    entry: './index.js',
    output: {
        filename: 'lib/bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    externals: {
        'react': 'commonjs react', // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
        "react-redux": 'react-redux'
    }
}