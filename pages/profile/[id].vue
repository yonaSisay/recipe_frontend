<script setup>
import getRecipes from "@/graphql/query/getRecipe.gql";
import getUser from "@/graphql/query/getUser.gql";
import query from "@/composables/query";

const limit = ref(10);
const offset = ref(0);
const user = ref([]);
const recipes = ref([]);
const route = useRoute();

const filter = ref({ id: { _eq: route.params.id } });
const filterRecipe = ref({ user_id: { _eq: route.params.id } });

const { onResult, loading, onError, refetch } = query(
  filter,
  {},
  1,
  offset,
  getUser
);

onResult((result) => {
  user.value = result?.data?.users[0];
});

onError((error) => {
  console.log(error);
});

const {
  onResult: onResultRecipes,
  loading: loadingRecipes,
  onError: recipeError,
} = query(filterRecipe, {}, limit, offset, getRecipes);

onResultRecipes((result) => {
  recipes.value = result?.data?.recipes;
});

recipeError((error) => {
  console.log(error);
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <div
      class="flex items-center flex-col shadow-lg py-8 mb-2 bg-gradient-to-b from-orange-100 via-orange-200 to-orange-500"
    >
      <img
        class="w-32 h-32 mb-2 rounded-full border-4 border-white object-cover object-center"
        :src="user.image_url"
        alt="avatar"
      />

      <p class="text-2xl font-thin text-white">
        {{ `${user?.first_name} ${user?.last_name} ` }}
      </p>
      <p class="text-lg font-thin text-white">
        {{ user.bio }}
      </p>
    </div>
    <section class="py-8 px-4 sm:px-6 lg:px-20">
      <h2
        class="text-2xl font-semibold text-orange-500 relative inline-block after:absolute after:content after:w-2/4 after:h-0.5 after:bottom-0 after:left-1/4 after:bg-orange-500 after:rounded-lg after:transform after:-translate-x-1/4 after:transition-all after:duration-300"
      >
        {{ user.first_name }}'s recipes
      </h2>

      <div
        v-if="!loading && recipes?.length > 0"
        class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 justify-center flex-wrap gap-x-3 gap-y-4 mt-8"
      >
        <CardsVert
          v-for="recipe in recipes"
          :recipe="recipe"
          :key="recipe.id"
        />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped></style>
