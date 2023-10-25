<script setup>
import getRecipe from "@/graphql/query/singleRecipe.gql";
import addBookmark from "@/graphql/mutations/addBookmark.gql";
import { useAuthStore } from "@/stores/auth.js";
import singleQuery from "@/composables/singleQuery.js";
import query from "@/composables/query.js";
import authMutation from "@/composables/authMutation";
import like from "@/graphql/mutations/like.gql";
import unlike from "@/graphql/mutations/unlike.gql";
import getRecipes from "@/graphql/query/getRecipe.gql";
import { toast } from "vue3-toastify";

const store = useAuthStore();
const route = useRoute();
const recipe = ref({});
const count = ref(0);
const isLiked = ref(false);
const relatedRecipes = ref([]);

const { onResult, loading, onError, refetch } = singleQuery(
	route.params.id,
	getRecipe
);

const { mutate, onDone, onError: bookmarkError } = authMutation(addBookmark);
const {
	mutate: likeMutate,
	onDone: likeDone,
	onError: likeError,
} = authMutation(like);

const {
	mutate: unlikeMutate,
	onDone: unlikeDone,
	onError: unlikeError,
} = authMutation(unlike);

const handleUnlike = async () => {
	const input = {
		user_id: store.id,
		recipe_id: route.params.id,
	};
	unlikeMutate(input);
};

unlikeDone(() => {
	count.value -= 1;
	isLiked.value = false;
});

unlikeError((error) => {
	toast.error(error.message, {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

const handleLike = async () => {
	const input = {
		user_id: store.id,
		recipe_id: route.params.id,
	};
	likeMutate({ input });
};

likeDone(() => {
	count.value += 1;
	isLiked.value = true;
});

likeError((error) => {
	toast.error(error.message, {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

const handleBookmark = async () => {
	const input = {
		user_id: store.id,
		recipe_id: route.params.id,
	};
	mutate({ input });
};

onDone(() => {
	toast.success("bookmark added", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

bookmarkError((error) => {
	if (error.message.includes("duplicate")) {
		toast.error("bookmark already added", {
			transition: toast.TRANSITIONS.FLIP,
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}
	toast.error("bookmark added", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

onResult((result) => {
	recipe.value = result?.data?.recipes_by_pk;
	isLiked.value = recipe.value.likes.some((like) => like.user_id === store.id);
	count.value = recipe.value.likes_aggregate.aggregate.count;

	const filter = ref({
		recipe_categories: {
			category_id: {
				_in: recipe.value.recipe_categories.map((cat) => cat.category_id),
			},
		},
	});
	const { onResult: relatedResult, onError: relatedError } = query(
		filter,
		{},
		6,
		0,
		getRecipes
	);
	relatedResult((result) => {
		relatedRecipes.value = result?.data?.recipes;
	});
	relatedError((error) => {
		console.log(error);
	});
});

onError((error) => {
	console.log(error.message);
});

const toProfile = (userid) => {
	navigateTo(`/profile/${userid}`);
};

definePageMeta({
	layout: "custom",
});
</script>
<template>
	<div class="min-h-screen px-8 sm:px-24">
		<div class="w-full flex flex-wrap gap-x-8 mt-12">
			<h2
				class="text-2xl font-semibold text-orange-500 dark:text-[#FAF0E6] flex mt-2 lg:w-[40%]"
			>
				{{ recipe?.title }}
				<img
					v-show="store.isAuthenticated"
					@click="handleBookmark"
					class="cursor-pointer h-6 w-6 object-contain my-auto"
					src="/img/bookmark.png"
					alt=""
				/>
			</h2>
			<div class="mt-2 flex flex-wrap gap-x-1 lg:gap-x-6 lg:[60%]">
				<img
					class="w-10 h-10 rounded-full cursor-pointer hover:scale-95 hover:shadow-lg duration-150"
					:src="recipe?.user?.image_url"
					alt="avatar"
					@click="toProfile(recipe?.user?.id)"
				/>
				<div class="text-sm text-gray-500 dark:text-[#FAF0E6] my-auto">
					{{ `by ${recipe?.user?.first_name} ${recipe?.user?.last_name}` }}
				</div>
				<div class="text-sm text-gray-500 dark:text-[#FAF0E6] my-auto">
					| {{ new Date(recipe?.created_at).toLocaleDateString() }}
				</div>
				<div class="mt-2">
					|
					<Icon
						v-if="isLiked"
						@click="handleUnlike"
						name="mdi:heart"
						size="25px"
						class="text-red-500 cursor-pointer"
					/>
					<Icon
						v-else="!isLiked"
						@click="handleLike"
						size="25px"
						name="mdi:heart-outline"
						class="cursor-pointer text-red-500"
					/>
					<span class="text-sm text-gray-500 dark:text-[#FAF0E6] my-auto"
						>{{ count }} likes</span
					>
				</div>

				<div class="hidden sm-block flex items-center text-yellow-500 my-auto">
					|

					<NuxtRating
						class="mt-1 relative"
						:read-only="true"
						:ratingValue="
							recipe?.reviews_aggregate?.aggregate?.avg?.rating || 0
						"
						:rating-size="'20px'"
					/>
				</div>
			</div>
		</div>
		<div class="w-full flex flex-col md:flex-row gap-x-8 mt-10">
			<section class="flex flex-col w-full lg:w-[40%]">
				<div class="">
					<img
						class="w-[100%] rounded-lg shadow-lg h-66 object-cover object-center"
						:src="recipe?.coverImage"
					/>
				</div>
				<div
					v-if="!loading"
					class="w-full mt-4 flex flex-wrap gap-x-2 justify-start"
				>
					<img
						v-for="image in recipe?.recipe_images"
						:key="image?.id"
						class="w-[20%] rounded-lg shadow-lg h-28 object-cover"
						:src="image?.image_url"
					/>
				</div>
			</section>

			<section class="w-full lg:w-[60%] mt-8">
				<p class="text-gray-500 dark:text-[#FAF0E6]">
					{{ recipe?.description }}
				</p>
				<div class="flex flex-col md:flex-row">
					<div class="w-full md:w-[40%] lg:w-[30%]">
						<h3
							class="text-xl text-orange-500 dark:text-[#FAF0E6] font-semibold mt-8"
						>
							Ingredients
						</h3>
						<ul
							v-if="!loading"
							class="list-disc list-inside text-gray-500 dark:text-[#FAF0E6] mt-4"
						>
							<li
								v-for="ingredient in recipe?.recipe_ingredients"
								:key="ingredient?.id"
								class="inline-flex gap-x-2 w-[100%] p-1 rounded-lg"
							>
								<img
									class="w-8 h-8 rounded-lg object-cover"
									:src="ingredient?.ingredient?.image_url"
								/>
								<p class="my-auto">
									{{
										`${ingredient?.amount} of ${ingredient?.ingredient?.name}`
									}}
								</p>
							</li>
						</ul>
					</div>

					<div class="w-full md:w-[60%] lg:w-[70%] lg:ml-4">
						<h3
							class="text-xl text-orange-500 dark:text-[#FAF0E6] font-semibold mt-8"
						>
							Steps to follow
						</h3>
						<ol
							v-if="!loading"
							class="list-decimal list-inside text-gray-500 mt-4 space-y-4"
						>
							<li
								class="dark:text-[#FAF0E6]"
								v-for="step in recipe.steps"
								:key="step.id"
							>
								{{ step.description }}
							</li>
						</ol>
					</div>
				</div>
			</section>
		</div>
		<div class="w-full flex flex-col lg:flex-row gap-x-8 mt-10">
			<Review :recipe_id="route.params.id" />
			<section class="w-full lg:w-[60%] mt-8">
				<h3 class="text-xl text-orange-500 dark:text-[#FAF0E6] font-semibold">
					Related Recipe
				</h3>
				<div
					v-if="!loading && relatedRecipes?.length > 0"
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center flex-wrap gap-x-3 gap-y-4 mt-8"
				>
					<CardsVert
						v-for="recipe in relatedRecipes"
						:recipe="recipe"
						:key="recipe.id"
					/>
				</div>
			</section>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
