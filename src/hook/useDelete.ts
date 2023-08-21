import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { ref, type Ref } from 'vue'
import { ResponseCode } from '@/constant'

interface DeleteHookParams {
  server: (param: any) => Promise<any>
  handleParams: (row: any, serverParams: Ref<any>) => any
  success: () => void
}

/**
 * @param params 接口需要的接口
 * @returns
 */
export function useDelete(params: DeleteHookParams) {
  const { server, handleParams, success } = params
  const serverParams = ref()

  function onDelete(row?: any) {
    if (!handleParams(row, serverParams)) {
      return
    }
    ElMessageBox.confirm('确定要删除该信息么？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      draggable: true,
    })
      .then(async () => {
        await deleteData()
      })
      .catch(() => {
        ElMessage.warning({
          message: '取消删除',
        })
      })
  }

  async function deleteData() {
    try {
      const result = await server(serverParams.value)
      if (result.code == ResponseCode.OK) {
        ElMessage.success({ message: result.msg })
        success()
      } else {
        ElMessage.error({ message: result.msg })
      }
    } catch (err) {
      console.log('deleteData err', err)
    }
  }

  return {
    onDelete,
  }
}
