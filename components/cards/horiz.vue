<template>
	<div
		class="lg:w-full lg:max-h-32 bg-white shadow-lg rounded-lg overflow-hidden md:flex"
	>
		<div class="md:w-1/3 p-4">
			<img
				class="w-full max-h-48 lg:max-h-28 my-auto rounded-lg md:h-full object-cover"
				src="img/pasta.jpg"
				alt="Recipe Image"
			/>
		</div>

		<div class="md:w-2/3 p-4">
			<h2 class="text-lg font-semibold text-gray-900 mb-2">
				Pasta with Tomato Cream Sauce
			</h2>

			<p class="hidden md:block text-xs text-gray-600 mb-2">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
				auctor nunc eget nulla sagittis, nec laoreet libero suscipit. Sed nec
				hendrerit purus. Sed fringilla metus sit amet massa facilisis, eget
				tincidunt ligula feugiat.
			</p>

			<div class="flex flex-col md:flex-row gap-x-4">
				<div class="flex items-center text-yellow-500 mb-2">
					<svg
						class="w-4 h-4 fill-current mr-1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 1L12.2 6.7H17l-3.8 2.9 1.4 6.5L10 14.3l-4.6 3.8 1.4-6.5L3 6.7h4.8L10 1z"
						/>
					</svg>
					<span class="text-sm">4.5</span>
				</div>

				<div class="flex items-center text-gray-600 mb-2">
					<svg
						class="w-4 h-4 fill-current mr-1"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
					>
						<path
							d="M10 2.32l-.66-.65c-.64-.65-1.72-.65-2.36 0L6 2.95V1c0-.55-.45-1-1-1s-1 .45-1 1v1.95L2.66 1.67c-.64-.65-1.72-.65-2.36 0-.32.32-.39.81-.16 1.17l.59 1.32c.09.2.25.32.42.32h15c.17 0 .33-.12.42-.32l.59-1.32c.23-.36.16-.85-.16-1.17zM11 18.9l-1-1c-2.84-2.84-7.44-2.84-10.28 0-2.84 2.84-2.84 7.44 0 10.28 2.84 2.84 7.44 2.84 10.28 0l-1-1a1 1 0 0 1 0-1.42l1-1a1 1 0 0 1 1.42 0l1 1a1 1 0 0 1 0 1.42zM5 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm12 0c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"
						/>
					</svg>
					<span class="text-sm">120 Likes</span>
				</div>

				<div class="text-sm text-gray-500 mb-2">italian</div>

				<div class="text-sm text-gray-500">06/05/2021</div>
			</div>
		</div>
	</div>
</template>
