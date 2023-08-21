import axios from 'axios'
import { useUserStore } from '@/store'
import { ResponseCode } from '@/constant'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
})

service.interceptors.request.use(
  (config: any) => {
    const userStore = useUserStore()
    config.headers['Authorization'] = userStore.token ? userStore.token : undefined
    return config
  },
  (error) => {
    console.log('interceptors.request error', error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status == ResponseCode.OK) {
      let { code } = response.data
      if (code == ResponseCode.PermanentlyMoved) {
        goToLoginPage()
        return
      }
      return response.data
    }
    return response
  },
  (error) => {
    console.log('error', error)
    if (!Object.prototype.hasOwnProperty.call(error, 'response')) {
      ElMessage.error({ message: error.message })
      return
    }
    let { status, data } = error.response
    if ([ResponseCode.Unauthorized, ResponseCode.PermanentlyMoved, ResponseCode.ServiceUnavailable].includes(status)) {
      goToLoginPage()
      return
    }
    ElMessage.error({ message: data.msg })
    return Promise.reject(data)
  }
)

function goToLoginPage() {
  const userStore = useUserStore()
  userStore.logout()
  location.hash = '#/login'
  location.reload()
}

export default service
