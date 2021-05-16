import request from '@/utils/request';

export type LoginParamsType = {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
};
// 类型的声明,可以用type, 也可以使用 interface 
// 两者功能都差不多,语法有稍微的差别. 
// 区别: type不可以重名, interface重名会自动合并
export type LoginUserParams = {
  username: string;
  password: string;
};

// 或者声明接口. 命名为个人习惯,接口的声明以I开头. 非规范.
export interface ILoginUserParams {
  username: string ; 
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login', {
    method: 'POST',
    data: params,
  });
}

/**
 * 登录接口
 * @param mobile 
 */
// 使用 ILoginUserParams或者LoginUserParams声明params类型都可以,这里使用interface
// export async function doLogin(params: LoginUserParams) {
export async function doLogin(params: ILoginUserParams) {
  return request(`/api/login`,{
    method: 'POST',
    data: params
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
