<script setup>
const props = defineProps({
	modelValue: String,
});

const emit = defineEmits(["update:modelValue"]);
const handleSearch = (event) => {
	emit("update:modelValue", event.target.value);
};
</script>

<template>
	<div class="relative">
		<input
			ref="search"
			type="text"
			class="w-full px-4 py-2 rounded-md shadow-md bg-orange-100 text-orange-600 placeholder-orange-300 outline-none focus:ring focus:ring-orange-300"
			placeholder="Search recipes"
			:value="modelValue"
			@input="handleSearch"
		/>

		<svg
			class="w-5 h-5 absolute top-2 right-3 text-orange-600 pointer-events-none"
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
					d="M17.0392 15.6244C18.2714 14.084 19.0082 12.1301 19.0082 10.0041C19.0082 5.03127 14.9769 1 10.0041 1C5.03127 1 1 5.03127 1 10.0041C1 14.9769 5.03127 19.0082 10.0041 19.0082C12.1301 19.0082 14.084 18.2714 15.6244 17.0392L21.2921 22.707C21.6828 23.0977 22.3163 23.0977 22.707 22.707C23.0977 22.3163 23.0977 21.6828 22.707 21.2921L17.0392 15.6244ZM10.0041 17.0173C6.1308 17.0173 2.99087 13.8774 2.99087 10.0041C2.99087 6.1308 6.1308 2.99087 10.0041 2.99087C13.8774 2.99087 17.0173 6.1308 17.0173 10.0041C17.0173 13.8774 13.8774 17.0173 10.0041 17.0173Z"
					fill="#FF7008"
				></path>
			</g>
		</svg>
	</div>
</template>
