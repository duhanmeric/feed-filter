"use client";

import { useFeedState } from "@/context/FeedContext";
import React from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

const FileOutput = () => {
  const { feedState } = useFeedState();

  const columns: ColumnDef<any>[] =
    feedState.data?.keys?.map((key: string) => ({
      accessorKey: key, // or accessorFn for more complex scenarios
      header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the header
    })) ?? [];

  return (
    <div>
      {feedState.data && feedState.data.keys && (
        <DataTable columns={columns} data={[...feedState.data.result]} />
      )}
      <br />
      {<pre>{JSON.stringify(feedState.data?.keys, null, 2)}</pre>}
      {<pre>{JSON.stringify(feedState.data?.result, null, 2)}</pre>}
    </div>
  );
};

export default FileOutput;
