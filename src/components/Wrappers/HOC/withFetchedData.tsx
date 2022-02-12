import React from "react";
import { State } from "../../State";
import { useFetchData, UseFetchDataProps } from "../../hooks";
import { Cards, CardsProps } from "../../Cards";

export type WithFetchedData<T> = (
    WrappedComponent: React.ComponentType<CardsProps>,
    context: Pick<UseFetchDataProps, 'fetchedData'>
) => React.FC<T>;

export interface HOCProps {
    userId: string;
    title: string;
}

export const withFetchedData: WithFetchedData<HOCProps> = (WrappedComponent, context) => {
    return ({ userId, title }) => {
        const { data, isLoading, error } = useFetchData({ userId, fetchedData: context.fetchedData });

        if (isLoading) {
            return <State.Loading title={title}/>;
        }

        if (error || !data) {
            return <State.Error title={title}/>;
        }

        if (!data?.length) {
            return <State.Empty/>
        }

        return <WrappedComponent data={data} title={title}/>;
    }
};

const Posts = withFetchedData(Cards, { fetchedData: 'posts' });
const Albums = withFetchedData(Cards, { fetchedData: 'albums' });

export const HOC = {
    Posts,
    Albums
}
