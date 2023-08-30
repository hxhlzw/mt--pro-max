// 文章类型，关注医生的文章|推荐的文章|减脂|饮食
export type KnowledgeType = 'like' | 'recommend' | 'fatReduction' | 'food'

export type Knowledge = {
  // 文章id
  id: string
  // 文章标题
  title: string
  // 封面地址
  coverUrl: string[]
  // 百科关联的话题
  topics: string[]
  // 收藏数量
  collectionNumber: number
  // 评论数量
  commentNumber: number
  // 创建人姓名
  creatorName: string
  // 创建人头像
  creatorAvatar: string
  // 创建人医院
  creatorHospatalName: string
  // 是否关注0未关注1关注
  likeFlag: 0 | 1
  // 内容详情
  content: string
  // 创建人科室
  creatorDep: string
  // 创建人职称
  creatorTitles: string
  // 创建人id
  creatorId: string
}

export type KnowledgeList = Knowledge[]

export type KnowledgePage = {
  // 总页数
  pageTotal: number
  // 总条数
  total: number
  // 数据
  rows: KnowledgeList
}
// 文章列表查询参数
export type KnowledgeParams = {
  type: KnowledgeType
  current: number
  pageSize: number
}
