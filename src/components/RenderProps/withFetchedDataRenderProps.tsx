import React, { PropsWithChildren, ReactElement } from "react";
import { Cards, CardsProps } from "../Cards";
import { RenderProps } from "./RenderProps";

type WithFetchedDataRenderProps<T> = (
    WrappedComponent: React.ComponentType<CardsProps>,
    context: { fetchedData: 'albums' | 'posts' }
) => React.FC<T>;

interface HOCProps {
    userId: string;
    title: string;
}

export const withFetchedDataRenderProps: WithFetchedDataRenderProps<HOCProps> = (WrappedComponent, context) => {
    return ({userId, title}: PropsWithChildren<HOCProps>): ReactElement => {
        return (
            <RenderProps userId={userId}
                         fetchedData={context.fetchedData}
                         title={title}
                         render={(data) => {
                             return <WrappedComponent data={data} title={title}/>
                         }}
            />
        );
    }
}

export const AlbumsRenderProps = withFetchedDataRenderProps(Cards, {
    fetchedData: 'albums'
})
