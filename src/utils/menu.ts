import Layout from '@/layout/index.vue'
import SubLayout from '@/layout/sub.vue'
import ErrorLayout from '@/layout/error.vue'
import { MenuMode, MenuType } from '@/constant'

const RootParentId = '-1'
const ViewsModules = import.meta.glob('../views/**/*.vue')

export function handleUserMenuData(data: Menu[]) {
  let buttons: string[] = []
  let allMenu: Menu[] = []
  // 区分菜单类型
  for (let menu of data) {
    let { menuType, perms } = menu
    if (menuType == MenuType.button) {
      buttons.push(perms)
    } else if (menuType == MenuType.menu) {
      // 将全部菜单压入数组中， 并默认children为空
      allMenu.push({ ...menu, children: [] })
    }
  }
  // 排序
  sort(allMenu)
  // 生成菜单树
  let menuTree: Menu[] = []
  // @ts-ignore
  let menuObj: Record<string, Menu> = allMenu.reduce((obj, menu) => ((obj[menu.menuId!] = menu), obj), {})
  for (let menu of allMenu) {
    let { parentId } = menu
    if (parentId == RootParentId) {
      menuTree.push(menu)
      continue
    }
    if (!menuObj[parentId]) continue
    // @ts-ignore
    menuObj[parentId].children.push(menu)
  }

  let routes = createRoute(menuTree)
  return {
    buttons,
    routes,
  }
}

function sort(arr: Menu[]) {
  arr.sort((a, b) => parseInt(a.rank) - parseInt(b.rank))
}

/**
 * 生成路由树
 */
export function createRoute(menuTree: Menu[]): CustomRouteRecordRaw[] {
  let routes: CustomRouteRecordRaw = []
  // 排序
  menuTree = menuTree.sort((a: Menu, b: Menu) => parseInt(a.rank || '0') - parseInt(b.rank || '0'))
  for (let menu of menuTree) {
    let { menuName, url, children = [] } = menu
    let childrenRoute: CustomRouteRecordRaw[] = children.length ? createRoute(children) : []
    let route: CustomRouteRecordRaw = {
      path: createRoutePath(menu),
      name: url,
      meta: {
        title: menuName,
      },
      component: createRouteComponent(menu),
      children: childrenRoute,
    }
    routes.push(route)
  }
  return routes
}

/**
 * 根据返回的数据, 生成该菜单的path, 若是一级菜单， 需要拼接上 / 否则原样返回
 * @param menu
 * @returns
 */
function createRoutePath({ url, parentId }: Menu) {
  if (isRootParent(parentId)) {
    if (url.startsWith('/')) return url
    return `/${url}`
  }
  return url
}

/**
 * 根据返回的数据, 生成该菜单的componet
 * @param menu
 * @returns
 */
function createRouteComponent({ menuName, menuFile: path, menuMode }: Menu) {
  if (!path) return ErrorLayout
  if (menuMode == MenuMode.thirdParty) return path
  let match = path.match(/(\w+)\/([\w\/-]*).(\w+)/)
  if (match) {
    let [_, prefix, subFilePath] = match
    switch (prefix) {
      case 'layout':
        return subFilePath == 'index' ? Layout : SubLayout
      case 'views':
        return ViewsModules[`../${path}`] ? ViewsModules[`../${path}`] : ErrorLayout
    }
  }
  console.warn(`${menuName}配置的菜单资源不正确， 请检查代码或配置。\n 当前配置为 ${path}`)
  return ErrorLayout
}

function isRootParent(parentId: string) {
  return parentId == RootParentId
}
