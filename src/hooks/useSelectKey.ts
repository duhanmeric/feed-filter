import { CheckedState } from "@radix-ui/react-checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";

const useSelectKey = () => {
  const [localKeys, setLocalKeys] = useState<string[]>([]);
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: CheckedState, column: string) => {
    if (e) {
      setLocalKeys([...localKeys, column]);
    } else {
      setLocalKeys(localKeys.filter((key) => key !== column));
    }
  };

  const proceedWithAllKeys = () => {
    const params = new URLSearchParams(searchParams.toString())
    router.push('/file' + '?' + params);
  };


  const createNewKeyParam = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("q", JSON.stringify(localKeys));

    return params;
  },
    [searchParams, localKeys]
  )

  const proceedWithSpecKeys = () => {
    if (localKeys.length === 0) {
      alert("Please select at least one key.");
      return;
    }
    router.push('/file' + '?' + createNewKeyParam());

    return true;
  };

  return { localKeys, handleChange, proceedWithAllKeys, proceedWithSpecKeys };
};

export default useSelectKey;
