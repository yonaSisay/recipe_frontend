export default function (query, variables) {
	const { onResult, loading, onError, refetch } = useQuery(
		query,
		variables,
		() => ({
			fetchPolicy: "network-only",
			clientId: "authClient",
			context: {
				headers: {
					"x-hasura-role": "user",
				},
			},
		})
	);
	return {
		refetch,
		onResult,
		onError,
		loading,
	};
}
