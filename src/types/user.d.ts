// 联合类型
export type User = {
  id: string
  token: string
  account: string
  mobile: string
  avatar: string
}

// 匹配出非token字段的类型
type OmitUser = Omit<User, 'token'>

// 用户信息类型
export type UserInfo = OmitUser & {
  likeNumber: number
  collectionNumber: number
  score: number
  couponNumber: number
  orderInfo: {
    paidNumber: number
    receivedNumber: number
    shippedNumber: number
    finishedNumber: number
  }
}
