import { createUploadthing, type FileRouter } from "uploadthing/next";

// Create the uploadthing instance
const f = createUploadthing();

// Define your file routes
export const ourFileRouter = {
  postImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded to:", file.url);
    }),
  userImageUploader: f({ image: { maxFileSize: "4MB" } })
    .onUploadComplete(async ({ file }) => {
      console.log("File uploaded to:", file.url);
    }),
} satisfies FileRouter;

// ✅ Export the type for UploadButton component
export type OurFileRouter = typeof ourFileRouter;
