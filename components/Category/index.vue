<script setup>
import getCategory from "@/graphql/query/getCategory.gql";
import query from "@/composables/query";
const categories = ref();
const { onResult, loading, onError, refetch } = query(
  {},
  {},
  0,
  0,
  getCategory
);

onResult((result) => {
  categories.value = result?.data.categories;
});

onError((error) => {
  console.log(error);
});

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

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="relative inline-block text-left lg:min-w-[24rem]">
    <button
      type="button"
      class="px-4 py-2 block w-full rounded-md shadow-md bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
      @click="toggle($event)"
    >
      {{ modelValue ? modelValue.name : "Select Category" }}
      <svg
        class="w-4 h-4 ml-2 inline-block fill-current"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M19 9L14 14.1599C13.7429 14.4323 13.4329 14.6493 13.089 14.7976C12.7451 14.9459 12.3745 15.0225 12 15.0225C11.6255 15.0225 11.2549 14.9459 10.9109 14.7976C10.567 14.6493 10.2571 14.4323 10 14.1599L5 9"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </svg>
    </button>

    <div
      v-show="isDropdownOpen && categories"
      class="origin-top-left z-50 absolute left-0 mt-2 w-full h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
    >
      <div class="p-2">
        <ul class="grid grid-cols-3 gap-3 bg-white z-50">
          <li
            v-for="item in categories"
            :key="item.id"
            @click="
              emit('update:modelValue', item);
              isDropdownOpen = false;
            "
            class="bg-orange-200 hover:bg-orange-100 w-28 h-8 px-2 text-md cursor-pointer flex items-center rounded-lg"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
