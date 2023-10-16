<script setup>
import insertReview from "@/graphql/mutations/insertReview.gql";
import getReview from "@/graphql/query/getReview.gql";
import authMutation from "@/composables/authMutation.js";
import query from "@/composables/query.js";
import { useAuthStore } from "@/stores/auth.js";
import { toast } from "vue3-toastify";

const store = useAuthStore();
const reviews = ref([]);

const props = defineProps({
	recipe_id: String,
});

const newReview = ref("");
const newRating = ref(0);

const limit = ref(0);
const offset = ref(0);
const recipe = ref([]);
const filter = ref({ recipe_id: { _eq: props.recipe_id } });

const { onResult, onError, loading, refetch } = query(
	filter,
	{},
	limit,
	offset,
	getReview
);

onResult((result) => {
	reviews.value = result?.data?.reviews;
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
} = authMutation(insertReview);

const logRating = (event) => {
	newRating.value = event;
};

const handleAddReview = async () => {
	const input = {
		user_id: store.id,
		recipe_id: props.recipe_id,
		rating: newRating.value,
		comment: newReview.value,
	};
	mutate({ input });
};

onDone((result) => {
	toast.success("review added", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
	refetch();
	newRating.value = "";
	newReview.value = "";
});
muteError((error) => {
	if (error.message.includes("duplicate")) {
		toast.error("Duplicate review submission", {
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

const toProfile = (userid) => {
	navigateTo(`/profile/${userid}`);
};
</script>

<template>
	<div class="w-full lg:w-[40%]">
		<div class="mt-8 w-full">
			<h2 class="text-xl text-orange-500 font-semibold mb-2">Reviews</h2>
			<div class="relative max-h-96 h-full overflow-y-auto scroll">
				<div
					v-if="reviews"
					v-for="(review, index) in reviews"
					:key="index"
					class="bg-white rounded-lg shadow-sm p-2 mb-2"
				>
					<div class="flex items-center space-x-4">
						<img
							:src="review?.user?.image_url"
							@click="toProfile(review?.user_id)"
							alt="User Profile"
							class="cursor-pointer w-10 h-10 rounded-full"
						/>
						<div>
							<p class="text-sm font-extralight text-gray-800">
								{{ `${review?.user?.first_name} ${review?.user?.last_name} ` }}
							</p>
							<NuxtRating
								class="mt-1 relative"
								:read-only="true"
								:ratingValue="review?.rating"
								:rating-size="'20px'"
							/>
						</div>
					</div>
					<p class="mt-4 text-sm text-gray-600">{{ review?.comment }}</p>
				</div>
			</div>
		</div>
		<div v-if="store.isAuthenticated" class="relative mb-4">
			<div class="flex justify-between mb-2">
				<div>
					<label for="review" class="text-lg text-orange-500 font-semibold mb-2"
						>Add Your Review</label
					>
					<!-- <NuxtRating
						:read-only="false"
						:rating-count="10"
						:ranewRatingting-size="'40px'"
						:active-color="'red'"
						:rating-value="1.2"
						rating-content="🞺"
						@rating-selected="logRating"
					/> -->
					<div class="w-8">
						<Rating
							v-model:rating="newRating"
							:rating="newRating"
							:readonly="false"
						/>
					</div>
				</div>
				<div>
					<img class="w-12 h-12 rounded-full" :src="store?.user?.image_url" />
					<p class="text-xs font-thin">
						{{ `${store?.user?.first_name} ${store?.user?.last_name} ` }}
					</p>
				</div>
			</div>
			<textarea
				v-model="newReview"
				id="review"
				name="review"
				rows="3"
				class="w-full py-2 px-4 border rounded-lg focus:outline-none focus:border-orange-500"
				placeholder="Write your review here..."
			></textarea>
			<button
				@click="handleAddReview()"
				class="absolute right-9 -bottom-5 text-orange-500 text-sm font-bold"
			>
				{{ muteLoading ? "Posting" : "Post Review" }}
			</button>
		</div>
	</div>
</template>

<style>
.scroll::-webkit-scrollbar {
	display: none;
}
</style>
