import React from "react";
import { useFetchData, UseFetchDataProps } from "../../hooks";
import { State } from "../../State";

export interface RenderPropsProps extends Pick<UseFetchDataProps, 'fetchedData'> {
    userId: string;
    title: string;
    render: (props: Array<any>) => JSX.Element;
}

export const RenderProps: React.FC<RenderPropsProps> = ({ userId, title, fetchedData, render }) => {
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

    return render(data);
};

