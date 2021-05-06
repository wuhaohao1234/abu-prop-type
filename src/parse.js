const deletePropTypes = (str) => {
  return str.replace(/PropTypes\./g, '')
}
const deleteIsRequired = (str) => {
  return str.replace(/\.isRequired/g, '')
}
const stringToCapitals = (str) => {
  return str.replace(/ string/g, ' String')
}
const arrayToCapitals = (str) => {
  return str.replace(/ array/g, ' Array<any>')
}
const constToInterface = (str) => {
  return str.replace(/const/g, 'export interface')
}
const equalToEmpty = (str) => {
  return str.replace(/= /g, '')
}
const addReact = (str) => {
  return `import React from 'react';\n` + str
}
const deleteMessage = (str) => {
  return str.replace(/\/\*(\s|.)*?\*\//g, '')
}
const removeBlankLines = (str) => {
return str.replace(/(\n[\s\t]*\r*\n)/g, '\n').replace(/^[\n\r\n\t]*|[\n\r\n\t]*$/g, '')
}
const addDoc = (str) => {
  console.log(str);
  return str + `
/**
 * @param {Array<any>} columns 表头配置信息
 * @param {String} className 类名
*/
export declare class Table extends React.Component<TableProps> {

}`
}

const parse = (codeStr) => {
  let result = deletePropTypes(codeStr);
  result = deleteIsRequired(result)
  result = stringToCapitals(result)
  result = arrayToCapitals(result)
  result = constToInterface(result)
  result = equalToEmpty(result)
  result = deleteMessage(result)
  result = removeBlankLines(result)
  result = addDoc(result)
  result = addReact(result)
  return result
}
module.exports = parse