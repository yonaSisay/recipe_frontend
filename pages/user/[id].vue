<template>
	<div class="container dark:bg-[#352F44] px-8 py-8">
		<div class="flex justify-between">
			<h3 for="Ingredient" class="block text-gray-700 text-3xl font-bold mb-2">
				Edit recipe
				<button
					@click="toggleMenu"
					class="lg:hidden text-2xl font-bold text-orange-500"
				>
					☰
				</button>
			</h3>
			<div>
				<img
					class="w-12 h-12 rounded-full object-cover object-center"
					:src="store.user?.image_url"
					alt="avatar"
				/>
			</div>
		</div>
		<NavbarMobile v-if="showMobileMenu" @close="toggleMenu" />

		<div class="bg-white rounded-lg shadow p-2 mt-8">
			<div class="flex lg:flex-row flex-col gap-x-8">
				<div class="w-full lg:w-[50%] flex flex-col">
					<div class="mb-4">
						<label
							for="title"
							class="block text-gray-700 text-sm font-bold mb-2"
							>Title</label
						>
						<p class="text-red-400 text-sm font-bold" v-show="titleError != ''">
							{{ titleError }}
						</p>
						<input
							type="text"
							id="title"
							name="title"
							@input="titleError = ''"
							v-model="title"
							required
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
						/>
					</div>
					<div class="mb-4">
						<label
							for="duration"
							class="block text-gray-700 text-sm font-bold mb-2"
							>Duration</label
						>
						<p
							class="text-red-400 text-sm font-bold"
							v-show="durationError != ''"
						>
							{{ durationError }}
						</p>
						<input
							type="number"
							id="duration"
							name="duration"
							@input="durationError = ''"
							v-model="duration"
							required
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
						/>
					</div>
					<div>
						<div class="flex gap-x-2">
							<label
								for="Ingredient"
								class="block text-gray-700 text-sm font-bold mb-2"
								>Ingredients</label
							>
							<button
								@click="openEditModal"
								class="w-full flex text-orange-700 text-sm font-bold"
							>
								New ingredient
							</button>
							<ModalsIngred v-if="isEditModalOpen" @close="closeEditModal" />
						</div>

						<div v-for="(ingredient, index) in ingredients" :key="index">
							<div class="flex items-center space-x-2 mb-2">
								<ComboboxIngred
									:error="ingredientError"
									v-model="ingredient.ingredient"
									class="w-full"
									:ingredient="ingredient.ingredient"
								/>

								<input
									v-model="ingredient.amount"
									placeholder="Amount"
									class="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
								/>

								<img
									@click="removeIngredient(index)"
									class="w-6 h-6 cursor-pointer"
									src="/img/delete.svg"
								/>
							</div>
						</div>

						<button
							@click="addIngredient"
							class="flex text-orange-700 text-sm font-bold mb-2"
						>
							Add
						</button>
					</div>
				</div>

				<div class="w-full lg:w-[50%] flex flex-col">
					<div>
						<div class="flex gap-x-2 mb-2">
							<label
								for="Ingredient"
								class="block text-gray-700 text-sm font-bold"
								>Category</label
							>
							<button
								@click="openCateEditModal"
								class="flex text-orange-700 text-sm font-bold"
							>
								New category
							</button>

							<ModalsCate
								v-if="isEditCateModalOpen"
								@close="closeCateEditModal"
							/>
						</div>

						<div v-for="(category, index) in categories" :key="index">
							<div class="flex items-center space-x-2 mb-2">
								<ComboboxCate
									:error="categoryError"
									v-model="category.category"
									:category="category.category"
									class="w-full"
								/>
								<img
									@click="removeCategory(index)"
									class="w-6 h-6 cursor-pointer"
									src="/img/delete.svg"
								/>
							</div>
						</div>

						<button
							@click="addCategory"
							class="mb-2 flex text-orange-700 text-sm font-bold"
						>
							Add
						</button>
					</div>

					<div class="mb-2">
						<label
							for="description"
							class="block text-gray-700 text-sm font-bold mb-2"
							>Description</label
						>
						<p
							class="text-red-400 text-sm font-bold"
							v-show="descriptionError != ''"
						>
							{{ descriptionError }}
						</p>
						<textarea
							@input="descriptionError = ''"
							id="description"
							name="description"
							required
							v-model="description"
							row="4"
							class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
						></textarea>
					</div>
					<div>
						<label
							for="Ingredient"
							class="block text-gray-700 text-sm font-bold mb-2"
							>Steps</label
						>
						<p class="text-red-400 text-sm font-bold" v-show="stepsError != ''">
							{{ stepsError }}
						</p>
						<div v-for="(step, index) in steps" :key="index">
							<div class="flex items-center space-x-2 mb-2">
								<input
									v-model="step.description"
									placeholder="Step description"
									class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
								/>

								<img
									@click="removeStep(index)"
									class="w-6 h-6 cursor-pointer"
									src="/img/delete.svg"
								/>
							</div>
						</div>

						<button
							@click="addSteps"
							class="flex text-orange-700 text-sm font-bold p-2"
						>
							Add
						</button>
					</div>
				</div>
			</div>

			<div class="flex justify-center">
				<button
					type="submit"
					class="mt-2 bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
					:disabled="updateLoading"
					@click="handleSubmit"
				>
					{{ updateLoading ? "publishing..." : "publish" }}
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";
import singleQuery from "@/composables/singleQuery.js";
import getRecipe from "@/graphql/query/singleRecipe.gql";

const store = useAuthStore();
const route = useRoute();

const ingredients = ref([]);
const categories = ref([]);
const steps = ref([]);
const title = ref("");
const duration = ref("");
const description = ref("");
const recipe = ref();

const categoryError = ref("");
const ingredientError = ref("");
const stepsError = ref("");
const titleError = ref("");
const durationError = ref("");
const descriptionError = ref("");

const { onResult, loading, onError, refetch } = singleQuery(
	route.params.id,
	getRecipe
);

onResult((result) => {
	recipe.value = result?.data?.recipes_by_pk;
	title.value = recipe.value.title;
	duration.value = recipe.value.duration;
	description.value = recipe.value.description;

	ingredients.value = [];
	categories.value = [];
	steps.value = [];

	recipe.value.recipe_ingredients.map((recipe_ingredient) => {
		ingredients.value.push({
			ingredient: recipe_ingredient.ingredient,
			amount: recipe_ingredient.amount,
		});
	});
	recipe.value.recipe_categories.map((recipe_category) => {
		categories.value.push({
			category: recipe_category.category,
		});
	});
	recipe.value.steps.map((step) => {
		steps.value.push({
			description: step.description,
		});
	});
});

onError((error) => {
	console.log(error);
});

// dynamic ingredient code
const addIngredient = () => {
	const single = ingredients.value[ingredients.value.length - 1];
	if ((single?.ingredient && single?.amount) || ingredients.value.length == 0) {
		ingredients.value.push({ ingredient: null, amount: null });
	}
};

const removeIngredient = (index) => {
	if (ingredients.value.length > 1) {
		ingredients.value.splice(index, 1);
	}
};
const isEditModalOpen = ref(false);
function openEditModal() {
	isEditModalOpen.value = true;
}
function closeEditModal() {
	isEditModalOpen.value = false;
}

const addCategory = () => {
	const single = categories.value[categories.value.length - 1];
	if (single?.category || categories.value.length == 0) {
		categories.value.push({ category: null });
	}
};

const isEditCateModalOpen = ref(false);
function openCateEditModal() {
	isEditCateModalOpen.value = true;
}
function closeCateEditModal() {
	isEditCateModalOpen.value = false;
}

const removeCategory = (index) => {
	if (categories.value.length > 1) {
		categories.value.splice(index, 1);
	}
};

// dynamic steps code

const addSteps = () => {
	const single = steps.value[steps.value.length - 1];
	if (single?.description || steps.value.length == 0) {
		steps.value.push({ description: null });
	}
};

const removeStep = (index) => {
	if (steps.value.length > 1) {
		steps.value.splice(index, 1);
	}
};

// connect with backend
import authMutation from "~/composables/authMutation";
import updateRecipe from "@/graphql/mutations/updateRecipe.gql";
const {
	mutate: updateRecipeMutation,
	onError: updateRecipeError,
	onDone: updateRecipeDone,
	loading: updateLoading,
} = authMutation(updateRecipe);

const isFormValid = ref(true);
const handleError = () => {
	if (title.value == "") {
		titleError.value = "title is required";
		isFormValid.value = false;
	}

	if (description.value == "") {
		descriptionError.value = "description is required";
		isFormValid.value = false;
	}

	if (duration.value == "") {
		durationError.value = "duration is required";
		isFormValid.value = false;
	}
};

const handleSubmit = () => {
	handleError();
	if (!isFormValid.value) {
		return;
	}
	let input = {
		title: title.value,
		duration: duration.value,
		description: description.value,
	};
	var recipe_ingredients = [];
	var recipe_categories = [];
	var recipe_steps = [];

	ingredients.value.forEach((ingredient) => {
		if (ingredient.ingredient && ingredient.amount) {
			recipe_ingredients.push({
				ingredient_id: ingredient.ingredient.id,
				amount: ingredient.amount,
				recipe_id: recipe.value.id,
			});
		}
	});

	categories.value.forEach((category) => {
		if (category.category) {
			recipe_categories.push({
				category_id: category.category.id,
				recipe_id: recipe.value.id,
			});
		}
	});

	steps.value.forEach((step, index) => {
		if (step.description) {
			recipe_steps.push({
				description: step.description,
				step: index + 1,
				recipe_id: recipe.value.id,
			});
		}
	});

	updateRecipeMutation({
		input,
		id: recipe.value.id,
		steps: recipe_steps,
		categories: recipe_categories,
		ingredients: recipe_ingredients,
	});
};
updateRecipeDone((response) => {
	toast.success("Recipe successfully updated", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});

	refetch();
});

updateRecipeError((error) => {
	toast.error("Something went wrong");
});

const showMobileMenu = ref(false);
const toggleMenu = () => {
	showMobileMenu.value = !showMobileMenu.value;
};

definePageMeta({
	layout: "user",
	middleware: "auth",
});
</script>

<style lang="scss" scoped></style>
