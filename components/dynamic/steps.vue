<template>
	<div>
		<label for="Ingredient" class="block text-gray-700 text-sm font-bold mb-2"
			>Steps</label
		>
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
			@click="addSteps"
			class="flex text-orange-700 text-sm font-bold p-2"
		>
			Add
		</button>
	</div>
</template>

<script setup>
const steps = ref([{ description: null }]);

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
</script>
