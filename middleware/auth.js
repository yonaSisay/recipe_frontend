import { useAuthStore } from "@/stores/auth";
export default defineNuxtRouteMiddleware((to, from, next) => {
	const authStore = useAuthStore();
	// if is logged in false and user has no token on cookie
	if (authStore.isAuthenticated) {
		return;
	} else {
		return navigateTo("/auth/login");
	}
});
