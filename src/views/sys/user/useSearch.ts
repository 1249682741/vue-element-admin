import { readonly, ref } from 'vue'
import { ListParams } from '@/types/sys/user'

type SearchParams = {
  getListData(): void
  page: PageProps
}

export function useSearch({ getListData, page }: SearchParams) {
  const searchConfig = readonly([
    { label: '姓名', prop: 'name', type: 'text' },
    { label: '电话', prop: 'phone', type: 'text' },
  ])

  const searchData = ref<Partial<ListParams>>({})
  const searchDataClone = ref<Partial<ListParams>>({})

  const onSearch = () => {
    searchDataClone.value = searchData.value
    page.pageNum = 1
    getListData()
  }

  return {
    searchConfig,
    searchData,
    onSearch,
  }
}
