import React, { NamedExoticComponent } from "react";
import { CardsProps } from "../Cards";
import { Loading } from "../Loading";
import { Error } from "../Error";
import { Empty } from "../Empty";
import { useFetchData } from "../hooks";
import { WrapperProps } from "./types";

export const Wrapper: React.FC<WrapperProps> = ({userId, title, fetchedData, children}) => {
    const {data, isLoading, error} = useFetchData({userId, fetchedData});

    if (isLoading) {
        return <Loading title={title}/>;
    }

    if (error || !data) {
        return <Error title={title}/>;
    }

    if (!data?.length) {
        return <Empty/>
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

