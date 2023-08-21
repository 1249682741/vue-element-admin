import { ElMessage } from 'element-plus'
export const exportFileWithTips = (result: Blob, name: string) => {
  const self = this
  if (result.type == 'application/json') {
    const fileReader = new FileReader()
    fileReader.readAsText(result, 'utf-8')
    fileReader.onload = function () {
      const jsonResult = JSON.parse(fileReader.result as string)
      ElMessage.error({ message: jsonResult.msg })
    }
  } else {
    exportFile(result, name)
  }
}

/**
 * 导出文件的
 * @param blob
 * @param name 接受文件名
 */
export const exportFile = (blob: Blob, name: string) => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(blob)
  fileReader.onload = (event: any) => {
    const link = event.target.result.toString()
    createLinkAutoClick(name, link)
  }
}

export function createLinkAutoClick(name: string, link: string) {
  let a = document.createElement('a')
  a.download = name
  a.href = link
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}
