"use client";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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

    useEffect(() => {
        if (currentPage > totalPageCount) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", `${totalPageCount}`);

            router.push(`${pathname}?${params.toString()}`)
        } else if (currentPage < 1) {
            const params = new URLSearchParams(searchParams.toString());
            params.set("page", "1");

            router.push(`${pathname}?${params.toString()}`)
        }
    }, [currentPage, pathname, router, searchParams, totalPageCount])

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