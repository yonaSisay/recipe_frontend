<script setup>
import { useAuthStore } from "~/stores/auth";
const showMobileMenu = ref(false);

const colorMode = useColorMode();
console.log("color", colorMode.preference);

const toggleMenu = () => {
  showMobileMenu.value = !showMobileMenu.value;
};

const selectMode = (mode) => {
  colorMode.preference = mode;
};

const authStore = useAuthStore();
</script>
<template>
  <div
    class="sticky top-0 left-0 backdrop-blur-md z-50 shadow-md dark:bg-[#5C5470]"
  >
    <div class="flex items-center justify-between w-full px-4 py-4 lg:px-8">
      <!-- Hamburger Menu Button -->
      <button
        @click="toggleMenu"
        class="text-2xl font-bold text-orange-500 lg:hidden"
      >
        ☰
      </button>
      <div class="flex items-center pl-2 lg:hidden gap-x-2">
        <User />

        <NuxtLink v-if="authStore.isAuthenticated" to="/user">
          <img
            class="object-cover object-center w-12 h-12 rounded-full"
            :src="authStore?.user?.image_url"
            alt="avatar"
          />
        </NuxtLink>
        <div class="relative inline-flex dark:text-[#5C5470]">
          <!-- Icon representing the current color mode -->
          <div
            class="flex items-center space-x-1 cursor-pointer"
            @click="selectMode($colorMode.preference)"
          >
            <!-- You can replace the icon with the current mode's icon -->

            <span
              class="hidden text-white dark:flex"
              @click="selectMode('light')"
            >
              <Icon name="akar-icons:moon-fill" size="25px" />
            </span>

            <span
              class="flex text-yellow-500 dark:hidden"
              @click="selectMode('dark')"
            >
              <Icon name="ph:sun-duotone" size="25px" />
            </span>
          </div>
        </div>
      </div>
      <div class="hidden text-2xl font-bold lg:flex">
        <ul class="flex my-auto ml-4 gap-x-10 dark:text-white">
          <li class="text-xl font-medium">
            <NuxtLink
              exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
              to="/"
              >Home</NuxtLink
            >
          </li>
          <li class="text-xl font-medium">
            <NuxtLink
              exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
              to="/recipe"
              >Recipe</NuxtLink
            >
          </li>
          <li class="text-xl font-medium">
            <NuxtLink
              exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
              to="/about"
              >About</NuxtLink
            >
          </li>
        </ul>
      </div>

      <div class="items-center hidden lg:flex gap-x-2">
        <User />
        <NuxtLink
          to="/auth/signup"
          v-if="!authStore.isAuthenticated"
          class="bg-orange-400 dark:bg-[#B9B4C7] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50"
          >Sign up</NuxtLink
        >

        <NuxtLink v-if="authStore.isAuthenticated" to="/user">
          <img
            class="w-12 h-12 rounded-full shadow-lg"
            :src="authStore?.user?.image_url"
            alt="avatar"
          />
        </NuxtLink>
        <div class="relative inline-flex dark:text-[#5C5470]">
          <!-- Icon representing the current color mode -->
          <div
            class="flex items-center space-x-1 cursor-pointer"
            @click="selectMode($colorMode.preference)"
          >
            <!-- You can replace the icon with the current mode's icon -->

            <span
              class="hidden text-white dark:flex"
              @click="selectMode('light')"
            >
              <Icon name="akar-icons:moon-fill" size="25px" />
            </span>

            <span
              class="flex text-yellow-500 dark:hidden"
              @click="selectMode('dark')"
            >
              <Icon name="ph:sun-duotone" size="25px" />
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Menu (Initially Hidden) -->
    <div v-if="showMobileMenu" class="lg:hidden">
      <ul class="p-4 text-center">
        <li class="mb-4 text-xl font-medium">
          <NuxtLink
            @click="toggleMenu"
            exact-active-class="!text-orange-500"
            class="text-black dark:text-white"
            to="/"
            >Home</NuxtLink
          >
        </li>
        <li class="mb-4 text-xl font-medium">
          <NuxtLink
            @click="toggleMenu"
            exact-active-class="!text-orange-500"
            class="text-black dark:text-white"
            to="/recipe"
            >Recipe</NuxtLink
          >
        </li>
        <li class="mb-4 text-xl font-medium">
          <NuxtLink
            @click="toggleMenu"
            exact-active-class="!text-orange-500"
            class="text-black dark:text-white"
            to="/about"
            >About</NuxtLink
          >
        </li>
        <li
          class="mb-4 text-xl font-medium text-black dark:text-white"
          v-if="!authStore.isAuthenticated"
        >
          <NuxtLink @click="toggleMenu" to="/auth/signup">Sign up</NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
