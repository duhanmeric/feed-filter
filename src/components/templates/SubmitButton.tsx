import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Props = {
    title: string;
};

export default function SubmitButton({ title }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button className="w-full" type="submit" aria-disabled={pending} disabled={pending}>
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>Please wait</span>
                </>
            ) : (
                <span>{title}</span>
            )}
        </Button>
    );
}
