import { NextApiRequest } from "next";
import { RequestCustomHeaders } from "./headers-types";

export type DocumentState = {
  loading: boolean;
  error: string;
};

export interface RequestDocument extends RequestCustomHeaders{
  query:{
    databaseName: string,
    collectionName: string,

  }
}

export interface RequestIndexDocument extends RequestCustomHeaders {
  query: {
      databaseName: string,
      collectionName: string,
      perPage: string,
      page: string,
      id: string,
  },
}




