import { useEffect, useState } from 'react';

const useFetch = dataUrl => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async url => {
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (isMounted) {
          const data = await response.json();
          setData(data);
        }
      } catch (err) {
        if (isMounted) {
          console.log(err);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(dataUrl);

    const cleanUp = () => {
      isMounted = false;
    };

    return cleanUp;
  }, [dataUrl]);

  return { data, setData, isLoading };
};

export default useFetch;
