declare interface Auth {
  loginType: string
  mobile: string
  verCode: string
  id: string
  code: string
  codeKey: string
}

declare interface LoginRespose {
  user: LoginUserInfo
  token: string
}

declare interface LoginUserInfo {
  pageNum: number
  pageSize: number
  pageFlag?: any
  userId: string
  userName: string
  userType: string
  email: string
  mobile: string
  status?: any
  modificaDate: string
  createDate: string
  userDeptRoles?: any
  deptId: string
  deptLevel: string
  deptName?: any
  deptIds: string[]
  userIds?: any
  merchantIds?: any
  roles?: any
  password?: any
  schoolId: string
}

declare interface ChangePassword {
  codeType: string
  newPassword: string
  newPassword2: string | undefined
  phone: string
  tracId: string
  userType: string
  verifyCode: string
}
