import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-javascript";
import React, { useCallback, useMemo } from "react";

// Define the editor options type
interface EditorOptions {
  tabSize?: number;
  enableSnippets?: boolean;
  showLineNumbers?: boolean;
  enableLiveAutocompletion: boolean;
  enableBasicAutocompletion: boolean;
}

interface EditorProps {
  width?: string;
  height?: string;
  value: string;
  onChange: (newCode: string) => void;
}

const CodeEditor: React.FC<EditorProps> = React.memo(
  ({ width = "100%", height = "10rem", value, onChange }) => {
    const editorOptions = useMemo<EditorOptions>(() => {
      return {
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        showPrintMargin: false,
        tabSize: 2,
        editorProps: {
          $blockScrolling: true,
        },
      };
    }, []);

    const handleCodeChange = useCallback(
      (newCode: string) => {
        onChange(newCode);
      },
      [onChange]
    );

    return (
      <div>
        <AceEditor
          className="border"
          theme="github"
          mode="javascript"
          name="code_editor"
          value={value}
          placeholder="Start writing code....."
          width={width}
          height={height}
          onChange={handleCodeChange}
          {...editorOptions}
        />
      </div>
    );
  }
);

CodeEditor.displayName = "CodeEditor";

export default CodeEditor;

