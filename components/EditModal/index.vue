<template>
	<div class="fixed inset-0 flex items-center justify-center z-50">
		<div
			@click="closeModal"
			class="fixed inset-0 bg-gray-600 bg-opacity-50"
		></div>

		<div
			class="w-[95vw] h-[95vh] bg-white w-1/2 flex flex-col gap-4 p-4 z-10 rounded-2xl shadow-xl"
		>
			<div class="flex flex-wrap gap-x-4">
				<div class="w-[60%] mb-4">
					<label for="title" class="block text-gray-700 text-sm font-bold mb-2"
						>Title</label
					>
					<input
						type="text"
						id="title"
						name="title"
						required
						class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
					/>
				</div>
				<div>
					<label
						for="description"
						class="block text-gray-700 text-sm font-bold mb-4"
						>Thumbnail image</label
					>
					<label
						for="ingredientImage"
						class="w-48 text-gray-400 px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500 cursor-pointer"
					>
						<input
							type="file"
							id="ingredientImage"
							name="ingredientImage"
							accept="image/*"
							required
							class="hidden"
						/>
						Add image
					</label>
				</div>
				<div class="w-[25%] mb-4">
					<label
						for="duration"
						class="block text-gray-700 text-sm font-bold mb-2"
						>Duration</label
					>
					<input
						type="text"
						id="duration"
						name="duration"
						required
						class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
					/>
				</div>
			</div>
			<div class="mb-4">
				<label
					for="description"
					class="block text-gray-700 text-sm font-bold mb-2"
					>Description</label
				>
				<textarea
					id="description"
					name="description"
					required
					class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				></textarea>
			</div>
			<DynamicCate />
			<Dynamic />

			<button
				type="submit"
				class="mb-6 w-24 text-sm bg-orange-400 text-white py-2 px-2 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
			>
				publish
			</button>
		</div>
	</div>
</template>

<script setup>
const emit = defineEmits(["close"]);
function closeModal() {
	emit("close");
}
</script>

<style></style>
