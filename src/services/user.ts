import request from '@/utils/request'
import type { loginParamsRules } from './types/user'
import type { CodeType } from './types/user'
//密码登录
export const loginPost = (mobile: string, password: string) => {
  return request('/login/password', 'POST', { mobile, password })
}
// 发送验证码
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request('/code', 'GET', { mobile, type })

// 短信登录
export const loginByMobile = (mobile: string, code: string) =>
  request('/login', 'POST', { mobile, code })
