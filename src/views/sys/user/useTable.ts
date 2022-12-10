import { reactive, readonly, ref } from 'vue'
import { list as fetchListData } from '@/api/sys/user'

export function useTable() {
  const page = reactive<PageProps>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  const tableData = ref([])
  const tableLoading = ref<boolean>(false)
  const tableConfig = readonly([
    { label: '姓名', prop: 'name' },
    { label: '电话', prop: 'phone' },
    { label: '角色', prop: 'roleName' },
  ])

  /**
   * 请求列表信息
   */
  const getListData = async () => {
    try {
      tableLoading.value = true
      const result = await fetchListData({
        pageNum: page.pageNum,
        pageSize: page.pageSize,
      })
      tableData.value = result.list
      page.pageNum = result.pageNum
      page.pageSize = result.pageSize
      page.total = result.total
    } catch (err) {
    } finally {
      tableLoading.value = false
    }
  }

  return {
    page,
    tableData,
    tableLoading,
    tableConfig,
    getListData,
  }
}
