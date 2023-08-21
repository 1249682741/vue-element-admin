declare interface User {
  deptId?: string
  deptIds?: string[]
  deptLevel?: string
  deptName?: string
  deptRoleIds?: string[]
  roleIds?: string[]
  email?: string
  mobile: string
  schoolId?: string
  status: string
  userId?: string
  userName: string
  userType: string
  isContact: string
  contactInformation: string
  officeAddress: string
  position: string

  collegeId?: string
  major?: string
  campusUserId?: string
  rank?: string
}

// 字典
declare interface DictionaryType {
  code: string
  name: string
  id?: string
  remark: string
  status?: string
}
declare interface Dictionary {
  dictCode: string
  dictLevel: string
  dictName: string
  dictTypeCode?: string
  dictTypeId: string
  dictTypeName: string
  rank: string
  remark: string
  status: string
  dictId?: string
}

// 菜单
declare interface Menu {
  menuId?: string
  parentId: string
  parentName?: string
  menuName: string
  url: string
  perms: string
  menuFile: string
  menuMode: string
  menuType: string
  status: string
  rank: string
  remark: string
  platformType: string

  hasChildren?: boolean
  children?: Menu[]
}

// 角色
declare interface Role {
  roleName: string
  roleId?: string
  schoolId: string
  status: string
  remark: string
  id?: string
  menuIds?: string[]
}

// 部门
declare interface Dept {
  deptLevel: string
  deptName: string
  deptType: string
  hasChild?: string
  notDeptType?: string
  parentId: string
  parentName: string
  roles?: Role[]
  schoolId?: string
  remark: string
  status: string
  rank: string
  deptId?: string

  children?: Dept[]
  strRoleIds?: string[]
}

declare interface SchoolInfo {
  numberOfGraduates: string
  numberOfNewStudents: string
  platformName: string
  schoolAddress: string
  schoolAnniversaryDate: string
  schoolCode: string
  schoolIcon: string
  schoolIntroduction: string
  schoolLevel: string
  schoolMotto: string
  schoolName: string
  schoolOfficialWebsite: string
  schoolSong: string
  schoolId?: string
}

declare interface SchoolSetting {
  schoolId: string
  showTitle: string
}

declare interface AuditConfiguration {
  auditJumpMode: string
  correspondingFunction: string
  department: string
  departmentName?: string
  // editor: string
  firstLevelApprover: string
  id?: string
  majorOfAffiliation: string
  majorOfAffiliationName?: string
  name: string
  preQualification: string
  schoolId?: string
  secondLevelApprover: string
  workflowStatus: string

  firstLevelApproverArr?: string[]
  secondLevelApproverArr?: string[]
}
