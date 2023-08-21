import request from '@/utils/request'
import axios from 'axios'

export const login = (data: Omit<Auth, 'code' | 'codeKey'>) =>
  request({
    url: '/systemLogin/login',
    method: 'post',
    data,
  })

export const logout = () =>
  request({
    url: '/systemLogin/loginLogout',
    method: 'post',
  })

export const fetchMenuRoutes = () =>
  request({
    url: `/systemLogin/manageAutMenu`,
    method: 'post',
  })

export const fetchImgCode = () =>
  axios({
    url: import.meta.env.VITE_BASE_URL + `/getVerify`,
    method: 'post',
    responseType: 'arraybuffer',
  })

export const fetchVerifyCode = (data: object) =>
  request({
    url: `/systemLogin/sendSms`,
    method: 'post',
    data,
  })
