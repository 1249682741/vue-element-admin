import request from '@/utils/request'
import { ListParams } from '@/types/sys/user'

export const list = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/user',
    method: 'post',
    data,
  })
export const add = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/user',
    method: 'post',
    data,
  })
export const edit = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/user',
    method: 'post',
    data,
  })
export const del = (id: string) =>
  request({
    url: '/user',
    method: 'post',
    data: { id },
  })
