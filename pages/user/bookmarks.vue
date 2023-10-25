<script setup>
import query from "@/composables/authQuery.js";
import authMutation from "@/composables/authMutation";
import { useAuthStore } from "@/stores/auth.js";
import getBookmarks from "@/graphql/query/getBookmarks.gql";
import deleteBookmarks from "@/graphql/mutations/deleteBookmarks.gql";
import { toast } from "vue3-toastify";
const store = useAuthStore();
const limit = ref(0);
const offset = ref(0);
const filter = ref({ user_id: { _eq: store.id } });

const { onResult, onError, loading, refetch } = query(
	filter,
	{},
	limit,
	offset,
	getBookmarks
);
const recipes = ref([]);

onResult((result) => {
	recipes.value = result?.data?.bookmarks;
	console.log(result?.data);
});

onError((error) => {
	console.log(error);
});

const {
	mutate,
	loading: muteLoading,
	onDone,
	onError: muteError,
} = authMutation(deleteBookmarks);

const handleDelete = async (recipe_id) => {
	const input = {
		recipe_id: recipe_id,
		user_id: store.id,
	};
	mutate(input);
};

onDone(() => {
	toast.success("Bookmark deleted", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
	refetch();
});

muteError((error) => {
	console.log(error);
});

definePageMeta({
	layout: "user",
	middleware: "auth",
});

const toRecipe = (id) => {
	navigateTo(`/recipe/${id}`);
};
const showMobileMenu = ref(false);
const toggleMenu = () => {
	showMobileMenu.value = !showMobileMenu.value;
};
</script>

<template>
	<div class="h-full px-8 py-8">
		<div class="flex justify-between">
			<h3
				for="Ingredient"
				class="block text-gray-700 dark:text-white text-3xl font-bold mb-2"
			>
				Bookmarks
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
		<div
			class="w-full flex justify-center h-full mt-48"
			v-if="recipes.length < 1"
		>
			<h3
				for="Ingredient"
				class="block text-gray-700 dark:text-white text-3xl font-bold mb-2"
			>
				Oops you dont have any bookmark!
			</h3>
		</div>
		<div v-else class="relative overflow-x-auto mt-8">
			<table class="w-full text-sm text-left text-gray-500 dark:text-white">
				<thead>
					<tr>
						<th scope="col" class="px-4 py-2">Recipe</th>
						<th scope="col" class="px-4 py-2">Created At</th>
						<th scope="col" class="px-4 py-2">Duration</th>
						<th scope="col" class="px-4 py-2">Rating</th>
						<th scope="col" class="px-4 py-2">Like</th>
						<th scope="col" class="px-4 py-2">Delete</th>
					</tr>
				</thead>
				<tbody>
					<tr
						class="bg-white border-b dark:bg-[#5C5470] rounded-md"
						v-for="(recipe, index) in recipes"
						:key="index"
					>
						<td
							scope="row"
							class="cursor-pointer font-medium text-gray-900 dark:text-white whitespace-nowrap px-4 py-2 flex"
							@click="toRecipe(recipe?.recipe_id)"
						>
							<img
								:src="recipe?.recipe?.coverImage"
								alt="Cover Image"
								class="w-8 h-8 object-cover object-center rounded-sm mr-2"
							/>{{ recipe?.recipe?.title }}
						</td>
						<td scope="row" class="px-4 py-2">
							{{ new Date(recipe?.recipe?.created_at).toLocaleDateString() }}
						</td>
						<td scope="row" class="px-4 py-2">
							{{ recipe?.recipe?.duration }}
						</td>
						<td scope="row" class="px-4 py-2">
							{{ recipe?.recipe?.reviews_aggregate.aggregate.avg.rating || 0 }}
						</td>
						<td scope="row" class="px-4 py-2">
							{{ recipe?.recipe.likes_aggregate.aggregate.count }}
						</td>
						<td scope="row" class="px-4 py-2">
							<svg
								@click="handleDelete(recipe?.recipe_id)"
								fill="#FF0000"
								version="1.1"
								id="Capa_1"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 482.428 482.429"
								xml:space="preserve"
								class="w-6 h-6 cursor-pointer"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g
									id="SVGRepo_tracerCarrier"
									stroke-linecap="round"
									stroke-linejoin="round"
								></g>
								<g id="SVGRepo_iconCarrier">
									<g>
										<g>
											<path
												d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"
											></path>
											<path
												d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"
											></path>
											<path
												d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"
											></path>
											<path
												d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"
											></path>
										</g>
									</g>
								</g>
							</svg>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
