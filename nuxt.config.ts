// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
    "@pinia/nuxt",
    "nuxt-rating",
    "nuxt-icon",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
  ],
  colorMode: {
    classSuffix: "",
  },
  apollo: {
    autoImports: true,
    authType: "Bearer",
    authHeader: "Authorization",
    tokenStorage: "cookie",
    proxyCookies: true,
    clients: {
      default: {
        httpEndpoint: "https://magnetic-liger-77.hasura.app/v1/graphql",
      },
      authClient: {
        httpEndpoint: "https://magnetic-liger-77.hasura.app/v1/graphql",
        tokenName: "auth_token",
      },
    },
  },
  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css",
        },
      ],
    },
  },
  image: {
    // Options
    inject: true,
    quality: 80,
  },
});
