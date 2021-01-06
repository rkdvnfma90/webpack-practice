const MyWebPackPlugin = require('./my-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const childProcess = require('child_process')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// node.js의 모듈 시스템
module.exports = {
  mode: 'development',
  entry: {
    main: './src/app.js', // 해당 명칭이 output의 [name] 변수에 동적으로 할당된다.
  },
  output: {
    path: path.resolve('./dist'), // node 의 path 모듈을 사용하여 절대경로를 넣어준다.
    filename: '[name].js',
  },
  // 로더는 module의 rules에 정의한다.
  module: {
    rules: [
      {
        test: /\.css$/, // 로더를 적용할 파일을 지정한다.
        use: ['style-loader', 'css-loader'], // 위 패턴에 해당하는 파일들에 사용할 로더를 명시, 적용되는 순서는 뒤에서부터 앞으로 적용된다.
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          //publicPath: './dist', // prefix를 아웃풋 경로로 지정한다. -> src 밑으로 index.html 을 옮겼기 때문에 사용하지 않아도 된다.
          name: '[name].[ext]?[hash]', // 파일명 형식
          limit: 300000, // url-loader가 위 파일들을 처리 할 때 300kb 미만일 경우 url-loader로 처리하고 그 이상일 경우 file-laoder가 실행한다.
        },
      },
    ],
  },
  plugins: [
    new MyWebPackPlugin(),
    new webpack.BannerPlugin({
      banner: `
        Build Date : ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
      `,
    }),
    new webpack.DefinePlugin({
      TWO: '1+1', // 1+1의 값 2가 출력된다.
      SUMSTR: JSON.stringify('1+2'), // 1+2 문자열 자체가 출력된다.
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      // 운영에만 키고 싶을때
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true, // 공백 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
  ],
}
