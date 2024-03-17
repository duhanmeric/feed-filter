"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { Data } from "@/components/templates/FileFormURL";

type FeedStateType = {
  data: Data | null;
};

type FeedContextType = {
  feedState: FeedStateType;
  setFeedData: (data: FeedStateType) => void;
};

const FeedStateContext = createContext<FeedContextType | undefined>(undefined);

export const FeedStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [feedState, setFeedState] = useState<FeedStateType>({ data: null });

  const setFeedData = (newData: FeedStateType) => setFeedState(newData);

  return (
    <FeedStateContext.Provider value={{ feedState, setFeedData }}>
      {children}
    </FeedStateContext.Provider>
  );
};

export const useFeedState = (): FeedContextType => {
  const context = useContext(FeedStateContext);
  if (!context) {
    throw new Error("useFeedState must be used within a FeedStateProvider");
  }
  return context;
};
