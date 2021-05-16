import React from 'react';
import { Form, Input, Button } from 'antd';
import styles from './index.less';
// 引入connect 连接model 
import {connect} from 'umi';
import type {Dispatch} from 'umi';
// 我们需要用到MType的类型 所以引入
import type {MType,UserInfoType} from './model';

// 定义明明空间 方便引用
const namespace = 'myLogin';
// 定义props类型
type PropsType = {
  userInfo: UserInfoType;
  dispatch: Dispatch;
}
// 这种写法是直接声明参数props类型
// const Login  = (props: PropsType)=>{
// 也可以通过 "泛型" 来定义组件类型  
// # https://www.tslang.cn/docs/handbook/generics.html 
const Login: React.FC<PropsType>  = props=>{
  // 将我们需要的state解构出来
  // dispatch是connect之后才有的属性,用于发送请求调用model的effect
  // userInfo可以通过 mapStateToPros connect到当前组件
  const {userInfo,dispatch} = props;
  // 提交表单且数据验证成功后回调事件
  const onFinish = (v: any)=>{
    // 这里可以获取到表单内容,则直接调用 model的doLogin
    dispatch({
      type: `${namespace}/doLogin`,
      payload: v
    })
  }
  // 提交表单且数据验证失败后回调事件
  const onFinishFailed = (v: any)=>{
    console.log('ev',v);
  }

  return (
    <Form
      className={styles.main}
      labelCol = {{span: 8}}
      wrapperCol = {{span: 16}}
      onFinish= {onFinish}
      onFinishFailed = {onFinishFailed}
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[
          {required: true ,message: '用户名不能为空!'}
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[
          {required: true, message: '密码不能为空!'}
        ]}
      >
        <Input.Password/>
      </Form.Item>
      <Form.Item 
        wrapperCol={
          {
            offset: 8,
            span: 16
          }
        }
      >
        <Button type="primary" htmlType="submit">登录</Button>
        
      </Form.Item>
    </Form>
  )
}
// # https://www.redux.org.cn/docs/react-redux/api.html
// 由于命名空间的划分,我们只需要获取 login 的model
const mapStateToProps = (state: MType['state'])=>{
  return{
    userInfo: state[namespace].userInfo
  }
}
// 通过connect 连接 model与react组件
export default connect(mapStateToProps)(Login);