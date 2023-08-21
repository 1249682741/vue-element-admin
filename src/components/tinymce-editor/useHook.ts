import { upload } from '@/api/common'
import { ResponseCode, BaseFileUrl } from '@/constant'

export const uploadImage = (blobInfo: any, progress: any) =>
  new Promise(async (resolve, reject) => {
    let file = blobInfo.blob()
    if (file.size / 1024 / 1024 > 10) {
      reject({ message: '上传失败，图片大小请控制在 10M 以内', remove: true })
      return
    } else {
      let formData = new FormData()
      formData.append('file', file)
      const result = await upload(formData)
      if (result.code == ResponseCode.OK) {
        resolve(BaseFileUrl + result.data.uploadUrl)
        // resolve(result.data.url)
      } else {
        reject('HTTP Error: 上传失败' + result.msg)
        return
      }
    }
  })
