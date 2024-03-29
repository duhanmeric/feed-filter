"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
    currentPage: number;
    totalPageCount: number;
}

const Pagination = ({ currentPage, totalPageCount }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handlePrev = () => {
        if (currentPage === 1) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${currentPage - 1}`);

        router.push(`${pathname}?${params.toString()}`)
    }

    const handleNext = () => {
        if (currentPage === totalPageCount) {
            return;
        }

        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${currentPage + 1}`);

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="space-x-4">
            <Button disabled={currentPage === 1} onClick={handlePrev}>
                Prev
            </Button>
            <Button disabled={currentPage === totalPageCount} onClick={handleNext}>Next</Button>
        </div>
    )
}

export default Pagination