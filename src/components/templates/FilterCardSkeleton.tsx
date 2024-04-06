import { Skeleton } from "../ui/skeleton";

const FilterCardSkeleton = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                <div>
                    <Skeleton className="h-[24px] w-[110px] rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Skeleton className="hidden h-10 w-20 md:block" />
                    <Skeleton className="size-10" />
                    <Skeleton className="size-10" />
                    <Skeleton className="size-10" />
                    <Skeleton className="size-10" />
                    <Skeleton className="size-10" />
                    <Skeleton className="hidden h-10 w-20 md:block" />
                </div>
            </div>
            <div className="my-4">
                <Skeleton className="h-[500px] w-full rounded-sm" />
            </div>
            <div className="flex items-center justify-end gap-2">
                <Skeleton className="hidden h-10 w-20 md:block" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="size-10" />
                <Skeleton className="hidden h-10 w-20 md:block" />
            </div>
        </div>
    );
};

export default FilterCardSkeleton;
