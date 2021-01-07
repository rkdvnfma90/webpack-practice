module.exports = function myBabelPlugin() {
  return {
    // 커스텀 플러그인을 만들 때에는 visitor 객체를 반환해 주어야 한다.
    visitor: {
      VariableDeclaration(path) {
        console.log('VariableDeclaration() kind:', path.node.kind) // const

        // const를 var로 변경하는 부분
        if (path.node.kind === 'const') {
          path.node.kind = 'var'
        }
      },
    },
  }
}
