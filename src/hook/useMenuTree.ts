import { MenuStatus, ResponseCode } from '@/constant'
import { allMenu } from '@/api/sys/menu'
import { ElMessage } from 'element-plus'

export function useMenuTree() {
  async function getMenuTree(data?: Partial<Menu>) {
    let menuTree: Menu[] = []
    try {
      const result = await allMenu(data)
      if (result.code == ResponseCode.OK) {
        let menuData = result.data.filter(({ status }: Menu) => status == MenuStatus.normal)
        menuTree = genMenuTree(menuData)
      } else {
        ElMessage.error({ message: result.msg })
      }
    } catch (err) {
      console.log('getMenuTree err', err)
    } finally {
      return menuTree
    }
  }

  function genMenuTree(data: Menu[]) {
    // @ts-ignore
    let obj = data.reduce((obj, menu) => ((obj[menu.menuId] = menu), obj), {})
    let tree = []

    for (let menu of data) {
      if (menu.parentId == '-1') {
        tree.push(menu)
        continue
      }
      if (!obj[menu.parentId]) continue
      obj[menu.parentId].children = obj[menu.parentId]?.children ?? []
      obj[menu.parentId].children.push(menu)
    }
    return tree
  }

  return {
    getMenuTree,
  }
}
