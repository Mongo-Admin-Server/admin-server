import { NextApiRequest } from "next";

export interface RequestCustomDocument extends NextApiRequest {
  query: {
      databaseName: string,
      name: string,
      perPage: string,
      page: string,
  },
}