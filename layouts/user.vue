<template>
	<div class="grid grid-cols-12 h-screen overflow-hidden">
		<NavbarAside class="col-span-2 h-full" />
		<div class="col-span-12 lg:col-span-10 h-full overflow-y-scroll">
			<slot />
		</div>
	</div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
