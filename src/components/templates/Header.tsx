import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { deleteFiles } from "@/actions/file.actions";

const Header = () => {
    return (
        <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                <Link href="/">feed-filter</Link>
                <div className="flex items-center gap-10">
                    <form action={deleteFiles}>
                        <Button size="sm" variant="outline">
                            Delete Files
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    );
};

export default Header;
