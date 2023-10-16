<script setup>
import { useAuthStore } from "~/stores/auth";
const showMobileMenu = ref(false);

const toggleMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const authStore = useAuthStore();
</script>
<template>
  <div class="sticky top-0 left-0 backdrop-blur-md z-50 shadow-md">
    <div class="w-full flex justify-between items-center py-4 px-4 lg:px-8">
      <!-- Hamburger Menu Button -->
      <button
        @click="toggleMenu"
        class="lg:hidden text-2xl font-bold text-orange-500"
      >
        ☰
      </button>
      <div class="lg:hidden flex items-center pl-2 gap-x-2">
        <User />

        <NuxtLink v-if="authStore.isAuthenticated" to="/user">
          <img
            class="w-12 h-12 rounded-full object-cover object-center"
            :src="authStore?.user?.image_url"
            alt="avatar"
          />
        </NuxtLink>
      </div>
      <div class="hidden lg:flex text-2xl font-bold">
        <ul class="ml-4 flex gap-x-10 my-auto">
          <li class="font-medium text-xl">
            <NuxtLink exact-active-class="text-orange-500" to="/"
              >Home</NuxtLink
            >
          </li>
          <li class="font-medium text-xl">
            <NuxtLink exact-active-class="text-orange-500" to="/recipe"
              >Recipe</NuxtLink
            >
          </li>
          <li class="font-medium text-xl">
            <NuxtLink exact-active-class="text-orange-500" to="/about"
              >About</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div class="hidden lg:flex items-center gap-x-2">
        <User />
        <NuxtLink
          to="/auth/signup"
          v-if="!authStore.isAuthenticated"
          class="bg-orange-400 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50"
          >Sign up</NuxtLink
        >

        <NuxtLink v-if="authStore.isAuthenticated" to="/user">
          <img
            class="w-12 h-12 rounded-full shadow-lg"
            :src="authStore?.user?.image_url"
            alt="avatar"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Navigation Menu (Initially Hidden) -->
    <div v-if="showMobileMenu" class="lg:hidden">
      <ul class="p-4 text-center">
        <li class="font-medium text-xl mb-4">
          <NuxtLink
            @click="toggleMenu"
            exact-active-class="text-orange-500"
            to="/"
            >Home</NuxtLink
          >
        </li>
        <li class="font-medium text-xl mb-4">
          <NuxtLink
            @click="toggleMenu"
            exact-active-class="text-orange-500"
            to="/recipe"
            >Recipe</NuxtLink
          >
        </li>
        <li class="font-medium text-xl mb-4">
          <NuxtLink
            @click="toggleMenu"
            exact-active-class="text-orange-500"
            to="/about"
            >About</NuxtLink
          >
        </li>
        <li class="font-medium text-xl mb-4" v-if="!authStore.isAuthenticated">
          <NuxtLink @click="toggleMenu" to="/auth/signup">Sign up</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
