import Link from "next/link";
import React, { Suspense } from "react";
import { Button } from "../ui/button";
import { clearFiles } from "@/actions/file.actions";
import DeleteDirButton from "./DeleteDirButton";
import Image from "next/image";

const Header = () => {
    return (
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <Link href="/" className="flex items-center gap-1">
                    <Image src="/logo.svg" alt="logo" width={32} height={32} />
                    <span className="font-semibold">Feed Filter</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Suspense fallback={"Loading..."}>
                        <DeleteDirButton />
                    </Suspense>
                    <form action={clearFiles}>
                        <Button size="sm" variant="outline">
                            Clear All Files
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Header;
