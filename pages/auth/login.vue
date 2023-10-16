<script setup>
import Login from "~/graphql/auth/login.gql";
import { useAuthStore } from "~/stores/auth";
import Cookies from "js-cookie";
import { toast } from "vue3-toastify";

import { useForm } from "vee-validate";
import * as yup from "yup";

const authStore = useAuthStore();
const { mutate, onDone, loading, onError } = authentication(Login);

const { defineInputBinds, handleSubmit, errors, setFieldError } = useForm({
	validationSchema: yup.object({
		email: yup.string().email().required(),
		password: yup.string().min(6).required(),
	}),
});

const email = defineInputBinds("email");
const password = defineInputBinds("password");

const onSubmit = handleSubmit((values, { setFieldError }) => {
	console.log(values); // send data to API
	const input = {
		email: values.email,
		password: values.password,
	};
	mutate(input);
});

onDone((result) => {
	toast.success("user loggedin", {
		transition: toast.TRANSITIONS.FLIP,
		position: toast.POSITION.TOP_RIGHT,
	});

	Cookies.set("auth_token", result.data.login.token, { expires: 7 });
	authStore.setToken(result.data.login.token);
	authStore.setId(result.data.login.id);
	authStore.setUser(result.data.login.id);
	authStore.setRole(result.data.login.role);
	navigateTo("/user/recipes");
});
onError((error) => {
	if (error.message.includes("Invalid")) {
		setFieldError("email", "Invalid email or password");
		setFieldError("password", "Invalid email or password");
	} else {
		toast.error("Something went wrong", {
			transition: toast.TRANSITIONS.FLIP,
			position: toast.POSITION.TOP_RIGHT,
		});
	}
});
</script>

<style></style>

<template>
	<div class="flex h-screen items-center justify-center">
		<form
			@submit.prevent="onSubmit"
			class="flex flex-col bg-gradient-to-b from-orange-300 via-orange-500 to-orange-700 w-[350px] h-[350px] px-4 rounded-2xl text-white shadow-2xl -rotate-3 hover:rotate-0 hover:scale-110 hover:-translate-y-1 duration-500"
		>
			<h2 class="mx-auto mt-6 text-3xl font-medium">login</h2>

			<div class="mt-4 w-full">
				<span class="text-white">{{ errors.email }}</span>
				<input
					class="mx-auto px-[35px] py-[10px] text-gray-800 rounded-lg outline-none shadow-xl"
					type="email"
					:class="{ 'text-red-500': errors.email }"
					placeholder="Enter your email ..."
					v-bind="email"
				/>
			</div>
			<div class="mt-2 w-full">
				<span class="text-white">{{ errors.password }}</span>
				<input
					class="mx-auto px-[35px] py-[10px] rounded-lg text-gray-800 outline-none shadow-xl"
					type="password"
					placeholder="Enter your password ..."
					v-bind="password"
				/>
			</div>
			<button
				class="mx-auto mt-8 bg-white text-gray-800 text-lg font-medium py-2 px-12 mt-6 rounded-lg shadow-md hover:scale-100 hover:-translate-y-1 duration-500"
				:class="{ 'opacity-50': loading }"
				:disabled="loading"
			>
				{{ loading ? "Logging In" : "Log in" }}
			</button>
			<span class="mx-auto mt-2">
				Don't have an account?
				<NuxtLink class="underline" to="/auth/signup">Sign up</NuxtLink>
			</span>
		</form>
	</div>
</template>
