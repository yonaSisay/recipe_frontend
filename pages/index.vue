<script setup>
import getRecipes from "@/graphql/query/getRecipe.gql";
import topRated from "@/graphql/query/topRated.gql";
import getCreators from "@/graphql/query/topCreators.gql";

import query from "@/composables/query";

const limit = ref(8);
const offset = ref(0);
const recipes = ref([]);
const order = ref([{ created_at: "desc" }]);
const highlyRated = ref([]);
const topCreators = ref([]);

const { onResult, loading, onError, refetch } = query(
  {},
  order,
  limit,
  offset,
  getRecipes
);

const {
  onResult: topCreatorsResult,
  onError: topCreatorsError,
  refetch: topCreatorsFetch,
  loading: topCreatorsLoading,
} = query({}, {}, 0, 0, getCreators);

const {
  onResult: topResult,
  onError: topError,
  refetch: topFetch,
} = query({}, {}, 0, 0, topRated);

topResult((result) => {
  highlyRated.value = result?.data?.recipes;
  console.log(highlyRated.value, "highlyRated");
});

onResult((result) => {
  recipes.value = result?.data?.recipes;
  console.log(recipes.value, "recipe");
});

onError((error) => {
  console.log(error);
});

topCreatorsError((error) => {
  console.log(error);
});

topCreatorsResult((result) => {
  topCreators.value = result?.data?.users;
  console.log(topCreators.value, "topCreators");
});

definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <Hero />
    <div class="dark:bg-[#352F44] px-4 sm:px-10 bg-[#f8faff]">
      <section class="py-4 my-4">
        <h2
          class="text-2xl font-semibold text-orange-500 dark:text-[#B9B4C7] relative inline-block after:absolute after:content after:w-2/4 after:h-0.5 after:bottom-0 after:left-1/4 after:bg-orange-500 dark:after:bg-[#B9B4C7] after:rounded-lg after:transform after:-translate-x-1/4 after:transition-all after:duration-300"
        >
          Our top creators
        </h2>
        <div class="w-full overflow-x-scroll scroll">
          <div
            v-if="!topCreatorsLoading && topCreators?.length > 0"
            class="flex justify-center w-full mt-4 flex-nowrap gap-x-2 gap-y-4"
          >
            <CardsAvatar
              v-for="user in topCreators"
              :user="user"
              :key="user.id"
            />
          </div>
        </div>
      </section>
      <section class="py-8 mt-16 sm:px-20 md:px-0">
        <h2
          class="text-2xl font-semibold text-orange-500 dark:text-[#B9B4C7] relative inline-block after:absolute after:content after:w-2/4 after:h-0.5 after:bottom-0 after:left-1/4 after:bg-orange-500 dark:after:bg-[#B9B4C7] after:rounded-lg after:transform after:-translate-x-1/4 after:transition-all after:duration-300"
        >
          Latest recipes
        </h2>

        <div
          v-if="!loading && recipes?.length > 0"
          class="grid flex-wrap justify-center grid-cols-1 mt-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-x-3 gap-y-4"
        >
          <CardsVert
            v-for="recipe in recipes"
            :recipe="recipe"
            :key="recipe.id"
          />
        </div>
      </section>
      <section class="py-4 mt-4">
        <h2
          class="text-2xl font-semibold text-orange-500 dark:text-[#B9B4C7] relative inline-block after:absolute after:content after:w-2/4 after:h-0.5 after:bottom-0 after:left-1/4 after:bg-orange-500 dark:after:bg-[#B9B4C7] after:rounded-lg after:transform after:-translate-x-1/4 after:transition-all after:duration-300"
        >
          Highly rated recipes
        </h2>
        <div class="w-full py-8 overflow-x-scroll scroll">
          <div
            class="flex justify-center w-full mt-4 flex-nowrap gap-x-2 gap-y-4"
          >
            <CardsVert
              class="max-w-[17rem]"
              v-for="recipe in highlyRated"
              :recipe="recipe"
              :key="recipe.id"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<!--  -->

<style>
.scroll::-webkit-scrollbar {
  display: none;
}
</style>
