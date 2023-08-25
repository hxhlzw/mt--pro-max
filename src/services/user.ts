import request from '@/utils/request'
import type { loginParamsRules } from './types/user'

//密码登录
export const loginPost = (loginParams: loginParamsRules) => {
  return request('/login/password', 'POST', loginParams)
}
