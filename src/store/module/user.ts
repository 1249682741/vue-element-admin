import { defineStore } from 'pinia'

type UserStore = {
  userName: string
}

export const useUserStore = defineStore({
  id: 'user',
  state(): UserStore {
    return {
      userName: 'pikachu',
    }
  },
  actions: {
    login() {},
    logout() {},
  },
})
