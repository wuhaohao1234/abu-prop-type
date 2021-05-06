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
function isPropFile(pathname, item) {
  return pathname.isFile() && item.includes('-prop.js')
}

const traverse = (paths) => {
  const fileFolders = fs.readdirSync(path.resolve(paths))
  const result = {}
  fileFolders.map(async (item) => {
    const pathname = fs.statSync(path.join(paths, item))
    if (pathname.isDirectory()) {
      result[item] = setFolderInfo(paths, item)
    }
    if (isPropFile(pathname,item)) {
      result[item.replace('-prop.js', '')] = setFileInfo(paths, item)
    }
  })
  return result
}
module.exports = traverse
