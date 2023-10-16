<template>
	<div>
		<div class="flex gap-x-2 mb-2">
			<label for="Ingredient" class="block text-gray-700 text-sm font-bold"
				>Category</label
			>
			<button
				@click="openCateEditModal"
				class="flex text-orange-700 text-sm font-bold"
			>
				New category
			</button>

			<ModalsCate v-if="isEditCateModalOpen" @close="closeCateEditModal" />
		</div>

		<div v-for="(category, index) in categories" :key="index">
			<div class="flex items-center space-x-2 mb-2">
				<ComboboxCate v-model="category.name" class="w-full" />
				<img
					@click="removeCategory(index)"
					class="w-6 h-6 cursor-pointer"
					src="/img/delete.svg"
				/>
			</div>
		</div>

		<button
			@click="addCategory"
			class="mb-2 flex text-orange-700 text-sm font-bold"
		>
			Add
		</button>
	</div>
</template>

<script setup>
const categories = ref([{ name: null }]);
const addCategory = () => {
	const single = categories.value[categories.value.length - 1];
	if (single.name) {
		categories.value.push({ name: null });
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
</script>
