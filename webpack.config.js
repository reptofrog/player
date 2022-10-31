module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
      },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader'
            },
            {
                test: /\.woff$/,
                use: 'file-loader'
            },
        ]
    }
}