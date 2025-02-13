// components/RealtimeEditor.js
import React, { useRef, useEffect, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
// ... other plugins
import io from 'socket.io-client';

const RealtimeEditor = ({ roomId }) => { // Add roomId prop
    const editorInstance = useRef < EditorJS | null > (null);
    const [editorData, setEditorData] = useState(null);
    const socketRef = useRef(null);


    const initializeEditor = async () => {
        const EditorJS = (await import("@editorjs/editorjs")).default;
        // 1. Establish Socket.IO connection
        socketRef.current = io('http://localhost:8080'); // Your backend URL

        // 2. Initialize Editor.js
        if (!editorInstance.current) {
            const editor = new EditorJS({
                holder: 'editorjs-container',
                tools: { /* ... your tools */ },
                data: editorData || {}, // Use state for initial data
                onChange: (api, data) => {
                    setEditorData(data); // Keep local state in sync
                    if (socketRef.current && socketRef.current.connected) {
                        socketRef.current.emit('editorChange', roomId, data); // Send changes
                    }
                    socketRef.current.on('connect', () => {
                        console.log('Connected to server');
                        socketRef.current.emit('joinRoom', roomId); // Join the room
                    });

                    socketRef.current.on('documentUpdate', (data) => {
                        setEditorData(data); // Update the editor data
                        if (editorInstance.current) {
                            editorInstance.current.set('data', data); // Important: Update editor
                        }
                    });

                    socketRef.current.on('disconnect', () => {
                        console.log('Disconnected from server');
                    });
                },
            });
        }





        return () => {
            if (editorInstance.current) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }

    useEffect(() => {
        initializeEditor();
    }, [roomId]); // Add roomId to dependency array

    return <div id="editorjs-container"></div>;
};

export default RealtimeEditor;