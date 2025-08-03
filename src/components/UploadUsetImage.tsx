"use client";

import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { FileUp } from "lucide-react";
import { toast } from "sonner";

const { useUploadThing: useUT } = generateReactHelpers<OurFileRouter>();

export default function UploadUserImage({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  const { startUpload, isUploading } = useUT("userImageUploader", {
    onClientUploadComplete: (res) => {
      if (res && res[0]?.url) {
        toast.success("Image uploaded!");
        onUpload(res[0].url);
      }
    },
    onUploadError: (err) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;
    if (files) await startUpload(Array.from(files));
  };

  return (
    <label className="cursor-pointer inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded">
      <FileUp className="w-4 h-4" />
      {isUploading ? "Uploading..." : "Upload Profile Image"}
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
    </label>
  );
}
