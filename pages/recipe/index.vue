<script setup>
import getRecipes from "@/graphql/query/getRecipe.gql";
import { toast } from "vue3-toastify";
import query from "@/composables/query";

const search = ref("");
const limit = ref(10);
const offset = ref(1);
const recipes = ref([]);

const category = ref(null);
const ingredient = ref(null);
const order = ref(null);
const filterValue = ref({
	duration_range: [20, 85],
});

const filter = computed(() => {
	let query = {};
	query._and = {};
	if (category.value) {
		query._and.recipe_categories = {
			category_id: { _eq: category.value.id },
		};
	}

	if (ingredient.value) {
		query._and.recipe_ingredients = {
			ingredient_id: { _eq: ingredient.value.id },
		};
	}

	if (search.value) {
		query._and.title = { _ilike: `%${search.value}%` };
	}

	query._and.duration = {
		_gte: filterValue.value.duration_range[0],
		_lte: filterValue.value.duration_range[1],
	};

	return query;
});

const orderr = computed(() => {
	console.log(order.value, "order value");
	let query = { created_at: order.value };

	return [query];
});

const { onResult, loading, onError, refetch } = query(
	filter,
	orderr,
	limit,
	offset,
	getRecipes
);

provide("refetch", refetch);

onResult((result) => {
	recipes.value = result?.data?.recipes;
});

onError((error) => {
	console.log(error);
});

const clearFilter = () => {
	category.value = null;
	search.value = "";
	ingredient.value = null;
	order.value = null;
	toast.success("filter cleared", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});

	filterValue.value.duration_range = [0, 100];
};

const colorMode = useColorMode();

definePageMeta({
	layout: "custom",
});
const selectedTime = ref(30);
</script>
<template>
	<div class="mt-8 min-h-screen">
		<div class="py-8 px-4 sm:px-6 lg:px-20">
			<h2
				class="text-2xl font-semibold text-orange-500 dark:text-[#B9B4C7] relative inline-block after:absolute after:content after:w-2/4 after:h-0.5 after:bottom-0 after:left-1/4 after:bg-orange-500 dark:after:bg-[#B9B4C7] after:rounded-lg after:transform after:-translate-x-1/4 after:transition-all after:duration-300"
			>
				Filter
			</h2>

			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap lg:justify-between w-full mt-4 gap-4"
			>
				<Search v-model="search" />
				<Category v-model="category" :model-value="category" />
				<Ace v-model="order" :model-value="order" />
				<Ingredient v-model="ingredient" :model-value="ingredient?.name" />
				<div class="lg:max-w-[15rem] w-full">
					<VueSlider
						v-model="filterValue.duration_range"
						width="100%"
						height="10px"
						:min="0"
						:max="100"
						:dot-handle="{ background: '#009688' }"
						:tooltipStyle="{ backgroundColor: 'black' }"
						:dot-style="
							colorMode.preference === 'light'
								? {
										background: '#fff',
										border: '4px solid #FB923C',
										width: '16px',
										height: '16px',
										top: '8px',
										padding: '1px',
								  }
								: {
										background: '#fff',
										border: '4px solid #B9B4C7',
										width: '16px',
										height: '16px',
										top: '8px',
										padding: '1px',
								  }
						"
						:railStyle="
							colorMode.preference === 'light'
								? { background: '#D1D5DB' }
								: { background: '#4B5563' }
						"
						:processStyle="
							colorMode.preference === 'light'
								? { background: '#FB923C', height: '7px' }
								: { background: '#B9B4C7', height: '7px' }
						"
					>
					</VueSlider>
					<div class="flex justify-between space-x-2">
						<p class="text-grayText dark:text-white text-sm">
							{{ filterValue.duration_range[0] }} min
						</p>
						<p class="text-grayText dark:text-white text-sm">
							{{ filterValue.duration_range[1] }} min
						</p>
					</div>
				</div>
				<button
					@click="clearFilter"
					class="bg-orange-400 dark:bg-[#5C5470] hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50"
				>
					Clear Filter
				</button>
			</div>

			<div
				v-if="!loading && recipes?.length > 0"
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 justify-center flex-wrap gap-x-3 gap-y-4 mt-8"
			>
				<CardsVert
					v-for="recipe in recipes"
					:recipe="recipe"
					:key="recipe.id"
				/>
			</div>
			<!-- <Pagination /> -->
		</div>
	</div>
</template>

<style scoped>
.btn {
	height: 40px;
	width: 40px;
	border: none;
	margin-inline: 5px;
	cursor: pointer;
}
.back-btn {
	background-color: red;
}
.next-btn {
	background-color: red;
}
.btn-active {
	background-color: blue;
	color: white;
}
.pagination-container {
	display: flex;
	column-gap: 10px;
}
.paginate-buttons {
	height: 40px;
	width: 40px;
	border-radius: 20px;
	cursor: pointer;
	background-color: rgb(242, 242, 242);
	border: 1px solid rgb(217, 217, 217);
	color: black;
}
.paginate-buttons:hover {
	background-color: #d8d8d8;
}
.active-page {
	background-color: #3498db;
	border: 1px solid #3498db;
	color: white;
}
.active-page:hover {
	background-color: #2988c8;
}
</style>
