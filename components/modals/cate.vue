<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <div
      @click="closeModal"
      class="fixed inset-0 bg-gray-600 bg-opacity-50"
    ></div>

    <div
      class="bg-white h-auto w-1/4 flex-col gap-y-4 p-2 z-10 rounded-2xl shadow-xl"
    >
      <label for="Category" class="block text-gray-700 text-sm font-bold mb-2"
        >Add category</label
      >

      <div class="flex">
        <input
          v-model="name"
          placeholder="Category name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
        />
      </div>
      <button
        :disabled="loading"
        @click="handleSubmit"
        type="submit"
        class="mt-4 w-24 text-sm bg-orange-400 text-white py-2 px-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
      >
        {{ loading ? "Adding..." : "Add" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import addCategory from "@/graphql/mutations/addCategory.gql";
import authMutation from "@/composables/auth.js";
import { toast } from "vue3-toastify";
const name = ref("");

const { mutate, loading, onError, onDone } = useMutation(addCategory);

const handleSubmit = () => {
  mutate({ name: name.value });
};

const emit = defineEmits(["close"]);
function closeModal() {
  emit("close");
}

onDone((data) => {
  toast.success("Category added successfully");
  closeModal();
});

onError((err) => {
  toast.error(err.message);
});
</script>

<style></style>
