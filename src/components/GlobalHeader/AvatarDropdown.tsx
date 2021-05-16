import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import type { Dispatch } from 'react';
import React from 'react';
import type { ConnectProps } from 'umi';
import { history ,connect} from 'umi';
// import type { ConnectState } from '@/models/connect';
import type { CurrentUser } from '@/models/user';
// 引入封装的获取用户信息的方法
import {getUserInfo} from '@/utils/myAuth';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  currentUser?: CurrentUser;
  menu?: boolean;
} & Partial<ConnectProps>;

class AvatarDropdown extends React.Component<GlobalHeaderRightProps> {
  onMenuClick = (event: {
    key: React.Key;
    keyPath: React.Key[];
    item: React.ReactInstance;
    domEvent: React.MouseEvent<HTMLElement>;
  }) => {
    const { key } = event;
    // 判断如果是退出按钮 则执行退出逻辑
    if (key === 'logout') {
        const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'myLogin/doLogout',
        });
      }
      return;
    }

    history.push(`/account/${key}`);
  };

  render(): React.ReactNode {
    const { menu} = this.props;
    // 根据自己的业务逻辑 从localStorage中获取用户信息
    const currentUser = getUserInfo();
    console.log(currentUser);
    
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.username ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.icon} alt="avatar" />
          <span className={`${styles.name} anticon`}>{currentUser.nickname}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}
// 没有用到mode 所以这里暂时注销
// export default connect(({ user }: ConnectState) => ({
//   currentUser: user.currentUser,
// }))(AvatarDropdown);
const mapDispatchToProps = (dispatch)=>({
  dispatch
})
export default connect(mapDispatchToProps)(AvatarDropdown);
