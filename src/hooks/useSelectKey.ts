import { FeedKey } from "@/components/templates/FileFormURL";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useState } from "react";

const useSelectKey = () => {
  const [localKeys, setLocalKeys] = useState<FeedKey>([]);

  const handleChange = (e: CheckedState, column: string) => {
    if (e) {
      setLocalKeys([...localKeys, column]);
    } else {
      setLocalKeys(localKeys.filter((key) => key !== column));
    }
  };

  const proceedWithAllKeys = () => {
    console.log("proceed with all keys");
  };

  const proceedWithSpecKeys = () => {
    if (localKeys.length === 0) {
      alert("Please select at least one key.");
      return;
    }

    console.log("proceed with specific keys");
  };

  return { localKeys, handleChange, proceedWithAllKeys, proceedWithSpecKeys };
};

export default useSelectKey;
