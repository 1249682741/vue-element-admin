import axios from 'axios'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
})

service.interceptors.request.use(
  (config: any) => {
    if (userStore.token) {
      config.headers['Authorization'] = userStore.token
    }
    return config
  },
  (error) => {
    console.log('interceptors.request error', error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status == 200) {
      return response.data
    }
    console.log('response', response)
    return response
  },
  (error) => {
    console.log('error', error)
  }
)

export default service
