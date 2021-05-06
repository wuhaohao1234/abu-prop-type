const fs = require('fs')
const path = require('path')
function setFolderInfo(paths, item) {
  const childrenResult = traverse(paths + '/' + item)
  return {
    type: 'folder',
    children: childrenResult
  }
}

function setFileInfo(paths, item) {
  const fileText = fs.readFileSync(path.join(paths, item)).toString()
  return {
    type: 'file',
    fileText
  }
}
const traverse = (paths) => {
  const fileFolders = fs.readdirSync(path.resolve(paths))
  const result = {}
  fileFolders.map(async (item) => {
    const pathname = fs.statSync(path.join(paths, item))
    if (pathname.isDirectory()) {
      result[item] = setFolderInfo(paths, item)
    }
    if (pathname.isFile()) {
      result[item.replace('-prop.js', '')] = setFileInfo(paths, item)
    }
  })
  return result
}
module.exports = traverse


