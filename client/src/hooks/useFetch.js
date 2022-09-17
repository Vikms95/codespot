import { useEffect, useState } from 'react';
import { formatError } from '../utils/formatError';

export const useFetch = (fetcher, initialArgs = '', dependencies = '') => {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);

	const commitFetch = async (args) => {
		setError(false);
		setLoading(true);

		try {
			const response = await fetcher(...initialArgs || args);

      setLoading(false);
			setData(response);
      
      // We return a response to the exterior context to
      // give a synced response about the fetch success
      return response

		} catch (err) {
			const formattedError = formatError(err);

      setLoading(false);
			setError(formattedError);
		}
	};

	useEffect(() => {
    if(dependencies){
      commitFetch(initialArgs);
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
