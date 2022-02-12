import { useEffect, useState } from "react";

export interface UseFetchDataProps {
    fetchedData: 'albums' | 'posts';
    userId: string;
}

const HOST = 'https://jsonplaceholder.typicode.com'

export const useFetchData = ({ fetchedData, userId }: UseFetchDataProps) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ data, setData ] = useState<Array<any>>();

    useEffect(() => {
        setIsLoading(true);
        const url = `${HOST}/${fetchedData}?userId=${userId}`;

        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch(e => setError(e))
            .finally(() => setIsLoading(false));
    }, [ fetchedData, userId ]);

    return { data, isLoading, error };
}
