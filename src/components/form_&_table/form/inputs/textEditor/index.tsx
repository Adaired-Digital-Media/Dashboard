"use client";
import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import dynamic from "next/dynamic";
import { Input } from "reactstrap";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => <Input type="textarea" aria-rowcount={5}></Input>,
});

const Editor = forwardRef(
  (
    {
      value,
      onBlurEditor,
    }: { value: string; onBlurEditor: (content: string) => void },
    ref
  ) => {
    const [content, setContent] = useState(value);

    useEffect(() => {
      setContent(value);
    }, [value]);

    const handleBlur = useCallback(
      (newContent: string) => {
        setContent(newContent);
        onBlurEditor(newContent);
      },
      [onBlurEditor]
    );

    const config = useMemo(
      () => ({
        readonly: false,
        placeholder: value ? "" : "Start writing",
        uploader: {
          url: "https://xdsoft.net/jodit/finder/?action=fileUpload",
        },
        filebrowser: {
          ajax: {
            url: "https://xdsoft.net/jodit/finder/",
          },
          height: 580,
        },
        
      }),
      []
    );

    // Expose the editor instance through ref
    useImperativeHandle(ref, () => ({
      getContent: () => content,
      resetEditor: () => setContent(""),
    }));

    if (typeof window === "undefined") {
      return null;
    }

    return (
      <JoditEditor value={content} config={config as any} onBlur={handleBlur} />
    );
  }
);

// Set display name for better debugging
Editor.displayName = "Editor";

export default React.memo(Editor);
