import React, { useEffect, useState } from "react";
import { Cards, CardsProps } from "../Cards";

type WithFetchedData<T> = (
    WrappedComponent: React.ComponentType<CardsProps>,
    context: { fetchedData: 'albums' | 'posts' }
) => React.FC<T>;

interface HOCProps {
    userId: string;
    title: string;
}

export const withFetchedData: WithFetchedData<HOCProps> = (WrappedComponent, context) => {
    const HOC: React.FC<HOCProps> = ({userId, title}) => {
        const [isLoading, setIsLoading] = useState(false);
        const [error, setError] = useState(null);
        const [data, setData] = useState<Array<any>>();

        useEffect(() => {
            setIsLoading(true);
            const url = `https://jsonplaceholder.typicode.com/${context.fetchedData}?userId=${userId}`;

            fetch(url)
                .then((response) => response.json())
                .then((json) => setData(json))
                .catch(e => setError(e))
                .finally(() => setIsLoading(false));
        }, [userId]);

        if (isLoading) {
            return (<h1>{title}. LOADING....</h1>);
        }

        if (error || !data) {
            return (<h1>{title}. Error....</h1>);
        }

        if (!data?.length) {
            return (<h1>Result is empty</h1>)
        }

        return <WrappedComponent data={data} title={title}/>;
    }

    return HOC;
};

export const Posts = withFetchedData(Cards, {fetchedData: 'posts'});
export const Albums = withFetchedData(Cards, {fetchedData: 'albums'});
