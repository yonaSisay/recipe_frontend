<script setup>
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
const colorMode = useColorMode();

const router = useRouter();
</script>

<template>
	<aside
		class="h-full dark:bg-[#352F44] justify-between w-full border-r-[1px] border-orange hidden lg:block"
	>
		<ul class="py-24 px-12 flex flex-col text-xl font-medium">
			<li class="flex text-gray-400 dark:text-white hover:text-gray-500">
				<svg
					width="30"
					height="29"
					viewBox="0 0 34 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="mr-4"
				>
					<path
						d="M17 5.24625L25.3333 12.5587V25.25H22V15.5H12V25.25H8.66665V12.5587L17 5.24625ZM17 0.875L0.333313 15.5H5.33331V28.5H15.3333V18.75H18.6666V28.5H28.6666V15.5H33.6666L17 0.875Z"
						:fill="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
					/>
				</svg>

				<NuxtLink to="/">Home</NuxtLink>
			</li>
			<li class="flex mt-12 text-gray-400 dark:text-white hover:text-gray-500">
				<svg
					width="28"
					height="27"
					viewBox="0 0 28 27"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					class="mr-4"
				>
					<path
						d="M14 3.75C15.8334 3.75 17.3334 5.2125 17.3334 7C17.3334 8.7875 15.8334 10.25 14 10.25C12.1667 10.25 10.6667 8.7875 10.6667 7C10.6667 5.2125 12.1667 3.75 14 3.75ZM14 20C18.5 20 23.6667 22.0963 24 23.25H4.00002C4.38335 22.08 9.51669 20 14 20ZM14 0.5C10.3167 0.5 7.33335 3.40875 7.33335 7C7.33335 10.5913 10.3167 13.5 14 13.5C17.6834 13.5 20.6667 10.5913 20.6667 7C20.6667 3.40875 17.6834 0.5 14 0.5ZM14 16.75C9.55002 16.75 0.666687 18.9275 0.666687 23.25V26.5H27.3334V23.25C27.3334 18.9275 18.45 16.75 14 16.75Z"
						:fill="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
					/>
				</svg>
				<NuxtLink
					exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
					to="/user"
				>
					Edit Profile</NuxtLink
				>
			</li>
			<li class="mt-12 flex text-gray-400 dark:text-white hover:text-gray-500">
				<svg
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					stroke="#000000"
					class="mr-4 w-8 h-8"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						<path
							d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="2.184"
							stroke-linecap="round"
						></path>
						<path
							d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="2.184"
							stroke-linecap="round"
						></path>
					</g>
				</svg>
				<NuxtLink
					exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
					to="/user/addRecipe"
					>Add recipe</NuxtLink
				>
			</li>
			<li class="mt-12 flex text-gray-400 dark:text-white hover:text-gray-500">
				<svg
					:fill="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
					viewBox="0 0 50 50"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					class="w-8 h-8 mr-4"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						<path
							d="M12,39h32V2H12C8.691,2,6,4.691,6,8v34.417C6,45.496,8.691,48,12,48h32v-2H12c-2.168,0-4-1.641-4-3.583C8,40.501,9.757,39,12,39z M36.709,31.706C36.514,31.902,36.257,32,36,32c-0.255,0-0.511-0.097-0.705-0.292l-6.523-6.494l-1.76,1.76l-1.846-1.879l3.153-3.153l8.387,8.349C37.097,30.681,37.099,31.314,36.709,31.706z M16.286,10.007l7.733,7.781l-3.044,3.044L16.23,16C14.568,14.338,14.594,11.637,16.286,10.007z M14.329,30.293l13.024-13.024c-0.034-0.085-0.083-0.163-0.107-0.252c-0.399-1.509-0.322-3.426,1.045-4.777c2.031-2.094,5.497-2.989,6.998-1.505c1.501,1.571,0.596,4.909-1.435,6.916c-1.444,1.428-3.298,1.545-4.8,1.16c-0.104-0.027-0.196-0.081-0.294-0.122L14.743,31.707C14.548,31.902,15.292,32,15.036,32s-0.512-0.098-0.707-0.293C13.938,31.316,13.938,30.684,14.329,30.293z"
						></path>
					</g>
				</svg>
				<NuxtLink
					exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
					to="/user/recipes"
					>My recipes</NuxtLink
				>
			</li>
			<li class="mt-12 flex text-gray-400 dark:text-white hover:text-gray-500">
				<svg
					class="mr-4 w-8 h-8"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
					<g
						id="SVGRepo_tracerCarrier"
						stroke-linecap="round"
						stroke-linejoin="round"
					></g>
					<g id="SVGRepo_iconCarrier">
						<path
							d="M4 8C4 5.17157 4 3.75736 4.87868 2.87868C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.87868C20 3.75736 20 5.17157 20 8V16C20 18.8284 20 20.2426 19.1213 21.1213C18.2426 22 16.8284 22 14 22H10C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16V8Z"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="1.5"
						></path>
						<path
							d="M19.8978 16H7.89778C6.96781 16 6.50282 16 6.12132 16.1022C5.08604 16.3796 4.2774 17.1883 4 18.2235"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="1.5"
						></path>
						<path
							d="M8 7H16"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="1.5"
							stroke-linecap="round"
						></path>
						<path
							d="M8 10.5H13"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="1.5"
							stroke-linecap="round"
						></path>
						<path
							d="M13 16V19.5309C13 19.8065 13 19.9443 12.9051 20C12.8103 20.0557 12.6806 19.9941 12.4211 19.8708L11.1789 19.2808C11.0911 19.2391 11.0472 19.2182 11 19.2182C10.9528 19.2182 10.9089 19.2391 10.8211 19.2808L9.57889 19.8708C9.31943 19.9941 9.18971 20.0557 9.09485 20C9 19.9443 9 19.8065 9 19.5309V16.45"
							:stroke="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							stroke-width="1.5"
							stroke-linecap="round"
						></path>
					</g>
				</svg>
				<NuxtLink
					exact-active-class="text-orange-500 dark:text-[#B9B4C7]"
					to="/user/bookmarks"
					>Bookmarks</NuxtLink
				>
			</li>
		</ul>
		<NuxtLink
			@click="
				router.push('/');
				authStore.logout();
			"
			to="/auth/signup"
			class="mb-12 w-32 ml-12 bg-orange-400 dark:bg-[#5C5470] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50"
			>Log out</NuxtLink
		>
	</aside>
</template>
