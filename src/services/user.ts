import request from '@/utils/request'
import type { CodeType } from './types/user.d'
import type { User, UserInfo, Patient } from '@/types/user.d'
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

// 获取个人信息
export const getUserInfo = () => {
  return request('/patient/myUser', 'GET')
}

// 添加患者信息
export const addPatient = (patient: Patient) => request('/patient/add', 'POST', patient)

// 编辑患者信息
export const editPatient = (patient: Patient) => request('/patient/update', 'PUT', patient)
// 删除患者信息
export const delPatient = (id: string) => request(`/patient/del/${id}`, 'DELETE')
