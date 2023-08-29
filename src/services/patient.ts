import request from '@/utils/request'
import type { PatientType } from '@/types/user'
export const grtPatienLIst = () => {
  return request<PatientType>('/patient/mylist', 'GET')
}
