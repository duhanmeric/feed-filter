"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    currentPart: number;
    maxPartCount: number;
}

const Pagination = ({ currentPart, maxPartCount }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePrev = () => {
        if (currentPart === 1) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("part", `${currentPart - 1}`);

        router.push(`${pathname}?${params.toString()}`)
    }

    const handleNext = () => {
        if (currentPart === maxPartCount) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("part", `${currentPart + 1}`);

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="space-x-4">
            <Button disabled={currentPart === 1} onClick={handlePrev}>
                Prev
            </Button>
            <Button disabled={currentPart === maxPartCount} onClick={handleNext}>Next</Button>
        </div>
    )
}

export default Pagination