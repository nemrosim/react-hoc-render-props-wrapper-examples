import React from "react";
import { Cards } from "../Cards";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { Empty } from "../Empty";
import { useFetchData } from "../hooks";
import { HOCProps, WithFetchedData } from "./types";

export const withFetchedData: WithFetchedData<HOCProps> = (WrappedComponent, context) => {
    const HOC: React.FC<HOCProps> = ({userId, title}) => {
        const {data, isLoading, error} = useFetchData({userId, fetchedData: context.fetchedData});

        if (isLoading) {
            return <Loading title={title}/>;
        }

        if (error || !data) {
            return <Error title={title}/>;
        }

        if (!data?.length) {
            return <Empty/>
        }

        return <WrappedComponent data={data} title={title}/>;
    }

    return HOC;
};

export const Posts = withFetchedData(Cards, {fetchedData: 'posts'});
export const Albums = withFetchedData(Cards, {fetchedData: 'albums'});
