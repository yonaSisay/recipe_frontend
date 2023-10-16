<script setup>
import signup from "~/graphql/auth/signup.gql";
import { useAuthStore } from "~/stores/auth";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";
import * as yup from "yup";

const authStore = useAuthStore();

const { mutate, onDone, loading, onError } = authentication(signup);

const { defineInputBinds, handleSubmit, errors, setFieldError } = useForm({
  validationSchema: yup.object({
    first_name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation is required"),
  }),
});

const first_name = defineInputBinds("first_name");
const last_name = defineInputBinds("last_name");
const email = defineInputBinds("email");
const password = defineInputBinds("password");
const passwordConfirm = defineInputBinds("passwordConfirm");

const onSubmit = handleSubmit((values, { setFieldError }) => {
  const input = {
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: values.password,
  };
  mutate(input);
});

onDone((result) => {
  toast.success("user signedup", {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
  Cookies.set("auth_token", result.data.signup.token, { expires: 7 });

  authStore.setToken(result.data.signup.token);
  authStore.setId(result.data.signup.id);
  authStore.setUser(result.data.signup.id);
  authStore.setRole(result.data.signup.role);
  navigateTo("/");
});
onError((error) => {
  toast.error("Something went wrong", {
    transition: toast.TRANSITIONS.FLIP,
    position: toast.POSITION.TOP_RIGHT,
  });
});
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <form
      @submit.prevent="onSubmit"
      class="flex flex-col px-4 py-4 bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 w-[400px] h-auto rounded-2xl text-white shadow-2xl -rotate-3 hover:rotate-0 hover:scale-110 hover:-translate-y-1 duration-500"
    >
      <h2 class="mx-auto text-3xl font-medium">Sign up</h2>
      <div class="mt-4 w-full">
        <span class="text-white">{{ errors.first_name }}</span>
        <input
          class="w-full px-[35px] py-[10px] text-gray-800 rounded-lg outline-none shadow-xl"
          type="text"
          placeholder="Enter your first name ..."
          :class="{ 'text-red-500': errors.first_name }"
          v-bind="first_name"
        />
      </div>
      <div class="mt-4 w-full">
        <span class="text-white">{{ errors.last_name }}</span>
        <input
          class="w-full px-[35px] py-[10px] text-gray-800 rounded-lg outline-none shadow-xl"
          type="text"
          :class="{ 'text-red-500': errors.last_name }"
          placeholder="Enter your last name ..."
          v-bind="last_name"
        />
      </div>
      <div class="mt-4 w-full">
        <span class="text-white">{{ errors.email }}</span>
        <input
          class="w-full px-[35px] py-[10px] text-gray-800 rounded-lg outline-none shadow-xl"
          type="email"
          placeholder="Enter your email ..."
          :class="{ 'text-red-500': errors.email }"
          v-bind="email"
        />
      </div>
      <div class="mt-4 w-full">
        <span class="text-white">{{ errors.password }}</span>
        <input
          class="w-full px-[35px] py-[10px] rounded-lg text-gray-800 outline-none shadow-xl"
          type="password"
          placeholder="Enter password ..."
          :class="{ 'text-red-500': errors.password }"
          v-bind="password"
        />
      </div>
      <div class="mt-4 w-full">
        <span class="text-white">{{ errors.passwordConfirm }}</span>
        <input
          class="w-full px-[35px] py-[10px] rounded-lg text-gray-800 outline-none shadow-xl"
          type="password"
          :class="{ 'text-red-500': errors.passwordConfirm }"
          placeholder="Confirm password ..."
          v-bind="passwordConfirm"
        />
      </div>
      <button
        :class="{ 'opacity-50': loading }"
        :disabled="loading"
        class="mx-auto mt-8 bg-white text-gray-800 text-lg font-medium py-2 px-12 mt-6 rounded-lg shadow-md hover:scale-100 hover:-translate-y-1 duration-500"
      >
        {{ loading ? "Signing Up" : "Signup" }}
      </button>
      <span class="w-full mt-2">
        have an account?
        <NuxtLink class="underline" to="/auth/login">Login</NuxtLink>
      </span>
    </form>
  </div>
</template>

<style></style>
