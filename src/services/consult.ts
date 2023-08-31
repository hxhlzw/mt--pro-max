import request from '@/utils/request'
import type { KnowledgeParams } from './types/consult'
import type { KnowledgePage, PageParams, DoctorPage, LikeParams } from '@/types/consult'

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
