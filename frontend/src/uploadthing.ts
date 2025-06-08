import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  profilePicture: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  signature: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  stageLetter: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  articleCover: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  equipmentPhotos: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  categoryPhotos: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  equipmentPhotosRequest: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
  repairMaintenance: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  missionDocuments: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/msword": { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  specificDocuments: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    "application/msword": { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),

  mailAcceptation: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
  template: f({
    "application/msword": { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
  templateSign: f({
    "application/msword": { maxFileSize: "4MB", maxFileCount: 1 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
    "application/pdf": { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { url: file.ufsUrl };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
