import type {
  MedicineOrderType,
  MedicineResponseType,
  MedicineType,
  addressResponseType,
  OrderDetailResponseType
} from '@/types/order'
import request from '@/utils/request'

// 获取收货地址
export const getAdderss = () => {
  return request<addressResponseType>('/patient/order/address', 'GET')
}

// 获取药品信息
export const getMedicineInfo = (params: MedicineType) => {
  return request<MedicineResponseType>('/patient/medicine/order/pre', 'GET', params)
}

// 生成药品订单
export const createMedicalOrder = (data: MedicineOrderType) => {
  return request<{
    data: any
    id: string
  }>('/patient/medicine/order', 'POST', data)
}
// 获取药品订单详情
export const getMedicalOrderDetail = (id: string) => {
  return request<OrderDetailResponseType>(`/patient/medicine/order/detail/${id}`, 'GET')
}
