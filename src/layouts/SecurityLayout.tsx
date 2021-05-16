import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import type { ConnectProps } from 'umi';
import { Redirect, connect  } from 'umi';
import { stringify } from 'querystring';
// import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
import {getToken} from '@/utils/myAuth';

type SecurityLayoutProps = {
  loading?: boolean;
  currentUser?: CurrentUser;
} & ConnectProps;

type SecurityLayoutState = {
  isReady: boolean;
};
 

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  // react的声明周期函数  组件渲染完毕后触发,类似于vue的mounted
  componentDidMount() {
    this.setState({
      isReady: true,
    });
    // 这里注销掉 已经不需要框架本身的 登录 方法
    // const { dispatch } = this.props;
    // if (dispatch) {
    //   dispatch({
    //     type: 'user/fetchCurrent',
    //   });
    // }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    // const isLogin = currentUser && currentUser.userid;
    // 这里换成判断token是否存在
    const isLogin = getToken();
    const queryString = stringify({
      redirect: window.location.href,
    });
    if ((!isLogin && loading) || !isReady) {
      return <PageLoading/>;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

// #https://github.com/dvajs/dva/tree/master/packages/dva-loading
// # https://umijs.org/zh-CN/plugins/plugin-dva
// 这里 loading是dva-loading 的插件,可以监听某个model的effects是否出于异步进行中
const mapStateToProps = (state: any) =>{
  return {
    loading: state.loading.models.myLogin as boolean
  }
}
export default connect(mapStateToProps)(SecurityLayout);
