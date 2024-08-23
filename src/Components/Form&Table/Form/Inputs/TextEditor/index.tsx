"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import dynamic from "next/dynamic";

// Dynamically import JoditEditor with ssr: false
const JoditEditor = dynamic(() => import("jodit-pro-react"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

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

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/
      uploader: {
        url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
      },
      filebrowser: {
        height: 580,
      },
    }),
    []
  );

  // Conditionally render the editor only on the client side
  if (typeof window === "undefined") {
    return null;
  }

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

