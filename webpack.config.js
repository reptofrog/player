module.exports = {
    entry: './src/index.tsx',
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
      },
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: ['ts-loader']
            }
        ]
    }
}