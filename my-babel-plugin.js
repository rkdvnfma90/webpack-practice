module.exports = function myBabelPlugin() {
  return {
    // 커스텀 플러그인을 만들 때에는 visitor 객체를 반환해 주어야 한다.
    visitor: {
      Identifier(path) {
        const name = path.node.name

        // 바벨이 만든 AST 노드를 출력한다
        console.log('Identifier() name:', name)

        // 변환작업: 코드 문자열을 역순으로 변환한다
        path.node.name = name.split('').reverse().join('')
      },
    },
  }
}
