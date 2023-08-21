import { ResponseCode } from '@/constant'
import { ref } from 'vue'
import type Node from 'element-plus/es/components/tree/src/model/node'
import { list as fetchListData } from '@/api/sys/dept'
import { useUserStore } from '@/store'

export function useTree() {
  const userStore = useUserStore()
  const RootParentId = userStore.topDept
  const isFirstClick = ref(true)

  const treeProps = {
    label: 'deptName',
    isLeaf: (data: any, node: Node) => {
      return (data as Dept).hasChild == '0'
    },
  }
  const treeLoading = ref<boolean>(false)

  type OpenTreeNode = Record<
    string,
    {
      node: Node
      resolve: (data: Dept[]) => void
    }
  >

  // 缓存当前展开的节点。 方便更新子树
  const openTreeNodeObject: OpenTreeNode = {}
  async function load(node: Node, resolve: (data: Dept[]) => void) {
    treeLoading.value = true
    let { deptId = RootParentId } = node.data as Dept
    let fetchParams: Partial<Dept> = { parentId: deptId }
    if (isFirstClick.value) {
      fetchParams = { deptId }
      isFirstClick.value = false
    }
    const result = await fetchListData(fetchParams)
    if (result.code == ResponseCode.OK) {
      let data = result.data.list
      node.data.childrenNum = data.length
      deptId && (openTreeNodeObject[deptId] = { node, resolve })
      resolve(data)
    }
    treeLoading.value = false
  }

  function reset() {
    isFirstClick.value = true
  }

  return {
    treeProps,
    treeLoading,
    reset,
    load,
  }
}
