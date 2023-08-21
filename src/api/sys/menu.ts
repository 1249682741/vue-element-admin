import request from '@/utils/request'

export const list = (data: Partial<withPage<Menu>> = {}) =>
  request({
    url: '/menu/list',
    method: 'post',
    data,
  })

//新增 | 保存
export const save = (data: Menu) => {
  let url = data.menuId ? '/menu/update' : '/menu/add'
  return request({
    url,
    method: 'post',
    data,
  })
}

export const del = (data: Pick<Menu, 'menuId'>) =>
  request({
    url: `/menu/delete`,
    method: 'post',
    data,
  })

export const allMenu = (data: Partial<Menu> = {}) =>
  request({
    url: '/menu/allMenu',
    method: 'post',
    data,
  })
