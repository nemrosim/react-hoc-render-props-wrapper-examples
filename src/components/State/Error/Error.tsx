import React, { FC } from "react";

export const Error: FC<{ title: string }> = ({ title }) => {
    return (
        <h1>
            {title}. Error....
        </h1>
    );
}
