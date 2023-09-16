import { NextApiRequest } from "next";

export interface RequestCustomHeaders extends NextApiRequest {
    headers:{
        connection_url: string;
    }
}