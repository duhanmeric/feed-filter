"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { Data, FeedKey } from "@/components/templates/FileFormURL";

type FeedStateType = {
  data: Data | null;
  keys: FeedKey | null;
};

type FeedContextType = {
  feedState: FeedStateType;
  setFeedData: (data: FeedStateType) => void;

  feedKeys: FeedKey | null;
  setFeedKeyData: (data: FeedKey) => void;
};

const FeedStateContext = createContext<FeedContextType | undefined>(undefined);

export const FeedStateProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [feedState, setFeedState] = useState<FeedStateType>({
    data: null,
    keys: null,
  });

  const setFeedData = (newData: FeedStateType) => setFeedState(newData);

  const [feedKeys, setFeedKeys] = useState<FeedKey | null>(null);

  const setFeedKeyData = (newData: FeedKey) => setFeedKeys([...newData]);

  const values = {
    feedState,
    setFeedData,
    feedKeys,
    setFeedKeyData,
  };

  return (
    <FeedStateContext.Provider value={values}>
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
