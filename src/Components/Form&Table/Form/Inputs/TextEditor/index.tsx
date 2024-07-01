import React, { useState, useRef, useEffect, useCallback } from "react";
import JoditEditor from "jodit-pro-react";

const Editor = ({
  value,
  onBlurEditor,
}: {
  value: string;
  onBlurEditor: (content: string) => void;
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState(value);

  // Only update content when value prop changes
  useEffect(() => {
    setContent(value);
  }, [value]);

  // useCallback to memoize the onBlur handler
  const handleBlur = useCallback(
    (newContent: string) => {
      setContent(newContent);
      onBlurEditor(newContent);
    },
    [onBlurEditor]
  );

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    uploader: {
      url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
    },
    filebrowser: {
      ajax: {
        url: "https://xdsoft.net/jodit/finder/",
      },
      height: 580,
    },
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={handleBlur} // Use the memoized onBlur handler
    />
  );
};

export default React.memo(Editor); // Memoize the component to prevent unnecessary re-renders
