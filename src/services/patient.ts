import request from '@/utils/request'
import type { Patient } from '@/types/user'
export const grtPatienLIst = () => {
  return request<Patient>('/patient/mylist', 'GET')
}
