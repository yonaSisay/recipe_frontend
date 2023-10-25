<script setup>
import { useAuthStore } from "~/stores/auth";
import changePass from "~/graphql/auth/changePass.gql";
import useMutation from "@/composables/authMutation";
import { toast } from "vue3-toastify";
import * as yup from "yup";

const store = useAuthStore();
const { mutate, onDone, loading, onError } = useMutation(changePass);

const { defineInputBinds, handleSubmit, errors, setFieldError } = useForm({
	validationSchema: yup.object({
		password: yup.string().required("Password is required"),
		newPassword: yup
			.string()
			.min(6, "Password must be at least 6 characters")
			.required("Password is required"),
		newPasswordConfirm: yup
			.string()
			.oneOf([yup.ref("newPassword"), null], "Passwords must match")
			.required("Password confirmation is required"),
	}),
});

const password = defineInputBinds("password");
const newPassword = defineInputBinds("newPassword");
const newPasswordConfirm = defineInputBinds("newPasswordConfirm");

const onSubmit = handleSubmit((values, { setFieldError }) => {
	mutate({
		password: values.password,
		newPassword: values.newPassword,
		email: store.user?.email,
	});
});

onDone((result) => {
	toast.success("password updated", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});
});

onError((error) => {
	if (error.message.includes("Invalid")) {
		setFieldError("password", "Invalid password");
	} else {
		toast.error("Something went wrong", {
			transition: toast.TRANSITIONS.FLIP,
			position: toast.POSITION.TOP_RIGHT,
		});
	}
});
</script>

<template>
	<form
		@submit.prevent="onSubmit"
		class="w-full p-6 bg-white dark:bg-[#5C5470] rounded-lg shadow-md mt-4"
	>
		<label
			class="py-4 block text-gray-700 dark:text-white text-xl font-bold mb-2"
			for="password"
			>Password Settings</label
		>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="password"
				>Enter your password</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.password
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="password"
				id="password"
				v-bind="password"
			/>
		</div>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="confirm-password"
				>Enter your new password</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.newPassword
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="password"
				id="newPassword"
				v-bind="newPassword"
			/>
		</div>
		<div class="mb-4">
			<label
				class="block text-gray-700 dark:text-white text-sm font-bold"
				for="confirm-password"
				>Confirm your new password</label
			>
			<span class="block text-red-500 text-sm font-bold mb-1" for="name">{{
				errors.newPasswordConfirm
			}}</span>
			<input
				class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-500"
				type="password"
				id="newPasswordConfirm"
				v-bind="newPasswordConfirm"
			/>
		</div>
		<div>
			<button
				class="bg-orange-400 dark:bg-[#B9B4C7] text-white py-2 ml-2 px-4 rounded-lg hover:bg-orange-600 focus:outline-none focus:bg-orange-600"
				:disabled="loading"
				:class="{ 'opacity-50': loading }"
			>
				{{ loading ? "Submiting..." : "Submit" }}
			</button>
		</div>
	</form>
</template>
<style lang="scss" scoped></style>
