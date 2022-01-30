import React from "react";
import { CardsProps } from "../Cards";
import { CommonWrapperTypes } from "../types";

export type WithFetchedData<T> = (
    WrappedComponent: React.ComponentType<CardsProps>,
    context: CommonWrapperTypes
) => React.FC<T>;

export interface HOCProps {
    userId: string;
    title: string;
}
