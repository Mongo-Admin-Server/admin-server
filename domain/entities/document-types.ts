import { NextApiRequest } from "next";

export type DocumentState = {
  loading: boolean;
  error: string;
};



export interface RequestCustomDocument extends NextApiRequest {
  query: {
      databaseName: string,
      name: string,
      perPage: string,
      page: string,
  },
}