import type {UserInfoType} from '@/pages/Login/model';
// 定义key
const USER_INFO_KEY = 'REACT_DEMO_USER';
const USER_TOKEN_KEY = 'REACT_DEMO_TOKEN';

/**
 * 把用户信息存入localstorage
 * @param userInfo 
 */
export function saveUserInfo(userInfo: UserInfoType){
  const userInfoStr: string = JSON.stringify(userInfo);
  window.localStorage.setItem(USER_INFO_KEY,userInfoStr);
}
/**
 * 删除用户信息
 */
export function removeUserInfo(){
  window.localStorage.removeItem(USER_INFO_KEY);
}
/**
 * 获取用户信息
 */
export function getUserInfo(){
  const userInfoStr =  window.localStorage.getItem(USER_INFO_KEY);
  if(userInfoStr == null){
    return null;
  }
    const userInfo: UserInfoType = JSON.parse(userInfoStr);
    return userInfo;
}

/**
 * 保存token
 * @param token 
 */
export function saveToken(token: string){
  window.localStorage.setItem(USER_TOKEN_KEY,token);
}

/**
 * 删除token
 */
export function removeToken(){
  window.localStorage.removeItem(USER_TOKEN_KEY);
}

/**
 * 获取token
 */
export function getToken(){
  const tokenStr = window.localStorage.getItem(USER_TOKEN_KEY);
  return tokenStr;
}
/**
 * 清楚用户登录信息
 */
export function clearUserLoginInfo(){
  removeUserInfo();
  removeToken();
}