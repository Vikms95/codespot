import { useEffect, useState } from 'react';

export const useFetch = (fetcher, args, dependencies = '') => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

    // Do I need to pass in the arguments?
  const commitFetch = async () => {
    console.log(fetcher, args)
    setError(false)
    setLoading(true)

    try {
      const res = await fetcher(...args)
      setData(res)
    }catch(err) {
      setError(err)
    }
    setLoading(false)
  }

	useEffect(() => {
    commitFetch(args)
	}, [...dependencies]);

	return [{
		data,
		loading,
		error,
		setData
	}, commitFetch];
};
