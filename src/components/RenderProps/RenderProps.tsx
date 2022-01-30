import React from "react";
import { useFetchData } from "../hooks";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { Empty } from "../Empty";
import { RenderPropsProps } from "./types";

export const RenderProps: React.FC<RenderPropsProps> = ({userId, title, fetchedData, render}) => {
    const {data, isLoading, error} = useFetchData({userId, fetchedData});

    if (isLoading) {
        return <Loading title={title}/>;
    }

    if (error || !data) {
        return <Error title={title}/>;
    }

    if (!data?.length) {
        return <Empty/>;
    }

    return (
        <>
            {render(data)}
        </>
    )
};

