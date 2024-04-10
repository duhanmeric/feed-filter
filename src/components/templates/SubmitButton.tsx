import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { TEST_SELECTORS } from "@/constants";

type Props = {
    title: string;
};

export default function SubmitButton({ title }: Props) {
    const { pending } = useFormStatus();

    return (
        <Button
            className="w-full"
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            data-testid={TEST_SELECTORS.SUBMIT_BUTTON}
        >
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
