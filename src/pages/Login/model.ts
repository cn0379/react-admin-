import {doLogin as loginApi} from '@/services/login';
import {message} from 'antd';
// Effect和Reducer类型是我们推导的类型,明细是来自Dva的.
import type {Effect, Reducer} from 'umi';
import {saveUserInfo,saveToken } from '@/utils/myAuth';
import { history } from 'umi';
import {clearUserLoginInfo} from '@/utils/myAuth';
// 定义 MType 类型 
// 单独定义UserInfoType 是为了其他地方使用方便
export type UserInfoType = {
  username: string;
  nickname: string;
  icon: string;
}
// 为了方便在其他地方使用到MType类型,这里直接局部导出
export type MType = {
  namespace: string ;
  // 注意: userInfo:object 会报警告, 因为在后续使用userInfo的时候,有什么参数?必须提前声明.
  state: {
    userInfo: UserInfoType | {};
  };
  effects: {
    doLogin: Effect;
    doLogout: Effect;
  };
  reducers: {
    initUserInfo: Reducer;
  }
}
// 给M声明类型
const M: MType = {
  namespace: 'myLogin',
  state: {
    userInfo: {}
  },
  effects: {
     /* 
     调用api,因为是异步,这里采用js generator语法把回调扁平化.类似于async+await
     action为载荷对象(同vuex), 第二个参数解构出来的call和put是固定写法: 
        call用于调用接口(Promise类型)
        put用于调用reducer设置state 
    */
    *doLogin(action, {call,put}){
      // 打印action,查看对象结构
      const {payload} = action;
      // message与引入模块冲突 重命名为: errMsg
      // const {data,success,message:errMsg} = yield call(loginApi,payload);
      const { success: { msg, success, userInfo , token } } = yield call(loginApi,payload);
      if(success){
        // 存入state
        // put专门用于调用 reducer, 而且需要添加 迭代器 yield修饰符
        yield put({
          type: 'initUserInfo',
          payload: success
        })
        // 存入localstorage 
        saveUserInfo(userInfo);
        saveToken(token);
        message.success('登录成功!');
        window.location.href = '/';
      }else{
        // 返回错误 提示错误信息
        message.error(msg);
        
      }
      
    },
    doLogout(){
      // 清空登录用户信息和token
      clearUserLoginInfo();
      history.replace({
        pathname: '/user/login'
      });
    }
  }, 
  reducers: {
    // 第二个参数为action: {type:string ,payload: any}
    // 把payload解构出来 并获取userInfo
    initUserInfo(state,{payload:{userInfo}}){
      // 由于单向数据流的设计理念 reducer每次需要重新返回新的完整的state
      return {
        ...state,
        userInfo
      }
    }
    
  }
}

export default M;