<script setup>
const users = ref([]);
import getUser from "@/graphql/query/getUser.gql";
import query from "@/composables/query";
const search = ref("");
const limit = ref(6);
const offset = ref(0);

const filter = computed(() => {
	let query = ref({});
	if (search.value) {
		query.value = {
			_or: [
				{ first_name: { _ilike: `%${search.value}%` } },
				{ last_name: { _ilike: `%${search.value}%` } },
			],
		};
	}

	return query.value;
});

const { onResult, loading, onError, refetch } = query(
	filter,
	{},
	limit,
	offset,
	getUser
);

onResult((result) => {
	console.log(result?.data);
	users.value = result?.data?.users;
});

onError((error) => {
	console.log(error);
});

const isDropdownOpen = ref(false);
onMounted(() => {
	window.addEventListener("click", () => {
		if (isDropdownOpen.value) {
			isDropdownOpen.value = false;
		}
	});
});
const toggle = (event) => {
	event.stopPropagation();
	isDropdownOpen.value = !isDropdownOpen.value;
};
const handleNavigate = (user) => {
	navigateTo(`/profile/${user.id}`);
};
</script>

<template>
	<div class="relative">
		<input
			v-model="search"
			type="text"
			placeholder="Search User"
			class="w-full px-4 py-1.5 lg:py-2 rounded-md shadow-md bg-orange-100 text-orange-600 placeholder-orange-300 focus:outline-none focus:ring focus:ring-orange-300"
			@click="toggle($event)"
		/>

		<div
			class="absolute z-10 mt-2 w-full py-2 bg-white rounded-md shadow-md"
			v-show="isDropdownOpen && users.length > 0"
		>
			<ul>
				<li
					v-for="(user, index) in users"
					:key="index"
					class="flex px-4 py-2 cursor-pointer shadow-sm hover:bg-gray-100"
					@click="handleNavigate(user)"
				>
					<img class="w-8 h-8 mr-2" :src="user?.image_url" alt="" />
					{{ `${user?.first_name} ${user?.last_name} ` }}
				</li>
			</ul>
		</div>
	</div>
</template>
