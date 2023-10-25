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
			class="w-full px-4 py-2 rounded-md shadow-md bg-orange-100 dark:bg-[#B9B4C7] text-orange-600 dark:text-white placeholder-orange-300 dark:placeholder-white outline-none focus:ring focus:ring-orange-300 dark:focus:ring-[#6b6a6e]"
			placeholder="Search recipes"
			:value="modelValue"
			@input="handleSearch"
		/>
	</div>
</template>
