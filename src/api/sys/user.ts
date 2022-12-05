import request from '@/utils/request'
import { ListParams } from '@/types/sys/user'

export const list = (data: Partial<withPage<ListParams>> = {}) =>
  request({
    url: '/user',
    method: 'post',
    data,
  })
