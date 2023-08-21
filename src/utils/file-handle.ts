export default class FileHandle {
  editorKeys: string[] = []
  keys: string[] = []
  oldFileUrls: string[] = []

  constructor(keys: string[] = []) {
    this.keys = keys
  }

  /**
   * 设置需要上传图片的key
   * @param keys
   */
  setKeys(keys: string[]) {
    this.keys = keys
  }

  /**
   * 设置需要上传图片的key
   * @param keys
   */
  setEditorKeys(keys: string[]) {
    this.editorKeys = keys
  }

  /**
   * 重置详情获取的图片地址数组
   */
  resetOldFileUrls() {
    this.oldFileUrls = []
  }

  /**
   * 根据详情数据、keys, 记录详情图片地址数组
   * @param data 详情数据
   */
  setOldFileUrls(data: any) {
    this.oldFileUrls = this.collegeFileUrls(data)
  }

  /**
   * 根据编辑的数据、keys, 得到新的图片地址数组。 在与详情图片地址数组比对， 知道哪些数据是弃用、哪些是启用
   * @param data 新的数据
   * @returns object {discardUrls, usefulUrls}
   */
  compare(data: any) {
    let newFileUrls = this.collegeFileUrls(data)
    let discardUrls = this.oldFileUrls.filter((i) => !newFileUrls.includes(i))
    return {
      discardUrls, //弃用的文件地址
      usefulUrls: newFileUrls, // 新生效的文件地址
    }
  }

  private collegeFileUrls(data: any) {
    let keysFileUrls = this.getFileUrl(data)
    let editorKeysFileUrls = this.getEditorFileUrl(data)
    return [...keysFileUrls, ...editorKeysFileUrls]
  }

  /**
   * 根据key 过滤空字符串、null
   * @param data
   * @returns
   */
  private getFileUrl(data: any): string[] {
    if (!Array.isArray(this.keys)) {
      console.warn('请先设置keys')
    }
    let fileUrls: string[] = []
    for (let key of this.keys) {
      let val = data[key]
      if (this.isEmpty(val)) {
        continue
      }
      if (Array.isArray(val)) {
        val.forEach((v) => !this.isEmpty(v) && fileUrls.push(v))
        continue
      }
      fileUrls.push(val)
    }
    return fileUrls
  }

  private isEmpty(val: string | null | undefined) {
    return val == null || val == undefined || val == ''
  }

  /**
   * 根据editorKeys 字符串中<img>里面的src地址
   */
  private getEditorFileUrl(data: any): string[] {
    let fileUrls: string[] = []
    for (let key of this.editorKeys) {
      let content = data[key]
      if (this.isEmpty(content)) {
        continue
      }
      let imgArr = content.match(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi)
      if (imgArr && imgArr.length) {
        imgArr.forEach((src: string) => {
          let matchResult = src.match(/src=[\'\"]?([^\'\"]*)[\'\"]?/i)
          if (matchResult?.length) {
            fileUrls.push(matchResult[1])
          }
        })
      }
    }
    return fileUrls
  }
}
