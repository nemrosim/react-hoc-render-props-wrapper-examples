import React, { NamedExoticComponent } from "react";
import { State } from "../../State";
import { useFetchData, UseFetchDataProps } from "../../hooks";
import { CardsProps } from "../../Cards";

export interface WrapperProps extends Pick<UseFetchDataProps, 'fetchedData'> {
    userId: string;
    title: string;
}

export const Wrapper: React.FC<WrapperProps> = ({ userId, title, fetchedData, children }) => {
    const { data, isLoading, error } = useFetchData({ userId, fetchedData });

    // ============  COMMON  ===============
    if (isLoading) {
        return <State.Loading title={title}/>;
    }

    if (error || !data) {
        return <State.Error title={title}/>;
    }

    if (!data?.length) {
        return <State.Empty/>
    }
    // =====================================

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

