import { CommonWrapperTypes } from "../types";

export interface RenderPropsProps extends CommonWrapperTypes {
    userId: string;
    title: string;
    render: (props: Array<any>) => JSX.Element;
}
