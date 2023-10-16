<template>
	<div>
		<div class="flex gap-x-2">
			<label for="Ingredient" class="block text-gray-700 text-sm font-bold mb-2"
				>Ingredients</label
			>
			<button
				@click="openEditModal"
				class="w-full flex text-orange-700 text-sm font-bold"
			>
				New ingredient
			</button>
			<ModalsIngred v-if="isEditModalOpen" @close="closeEditModal" />
		</div>

		<div v-for="(ingredient, index) in ingredients" :key="index">
			<div class="flex items-center space-x-2 mb-2">
				<ComboboxIngred v-model="ingredient.ingredient_id" class="w-full" />

				<input
					v-model="ingredient.amount"
					class="w-24 px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				/>

				<img
					@click="removeIngredient(index)"
					class="w-6 h-6 cursor-pointer"
					src="/img/delete.svg"
				/>
			</div>
		</div>

		<button
			@click="addIngredient"
			class="flex text-orange-700 text-sm font-bold mb-2"
		>
			Add
		</button>
	</div>
</template>

<script setup>
const ingredients = ref([{ ingredient_id: null, amount: null }]);

const addIngredient = () => {
	ingredients.value.push({ ingredient_id: null, amount: null });
};

const removeIngredient = (index) => {
	ingredients.value.splice(index, 1);
};
const isEditModalOpen = ref(false);
function openEditModal() {
	isEditModalOpen.value = true;
}
function closeEditModal() {
	isEditModalOpen.value = false;
}
</script>
