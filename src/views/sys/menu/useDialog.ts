import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import { add, edit, del } from '@/api/sys/menu'

type DialogType = 'add' | 'edit'

export function useDialog() {
  const dialogType = ref<DialogType>('add')
  const dialogTitle = ref<string>('')
  const dialogVisible = ref<boolean>(false)
  const dialogData = ref({})
  const handleRowData = ref()

  const showDialog = (type: DialogType, row?: any) => {
    let obj = {
      add: '新增',
      edit: '编辑',
    }
    dialogType.value = type
    dialogTitle.value = obj[type]
    dialogVisible.value = true
  }

  function onDelete(row?: any) {
    handleRowData.value = row
    ElMessageBox.confirm('确定要删除该信息么？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '删除',
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

  async function submit() {
    console.log('submit', dialogData.value)
    let method = dialogType.value == 'add' ? add : edit
    try {
      const reuslt = await method(dialogData.value)
    } catch (err) {
      console.log(`submit ${dialogType.value} err`, err)
    }
  }

  async function deleteData() {
    try {
      const result = await del(handleRowData.value.id)
      ElMessage.success({
        message: result.msg,
      })
    } catch (err) {
      console.log('deleteData err', err)
    }
  }

  return {
    dialogTitle,
    dialogVisible,
    dialogData,
    showDialog,
    submit,
    onDelete,
  }
}
