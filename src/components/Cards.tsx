import { FC } from "react";

export interface CardsProps {
    data?: Array<{ id: number, title: string }>;
    title?: string;
}

export const Cards: FC<CardsProps> = ({data, title}) => {
    if (!data && !title) {
        return (
            <h1>Forgot to Wrap?</h1>
        );
    }

    return (
        <>
            <h1>{title}</h1>
            <div className="Cards">
                {data?.map(post => (
                    <div key={post.id} className="Card">
                        {post.title}
                    </div>
                ))}
            </div>
        </>
    );
}

Cards.displayName = 'Cards'




