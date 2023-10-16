<script setup>
import getCategory from "@/graphql/query/filterCategory.gql";
import query from "@/composables/query";

const props = defineProps({
	category: {
		type: Object,
		default: () => ({}),
	},
	error: {
		type: String,
		default: "",
	},
});

const search = ref(props.category?.name || "");
const categories = ref([]);
const limit = ref(6);
const offset = ref(0);

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
	getCategory
);

onResult((result) => {
	categories.value = result?.data?.categories;
	console.log(categories.value);
});

onError((error) => {
	console.log(error);
});

const emit = defineEmits(["update:modelValue"]);
const handleSelect = (category) => {
	search.value = category?.name;
	emit("update:modelValue", category);
};

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

<template>
	<div class="relative">
		<p class="text-red-400 text-sm font-bold" v-if="error != ''">
			{{ error }}
		</p>
		<input
			@click="toggle($event)"
			v-model="search"
			class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
			placeholder="search and select category"
		/>
		<div
			v-show="isDropdownOpen"
			class="z-50 bg-white absolute top-full left-0 w-full mt-2 border border-t-0 border-gray-300 rounded-b-lg shadow-md"
		>
			<div
				v-for="category in categories"
				:key="category.id"
				class="cursor-pointer px-4 py-2 hover:bg-orange-100"
				@click="handleSelect(category)"
			>
				{{ category.name }}
			</div>
		</div>
	</div>
</template>
