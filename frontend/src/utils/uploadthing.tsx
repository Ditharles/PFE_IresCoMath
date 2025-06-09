import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
    generateUploader,
} from "@uploadthing/react";
import { OurFileRouter } from "../uploadthing";
const url = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8000";
// Définition des utilitaires UploadThing
export const UploadButton = generateUploadButton<OurFileRouter>({
    url: `${url}/api/uploadthing`,
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: `${url}/api/uploadthing`,
});
export const Uploader = generateUploader();
export const { useUploadThing, uploadFiles } = generateReactHelpers();