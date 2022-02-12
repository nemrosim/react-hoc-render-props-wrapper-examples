import React from "react";
import { Cards, CardsProps } from "../../Cards";
import { RenderProps } from "./RenderProps";
import { UseFetchDataProps } from "../../hooks";

type WithFetchedDataRenderProps<T> = (
    WrappedComponent: React.ComponentType<CardsProps>,
    context: Pick<UseFetchDataProps, 'fetchedData'>
) => React.FC<T>;

interface HOCProps {
    userId: string;
    title: string;
}

export const withFetchedDataRenderProps: WithFetchedDataRenderProps<HOCProps> = (WrappedComponent, context) => {
    return ({ userId, title }) => {
        return (
            <RenderProps
                userId={userId}
                fetchedData={context.fetchedData}
                title={title}
                render={(data) => {
                    return <WrappedComponent data={data} title={title}/>
                }}
            />
        );
    }
}

const Posts = withFetchedDataRenderProps(Cards, { fetchedData: 'posts' });
const Albums = withFetchedDataRenderProps(Cards, { fetchedData: 'albums' });

export const WithRenderProps = {
    Posts,
    Albums
}
