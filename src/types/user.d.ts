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
// 家庭档案-患者信息
export type Patient = {
  data: {
    id?: string | undefined
    name: string
    idCard: string
    defaultFlag?: 0 | 1 | undefined
    gender: 0 | 1
    genderValue?: string | undefined
    age?:
      | {
          toString: (radix?: number | undefined) => string
          toFixed: (fractionDigits?: number | undefined) => string
          toExponential: (fractionDigits?: number | undefined) => string
          toPrecision: (precision?: number | undefined) => string
          valueOf: () => number
          toLocaleString: {
            (
              // 家庭档案-患者信息
              locales?: string | string[] | undefined, // 患者ID
              options?: Intl.NumberFormatOptions | undefined // 身份证号
            ): string
            (locales?: Intl.LocalesArgument, options?: Intl.NumberFormatOptions | undefined): string
          }
        }
      | undefined
  }[]
  // 患者ID
  id?: string
  // 患者名称
  name: string
  // 身份证号
  idCard: string
  // 0不默认  1默认
  defaultFlag?: 0 | 1
  // 0 女  1 男
  gender: 0 | 1
  // 性别文字
  genderValue?: string
  // 年龄
  age?: Number
}
export type PatientList = Patient[]
