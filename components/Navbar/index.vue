<script setup>
import { useAuthStore } from "~/stores/auth";
const showMobileMenu = ref(false);

const colorMode = useColorMode();
console.log("color", colorMode.preference);

const toggleMenu = () => {
	showMobileMenu.value = !showMobileMenu.value;
};

const isDropdownOpen = ref(false);
const selectMode = (mode) => {
	colorMode.preference = mode;
	console.log("color", colorMode.preference);
	isDropdownOpen.value = !isDropdownOpen.value;
};

const authStore = useAuthStore();
</script>
<template>
	<div
		class="sticky top-0 left-0 backdrop-blur-md z-50 shadow-md dark:bg-[#5C5470]"
	>
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
				<ul class="ml-4 flex gap-x-10 my-auto dark:text-white">
					<li class="font-medium text-xl">
						<NuxtLink
							exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
							to="/"
							>Home</NuxtLink
						>
					</li>
					<li class="font-medium text-xl">
						<NuxtLink
							exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
							to="/recipe"
							>Recipe</NuxtLink
						>
					</li>
					<li class="font-medium text-xl">
						<NuxtLink
							exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
							to="/about"
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
						class="cursor-pointer flex items-center space-x-1"
						@click="selectMode($colorMode.preference)"
					>
						<!-- You can replace the icon with the current mode's icon -->

						<Icon
							v-if="$colorMode.preference == 'dark'"
							name="akar-icons:moon-fill"
							size="25px"
							class="text-white"
						/>
						<Icon
							v-if="$colorMode.preference == 'system'"
							name="gridicons:computer"
							size="25px"
							class="text-[#B9B4C7]"
						/>
						<Icon
							v-if="$colorMode.preference == 'light'"
							name="ph:sun-duotone"
							size="25px"
							class="text-yellow-500"
						/>
					</div>
					<!-- Dropdown menu with mode options -->
					<div
						v-if="isDropdownOpen"
						class="absolute top-8 right-0 mt-2 py-2 bg-white dark:text-white dark:bg-[#5C5470] border border-gray-300 rounded-lg shadow-md"
					>
						<div class="px-4 py-2">
							<div
								class="flex items-center cursor-pointer"
								@click="selectMode('system')"
							>
								<!-- Icon representing the System mode -->
								<Icon name="gridicons:computer" />
								<span class="ml-2">System</span>
							</div>
							<div
								class="flex items-center cursor-pointer"
								@click="selectMode('light')"
							>
								<!-- Icon representing the Light mode -->
								<Icon name="ph:sun-duotone" />
								<span class="ml-2">Light</span>
							</div>
							<div
								class="flex items-center cursor-pointer"
								@click="selectMode('dark')"
							>
								<!-- Icon representing the Dark mode -->
								<Icon name="akar-icons:moon-fill" />
								<!-- Icon representing the Dark mode -->

								<span class="ml-2">Dark</span>
							</div>
						</div>
					</div>
				</div>
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
