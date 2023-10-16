<script setup>
import addBookmark from "@/graphql/mutations/addBookmark.gql";
import { useAuthStore } from "@/stores/auth.js";
import like from "@/graphql/mutations/like.gql";
import unlike from "@/graphql/mutations/unlike.gql";
import authMutation from "@/composables/authMutation";
import { toast } from "vue3-toastify";
const props = defineProps({
	recipe: Object,
	MaxWidth: String,
});
const store = useAuthStore();

const isLiked = ref(
	props.recipe.likes.some((like) => like.user_id === store.id)
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
		recipe_id: props.recipe.id,
	};
	unlikeMutate(input);
};

unlikeDone(() => {
	isLiked.value = false;
});

unlikeError((error) => {
	toast.error(error.message, {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

const handleLike = async () => {
	if (!store.isAuthenticated) {
		toast.error("Please login to like", {
			transition: toast.TRANSITIONS.FLIP,
			position: toast.POSITION.TOP_RIGHT,
		});
		return;
	}
	const input = {
		user_id: store.id,
		recipe_id: props.recipe.id,
	};
	likeMutate({ input });
};

likeDone(() => {
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
		recipe_id: props.recipe.id,
	};
	mutate({ input });
};

onDone(() => {
	console.log("rating", props.recipe.reviews_aggregate?.aggregate?.avg?.rating);
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
	toast.error("Something went wrong", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});
</script>
<template>
	<div class="shrink-0 w-full bg-white shadow-xl rounded-lg overflow-hidden">
		<NuxtLink :to="`/recipe/${recipe?.id}`"
			><img
				class="w-full h-60 object-cover object-center cursor-pointer"
				:src="recipe?.coverImage"
				alt="Recipe Image"
			/>
		</NuxtLink>

		<div class="p-4">
			<div
				v-if="recipe?.recipe_categories.length > 0"
				class="text-orange-500 mb-1"
			>
				<span
					v-for="category in recipe?.recipe_categories"
					:key="category?.id"
					class="text-sm"
				>
					#{{ category?.category?.name }}
				</span>
			</div>

			<h2
				class="text-lg font-semibold text-gray-900 mb-1 flex justify-between items-center gap-x-6"
			>
				<p>{{ recipe?.title }}</p>
				<!-- <NuxtRating
					class="relative mt-1 ml-24"
					:read-only="true"
					:ratingValue="recipe?.reviews_aggregate?.aggregate?.avg?.rating || 0"
					:rating-size="'18px'"
				/> -->
				<div class="">
					<rating
						:rating="recipe?.reviews_aggregate?.aggregate?.avg?.rating || 0"
						container-class="w-20"
					></rating>
				</div>
			</h2>

			<p class="text-sm font-extralight text-orange-500">
				{{ recipe?.duration }} min
			</p>
			<hr class="border-b-2 border-gray-200 my-1" />

			<div class="text-sm text-gray-500 flex justify-between">
				{{ new Date(recipe?.created_at).toLocaleDateString() }}
				<div class="flex">
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
					<img
						v-show="store.isAuthenticated"
						@click="handleBookmark"
						class="cursor-pointer ml-2 h-6 w-6 object-contain my-auto"
						src="/img/bookmark.png"
						alt=""
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.color {
	color: orange;
}
</style>
