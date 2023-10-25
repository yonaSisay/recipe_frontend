<template>
	<div class="relative">
		<input
			v-model="search"
			@click="toggle($event)"
			type="text"
			placeholder="Filter by Ingredients"
			class="w-full px-4 py-2 rounded-md shadow-md bg-orange-100 dark:bg-[#B9B4C7] text-orange-600 dark:text-white placeholder-orange-300 dark:placeholder-white focus:outline-none focus:ring focus:ring-orange-300 dark:focus:ring-[#6b6a6e]"
		/>

		<div
			v-show="isDropdownOpen && ingredients.length > 0"
			class="absolute z-10 mt-2 w-full py-2 bg-white dark:bg-[#5C5470] dark:text-white rounded-md shadow-md"
		>
			<ul>
				<li
					v-for="(ingredient, index) in ingredients"
					:key="index"
					class="flex px-4 py-2 cursor-pointer shadow-sm hover:bg-gray-100 dark:hover:bg-[#7c7a82]"
					@click="handleSelect(ingredient)"
				>
					<img
						class="w-8 h-8 mr-2 rounded-full"
						:src="ingredient?.image_url"
						alt=""
					/>
					{{ ingredient?.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import getIngredients from "@/graphql/query/getIngredients.gql";
import query from "@/composables/query";
const search = ref("");
const limit = ref(6);
const offset = ref(0);
const ingredients = ref([]);

const props = defineProps({
	modelValue: {
		type: String,
	},
});

const getSelectedIngredient = (ingredient) => {
	return props.modelValue;
};
watch(getSelectedIngredient, () => {
	search.value = props.modelValue;
});

const emit = defineEmits(["update:modelValue"]);
const handleSelect = (ingredient) => {
	search.value = ingredient.name;
	emit("update:modelValue", ingredient);
};

const filter = computed(() => {
	let query = {};
	if (search.value) {
		query.name = { _ilike: `%${search.value}%` };
	}
	return query;
});

const { onResult, loading, onError, refetch } = query(
	filter,
	{},
	limit,
	offset,
	getIngredients
);

onResult((result) => {
	console.log(result?.data);
	ingredients.value = result?.data?.ingredients;
});

onError((error) => {
	console.log(error);
});

const isDropdownOpen = ref(false);

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

<style scoped>
/* Add additional Tailwind CSS classes and custom styles here */
</style>
