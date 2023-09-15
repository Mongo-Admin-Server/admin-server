import { NextApiRequest } from "next";
import { RequestCustomHeaders } from "./headers-types";

export type CollectionType = {
  collectionName: string;
  count: number;
  avgDocumentSize: number;
  totalDocumentSize: number;
  indexes: any[];
  totalIndexSize: number;
  storageSize: number;
}

export type CollectionState = {
  collections: CollectionType[];
  collectionSelected: string;
  loading: boolean;
  error: string;
};

export interface RequestCustomCollection extends RequestCustomHeaders {
  query: {
    databaseName: string,
  },
}