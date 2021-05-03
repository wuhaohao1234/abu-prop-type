# abu-prop-type

> 将react的prop文件转为.d.ts声明文件

## 背景

在开发react组件中，声明文件.d.ts结合jsdocs可以更好的类型声明

需求：希望开发一个工具，自动将prop转换为.d.ts,这样就可以通过维护一套prop，自动生成.d.ts文件，jsdoc

## prop声明文件

```typescript
const TableProps = {
  /** 表头配置信息 */
  columns: PropTypes.array.isRequired,
  /** 元素的类名称 */
  className: PropTypes.string,
  /** table 数据数组*/
  dataSource: PropTypes.array.isRequired,
  /** 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，可以设置为像素值，百分比，true 和 'max-content' */
  scroll: PropTypes.shape({
    x: PropTypes.any,
    y: PropTypes.any,
  }),             // 滚动距离
  /** 分页配置 */
  pagination: PropTypes.any,
}
```

## 转换好后的声明文件

```typescript
import React from 'react';
export interface TableProps {
    columns: Array<any>,
    className: String,
    dataSource: Array<any>,
    scroll: any,
    pagination: any,
}
/**
 * @param {Array<any>} columns 表头配置信息
 * @param {String} className 类名
 * @param {Array<any>} dataSource 数据数组
 * @param {any} scroll 设置横向或纵向滚动，也可用于指定滚动区域的宽和高，可以设置为像素值，百分比，true 和 'max-content'
 * @param {any} pagination 分页配置
*/
export declare class Table extends React.Component<TableProps> {

}
```

## 约定

1. 所有的props单独存放一个文件，例如tableProps.jsx
2. npm包自动识别src目录下的xxxProps.jsx
3. 转为对应的xxx.d.ts
4. 采用热重载的方式

## 与rollup结合

```json
{
  input: 'src/index.d.ts',
  output: [{file: 'dist/index.d.ts', format: 'es'}],
  plugins: [
    external(),
    dts(),
  ],
}
```

## 前提条件npm-cli开发

学习npm cli开发，具体看示例：

https://github.com/wuhaohao1234/abu-cli

也可以看honeycomb-cli源码
https://gitee.com/wuhaohao1234/honeycomb-cli

这里可能涉及到ast处理