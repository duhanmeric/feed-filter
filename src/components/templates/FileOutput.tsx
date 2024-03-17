"use client";

import { useFeedState } from "@/context/FeedContext";
import React from "react";

const FileOutput = () => {
  const { feedState } = useFeedState();

  return (
    <div>
      {<pre>{JSON.stringify(feedState.data?.keys, null, 2)}</pre>}
      {<pre>{JSON.stringify(feedState.data?.result, null, 2)}</pre>}
      FileOutput
    </div>
  );
};

export default FileOutput;
