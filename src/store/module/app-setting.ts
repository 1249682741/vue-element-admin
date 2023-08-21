import { defineStore } from 'pinia'

type AppSettingState = {
  isMenuCollapse: boolean
}

export const useAppSettingStore = defineStore({
  id: 'appSetting',
  state(): AppSettingState {
    return {
      isMenuCollapse: false,
    }
  },
  actions: {
    toggleMenuStatus() {
      this.isMenuCollapse = !this.isMenuCollapse
    },
  },
  persist: true,
})
