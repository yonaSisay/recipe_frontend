<script setup>
import { useAuthStore } from "~/stores/auth";
import updateUser from "~/graphql/mutations/updateUser.gql";
import useMutation from "@/composables/authMutation";
import { toast } from "vue3-toastify";
import * as yup from "yup";

const store = useAuthStore();
const { mutate, onDone, loading, onError } = useMutation(updateUser);

const { defineInputBinds, handleSubmit, errors, setFieldError } = useForm({
	validationSchema: yup.object({
		firstName: yup.string(),
		lastName: yup.string(),
		email: yup.string().email("Invalid email address"),
		bio: yup.string(),
	}),
});

const firstName = defineInputBinds("firstName");
const lastName = defineInputBinds("lastName");
const email = defineInputBinds("email");
const bio = defineInputBinds("bio");

const onSubmit = handleSubmit((values, { setFieldError }) => {
	const input = {
		first_name: values.firstName || store.user?.first_name,
		last_name: values.lastName || store.user?.last_name,
		email: values.email || store.user?.email,
		bio: values.bio || store.user?.bio,
	};
	mutate({ input, id: store.id });
});

onDone((result) => {
	toast.success("user updated", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

onError((error) => {
	toast.error("Something went wrong", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});
</script>

<template>
	<form
		@submit.prevent="onSubmit"
		class="w-full p-6 bg-white dark:bg-[#5C5470] rounded-lg shadow-md mt-4"
	>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="name"
				>Enter your new first name</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.firstName
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="text"
				id="first_name"
				:placeholder="store.user?.first_name"
				v-bind="firstName"
			/>
		</div>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="email"
				>Enter your new last name</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.lastName
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="text"
				id="last_name"
				:placeholder="store.user?.last_name"
				v-bind="lastName"
			/>
		</div>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="email"
				>Enter your new email</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.email
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="email"
				id="email"
				:placeholder="store.user?.email"
				v-bind="email"
			/>
		</div>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="bio"
				>Enter your new bio</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.bio
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="text-area"
				id="bio"
				placeholder="A brief description about yourself"
				v-bind="bio"
			/>
		</div>
		<div>
			<button
				class="bg-orange-400 dark:bg-[#B9B4C7] text-white py-2 ml-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
				:disabled="loading"
			>
				{{ loading ? "Changing..." : "Change" }}
			</button>
		</div>
	</form>
</template>

<style lang="scss" scoped></style>
