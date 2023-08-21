import request from '@/utils/request'

export const upload = (data: FormData) =>
  request({
    url: '/fastDfsUtil/upload',
    method: 'post',
    data,
  })
