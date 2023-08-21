import { list as fetchDictList } from '@/api/sys/dict'
import { ResponseCode } from '@/constant'
import { useBaseInfoStore } from '@/store'
import { ElMessage } from 'element-plus'

/**
 *
 * @param code 字典的code
 * @returns {arr, obj}
 */
export const useDictionary = async (code: string) => {
  const useBaseInfo = useBaseInfoStore()

  let dictCache = useBaseInfo.dict[code]

  if (dictCache) {
    return dictCache
  } else {
    return await getDictFromDict()
  }

  /**
   * 根据来源查询字典
   * @returns
   */
  async function getDictFromDict() {
    let arr: selectOptions[] = []
    let obj: any = {}
    const DictResult = { arr, obj }
    try {
      const result = await fetchDictList({ dictTypeCode: code })
      if (result.code == ResponseCode.OK) {
        const { list } = result.data
        if (list.length > 0) {
          for (let item of list) {
            let { dictName, dictCode } = item
            obj[dictCode] = dictName
            arr.push({
              value: dictCode,
              label: dictName,
            })
          }
          useBaseInfo.addDictArr(code, arr, obj)
        }
      } else if (result.code == ResponseCode.Error) {
        ElMessage.error({ message: result.msg })
      }
    } catch (err) {
      console.log('getDictFromDict err', err)
    } finally {
      return DictResult
    }
  }
}
