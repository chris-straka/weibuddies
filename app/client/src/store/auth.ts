import { defineStore } from "pinia";
import { useFetch } from "@/composables/useFetch";

interface UserCredentials {
  email: string;
  password: string;
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      userId: null,
      userEmail: null,
      token: null,
      didAutoLogout: false,
    };
  },
  actions: {
    signin(credentials: UserCredentials) {
      const { data, error } = useFetch<unknown, Error>(
        "/api/users/login",
        "POST",
        credentials,
      );

      // this.userEmail = data.value.userEmail;
      // this.userId = data.value.userId;

      console.log(data);
      console.log(error);
    },
    signup(userCredentials: UserCredentials) {
      const { data, error } = useFetch("/api/users/signup", "POST", userCredentials);
      console.log(data);
      console.log(error);
    },
    signout() {
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
