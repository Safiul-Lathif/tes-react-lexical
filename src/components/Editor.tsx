"use client";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import * as Y from "yjs";
import { useRoom, useSelf } from "@liveblocks/react/suspense";
import styles from "./Editor.module.css";
import { Avatars } from "./Avatars";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  LexicalEditor,
} from "lexical";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { CollaborationPlugin } from "@lexical/react/LexicalCollaborationPlugin";
import { Provider } from "@lexical/yjs";
import LexicalEditorTopBar from "./LexicalEditorTopBar"
import {lexicalEditorConfig} from "../config/lexicalEditorConfig"
import ImagesPlugin from "../components/CustomPlugins/ImagePlugin/index";
import FloatingTextFormatToolbarPlugin from "../components/CustomPlugins/FloatingTextFormatPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";


// Define initial editor state
function initialEditorState(editor: LexicalEditor): void {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  const text = $createTextNode();
  paragraph.append(text);
  root.append(paragraph);
}
export default function Editor() {
  // Get Liveblocks room, and user info from Liveblocks authentication endpoint
  const room = useRoom();
  const userInfo = useSelf((me) => me.info);

  return (
    <div className={styles.container}>
      <LexicalComposer initialConfig={lexicalEditorConfig}>
        <div className={styles.editorHeader}>
          {/* <Toolbar /> */}
          <LexicalEditorTopBar/>  
          <Avatars />
        </div>
        <div>
          
        </div>
        <div className={styles.editorContainer}>
          <RichTextPlugin
            contentEditable={<ContentEditable className={styles.editor} />}
            placeholder={
              <p className={styles.placeholder}>Start typing here…</p>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CollaborationPlugin
            id="yjs-plugin"
            cursorColor={userInfo.color}
            username={userInfo.name}
            providerFactory={(id, yjsDocMap) => {
              const doc = new Y.Doc();
              yjsDocMap.set(id, doc);
              const provider = new LiveblocksYjsProvider(room,doc ) as Provider;
              return provider;
            }}
            initialEditorState={initialEditorState}
            shouldBootstrap={true}
          />
        </div>
          <ListPlugin />
          <LinkPlugin />
          <ImagesPlugin captionsEnabled={false} />
          <FloatingTextFormatToolbarPlugin />
      </LexicalComposer>
    </div>
  );
}


