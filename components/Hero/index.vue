<template>
	<div class="bg-white mt-7">
		<div
			class="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8"
		>
			<div class="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-24">
				<p
					class="text-orange-500 text-sm font-semibold uppercase tracking-wide"
				>
					Delicious Recipes
				</p>
				<h1
					class="text-3xl sm:text-4xl lg:text-5xl pb-4 font-extrabold text-gray-900 leading-tight mb-4"
				>
					Discover a world of culinary delights
				</h1>
				<h3 class="text-lg text-gray-700 mb-6">
					Explore a wide variety of recipes from appetizers to desserts.
				</h3>
				<NuxtLink
					to="/recipe"
					class="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none focus:ring focus:ring-orange-300 focus:ring-opacity-50"
					>Get Started</NuxtLink
				>
			</div>

			<div class="lg:w-1/2">
				<img src="/img/hero.png" alt="Delicious Food" class="w-full h-auto" />
			</div>
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
