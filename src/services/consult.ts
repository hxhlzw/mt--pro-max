import request from '@/utils/request'
import type { KnowledgeParams } from './types/consult'
import type {
  ConsultOrderItem,
  ConsultOrderPreData,
  ConsultOrderPreParams,
  PartialConsult
} from '@/types/consult'
import type {
  KnowledgePage,
  PageParams,
  DoctorPage,
  LikeParams,
  DepList,
  Image
} from '@/types/consult'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getConsultList = (knowledgeParams: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', knowledgeParams)
}
// 获取医生列表
export const getDoctorPage = (pageParams: PageParams) => {
  return request<DoctorPage>('/home/page/doc', 'GET', pageParams)
}

// 关注医生
export const likeDoctor = (likeParams: LikeParams) => {
  return request('/like', 'POST', likeParams)
}

// 查询所有科室-层级
export const getAllDep = () => {
  return request<DepList>('/dep/all', 'GET')
}

// 上传文件/图片
export const uploadImage = (file: File) => {
  const fd = new FormData()
  fd.append('file', file)
  return request<Image>('/upload', 'POST', fd)
}
// 拉取预支付订单信息
export const getConsultOrderPre = (params: ConsultOrderPreParams) =>
  request<ConsultOrderPreData>('/patient/consult/order/pre', 'GET', params)

// 生成订单
export const createConsultOrder = (data: PartialConsult) =>
  request<{ id: string }>('/patient/consult/order', 'POST', data)

// 发起支付
export const getConsultOrderPayUrl = (payParams: {
  paymentMethod: 0 | 1
  orderId: string
  payCallback: string
}) => {
  return request<{
    payUrl: string
  }>('/patient/consult/pay', 'POST', payParams)
}

import type { ConsultOrderListParams, ConsultOrderPage } from '@/types/consult'

// 获取问诊订单列表
export const getConsultOrderList = (params: ConsultOrderListParams) => {
  return request<ConsultOrderPage>('/patient/consult/order/list', 'GET', params)
}

// 取消订单
export const cancelOrder = (id: string | number) => {
  return request(`/patient/order/cancel/${id}`, 'PUT')
}

// 删除订单
export const deleteOrder = (id: string | number) => {
  return request(`/patient/order/${id}`, 'DELETE')
}
// 查看处方
export const getPrescriptionPic = (id: string | number) => {
  return request<{ id: string; url: string }>(`patient/consult/prescription/${id}`, 'GET')
}

// 查看订单详情
export const getOrderDetail = (orderId: string) => {
  return request<ConsultOrderItem>('/patient/consult/order/detail', 'GET', { orderId })
}
