<script setup>
import { useAuthStore } from "~/stores/auth";
const viewmodal = ref(false);
const closeModal = () => {
	viewmodal.value = false;
};
const openModal = () => {
	viewmodal.value = true;
};
const authStore = useAuthStore();

const colorMode = useColorMode();

const showMobileMenu = ref(false);
const toggleMenu = () => {
	showMobileMenu.value = !showMobileMenu.value;
};
definePageMeta({
	layout: "user",
	middleware: "auth",
});
</script>

<template>
	<div class="min-h-full px-12 py-8">
		<div class="flex justify-between">
			<h3
				for="Ingredient"
				class="block dark:text-white text-gray-700 text-3xl font-bold mb-2"
			>
				Edit profile
				<button
					@click="toggleMenu"
					class="lg:hidden text-2xl font-bold text-orange-500"
				>
					☰
				</button>
			</h3>

			<div
				@click="openModal"
				for="profileImage"
				class="cursor-pointer w-12 h-12 rounded-full relative"
			>
				<img
					class="w-12 h-12 rounded-full object-cover object-center"
					:src="authStore.user?.image_url"
					alt="avatar"
				/>
				<div v-show="viewmodal"></div>

				<div class="w-6 h-6 -mt-6 ml-8">
					<svg
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
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M9.77778 21H14.2222C17.3433 21 18.9038 21 20.0248 20.2646C20.51 19.9462 20.9267 19.5371 21.251 19.0607C22 17.9601 22 16.4279 22 13.3636C22 10.2994 22 8.76721 21.251 7.6666C20.9267 7.19014 20.51 6.78104 20.0248 6.46268C19.3044 5.99013 18.4027 5.82123 17.022 5.76086C16.3631 5.76086 15.7959 5.27068 15.6667 4.63636C15.4728 3.68489 14.6219 3 13.6337 3H10.3663C9.37805 3 8.52715 3.68489 8.33333 4.63636C8.20412 5.27068 7.63685 5.76086 6.978 5.76086C5.59733 5.82123 4.69555 5.99013 3.97524 6.46268C3.48995 6.78104 3.07328 7.19014 2.74902 7.6666C2 8.76721 2 10.2994 2 13.3636C2 16.4279 2 17.9601 2.74902 19.0607C3.07328 19.5371 3.48995 19.9462 3.97524 20.2646C5.09624 21 6.65675 21 9.77778 21ZM12 9.27273C9.69881 9.27273 7.83333 11.1043 7.83333 13.3636C7.83333 15.623 9.69881 17.4545 12 17.4545C14.3012 17.4545 16.1667 15.623 16.1667 13.3636C16.1667 11.1043 14.3012 9.27273 12 9.27273ZM12 10.9091C10.6193 10.9091 9.5 12.008 9.5 13.3636C9.5 14.7192 10.6193 15.8182 12 15.8182C13.3807 15.8182 14.5 14.7192 14.5 13.3636C14.5 12.008 13.3807 10.9091 12 10.9091ZM16.7222 10.0909C16.7222 9.63904 17.0953 9.27273 17.5556 9.27273H18.6667C19.1269 9.27273 19.5 9.63904 19.5 10.0909C19.5 10.5428 19.1269 10.9091 18.6667 10.9091H17.5556C17.0953 10.9091 16.7222 10.5428 16.7222 10.0909Z"
								:fill="colorMode.preference === 'light' ? '#FF7008' : '#B9B4C7'"
							></path>
						</g>
					</svg>
				</div>
			</div>
			<ModalsProfile v-if="viewmodal" @close="closeModal" />
		</div>
		<NavbarMobile v-if="showMobileMenu" @close="toggleMenu" />
		<EditProfile />
		<EditPassword />
	</div>
</template>

<style lang="scss" scoped></style>
