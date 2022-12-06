import { reactive, readonly, ref } from 'vue'
import { list as fetchListData } from '@/api/sys/menu'

export function useTable() {
  const page = reactive<PageProps>({
    pageNum: 1,
    pageSize: 10,
    total: 0,
  })

  const tableData = ref([])
  const tableLoading = ref<boolean>(false)
  const tableConfig = readonly([
    { label: 'id', prop: 'id' },
    { label: '名称', prop: 'name' },
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
    } catch (err) {
    } finally {
      tableLoading.value = false
    }
  }

  const load = (row: any, treeNode: unknown, resolve: (data: any[]) => void) => {
    resolve([{ id: '3-1', name: '3-1', hasChildren: false }])
  }

  return {
    page,
    tableData,
    tableLoading,
    tableConfig,
    getListData,
    load,
  }
}
