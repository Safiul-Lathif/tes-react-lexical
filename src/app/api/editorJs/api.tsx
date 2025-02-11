

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