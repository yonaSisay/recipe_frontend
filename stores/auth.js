// store/auth.js
import { defineStore } from "pinia";
import Cookies from "js-cookie";
const userToken = Cookies.get("auth_token");
import jwt_decode from "jwt-decode";
import getUser from "@/graphql/query/getSingleUser.gql";
import authQuery from "@/composables/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    id: null,
    role: null,
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
  },

  actions: {
    setToken(token) {
      this.token = token;
    },

    setRole(role) {
      this.role = role;
    },
    setId(id) {
      this.id = id;
    },
    logout() {
      this.token = null;
      this.user = null;
      this.id = null;
      Cookies.remove("auth_token");
    },
    setUser(id) {
      const { onResult, loading, onError, refetch } = authQuery(getUser, {
        id,
      });
      onResult((result) => {
        this.user = { ...result.data.users_by_pk };
      });
      onError((error) => {
        console.log(error);
      });
    },
    autoLogin() {
      let decoded = {};
      if (userToken) {
        decoded = jwt_decode(userToken);
        if (decoded.exp * 1000 > Date.now()) {
          const decoded = jwt_decode(userToken);
          const id =
            decoded["https://hasura.io/jwt/claims"]["x-hasura-user-id"];
          this.setId(id);
          this.setUser(id);
          this.setToken(userToken);
        }
      }
    },
  },
});
