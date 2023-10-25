<template>
	<div class="relative inline-block text-left">
		<button
			type="button"
			class="px-4 py-2 w-full rounded-md shadow-md bg-orange-500 dark:bg-[#5C5470] text-white hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300 dark:focus:ring-[#5C5470]"
			@click="toggle($event)"
		>
			{{ modelValue ? modelValue : "Order by posted time" }}
			<svg
				class="w-4 h-4 ml-2 inline-block fill-current"
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
						d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9"
						stroke="#fff"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					></path>
				</g>
			</svg>
		</button>

		<div
			v-show="isDropdownOpen"
			class="origin-top-left bg-white dark:bg-[#5C5470] z-50 absolute left-0 mt-2 w-36 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
		>
			<div class="p-2">
				<ul class="flex flex-wrap gap-2 justify-center">
					<li
						class="bg-orange-100 w-28 h-8 px-2 text-md cursor-pointer flex items-center rounded-lg"
						value="asc"
						@click="
							emit('update:modelValue', orders[0]);
							isDropdownOpen = false;
						"
					>
						Ascending
					</li>
					<li
						class="bg-orange-100 dark:bg-[#FAF0E6] w-28 h-8 px-2 text-md cursor-pointer flex items-center rounded-lg"
						value="desc"
						@click="
							emit('update:modelValue', orders[1]);
							isDropdownOpen = false;
						"
					>
						Descending
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script setup>
const isDropdownOpen = ref(false);
const orders = ["asc", "desc"];
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
	modelValue: String,
});

onMounted(() => {
	window.addEventListener("click", () => {
		if (isDropdownOpen.value) {
			isDropdownOpen.value = false;
		}
	});
});

const toggle = (event) => {
	event.stopPropagation();
	isDropdownOpen.value = !isDropdownOpen.value;
};
</script>

<style scoped></style>
