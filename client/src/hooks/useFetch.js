import { useEffect, useState } from 'react';
import { formatError } from '../utils/formatError';

export const useFetch = (fetcher, args = [], dependencies = '') => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const commitFetch = async () => {
		setError(false);
		setLoading(true);

		try {
			const response = await fetcher(...args);
			setData(response);
      setLoading(false);
      return response

		} catch (err) {
			const formattedError = formatError(err);
			setError(formattedError);
      setLoading(false);
		}
	};

	useEffect(() => {
    if(dependencies){
      commitFetch(args);
    }
	}, [...dependencies]);

	return [
		{
			data,
			loading,
			error,
			setData,
		},
		commitFetch,
	];
};
