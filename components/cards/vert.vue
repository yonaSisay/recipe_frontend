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
  <div
    class="shrink-0 w-full bg-white dark:bg-[#5C5470] shadow-xl rounded-lg overflow-hidden"
  >
    <NuxtLink :to="`/recipe/${recipe?.id}`">
      <nuxt-img
        class="object-cover object-center w-full cursor-pointer h-60"
        :src="recipe?.coverImage"
        alt="Recipe Image"
        loading="lazy"
        quality="20"
      />
    </NuxtLink>

    <div class="p-4">
      <div
        v-if="recipe?.recipe_categories.length > 0"
        class="text-orange-500 dark:text-[#B9B4C7] mb-1"
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
        class="flex items-center justify-between mb-1 text-lg font-semibold text-gray-900 dark:text-white gap-x-6"
      >
        <p>{{ recipe?.title }}</p>

        <div class="">
          <rating
            :rating="recipe?.reviews_aggregate?.aggregate?.avg?.rating || 0"
            container-class="w-20"
          ></rating>
        </div>
      </h2>

      <p class="text-sm text-orange-500 font-extralight dark:text-white">
        {{ recipe?.duration }} min
      </p>
      <hr class="my-1 border-b-2 border-gray-200" />

      <div class="flex justify-between text-sm text-gray-500 dark:text-white">
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
            class="text-red-500 cursor-pointer"
          />
          <img
            v-show="store.isAuthenticated"
            @click="handleBookmark"
            class="object-contain w-6 h-6 my-auto ml-2 cursor-pointer"
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
