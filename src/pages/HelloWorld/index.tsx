// 1. 引入React
import React from 'react';

// 这里采用 函数组建 形式创建 HelloWorld 组建
// #https://react.docschina.org/docs/components-and-props.html
// 2. 创建类型为: React.FunctionComponent 变量,并返回一个 ReactDom对象
const HelloWorld: React.FC = ()=> 
  (
    <div>hello,world!</div>
  )

// 3. 导出默认组建
export default HelloWorld;