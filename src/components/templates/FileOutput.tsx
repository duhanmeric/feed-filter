"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";
import { processFile } from "@/actions/file.actions";

type Props = {
  keys: string[];
};

const FileOutput = ({ keys }: Props) => {
  const [localFile, setLocalFile] = useState<
    { [key: string]: string }[] | null
  >(null);

  useEffect(() => {
    const getFile = async () => {
      const res = await processFile(keys);

      if (res.success) {
        setLocalFile(res.data);
      }
    };

    getFile();
  }, [keys]);

  const columns: ColumnDef<any>[] =
    keys.map((key: string) => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    })) ?? [];

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-5">Feed Result Table</h1>
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
