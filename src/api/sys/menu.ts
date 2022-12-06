import request from '@/utils/request'
import { ListParams } from '@/types/sys/menu'

export const list = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/menu',
    method: 'post',
    data,
  })
export const add = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/menu',
    method: 'post',
    data,
  })
export const edit = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/menu',
    method: 'post',
    data,
  })
export const del = (id: string) =>
  request({
    url: '/menu',
    method: 'post',
    data: { id },
  })
