<template>
	<div class="relative">
		<p class="text-red-400 text-sm font-bold" v-show="error != ''">
			{{ error }}
		</p>
		<input
			@click="toggle($event)"
			v-model="search"
			class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
			placeholder="search and select ingredient"
		/>

		<div
			v-show="isDropdownOpen && ingredients.length > 0"
			class="absolute z-10 mt-2 w-full py-2 bg-white rounded-md shadow-md"
		>
			<ul>
				<li
					v-for="(ingredient, index) in ingredients"
					:key="index"
					class="flex px-4 py-2 cursor-pointer shadow-sm hover:bg-gray-100"
					@click="handleSelect(ingredient)"
				>
					<img class="w-8 h-8 mr-2" :src="ingredient?.image_url" alt="" />
					{{ ingredient?.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import getIngredients from "@/graphql/query/getIngredients.gql";
import query from "@/composables/query";

const props = defineProps({
	ingredient: {
		type: Object,
		default: () => ({}),
	},
	error: {
		type: String,
		default: "",
	},
});
const search = ref(props.ingredient?.name || "");
const limit = ref(6);
const offset = ref(0);
const ingredients = ref([]);

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
