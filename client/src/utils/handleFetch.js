export const fetchData = (fetcher, args, dependencies = '') => {
	let data = '';
	let loading = false;
	const error = '';

		loading = true;

		fetcher(args)
			.then(res => {
				data = res;
				setLoading(false);
			})
			.catch(err => {
				setLoading(false);
				setError(err);
			});

	return {
		data,
		loading,
		error
	};
};