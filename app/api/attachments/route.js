import formidable from "formidable";
import { db, storage } from "@/lib/firebase"; // Import Firestore and Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm();
    form.parse(request, async (err, fields, files) => {
      if (err) {
        return resolve(
          new Response(JSON.stringify({ error: "Something went wrong" }), {
            status: 500,
          })
        );
      }

      const file = files.file[0]; // Get the uploaded file

      try {
        // Step 1: Upload the file to Firebase Storage
        const storageRef = ref(storage, `attachments/${file.newFilename}`);
        const fileBuffer = await file.toBuffer(); // Read the file into a buffer
        const metadata = {
          contentType: file.mimetype,
        };
        const uploadResult = await uploadBytes(
          storageRef,
          fileBuffer,
          metadata
        );

        // Step 2: Get the public URL of the uploaded file
        const fileUrl = await getDownloadURL(uploadResult.ref);

        // Step 3: Store the attachment metadata in Firestore
        const attachmentData = {
          taskId: fields.taskId,
          fileUrl: fileUrl,
          uploadedBy: fields.uploadedBy,
          uploadedAt: new Date().toISOString(), // Add a timestamp
        };

        const docRef = await addDoc(
          collection(db, "attachments"),
          attachmentData
        );

        // Step 4: Return the created attachment document
        const createdAttachment = { id: docRef.id, ...attachmentData };
        return resolve(
          new Response(JSON.stringify(createdAttachment), { status: 201 })
        );
      } catch (error) {
        console.error("POST /api/attachments error:", error);
        return resolve(
          new Response(JSON.stringify({ error: "Failed to upload file" }), {
            status: 500,
          })
        );
      }
    });
  });
}
