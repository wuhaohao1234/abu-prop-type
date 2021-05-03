const fs = require('fs')
const path = require('path')

const conversion = require('../src/index');

test('成功引入prop文件', async () => {
  const propStr = await fs.readFileSync(path.resolve('./example/src/table-prop.js')).toString()
  expect(conversion(propStr)).toBe(propStr);
});
test('成功引入prop.d.ts文件', async () => {
  const tableInterface = await fs.readFileSync(path.resolve('./example/typings/table-prop.d.ts')).toString()
  expect(conversion(tableInterface)).toBe(tableInterface);
});