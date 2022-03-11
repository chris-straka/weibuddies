import { defineStore } from "pinia";
import { usePostFetch } from "@/composables/usePostFetch";

interface User {
  email: string;
  password: string;
}

export const authStore = defineStore("auth", {
  state: () => {
    return {
      userId: null,
      userEmail: null,
      token: null,
      didAutoLogout: false,
    };
  },
  actions: {
    login(userCredentials: User) {
      const { data, error } = usePostFetch("/api/users/login", userCredentials);
      if (data) this.token = data.value
    },
    signup(userCredentials: User) {
      const { data, error } = usePostFetch("/api/users/signup", userCredentials);
    },
    async logout() {
      fetch("/api/users/logout");
    },
  },
  getters: {
    userId(state) {
      return state.userId;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      return !!state.token;
    },
    didAutoLogout(state) {
      return state.didAutoLogout;
    },
  },
});
