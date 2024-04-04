"use client";

import { deleteDirectory } from "@/actions/file.actions";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";

const DeleteDirButton = () => {
    const searchParams = useSearchParams();

    const clientAction = async () => {
        try {
            const fileName = searchParams.get('name');
            if (fileName) {
                await deleteDirectory(fileName);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form action={clientAction}>
            <Button size="sm" variant="destructive">
                Delete Directory
            </Button>
        </form>
    );
}

export default DeleteDirButton;