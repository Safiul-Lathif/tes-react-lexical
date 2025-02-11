// pages/index.tsx
import { useEffect, useRef, useState } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs'; // Import OutputData type
import Header from '@editorjs/header';
import List from '@editorjs/list';
import ImageTool from '@editorjs/image';
import Paragraph from '@editorjs/paragraph';
import styles from './styles.module.css';

interface SaveStatus {
  type: 'success' | 'error';
  message: string;
}

const Home: React.FC = () => {  // Use React.FC for type safety
  const editorInstance = useRef<EditorJS | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus | null>(null);
  const ref = useRef<EditorJS>();
  
 const initializeEditor = async () => {
  const EditorJS = (await import("@editorjs/editorjs")).default;
  const Header = (await import('@editorjs/header')).default;
  const List = (await import('@editorjs/list')).default;
  const ImageTool = (await import('@editorjs/image')).default;
  const Paragraph = (await import('@editorjs/paragraph')).default;
  const Table = (await import('@editorjs/table')).default;
  if (!ref.current){
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
        image: ImageTool,
        paragraph: Paragraph,
        table: Table,
      },
    });
    ref.current = editor;
  }

 }

  useEffect(() => {
    initializeEditor();
    // if (!editorInstance.current) {
    //   editorInstance.current = new EditorJS({
    //     holder: 'editorjs',
    //     tools: {
    //       header: {
    //         // class: Header,
    //         inlineToolbar: ['link'],
    //       },
    //       list: {
    //         // class: List,
    //         inlineToolbar: true,
    //       },
    //       image: {
    //         class: ImageTool,
    //         config: {
    //           uploader: {
    //             upload: async (file: File) => { // Type the file argument
    //               try {
    //                 const formData = new FormData();
    //                 formData.append('image', file);

    //                 const response = await fetch('/api/upload', {
    //                   method: 'POST',
    //                   body: formData,
    //                 });

    //                 const result = await response.json();

    //                 if (result.success) {
    //                   return {
    //                     success: true,
    //                     data: {
    //                       url: result.data.url,
    //                     },
    //                   };
    //                 } else {
    //                   throw new Error(result.message || 'Image upload failed');
    //                 }
    //               } catch (error) {
    //                 console.error('Image upload error:', error);
    //                 throw error;
    //               }
    //             },
    //           },
    //         },
    //       },
    //       paragraph: {
    //         // class: Paragraph,
    //         inlineToolbar: true,
    //       },
          
    //     },
    //     onReady: () => {
    //       console.log('Editor.js is ready!');
    //     },
    //     onChange: (api, event) => {
    //       console.log('Editor.js has been changed', event);
    //     },
    //   });
    // }

    // return () => {
    //   if (editorInstance.current) {
    //     editorInstance.current.destroy();
    //     editorInstance.current = null;
    //   }
    // };
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    if (editorInstance.current) {
      try {
        const data: OutputData = await editorInstance.current.save(); // Type the data
        console.log(data);

        const response = await fetch('/api/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log('Data saved successfully:', result);
        setSaveStatus({ type: 'success', message: 'Saved successfully!' });
      } catch (error) {
        console.error('Error saving data:', error);
        setSaveStatus({ type: 'error', message: 'Error saving.' });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const save = () => {
    if (ref.current){
      ref.current.save().then((data)=> {
        console.log(data);
        console.log(JSON.stringify(data))
        // Now you can use the saved data in your application.
      })
    }
  }

  return (
    <div className={styles.container}>
      <div id="editorjs" className={styles.editor} />
      <button onClick={save} disabled={isSaving} className={styles.saveButton}>
        {isSaving ? 'Saving...' : 'Save'}
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


// // pages/api/upload.ts (API Route)
// import formidable from 'formidable';
// import fs from 'fs/promises';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: any, res: any) { // Type req and res
//   if (req.method === 'POST') {
//     try {
//       const form = new formidable.IncomingForm();

//       form.parse(req, async (err, fields, files) => {
//         if (err) {
//           console.error("Form parsing error:", err);
//           return res.status(500).json({ success: false, message: 'Error parsing form' });
//         }

//         const imageFile = files.image as formidable.File; // Type the file

//         if (!imageFile) {
//           return res.status(400).json({ success: false, message: 'No image file provided' });
//         }

//         const oldPath = imageFile.filepath;
//         const newPath = `./public/uploads/${imageFile.originalFilename}`;

//         try {
//           await fs.rename(oldPath, newPath);
//         } catch (moveErr) {
//           console.error("File move error:", moveErr);
//           return res.status(500).json({ success: false, message: 'Error moving file' });
//         }

//         const imageUrl = `/uploads/${imageFile.originalFilename}`;

//         res.status(200).json({ success: true, data: { url: imageUrl } });
//       });
//     } catch (error) {
//       console.error('Upload API error:', error);
//       res.status(500).json({ success: false, message: 'Upload failed' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }



// // pages/api/save.ts (API Route)
// import type { NextApiRequest, NextApiResponse } from 'next'; // Import types

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     try {
//       const data = req.body; // No need to type here, it's already typed by Next.js
//       console.log('Saving data:', data);

//       res.status(200).json({ message: 'Data saved successfully' });
//     } catch (error) {
//       console.error('Save API error:', error);
//       res.status(500).json({ message: 'Error saving data' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }

// // styles.module.css (No changes needed)
// // ... (CSS from previous example)