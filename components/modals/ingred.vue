<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      @click="closeModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50"
    ></div>

    <div
      class="bg-white h-auto w-1/3 flex-col gap-y-4 p-4 z-10 rounded-2xl shadow-xl"
    >
      <label for="Ingredient" class="block text-gray-700 text-sm font-bold mb-2"
        >Add ingredients</label
      >
      <input
        placeholder="Ingredient name"
        v-model="name"
        class="w-full mb-2 px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
      />
      <div>
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
                  Select image
                </p>
              </div>
            </label>
          </div>
        </div>
        <div v-else class="mt-4 flex justify-center gap-x-4">
          <div
            v-for="(image, index) in imagesPreview"
            :key="image.toString()"
            class="relative h-max"
          >
            <img
              :src="image.toString()"
              alt="Ingredient image"
              class="aspect-video object-cover w-48 h-32 rounded-lg cursor-pointer"
            />
            <span
              @click="removeImage(index)"
              class="absolute top-0 right-0 cursor-pointer z-50"
              ><Icon name="uil:x" size="25px" class="text-white"
            /></span>
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

      <button
        type="submit"
        class="w-full text-sm bg-orange-400 text-white py-2 px-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
        @click="handleUpload"
        :disabled="submitLoading || imageLoading"
      >
        {{ submitLoading || imageLoading ? "Adding..." : "Add" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import authMutation from "@/composables/authMutation";
import addIngredient from "@/graphql/mutations/addIngredient.gql";
import addImage from "~/graphql/mutations/addImage.gql";
import { toast } from "vue3-toastify";

const name = ref("");
const images = ref([]);
const imagesPreview = ref([]);
const image = ref("");

const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}

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
        if (!imagesPreview.value.includes(dataURL)) {
          imagesPreview.value.push(dataURL);
        }
      };
      reader.readAsDataURL(file);
    }
  }
  console.log("images", images.value);
};

const handleFileEvent = () => {
  document.getElementById("file_input").click();
};

const removeImage = (index) => {
  imagesPreview.value.splice(index, 1);
  images.value.splice(index, 1);
};

const {
  mutate: imageMutation,
  onError: imageError,
  onDone: imageDone,
  loading: imageLoading,
} = authMutation(addImage);

const handleUpload = () => {
  // console.log("images", images.value, coverImage.value, "called");
  imageMutation({ images: images.value });
};
const {
  mutate: addIngredientMutation,
  onError: addIngredientError,
  onDone: addIngredientDone,
  loading,
  submitLoading,
} = authMutation(addIngredient);

const handleSubmit = () => {
  addIngredientMutation({ name: name.value, image: image.value });

  addIngredientDone((response) => {
    toast.success("Ingredient successfully added", {
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
    closeModal();
  });
  addIngredientError((error) => {
    toast.error(error.message, {
      transition: toast.TRANSITIONS.FLIP,
      position: toast.POSITION.TOP_RIGHT,
    });
  });
};

imageDone((response) => {
  image.value = response?.data?.imageUpload?.urls.shift();
  handleSubmit();
});

imageError((error) => {
  toast.error(error.message);
});
</script>

<style></style>
