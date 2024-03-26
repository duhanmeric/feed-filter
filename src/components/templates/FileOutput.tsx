"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { processFile } from "@/actions/file.actions";

type Props = {
    fileName: string;
};

const FileOutput = ({ fileName }: Props) => {
    const [localFile, setLocalFile] = useState<
        { [key: string]: string }[] | null
    >(null);
    const [localKeys, setLocalKeys] = useState<string[]>([]);

    useEffect(() => {
        const getFile = async () => {
            const res = await processFile(fileName);
            console.log(res);

            if (res.success) {
                console.log(res.data);

                if (res.data?.keys) {
                    setLocalKeys(res.data.keys);
                }
                setLocalFile(res.data?.items);
            }
        };

        getFile();
    }, [fileName]);

    const columns: ColumnDef<any>[] =
        localKeys.map((key: string) => ({
            accessorKey: key,
            header: key.charAt(0).toUpperCase() + key.slice(1),
        })) ?? [];

    return (
        <div className="mt-10">
            <h1 className="mb-5 text-2xl font-bold">Feed Result Table</h1>
            {localFile && localFile.length > 0 && (
                <DataTable columns={columns} data={[...localFile]} />
            )}
            <br />
            {/* {<pre>{JSON.stringify(keys, null, 2)}</pre>} */}
            {/* {<pre>{JSON.stringify(localFile, null, 2)}</pre>} */}
        </div>
    );
};

export default FileOutput;
