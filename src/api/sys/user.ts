import request from '@/utils/request'
import { CancelTokenSource } from 'axios'

export const list = (data: Partial<User> = {}) =>
  request({
    url: '/sysUser/list',
    method: 'post',
    data,
  })

export const save = (data: User) => {
  let url = data.userId ? '/sysUser/update' : '/sysUser/add'
  return request({
    url,
    method: 'post',
    data,
  })
}

export const del = (data: Pick<User, 'userId'>) =>
  request({
    url: '/sysUser/delete',
    method: 'post',
    data,
  })

export const fetchAuditList = (data: Partial<User>, cancelTokenSource?: CancelTokenSource) => {
  return request({
    url: '/sysUser/auditList',
    method: 'post',
    data,
    cancelToken: cancelTokenSource?.token,
  })
}

export const fetchUserDeptRoleList = (data: Pick<User, 'userId'>) =>
  request({
    url: '/sysUser/userDeptRolelist',
    method: 'post',
    data,
  })
