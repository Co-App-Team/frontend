import { useState, useCallback } from 'react';

const useApi = (apiFunc) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFunc(...args);
        setData(result);
        return result;
      } catch (err) {
        setError(err);

        // Re-throw to allow the component to use try/catch for specific logic
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc],
  );

  return { data, loading, error, request };
};

export default useApi;
