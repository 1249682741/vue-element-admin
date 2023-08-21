import { ResponseCode } from '@/constant'
import { ElMessage } from 'element-plus'
import { Ref, reactive, readonly, ref } from 'vue'

interface UseTableProp {
  config: UseTableConfig
  // 是否分页
  isPaging?: boolean
  // 初始参数
  params?: object
  server: (param: any) => Promise<any>
  success?: (result: any) => void
}

interface UseTableConfig {
  search?: FormConfig[]
  table: { label: string; prop: string; width?: number }[]
}

const PageNum = 1
const PageSize = 10
const TOTAL = 0

export function useTable<T>({ config, isPaging = true, params, server, success }: UseTableProp) {
  const searchConfig = readonly(config.search ?? [])
  const searchData = ref<Partial<T>>({})
  const searchDataClone = ref<Partial<any>>({})

  /**
   * 查询
   */
  function onSearch() {
    searchDataClone.value = searchData.value
    page.pageNum = 1
    getListData()
  }

  const page = reactive<PageProps>({
    pageNum: PageNum,
    pageSize: PageSize,
    total: TOTAL,
  })

  const tableData = ref<T[]>([])
  const tableLoading = ref<boolean>(false)
  const tableConfig = readonly(config.table ?? [])

  /**
   * 若有初始值的话, 初始化参数
   */
  function initParam() {
    if (params) {
      searchDataClone.value = params
    }
  }

  initParam()

  /**
   * 请求列表信息
   */
  const getListData = async () => {
    try {
      tableLoading.value = true
      let pageParams = isPaging ? { pageNum: page.pageNum, pageSize: page.pageSize } : {}
      const result = await server({
        ...pageParams,
        ...searchDataClone.value,
      })
      if (result.code == ResponseCode.OK) {
        let listData = result.data
        if (isPaging) {
          let { pageNum, total, list } = result.data
          page.pageNum = pageNum
          page.total = total
          listData = list
        }
        if (typeof success == 'function') {
          success(result)
        } else {
          tableData.value = listData
        }
      } else {
        ElMessage.error({ message: result.msg })
      }
    } catch (err) {
      console.log(err)
    } finally {
      tableLoading.value = false
    }
  }

  const multipleSelection: Ref<T[]> = ref([])
  /**
   * 处理table选中事件
   */
  function handleSelectionChange(val: T[]) {
    multipleSelection.value = val
  }

  return {
    searchConfig,
    searchData,
    onSearch,
    page,
    tableData,
    tableLoading,
    tableConfig,
    getListData,
    multipleSelection,
    handleSelectionChange,
  }
}
