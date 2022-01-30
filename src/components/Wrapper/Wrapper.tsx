import React, { NamedExoticComponent, useEffect, useState } from "react";
import { CardsProps } from "../Cards";

interface WrapperProps {
    fetchedData: 'albums' | 'posts';
    userId: string;
    title: string;
}

export const Wrapper: React.FC<WrapperProps> = ({userId, title, fetchedData, children}) => {
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

    if (React.Children.count(children) > 1) {
        return <h1>Error! More than 1 child!</h1>
    }

    if (React.Children.count(children) === 0) {
        return <h1>Error! No children</h1>
    }

    if (!React.isValidElement(children)) {
        return <h1>Not a valid child</h1>;
    }

    const child = React.Children.only(children);

    const displayName = (child.type as NamedExoticComponent).displayName;

    if (displayName !== 'Cards') {
        return <h1>{"Not a <Card/> child"}</h1>;
    }

    const props: CardsProps = {
        data,
        title,
    };

    return React.cloneElement(child, props);
};

