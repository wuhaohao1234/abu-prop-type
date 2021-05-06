const fs = require('fs')
const path = require('path')

const traverse = require('../src/traverse')

test('测试traverse', async () => {
  const tablePropStr = await fs.readFileSync(path.resolve('./example/src/table-prop.js')).toString()
  const textPropStr = await fs.readFileSync(path.resolve('./example/src/prop/text-prop.js')).toString()
  const result = {
    table: {
      type: 'file',
      fileText: tablePropStr
    },
    prop: {
      type: 'folder',
      children: {
        text: {
          type: 'file',
          fileText: textPropStr
        }
      }
    }
  }
  expect(await traverse('./example/src')).toStrictEqual(result)
})
