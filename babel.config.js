module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '87', // 크롬 87 버전 까지 지원하는 코드라는 의미
          ie: '11', // ie 11 까지 지원하는 코드
        },
      },
    ],
  ],
}
