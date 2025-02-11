// EditorJSInner.js
import React from 'react';
import Editor from '@editorjs/editorjs'; // Or your editor library
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';


const EditorJSInner = (props) => {
    const editorRef = React.useRef(null);
    React.useEffect(() => {
        editorRef.current = new Editor({
            // // ... your editor configuration ...
            element: editorRef.current,
            // ...props
            holder: 'editorjs',
            tools: {
                header: {
                    class: Header,
                    inlineToolbar: ['link'],
                },
                list: {
                    class: List,
                    inlineToolbar: true,
                },
                image: {
                    class: ImageTool,
                    config: {
                        uploader: {
                            upload: async (file) => { // Type the file argument
                                try {
                                    const formData = new FormData();
                                    formData.append('image', file);

                                    const response = await fetch('/api/upload', {
                                        method: 'POST',
                                        body: formData,
                                    });

                                    const result = await response.json();

                                    if (result.success) {
                                        return {
                                            success: true,
                                            data: {
                                                url: result.data.url,
                                            },
                                        };
                                    } else {
                                        throw new Error(result.message || 'Image upload failed');
                                    }
                                } catch (error) {
                                    console.error('Image upload error:', error);
                                    throw error;
                                }
                            },
                        },
                    },
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
            },
            // data: {},
            onReady: () => {
                console.log('Editor.js is ready!');
            },
            onChange: (api, event) => {
                console.log('Editor.js has been', editorRef.current);
            },
        });
    }

    )

    const handleSave = async () => {
        if (editorRef.current) {
            try {
                // const data = await editorRef.current.save(); // Type the data
                // console.log("hello", data);
                // const response = await fetch('/api/save', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(data),
                // });

                // const result = await response.json();
                // console.log('Data saved successfully:', result);
                // setSaveStatus({ type: 'success', message: 'Saved successfully!' });
                editorRef.current.save().then((outputData) => {
                    console.log('Article data: ', outputData)
                }).catch((error) => {
                    console.log('Saving failed: ', error)
                });
            } catch (error) {
                console.error('Error saving data:', error);
                // setSaveStatus({ type: 'error', message: 'Error saving.' });
            } finally {
                // setIsSaving(false);
            }
        }
    };
    return (
        <div>
            <div ref={editorRef}></div>
            <button onClick={handleSave}  >
                {'Save'}
            </button>
        </div>

    )
};

export default EditorJSInner;
