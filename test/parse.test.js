const fs = require('fs')
const path = require('path')
const parse = require('../src/parse')
const propStr = fs.readFileSync(path.resolve('./example/src/table-prop.js')).toString()
const tableInterface = fs.readFileSync(path.resolve('./example/typings/table-prop.d.ts')).toString()

test('测试parse', async () => {
  expect(parse(propStr)).toStrictEqual(tableInterface);
})
