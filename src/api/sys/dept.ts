import request from '@/utils/request'
import { CancelToken, CancelTokenSource } from 'axios'

export const list = (data: Partial<Dept> = {}, cancelTokenSource?: CancelTokenSource) =>
  request({
    url: '/dept/list',
    method: 'post',
    data,
    cancelToken: cancelTokenSource?.token,
  })

export const save = (data: Dept) => {
  let url = data.deptId ? '/dept/update' : '/dept/add'
  return request({
    url,
    method: 'post',
    data,
  })
}
export const del = (data: Pick<Dept, 'deptId'>) =>
  request({
    url: '/dept/delete',
    method: 'post',
    data,
  })

export const fetchDeptRole = (data: { deptId: string; roleStatus?: string }, cancelTokenSource?: CancelTokenSource) =>
  request({
    url: '/dept/getDeptRole',
    method: 'post',
    data,
    cancelToken: cancelTokenSource?.token,
  })
export const fetchMyDeptList = (data: object = {}) =>
  request({
    url: '/dept/myDeptList',
    method: 'post',
    data,
  })
export const parentList = (data: object) =>
  request({
    url: '/dept/parentList',
    method: 'post',
    data,
  })
