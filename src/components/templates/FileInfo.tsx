import type { Condition } from "@/actions/helpers.actions";
import { Badge } from "@/components/ui/badge";

type Props = {
    title: string;
    fileNameFromUrl: string;
    defaultKeys?: {
        key: string;
        condition: Condition;
        value: string | number;
    }[];
}

export default function FileInfo({ title, fileNameFromUrl, defaultKeys }: Props) {
    return (
        <>
            <h1 className="text-2xl font-bold">{title}</h1>
            <div>
                <span>Your file name: </span>
                <Badge variant="secondary">{fileNameFromUrl}</Badge>
            </div>
            {
                defaultKeys && (
                    <div className="my-2">
                        <span className="mr-2">Your filters:</span>
                        {defaultKeys.map((filter) => (
                            <Badge key={filter.key} className="mr-2">
                                {filter.key} {filter.condition} {filter.value}
                            </Badge>
                        ))}
                    </div>
                )
            }

        </>
    )
}
