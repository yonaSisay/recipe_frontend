<script setup>
const props = defineProps({
	user: {
		type: Object,
	},
});

const toUser = (id) => {
	navigateTo(`/profile/${id}`);
};
</script>

<template>
	<div @click="toUser(user?.id)" class="cursor-pointer pb-6 backdrop-blur-xl">
		<div
			class="bg-white dark:bg-[#5C5470] w-[200px] h-[230px] shadow-md rounded-xl overflow-hidden brightness-100 hover:brightness-50"
		>
			<img
				:src="user?.image_url"
				alt="Avatar"
				class="w-full h-full object-cover"
			/>
		</div>
		<div class="flex justify-between px-4">
			<h2
				class="text-xl text-center text-orange-400 dark:text-[#B9B4C7] font-small text-xs mt-2"
			>
				{{ `${user?.first_name}  ${user?.last_name}` }}
			</h2>
			<h2
				class="text-xl text-center text-orange-400 dark:text-[#B9B4C7] font-small text-xs mt-2"
			>
				{{ user?.recipes_aggregate.aggregate.count }} recipes
			</h2>
		</div>
	</div>
</template>
<script></script>
