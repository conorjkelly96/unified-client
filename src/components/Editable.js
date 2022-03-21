import { Button } from "@mui/material";
import { useEffect, useState } from "react";

export const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  initialValue,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);
  const [description, setDescription] = useState(text);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleCancel = () => {
    setEditing(false);
    setDescription(initialValue);
  };

  return (
    <>
      <section {...props}>
        {isEditing ? (
          <>
            <div>{children} </div>
            <Button
              variant="contained"
              size="small"
              color="error"
              sx={{ mt: 2, marginLeft: 1 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <div>
              <span>{description || placeholder}</span>
            </div>
            <Button
              variant="contained"
              size="small"
              color="info"
              sx={{ mt: 2 }}
              onClick={() => setEditing(true)}
            >
              Edit Post
            </Button>
          </>
        )}
      </section>
    </>
  );
};
