import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
    generateUploader,
} from "@uploadthing/react";
import { OurFileRouter } from "../uploadthing";

// Définition des utilitaires UploadThing
export const UploadButton = generateUploadButton<OurFileRouter>({
    url: "http://localhost:8000/api/uploadthing",
});
export const UploadDropzone = generateUploadDropzone<OurFileRouter>({
    url: "http://localhost:8000/api/uploadthing", // Correction de l'URL pour utiliser le port 8000
});
export const Uploader = generateUploader();
export const { useUploadThing, uploadFiles } = generateReactHelpers();