import { defineStore } from "pinia";

export const authStore = defineStore("auth", {
  state: () => {
    return {
      userId: null,
      userEmail: null,
      token: null,
      didAutoLogout: false
    }
  },
  actions: {
    async login() {},
    async signup() {},
    logout() {},
  },
  getters: {
    userId(state) {
      return state.userId
    },
    token(state) {
      return state.token
    },
    isAuthenticated(state) {
      return !!state.token
    },
    didAutoLogout(state) {
      return state.didAutoLogout
    }
  }
});
