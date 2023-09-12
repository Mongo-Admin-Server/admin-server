import { NextApiRequest } from "next";

export type DocumentState = {
  loading: boolean;
  error: string;
};



export interface RequestIndexDocument extends NextApiRequest {
  query: {
      databaseName: string,
      collectionName: string,
      perPage: string,
      page: string,
  },
}


