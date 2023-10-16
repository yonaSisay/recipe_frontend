<template>
	<section class="lg:h-screen bg-orange-400 p-8 flex flex-wrap items-center">
		<div class="w-full lg:w-1/2">
			<img
				src="https://res.cloudinary.com/djfvqd23n/image/upload/v1697412220/rLTpDrObxtSY5bYzlm.jpg"
				alt="Recipe Image"
				class="w-full h-auto rounded-lg shadow-lg"
			/>
		</div>
		<div class="w-full lg:w-1/2 text-white p-8">
			<h2 class="text-3xl font-bold mb-4">About Our Recipe Sharing Website</h2>
			<p class="text-lg mb-4">
				Welcome to our vibrant recipe sharing community. At our website, we are
				passionate about making cooking a delightful journey for everyone.
				Whether you're an experienced chef or just starting, you'll find a
				treasure trove of delicious recipes, tips, and inspiration to take your
				culinary skills to new heights.
			</p>
			<p class="text-lg">
				Our platform is designed to bring food enthusiasts together, share
				experiences, and celebrate the art of home cooking. From mouthwatering
				family classics to trendy and exotic dishes, our diverse collection
				ensures there's something for everyone.
			</p>
		</div>
	</section>
</template>

<script setup>
definePageMeta({
	layout: "custom",
});
</script>

<style lang="scss" scoped></style>
