<template>
  <div class="container px-8 py-8 mx-auto">
    <div class="flex justify-between">
      <h3 for="Ingredient" class="block text-gray-700 text-3xl font-bold mb-2">
        Add recipe
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

    <form
      @submit.prevent="handleUpload"
      action=""
      @click="restoreError"
      class="bg-white rounded-lg shadow p-2 mt-8"
    >
      <div class="flex flex-col md:flex-row gap-x-8">
        <div class="md:w-[50%] flex flex-col">
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
                type="button"
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
                />

                <div>
                  <p
                    class="text-red-400 text-sm font-bold"
                    v-show="amountError != ''"
                  >
                    {{ amountError }}
                  </p>
                  <input
                    @input="amountError = ''"
                    v-model="ingredient.amount"
                    placeholder="Amount"
                    class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
                  />
                </div>

                <img
                  @click="removeIngredient(index)"
                  class="w-6 h-6 cursor-pointer"
                  src="/img/delete.svg"
                />
              </div>
            </div>

            <button
              type="button"
              @click="addIngredient"
              class="flex text-orange-700 text-sm font-bold mb-2"
            >
              Add
            </button>
          </div>
        </div>

        <div class="md:w-[50%] flex flex-col">
          <div>
            <div class="flex gap-x-2 mb-2">
              <label
                for="Ingredient"
                class="block text-gray-700 text-sm font-bold"
                >Category</label
              >
              <button
                type="button"
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
              type="button"
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
              tag="textarea"
              id="description"
              name="description"
              v-model="description"
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
              type="button"
              @click="addSteps"
              class="flex text-orange-700 text-sm font-bold p-2"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h3 for="title" class="block text-gray-700 text-sm font-bold mb-2">
              Images
            </h3>
            <p
              class="text-red-400 text-sm font-bold"
              v-show="imagesError != ''"
            >
              {{ imagesError }}
            </p>
            <p class="text-neutral-400 text-xs">
              Select images for your recipe
            </p>
          </div>
        </div>
        <div
          v-if="images.length === 0"
          class="flex items-center justify-center"
        >
          <div
            @click="handleFileEvent"
            class="flex basis-1/4 items-center justify-center flex-col space-y-8 w-full"
          >
            <label
              class="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300"
            >
              <div
                class="flex flex-col items-center justify-center pt-7 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <p
                  class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                >
                  Select multiple images
                </p>
              </div>
            </label>
          </div>
        </div>
        <div v-else class="mt-4 flex justify-center gap-x-4">
          <div
            v-for="(image, index) in immagesPreview"
            :key="image.toString()"
            class="relative h-max"
          >
            <img
              :src="image.toString()"
              alt="recipe image"
              class="aspect-video object-cover w-48 h-32 rounded-lg cursor-pointer"
              @click="handleThumbnailChange(image.toString())"
            />

            <span
              @click="removeImage(index)"
              class="absolute top-0 right-0 cursor-pointer z-50"
              ><Icon name="uil:x" size="25px" class="text-white"
            /></span>
            <span
              v-if="thumbnail.toString() === image.toString()"
              class="bg-opacity-30 bg-black absolute w-full h-full z-10 top-0 left-0 rounded-lg flex items-center justify-center"
            >
              <Icon name="wpf:like" size="35px" class="text-white" />
            </span>
          </div>
          <div
            class="w-8 flex flex-col items-center justify-center cursor-pointer"
            @click="handleFileEvent"
          >
            <img src="/img/add.svg" />
            <input
              class="opacity-0 w-60"
              ref="file"
              type="file"
              accept="image/*"
              multiple
              name="image"
              id=""
              @change="handleFileSelect"
            />
          </div>
        </div>
        <input
          class="opacity-0 w-60"
          ref="file"
          type="file"
          accept="image/*"
          multiple
          name="image"
          id="file_input"
          @change="handleFileSelect"
        />
      </div>

      <div class="flex justify-center">
        <button
          @click="handleUpload"
          :disabled="imageLoading || addRecipeLoading"
          type="submit"
          class="mt-2 bg-orange-400 text-white font-semibold py-2 px-6 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
        >
          {{ addRecipeLoading || imageLoading ? "publishing..." : "publish" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { toast } from "vue3-toastify";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();
const ingredients = ref([{ ingredient: null, amount: null }]);
const categories = ref([{ category: null }]);
const steps = ref([{ description: null }]);
const title = ref("");
const duration = ref("");
const description = ref("");

const categoryError = ref("");
const ingredientError = ref("");
const stepsError = ref("");
const titleError = ref("");
const durationError = ref("");
const descriptionError = ref("");
const imagesError = ref("");
const amountError = ref("");

const addIngredient = () => {
  const single = ingredients.value[ingredients.value.length - 1];
  if (single.ingredient && single.amount) {
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

//dynamic category code

const addCategory = () => {
  const single = categories.value[categories.value.length - 1];
  if (single.category) {
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
  if (single.description) {
    steps.value.push({ description: null });
  }
};

const removeStep = (index) => {
  if (steps.value.length > 1) {
    steps.value.splice(index, 1);
  }
};

// image code

const thumbnail = ref("");
const coverImage = ref(null);
const images = ref([]);
const immagesPreview = ref([]);

const removeImage = (index) => {
  immagesPreview.value.splice(index, 1);
  images.value.splice(index, 1);
};

const handleFileSelect = (e) => {
  const files = e.target.files;
  if (files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target.result;
        const base64Data = dataURL.split(",")[1];
        images.value.push(base64Data);
        if (!immagesPreview.value.includes(dataURL)) {
          immagesPreview.value.push(dataURL);
        }
        if (thumbnail.value === "") {
          thumbnail.value = dataURL;
          coverImage.value = base64Data;
        }
      };
      reader.readAsDataURL(file);
    }
  }
};

const handleFileEvent = () => {
  document.getElementById("file_input").click();
};

const handleThumbnailChange = (image) => {
  thumbnail.value = image;
  coverImage.value = image.split(",")[1];
};

function getFirstCategory() {
  return categories.value[0].category;
}

watch(getFirstCategory, (value) => {
  categoryError.value = "";
  console.log("category erro");
});

function getFirstIngridient() {
  return ingredients.value[0].ingredient;
}

watch(getFirstIngridient, (value) => {
  ingredientError.value = "";
  console.log("Ingridient error");
});

function getFirstSteps() {
  return steps.value[0].description;
}

watch(getFirstSteps, (value) => {
  stepsError.value = "";
  console.log("Steps error");
});

function getImages() {
  return images.value.length;
}

watch(getImages, (value) => {
  imagesError.value = "";
  console.log("images error");
});

// connect with backend
import authMutation from "~/composables/authMutation";
import addRecipe from "~/graphql/mutations/addRecipe.gql";
import addImage from "~/graphql/mutations/addImage.gql";

const coverUrl = ref("");
const imagesUrl = ref([]);

const {
  mutate: imageMutation,
  onError: imageError,
  onDone: imageDone,
  loading: imageLoading,
} = authMutation(addImage);
const isFormValid = ref(true);
const handleError = () => {
  if (!categories.value[0].category) {
    categoryError.value = "Category is required";
    isFormValid.value = false;
  }
  if (!ingredients.value[0].ingredient) {
    ingredientError.value = "Ingredient is required";
    isFormValid.value = false;
  }

  if (!steps.value[0].description) {
    stepsError.value = "Step is required";
    isFormValid.value = false;
  }

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
  if (images.value.length < 1) {
    imagesError.value = "images is required";
    isFormValid.value = false;
  }
  if (!ingredients.value[0].amount) {
    amountError.value = "amount is required";
    isFormValid.value = false;
  }
};
const handleUpload = () => {
  handleError();
  if (!isFormValid.value) {
    return;
  }

  for (let i = 0; i < images.value.length; i++) {
    if (images.value[i] === coverImage.value) {
      images.value.splice(i, 1);
    }
  }
  images.value.unshift(coverImage.value);
  imageMutation({ images: images.value });
};

const restoreError = () => {
  console.log("restore");

  isFormValid.value = true;
};

const {
  mutate: addRecipeMutation,
  onError: addRecipeError,
  onDone: addRecipeDone,
  loading: addRecipeLoading,
} = authMutation(addRecipe);

const handleSubmit = () => {
  let input = {
    title: title.value,
    duration: duration.value,
    description: description.value,
    user_id: store.user.id,
    recipe_ingredients: {},
    recipe_categories: {},
    steps: {},
    recipe_images: {},
  };
  var recipe_ingredients = [];
  var recipe_categories = [];
  var recipe_steps = [];
  var recipe_images = [];

  ingredients.value.forEach((ingredient) => {
    if (ingredient.ingredient && ingredient.amount) {
      recipe_ingredients.push({
        ingredient_id: ingredient.ingredient.id,
        amount: ingredient.amount,
      });
    }
  });

  recipe_categories = categories.value.map((category) => {
    if (category.category) {
      return { category_id: category.category.id };
    }
  });

  recipe_steps = steps.value.map((step, index) => {
    if (step.description) {
      return { description: step.description, step: index + 1 };
    }
  });

  recipe_images = imagesUrl.value.map((image) => {
    return { image_url: image };
  });

  input.recipe_ingredients.data = recipe_ingredients;
  input.recipe_categories.data = recipe_categories;
  input.steps.data = recipe_steps;
  input.recipe_images.data = recipe_images;
  input.coverImage = coverUrl.value;

  addRecipeMutation({ input });

  addRecipeDone((response) => {
    toast.success("Recipe successfully added", {
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });

    navigateTo(`/recipe/${response?.data?.insert_recipes?.returning[0].id}`);
  });

  addRecipeError((error) => {
    toast.error("Something went wrong");
    alert(error);
  });
};

imageDone((response) => {
  coverUrl.value = response?.data?.imageUpload?.urls.shift();
  imagesUrl.value = response?.data?.imageUpload?.urls;
  handleSubmit();
});

imageError((error) => {
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
