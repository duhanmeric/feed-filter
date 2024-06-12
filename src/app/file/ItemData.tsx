import type { FeedField } from "@/actions/helpers.actions";
import React from "react";

type Props = {
    items: FeedField[];
}

export default function ItemData({ items }: Props) {
    if (items.length === 0) {
        return (
            <div className="mb-4 flex h-[500px] items-center justify-center text-2xl font-bold">
                No items found
            </div>
        )
    }
    return (
        <div>
            {items.map((item, index) => (
                <div key={index} className="my-4 rounded-sm border border-black p-4">
                    <pre className="whitespace-break-spaces break-words text-sm">
                        {JSON.stringify(item, null, 2)}
                    </pre>
                </div>
            ))}
        </div>
    )
}