"use client";

import {
    Pagination as ShadPagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {
    currentPage: number;
    totalPageCount: number;
};

const Pagination = ({ currentPage, totalPageCount }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleHref = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", `${page}`);
        return `${pathname}?${params}`;
    };


    return (
        <div>
            <ShadPagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={handleHref(Math.max(1, currentPage - 1))} />
                    </PaginationItem>


                    {Array.from({ length: Math.min(3, totalPageCount) }).map((_, idx) => {
                        let page = currentPage - 1 + idx;

                        if (currentPage <= 2) {
                            page = idx + 1;
                        }
                        else if (currentPage >= totalPageCount - 1) {
                            page = totalPageCount - 2 + idx;
                        }

                        return <PaginationItem key={page}>
                            <PaginationLink href={handleHref(page)} isActive={page === currentPage}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    })}


                    {currentPage < totalPageCount - 1 && totalPageCount > 3 && <PaginationItem><PaginationEllipsis /></PaginationItem>}
                    {currentPage < totalPageCount - 1 && totalPageCount > 3 && (
                        <PaginationItem>
                            <PaginationLink href={handleHref(totalPageCount)}>{totalPageCount}</PaginationLink>
                        </PaginationItem>
                    )}

                    <PaginationItem>
                        <PaginationNext href={handleHref(Math.min(totalPageCount, currentPage + 1))} />
                    </PaginationItem>
                </PaginationContent>
            </ShadPagination>
        </div>
    );
};

export default Pagination;
