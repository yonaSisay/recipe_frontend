<template>
	<div class="max-w-[15rem] w-full">
		<VueSlider
			v-model="filterValue.duration_range"
			width="100%"
			height="10px"
			:min="0"
			:max="100"
			:dot-handle="{ background: '#009688' }"
			:tooltipStyle="{ backgroundColor: 'black' }"
			:dot-style="{
				background: '#fff',
				border: '4px solid #FB923C',
				width: '16px',
				height: '16px',
				top: '8px',
				padding: '1px',
			}"
			:railStyle="{ background: '#f2c29a', height: '7px' }"
			:processStyle="{ background: '#FB923C', height: '7px' }"
		>
		</VueSlider>
		<div class="flex justify-between space-x-2">
			<p class="text-grayText dark:text-darkGrayText text-sm">
				{{ filterValue.duration_range[0] }} min
			</p>
			<p class="text-grayText dark:text-darkGrayText text-sm">
				{{ filterValue.duration_range[1] }} min
			</p>
		</div>
	</div>
</template>

<script setup>
const filterValue = ref({
	duration_range: [20, 70],
});
</script>

<style scoped></style>
