import request from '@/utils/request'

export const list = (data: Partial<withPage<Role>> = {}) =>
  request({
    url: '/role/roleList',
    method: 'post',
    data,
  })

export const save = (data: Role) => {
  let url = data.roleId ? '/role/update' : '/role/add'
  return request({
    url,
    method: 'post',
    data,
  })
}

export const del = (data: Pick<Role, 'roleId'>) =>
  request({
    url: '/role/delete',
    method: 'post',
    data,
  })

export const fetchRoleMenu = (data: Pick<Role, 'roleId'>) =>
  request({
    url: '/role/getRoleMenu',
    method: 'post',
    data,
  })
export const fetchRoleList = (data: Pick<Role, 'roleId'>) =>
  request({
    url: '/role/roleList',
    method: 'post',
    data,
  })
