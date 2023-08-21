import { defineStore } from 'pinia'

export const useBaseInfoStore = defineStore({
  id: 'base-info',
  state(): BaseInfoStore {
    return {
      dict: {},
    }
  },
  actions: {
    addDictArr(code: string, arr: selectOptions[], obj: any) {
      this.dict[code] = { arr, obj }
    },
    clear() {
      this.dict = {}
    },
  },
  persist: true,
})

interface BaseInfoStore {
  dict: Record<string, Dict>
}

interface Dict {
  arr: selectOptions[]
  obj: Record<string, string>
}
