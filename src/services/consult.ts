import request from '@/utils/request'
import type { KnowledgeParams } from '@/types/consult'
import type { KnowledgePage } from '@/types/consult'

// 首页-查询推荐/减脂/饮食健康/关注页面--百科文章列表
export const getConsultList = (knowledgeParams: KnowledgeParams) => {
  return request<KnowledgePage>('/patient/home/knowledge', 'GET', knowledgeParams)
}
