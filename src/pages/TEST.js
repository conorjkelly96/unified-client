import { useRef, useState } from "react";
import { Editable } from "../components/Editable";

export const TestEditable = () => {
  // const inputRef = useRef();
  const textareaRef = useRef();
  //   const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  return (
    <>
      <Editable
        text={description}
        placeholder="Click me!"
        childRef={textareaRef}
        type="textarea"
      >
        {/* when clicked, above field becomes this element */}
        <textarea
          ref={textareaRef}
          name="description"
          placeholder="This is now editable!"
          rows="5"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </Editable>
    </>
  );
};
