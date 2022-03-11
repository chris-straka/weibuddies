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
      return usePostFetch("/api/users/login", userCredentials);
    },
    signup(userCredentials: User) {
      return usePostFetch("/api/users/signup", userCredentials);
    },
    logout() {
      return fetch("/api/users/logout");
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
