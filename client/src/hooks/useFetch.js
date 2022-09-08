import { useEffect,  useState } from 'react';

export const useFetch = (fetcher, args, dependencies = '') => {
	const [data, setData] = useState();
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

	useEffect(() => {
    setLoading(true)
    
		fetcher(args)
      .then(data => {
        setLoading(false)  
        setData(data)

      })
      .catch(err => {
        setLoading(false)
        setError(err)

      });

	}, [...dependencies]);

	return {
		data,
    loading,
    error,
		setData,
	};
};
