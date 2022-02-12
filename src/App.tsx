import React, { useState } from 'react';
import { Cards, HOC, RenderProps, WithRenderProps, Wrapper } from "./components";
import './App.css';

const EXAMPLE_TYPE: 'HOC' | 'Wrapper' | 'Render props' = 'Render props';

export const App: React.FC = () => {
    const [ userId, setUserId ] = useState('');

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    }

    const CommonComponents = (
        <>
            <h1>App</h1>
            <input type='number'
                   value={userId}
                   placeholder='Select user id'
                   onChange={handleOnChange}/>
        </>
    );

    if (EXAMPLE_TYPE === 'Render props') {
        // Render props Example
        return (
            <>
                {CommonComponents}
                <WithRenderProps.Albums userId={userId} title='Albums'/>
                <RenderProps userId={userId}
                             title='Posts'
                             fetchedData='posts'
                             render={(data) => {
                                 return <Cards data={data} title='Posts'/>
                             }}
                />
            </>
        );
    }

    if (EXAMPLE_TYPE === 'Wrapper') {
        // Component Wrapper Example
        return (
            <>
                {CommonComponents}
                <Wrapper userId={userId} title='Albums' fetchedData='albums'>
                    <Cards/>
                </Wrapper>
                <Wrapper userId={userId} title='Posts' fetchedData='posts'>
                    <Cards/>
                </Wrapper>
            </>
        );
    }

    if (EXAMPLE_TYPE === 'HOC') {
        // Higher-Order Component Example
        return (
            <>
                {CommonComponents}
                <HOC.Albums userId={userId} title='Albums'/>
                <HOC.Posts userId={userId} title='Posts'/>
            </>
        );
    }

    return null;
};
