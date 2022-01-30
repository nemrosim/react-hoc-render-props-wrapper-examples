import { useEffect, useState } from "react";
import { UseFetchDataProps } from "./types";

export const useFetchData = ({fetchedData, userId}: UseFetchDataProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState<Array<any>>();

    useEffect(() => {
        setIsLoading(true);
        const url = `https://jsonplaceholder.typicode.com/${fetchedData}?userId=${userId}`;

        fetch(url)
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch(e => setError(e))
            .finally(() => setIsLoading(false));
    }, [fetchedData, userId]);

    return {data, isLoading, error};
}
