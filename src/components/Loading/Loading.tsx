import React, { FC } from "react";

export const Loading: FC<{ title: string }> = ({title}) => {
    return <h1>{title}. LOADING....</h1>
}
