<template>
	<nav class="flex items-center justify-center my-12">
		<ul class="pagination">
			<li v-if="currentPage > 1" @click="changePage(currentPage - 1)">
				<a href="#" class="pagination-link">
					<i class="fas fa-chevron-left"></i>
				</a>
			</li>

			<li v-for="page in pages" :key="page" @click="changePage(page)">
				<a
					href="#"
					class="pagination-link focus:outline-none focus:ring focus:ring-orange-300"
					:class="{ 'pagination-current': currentPage === page }"
					>{{ page }}</a
				>
			</li>

			<li v-if="currentPage < totalPages" @click="changePage(currentPage + 1)">
				<a href="#" class="pagination-link">
					<i class="fas fa-chevron-right"></i>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import { ref, computed, defineProps, defineEmits } from "vue";

export default {
	setup(props) {
		const currentPage = ref(1);
		const totalPages = ref(40);
		const changePage = (page) => {
			if (page !== currentPage.value) {
				emit("page-change", page);
			}
		};

		const pages = computed(() => {
			const start = Math.max(currentPage.value - 2, 1);
			const end = Math.min(start + 10, totalPages.value);

			const pageArray = [];
			for (let page = start; page <= end; page++) {
				pageArray.push(page);
			}

			return pageArray;
		});

		const emit = defineEmits();
		return { changePage, pages };
	},
};
</script>

<style scoped>
/* Pagination styles */
.pagination {
	list-style: none;
	padding: 0;
	display: flex;
	gap: 1rem;
}

.pagination-link {
	padding: 0.5rem 1rem;
	background-color: #f59e0b; /* Orange color */
	color: white;
	border-radius: 0.25rem;
	cursor: pointer;
	transition: background-color 0.3s;
}

.pagination-link:hover {
	background-color: #e88304; /* Darker shade of orange */
}

.pagination-current {
	background-color: #e88304; /* Darker shade of orange for the current page */
}
</style>
