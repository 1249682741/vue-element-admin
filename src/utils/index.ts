export const resolve = (parentPath: string, childrenPath: string): string => {
  if (!parentPath.endsWith('/')) {
    parentPath += '/'
  }

  if (childrenPath.startsWith('/')) {
    childrenPath = childrenPath.substring(1)
  }

  return parentPath + childrenPath
}

/**
 * 将一个对象转换成数组
 * @param obj 需要转换的对象
 * @param lableKey 对象的key指对应的名称
 * @param valueKey 对象的value指对应的名称
 */
export function formatObject2Array(obj: Object, labelKey = 'label', valueKey = 'value') {
  return Object.entries(obj).map(([k, v]) => ({ [labelKey]: v, [valueKey]: k }))
}

/**
 * 将一个数组转换成对象
 * @param arr 需要转换的数组
 * @param labelKey 将来要以数组中哪个key, 作为对象的key
 * @param valueKey 将来要以数组中哪个key，作为对象的value
 */
export function formatArray2Object(arr: any[], labelKey = 'value', valueKey = 'label') {
  return arr.reduce((obj: any, item) => ((obj[item[labelKey]] = item[valueKey]), obj), {})
}

/**
 * 判断空对象或者对象值为空字符串|null
 */
export function isObjectValueEmpty(obj: Object) {
  let arr = Object.entries(obj)
  if (arr.length) {
    return arr.every(([_, value]) => value == '' || value == null)
  }
  return true
}
