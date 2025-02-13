// pages/editor.tsx
'use client'; // This is a client component

import { useState, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';

const Editor = () => {
  const editorRef = useRef(null);
  const [editorInstance, setEditorInstance] = useState(null);

  useEffect(() => {
    if (editorRef.current && !editorInstance) {
      const ydoc = new Y.Doc();
      const provider = new WebrtcProvider('my-room-id', ydoc, {
        // signaling: ['wss://signaling.yjs.dev'], // Use a public or your own signaling server
      }); // Replace with your room ID
      const ytext = ydoc.getText('content');

      const editor = new EditorJS({
        holder: editorRef.current,
        tools: {
          // Define your Editor.js tools here
          // ...
        },
        data: ytext ? JSON.parse(ytext.toString()) : {}, // Initialize with Y.js content or empty
        onChange: (api, event) => {
           const editorData = api.saver.save();
           ytext.delete(0, ytext.length); // Clear existing content
           ytext.insert(0, JSON.stringify(editorData)); // Update Y.js with editor data
        },
      });

      setEditorInstance(editor);

      return () => {
        provider.disconnect();
        ydoc.destroy();
        editor.destroy();
      };
    }
  }, [editorRef, editorInstance]);

  return (
    <div>
      <div ref={editorRef}></div>
    </div>
  );
};

export default Editor;