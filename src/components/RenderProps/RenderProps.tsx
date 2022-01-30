import React, { useEffect, useState } from "react";

interface RenderPropsProps {
    fetchedData: 'albums' | 'posts';
    userId: string;
    title: string;
    render: (props: Array<any>) => JSX.Element;
}

export const RenderProps: React.FC<RenderPropsProps> = ({userId, title, fetchedData, render}) => {
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

    if (isLoading) {
        return (<h1>{title}. LOADING....</h1>);
    }

    if (error || !data) {
        return (<h1>{title}. Error....</h1>);
    }

    if (!data?.length) {
        return (<h1>Result is empty</h1>)
    }

    return (
        <>
            {render(data)}
        </>
    )
};

