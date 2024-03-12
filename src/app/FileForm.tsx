"use client";

import { handleFileUpload } from "@/actions/file";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

const FileForm = () => {
  const [state, formAction] = useFormState(handleFileUpload, initialState);

  return (
    <div>
      <textarea
        name="output"
        value={state.message}
        cols={75}
        rows={20}
        readOnly
        className="text-black"
      ></textarea>
      <form action={formAction}>
        <input type="file" name="file" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default FileForm;
