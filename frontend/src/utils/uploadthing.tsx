import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
    generateUploader,
} from "@uploadthing/react";
import { OurFileRouter } from "../uploadthing";

// Définition des utilitaires UploadThing
export const UploadButton = generateUploadButton<OurFileRouter>({
    url: `${import.meta.env.VITE_BACKEND_URL}/api/uploadthing`,
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: `${import.meta.env.VITE_BACKEND_URL}/api/uploadthing`,
});
export const Uploader = generateUploader();
export const { useUploadThing, uploadFiles } = generateReactHelpers();