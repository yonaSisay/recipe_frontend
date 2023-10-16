import { useAuthStore } from "@/stores/auth";
export default defineNuxtRouteMiddleware((to, from, next) => {
	console.log("setup.global.js this is the global middleware");
	const authStore = useAuthStore();
	if (!authStore.isAuthenticated) {
		authStore.autoLogin();
	}
	return;
});
