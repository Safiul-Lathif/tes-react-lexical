import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  REDO_COMMAND,
  UNDO_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  createCommand,
} from "lexical";
import styles from "./Toolbar.module.css";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import FormatAlignLeftOutlinedIcon from "@mui/icons-material/FormatAlignLeftOutlined";
import FormatAlignRightOutlinedIcon from "@mui/icons-material/FormatAlignRightOutlined";
import FormatAlignJustifyOutlinedIcon from "@mui/icons-material/FormatAlignJustifyOutlined";
import FormatText from "mdi-material-ui/FormatText";
import {  useState } from "react";
import { Packer } from "docx";
import { convertLexicalToDocx } from "../utils";
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';

export const INSERT_IMAGE_COMMAND = createCommand("INSERT_IMAGE_COMMAND");


// A toolbar with simple rich-text controls
export function Toolbar() {
  const [src, setSrc] = useState("");
  const [editor] = useLexicalComposerContext();
  const loadImage = (files: FileList | Blob[] | null) => {
    const reader = new FileReader();
    reader.onload = function () {
      if (typeof reader.result === "string") {
      setSrc(reader.result);
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, src);
      }
      return "";
    };
    if (files !== null) {
      reader.readAsDataURL(files[0]);
    }
  };


function downloadFile(csvData: BlobPart | BlobPart, filename: string) {
  const url = window.URL.createObjectURL(
    csvData instanceof Blob ? csvData : new Blob([csvData]),
  );
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

  function exportDocx() {
      Packer.toBlob(convertLexicalToDocx( editor._editorState.toJSON())).then((blob) =>
        downloadFile(blob, "Mydocument.docx"),
      );
  }

  return (
    <div className={styles.toolbar}>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
        }}
        aria-label="Bold"
      >
        <BoldIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
        }}
        aria-label="Italic"
      >
        <ItalicIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
        }}
        aria-label="Underline"
      >
        <UnderlineIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND,"strikethrough");
        }}
        aria-label="strikethrough"
      >
        <FormatText />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        aria-label="strikethrough"
      >
        <UndoOutlinedIcon />
      </button> 
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        aria-label="strikethrough"
      >
        <RedoOutlinedIcon />
      </button> <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left");
        }}
        aria-label="strikethrough"
      >
        <FormatAlignLeftOutlinedIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center");
        }}
        aria-label="strikethrough"
      >
        <FormatAlignJustifyOutlinedIcon />
      </button>
      <button
        className={styles.button}
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right");
        }}
        aria-label="strikethrough"
      >
        <FormatAlignRightOutlinedIcon />
      </button>   
      <button
        className={styles.button}
        onClick={() => {
          exportDocx();
        }}
        aria-label="download"
      >
        <DownloadForOfflineIcon />
      </button>    
    </div>
  );
}

function BoldIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.25 25H9V7H17.5C18.5022 7.00006 19.4834 7.28695 20.3277 7.82679C21.172 8.36662 21.8442 9.13684 22.2649 10.0465C22.6855 10.9561 22.837 11.9671 22.7015 12.96C22.5659 13.953 22.149 14.8864 21.5 15.65C22.3477 16.328 22.9645 17.252 23.2653 18.295C23.5662 19.3379 23.5364 20.4485 23.18 21.4738C22.8236 22.4991 22.1581 23.3887 21.2753 24.0202C20.3924 24.6517 19.3355 24.994 18.25 25ZM12 22H18.23C18.5255 22 18.8181 21.9418 19.091 21.8287C19.364 21.7157 19.6121 21.5499 19.821 21.341C20.0299 21.1321 20.1957 20.884 20.3087 20.611C20.4218 20.3381 20.48 20.0455 20.48 19.75C20.48 19.4545 20.4218 19.1619 20.3087 18.889C20.1957 18.616 20.0299 18.3679 19.821 18.159C19.6121 17.9501 19.364 17.7843 19.091 17.6713C18.8181 17.5582 18.5255 17.5 18.23 17.5H12V22ZM12 14.5H17.5C17.7955 14.5 18.0881 14.4418 18.361 14.3287C18.634 14.2157 18.8821 14.0499 19.091 13.841C19.2999 13.6321 19.4657 13.384 19.5787 13.111C19.6918 12.8381 19.75 12.5455 19.75 12.25C19.75 11.9545 19.6918 11.6619 19.5787 11.389C19.4657 11.116 19.2999 10.8679 19.091 10.659C18.8821 10.4501 18.634 10.2843 18.361 10.1713C18.0881 10.0582 17.7955 10 17.5 10H12V14.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M25 9V7H12V9H17.14L12.77 23H7V25H20V23H14.86L19.23 9H25Z"
        fill="currentColor"
      />
    </svg>
  );
}

function UnderlineIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 26H28V28H4V26ZM16 23C14.1435 23 12.363 22.2625 11.0503 20.9497C9.7375 19.637 9 17.8565 9 16V5H11V16C11 17.3261 11.5268 18.5979 12.4645 19.5355C13.4021 20.4732 14.6739 21 16 21C17.3261 21 18.5979 20.4732 19.5355 19.5355C20.4732 18.5979 21 17.3261 21 16V5H23V16C23 17.8565 22.2625 19.637 20.9497 20.9497C19.637 22.2625 17.8565 23 16 23Z"
        fill="currentColor"
      />
    </svg>
  );
}



