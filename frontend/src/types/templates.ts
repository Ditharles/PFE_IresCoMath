import { RequestType } from "./request";

export type Template = {
  id: string;
  name: string;
  url: string;
  for: RequestType;
  placeholders: string[];
  createdAt: Date;
  updatedAt: Date;
};
