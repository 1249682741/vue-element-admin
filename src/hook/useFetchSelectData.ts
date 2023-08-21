import { ResponseCode } from '@/constant'
import { formatArray2Object } from '@/utils'

/**
 * 请求下拉数据
 * @param useFetchSelectDataParam
 * server:请求的接口
 * labelKey:将来要以数组中哪个key 作为对象的key
 * valueKey 将来要以数组中哪个key，作为对象的value
 * @returns object opt, obj
 */
export function useFetchSelectData<T>(useFetchSelectDataParam: Param<T>) {
  async function fetchSelectData({ server, labelKey, valueKey }: Param<T>) {
    let opt: withSelectOptions<T>[] = []
    let obj: any = {}
    try {
      const result = await server()
      if (result.code == ResponseCode.OK) {
        opt = result.data.map((item: any) => ({ ...item, label: item[valueKey], value: item[labelKey] }))
        obj = formatArray2Object(opt, labelKey as string, valueKey as string)
      }
    } catch (err) {
      console.log('useFetchSelect err', err)
    } finally {
      return {
        opt,
        obj,
      }
    }
  }
  return fetchSelectData(useFetchSelectDataParam)
}

interface Param<T> {
  server: () => Promise<any>
  labelKey: keyof T
  valueKey: keyof T
}
