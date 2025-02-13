// pages/index.tsx
import { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs"; // Import OutputData type
import styles from "./styles.module.css";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import InlineCode from "@editorjs/inline-code";
import data from "../../data";

interface SaveStatus {
  type: "success" | "error";
  message: string;
}

const Home: React.FC = () => {
  // Use React.FC for type safety
  const editorInstance = useRef<EditorJS | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null);
  const ref = useRef<EditorJS | null>(null);
  const firstNames = [
    "John",
    "Jane",
    "Michael",
    "Emily",
    "Chris",
    "Sarah",
    "David",
    "Jessica",
    "Daniel",
    "Ashley",
    "James",
    "Amanda",
    "Robert",
    "Jennifer",
    "Mary",
    "William",
    "Patricia",
    "Linda",
    "Barbara",
    "Elizabeth",
  ];

  const colors = [
    "blue",
    "red",
    "#1A1A19",
    "orange",
    "#31511E",
    "#9B7EBD",
    "#604CC3",
  ];

  let name = firstNames[Math.floor(Math.random() * firstNames.length)];
  let color = colors[Math.floor(Math.random() * colors.length)];

  let socketClient: {
    shouldPreventChange: any;
    checkIfChangesShouldBeUpdated?: () => boolean;
  } | null = null;

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default;
    const Header = (await import("@editorjs/header")).default;
    const List = (await import("@editorjs/list")).default;
    const ImageTool = (await import("@editorjs/image")).default;
    const Paragraph = (await import("@editorjs/paragraph")).default;
    const Table = (await import("@editorjs/table")).default;

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        data: data,
        tools: {
          header: Header,
          list: List,
          image: ImageTool,
          paragraph: Paragraph,
          table: Table,
          quote: Quote,
          warning: Warning,
          code: Code,
          inlineCode: InlineCode,
        },
        onChange: async (api, event) => {},
        onReady: async () => {},
      });
      ref.current = editor;
    }
  };

  useEffect(() => {
    initializeEditor();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    if (editorInstance.current) {
      try {
        const data: OutputData = await editorInstance.current.save(); // Type the data
        console.log(data);

        const response = await fetch("/api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Data saved successfully:", result);
        setSaveStatus({ type: "success", message: "Saved successfully!" });
      } catch (error) {
        console.error("Error saving data:", error);
        setSaveStatus({ type: "error", message: "Error saving." });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const save = () => {
    if (ref.current) {
      ref.current.save().then((data) => {
        console.log(data);
        console.log(JSON.stringify(data));
        // Now you can use the saved data in your application.
      });
    }
  };

  const download = () => {
    if (ref.current) {
    }
  };

  return (
    <div className={styles.container}>
      <div id="editorjs" className={styles.editor} />
      <button onClick={save} disabled={isSaving} className={styles.saveButton}>
        {isSaving ? "Saving..." : "Save"}
      </button>
      <button
        onClick={download}
        disabled={isSaving}
        className={styles.saveButton}
      >
        {isSaving ? "Downloading..." : "Download"}
      </button>

      {saveStatus && (
        <div className={`${styles.saveStatus} ${styles[saveStatus.type]}`}>
          {saveStatus.message}
        </div>
      )}
    </div>
  );
};

export default Home;
