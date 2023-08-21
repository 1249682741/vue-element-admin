// 文件的ip地址+端口
export const BaseFileUrl = import.meta.env.VITE_FILE_URL

export enum ResponseCode {
  OK = 200,
  PermanentlyMoved = 301,
  Error = 400,
  Unauthorized = 401,
  Forbidden = 403,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum DialogTitle {
  add = '新增',
  edit = '编辑',
  read = '查看',
  audit = '审核',
}

// 菜单状态
export enum MenuStatus {
  normal = '00',
  stop = '01',
}

// 菜单类型
export enum MenuType {
  menu = '00',
  button = '01',
}

// 菜单打开方式
export enum MenuMode {
  thirdParty = '0',
  own = '1',
}

// 平台类型
export enum PlatformType {
  manage = '00',
  h5 = '01',
}

export enum UserType {
  SuperAdmin = '00',
  SchoolAdmin = '01',
}

// export const RootDeptParentId = '-1'
export const RootDeptId = '0'

export enum DeptTypeLevel {
  root = '1',
  school = '2',
  college = '3',
  major = '4',
}

export const CardTypes = {
  '1010': '居民身份证',
  '1051': '中国护照',
  '1052': '外国护照',
  '1140': '香港身份证',
  '1150': '澳门居民身份证',
  '1160': '台湾居民身份证',
  '8888': '其他'
}
