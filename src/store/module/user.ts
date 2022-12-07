import { defineStore } from 'pinia'
type UserStore = {
  userName: string
  token: string
}

export const useUserStore = defineStore({
  id: 'user',
  state(): UserStore {
    return {
      userName: 'pikachu',
      token: '',
    }
  },
  actions: {
    login() {},
    logout() {},
  },
})
